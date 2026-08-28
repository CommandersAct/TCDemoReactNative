#import <React/RCTEventEmitter.h>

/**
 * Redirects stdout/stderr to a pipe so this app can tail its own console
 * output (Xcode has no read-back API for it), counts two marker lines the
 * ServerSide SDK prints when debug logging is enabled ("Server-Side SDK
 * sending event:" and "sending: https://collect.commander1.com/events"),
 * and forwards everything back to the real console untouched. See TCStatsLog.ts.
 */
@interface TCStatsLog : RCTEventEmitter <RCTBridgeModule>
@end
