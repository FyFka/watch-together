const crypto = require("crypto");

function hashPolyfill() {
  try {
    crypto.createHash("md4");
  } catch (e) {
    console.warn('Crypto "md4" is not supported anymore by this Node version');
    const origCreateHash = crypto.createHash;
    crypto.createHash = (alg, opts) => {
      return origCreateHash(alg === "md4" ? "md5" : alg, opts);
    };
  }
}

export default (config, env, helpers) => {
  hashPolyfill();
  const { plugin } = helpers.getPluginsByName(config, "DefinePlugin")[0];
  if (env.isProd) {
    config.devtool = false;
    plugin.definitions["process.env.PREACT_DEV_API_URL"] = JSON.stringify("");
  } else {
    plugin.definitions["process.env.PREACT_DEV_API_URL"] = JSON.stringify("http://localhost:3000");
  }
};
