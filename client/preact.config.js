export default (config, env) => {
  if (env.isProd) {
    config.devtool = false;
  }
};
