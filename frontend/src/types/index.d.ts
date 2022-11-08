export {};

declare global {
  interface Window {
    __WEBVIEW_BRIDGE__: any; // 👈️ turn off type checking
    ReactNativeWebView: any;
  }
}