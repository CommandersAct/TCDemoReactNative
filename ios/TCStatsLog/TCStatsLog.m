#import "TCStatsLog.h"
#import <signal.h>
#import <stdio.h>
#import <unistd.h>

@implementation TCStatsLog {
  NSUInteger _executed;
  NSUInteger _sent;
  BOOL _started;
  BOOL _hasListeners;
  NSMutableData *_buffer;
  int _originalStdout;
  NSRegularExpression *_executedPattern;
  BOOL _awaitingPostDataBody;
  NSFileHandle *_readHandle;
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[ @"tcstats-update" ];
}

- (void)startObserving {
  _hasListeners = YES;
}

- (void)stopObserving {
  _hasListeners = NO;
}

RCT_EXPORT_METHOD(start) {
  if (_started) {
    return;
  }
  _started = YES;
  // Writing to _originalStdout below can outlive whatever's reading the other end of that
  // pipe (varies by launch method); without this, that write kills the whole process.
  signal(SIGPIPE, SIG_IGN);
  _executedPattern = [NSRegularExpression regularExpressionWithPattern:@"Server-Side\\s+SDK\\s+sending\\s+event\\s*:"
                                                                options:NSRegularExpressionCaseInsensitive
                                                                  error:nil];
  [self redirectStandardStreams];
}

RCT_EXPORT_METHOD(getCounts : (RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject) {
  resolve(@{ @"executed" : @(_executed), @"sent" : @(_sent) });
}

// The native SDK's debug prints go through its own `NSLog` macro, which is actually raw
// `printf` (not Apple's real NSLog/os_log). libc fully-buffers stdout whenever it isn't a
// terminal, which is always true once redirected to our pipe below — so without forcing
// it unbuffered, printf'd lines just sit in libc's buffer and never reach readabilityHandler.
- (void)redirectStandardStreams {
  _buffer = [NSMutableData new];
  _originalStdout = dup(STDOUT_FILENO);
  int originalStderr = dup(STDERR_FILENO);

  int pipeFds[2];
  if (pipe(pipeFds) != 0) {
    return;
  }

  dup2(pipeFds[1], STDOUT_FILENO);
  dup2(pipeFds[1], STDERR_FILENO);
  close(pipeFds[1]);
  close(originalStderr);

  setvbuf(stdout, NULL, _IONBF, 0);
  setvbuf(stderr, NULL, _IONBF, 0);

  // Held in an ivar: without a strong reference kept alive here, ARC deallocates this
  // handle almost immediately (closeOnDealloc:YES closes the pipe) and the
  // readabilityHandler block below never actually gets a chance to fire.
  _readHandle = [[NSFileHandle alloc] initWithFileDescriptor:pipeFds[0] closeOnDealloc:YES];

  __weak typeof(self) weakSelf = self;
  _readHandle.readabilityHandler = ^(NSFileHandle *handle) {
    NSData *data = handle.availableData;
    if (data.length == 0) {
      return;
    }
    [weakSelf consumeCapturedData:data];
  };
}

- (void)consumeCapturedData:(NSData *)data {
  write(_originalStdout, data.bytes, data.length);
  [_buffer appendData:data];

  NSData *newline = [NSData dataWithBytes:"\n" length:1];
  NSRange range;
  while ((range = [_buffer rangeOfData:newline options:0 range:NSMakeRange(0, _buffer.length)]).location != NSNotFound) {
    NSData *lineData = [_buffer subdataWithRange:NSMakeRange(0, range.location)];
    NSString *line = [[NSString alloc] initWithData:lineData encoding:NSUTF8StringEncoding];
    [_buffer replaceBytesInRange:NSMakeRange(0, range.location + 1) withBytes:NULL length:0];
    if (line.length > 0) {
      [self processLine:line];
    }
  }
}

- (void)processLine:(NSString *)line {
  NSRange fullRange = NSMakeRange(0, line.length);
  BOOL changed = NO;

  if ([_executedPattern firstMatchInString:line options:0 range:fullRange]) {
    _executed++;
    changed = YES;
  }

  NSString *trimmed = [line stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];

  if (_awaitingPostDataBody) {
    _awaitingPostDataBody = NO;
    if (![self isPrivacyBeaconBody:trimmed]) {
      _sent++;
      changed = YES;
    }
  } else {
    NSRange postDataRange = [trimmed rangeOfString:@"postData:" options:NSCaseInsensitiveSearch];
    if (postDataRange.location != NSNotFound) {
      // The JSON body usually lands on the next log line, not after the colon on this one.
      NSString *body = [[trimmed substringFromIndex:postDataRange.location + postDataRange.length]
          stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
      if (body.length == 0) {
        _awaitingPostDataBody = YES;
      } else if (![self isPrivacyBeaconBody:body]) {
        _sent++;
        changed = YES;
      }
    }
  }

  if (changed && _hasListeners) {
    [self sendEventWithName:@"tcstats-update" body:@{ @"executed" : @(_executed), @"sent" : @(_sent) }];
  }
}

// Consent's own privacy hits ride the same "postData:" log line as ServerSide event
// hits; only their JSON body distinguishes them, so those are excluded from the count.
- (BOOL)isPrivacyBeaconBody:(NSString *)body {
  return [body hasPrefix:@"{\"privacyBeacon\""];
}

@end
