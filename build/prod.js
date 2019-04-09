const fs = require('fs-extra');
const webpack = require('webpack');
const gulp = require('./gulpfile');
const Path = require('./config/PATHS');
const config = require('./webpack.prod.conf');

fs.emptyDirSync(Path.DIST); // 清空 build 目录
fs.copySync(Path.STATIC, Path.DIST.join('static')); // 复制高度静态资源

webpack(config, function(err, stats) {
  // show build info to console
  console.log(stats.toString({ chunks: false, color: true }));

  // save build info to file
  // fs.writeFile(
  //   PATHS.DIST.join('__build_info__'),
  //   stats.toString({ color: false })
  // );

  // bundle plugins
  gulp.start('default');
});
