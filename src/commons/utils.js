import axios from "axios";

var apiParamsSerializer = function(params) {
  var parts = [];
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var obj = params[key];
      if (obj instanceof Array) {
        for (var idx = 0; idx < obj.length; idx++) {
          parts.push(key + "=" + encodeURIComponent(obj[idx]));
        }
      } else {
        parts.push(key + "=" + encodeURIComponent(obj));
      }
    }
  }
  return parts.join("&");
};

// Chinese number convert helper
const chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const chnUnitSection = [
  "",
  "万",
  "亿",
  "万亿",
  "兆",
  "京",
  "垓",
  "秭",
  "穰",
  "沟",
  "涧",
  "正",
  "载",
  "极",
  "恒河沙",
  "阿僧示氏",
  "那由他",
  "不可思议",
  "无量数"
];
const chnUnitChar = ["", "十", "百", "千"];

const chinsesNumberSectionOf = section => {
  var strIns = "",
    chnStr = "";
  var unitPos = 0;
  var zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
};

// Week mapping helper
const weekMapping = ["一", "二", "三", "四", "五", "六", "日"]

export default {
  isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
  },

  chineseWeekdayOf(num) {
    return weekMapping[num % 7];
  },

  chineseNumberOf(num) {
    var unitPos = 0;
    var strIns = "",
      chnStr = "";
    var needZero = false;

    if (num === 0) {
      return chnNumChar[0];
    }

    if (num >= 10 && num < 20) {
      if (num === 10) return chnUnitChar[1];
      else return `${chnUnitChar[1]}${chnNumChar[num % 10]}`;
    }

    while (num > 0) {
      var section = num % 10000;
      if (needZero) {
        chnStr = chnNumChar[0] + chnStr;
      }
      strIns = chinsesNumberSectionOf(section);
      strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
      chnStr = strIns + chnStr;
      needZero = section < 1000 && section > 0;
      num = Math.floor(num / 10000);
      unitPos++;
    }

    return chnStr;
  },

  newRequest(url) {
    return axios.request({
      method: "GET",
      url: url,
      headers: {
        "Cache-Control": "no-cache"
      }
    });
  },

  newQuery(url, params) {
    return axios.request({
      method: "GET",
      url: url,
      params: params,
      paramsSerializer: apiParamsSerializer
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
  client: (function() {
    const ua = navigator.userAgent;

    const isWindowsPhone = /(?:Windows Phone)/.test(ua);
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    const isAndroid = /(?:Android)/.test(ua);
    const isFireFox = /(?:Firefox)/.test(ua);
    const isChrome = /(?:Chrome|CriOS)/.test(ua);
    const isTablet =
      /(?:iPad|PlayBook)/.test(ua) ||
      (isAndroid && !/(?:Mobile)/.test(ua)) ||
      (isFireFox && /(?:Tablet)/.test(ua));
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
};
