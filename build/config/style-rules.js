// 参考但远优于 https://github.com/vuejs-templates/webpack/blob/master/template/build/utils.js
var extract = require('extract-text-webpack-plugin').extract;
var Environment = require('./ENV');

// postcss-loader 配置见 .postcssrc
const basicLoaders = ['css-loader', 'postcss-loader'];

var loaderMapping = {
  css: basicLoaders,
  less: basicLoaders.concat('less-loader'),
  sass: basicLoaders.concat('sass-loader?indentedSyntax=true'),
  scss: basicLoaders.concat('sass-loader')
};

function generateRules(ext, isForVueLoader) {
  var styleLoader = (isForVueLoader ? 'vue-' : '') + 'style-loader';
  var useLoaders = loaderMapping[ext];

  // 开发环境下直接内嵌 CSS 以支持热替换
  if (Environment.isDevelopement) return [styleLoader].concat(useLoaders);

  // 生产环境下分离出 CSS 文件
  return extract({ use: useLoaders, fallback: styleLoader });
}

function generateStyleRules(isForVueLoader) {
  var rules = isForVueLoader ? {} : [];

  Object.keys(loaderMapping).forEach(function (ext) {
    isForVueLoader
      ? rules[ext] = generateRules(ext, true)
      : rules.push({ test: new RegExp('\\.' + ext + '$'), use: generateRules(ext) });
  });
  return rules;
}

function generateVueStyleRules(){
  return generateStyleRules(true);
}

// Generate basic style rules
exports.basic = generateStyleRules();
exports.vueLoader = generateVueStyleRules();

exports.basicStyleRuleLoaders = generateStyleRules();
exports.vueStyleRuleLoaders = generateVueStyleRules();
