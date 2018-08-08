import axios from "axios";

export default {

  newRequest(url) {
    return axios.request({
      method: "GET",
      url: url,
      headers: {
        "Cache-Control": "no-cache"
      }
    });
  },

  requestWithBody(method, url, body) {
    return axios.request({
      method: method,
      url: url,
      data: body,
      timeout: 10000
    });
  },

  postFile(url, body) {
    return axios.post(url, body);
  },

  // UserAgent and System info
  client: (function () {
    const ua = navigator.userAgent;

    const isWindowsPhone = /(?:Windows Phone)/.test(ua);
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    const isAndroid = /(?:Android)/.test(ua);
    const isFireFox = /(?:Firefox)/.test(ua);
    const isChrome = /(?:Chrome|CriOS)/.test(ua);
    const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    const isPc = !isPhone && !isAndroid && !isSymbian;

    return {
      isTablet: isTablet,
      isIPhone: isPhone,
      isAndroid: isAndroid,
      isPc: isPc,

      system: {
        isWindowsPhone: isWindowsPhone,
        isSymbian: isSymbian,
        isAndroid: isAndroid,
        isFireFox: isFireFox,
        isChrome: isChrome
      }
    };
  })()
}