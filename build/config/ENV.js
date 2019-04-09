module.exports = (function() {

  var env = (process.env.NODE_ENV || 'development').trim();

  console.log('[Current environment]', env);

  return {
    __ENV__: env,
    __DEV__: env === 'development',
    __PROD__: env === 'production',
    
    isDevelopement: (env === 'development'),
    current : env
  }
})();
