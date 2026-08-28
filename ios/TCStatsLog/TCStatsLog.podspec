Pod::Spec.new do |s|
  s.name         = "TCStatsLog"
  s.version      = "1.0.0"
  s.summary      = "In-app Logcat/Xcode console log tailer backing the demo app's Stats screen."
  s.license      = "MIT"
  s.author       = "TCDemoReactNative"
  s.homepage     = "https://github.com/commandersact/TCDemoReactNative"
  s.platforms    = { :ios => "13.0" }
  # Never actually fetched — this pod is only ever consumed locally via :path in ../Podfile.
  s.source       = { :git => "https://github.com/commandersact/TCDemoReactNative.git" }
  s.source_files = "*.{h,m}"
  s.dependency "React-Core"
end
