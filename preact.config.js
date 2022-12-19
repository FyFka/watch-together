export default (config, env, helpers) => {
  const { plugin } = helpers.getPluginsByName(config, "DefinePlugin")[0];
  if (env.isProd) {
    config.devtool = false;
    plugin.definitions["process.env.PREACT_DEV_API_URL"] = JSON.stringify("");
  } else {
    plugin.definitions["process.env.PREACT_DEV_API_URL"] = JSON.stringify("http://localhost:3000");
  }
};
