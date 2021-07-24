const MODELS_BASE_PATH = "../../models/";
const CONFIG_BASE_PATH = "../../config/";
const path = require("path");

function SchemaPath(schemaName) {
  return path.join(MODELS_BASE_PATH, schemaName);
}

function ConfigPath(configFile) {
  return path.join(CONFIG_BASE_PATH, configFile);
}

module.exports = { SchemaPath, ConfigPath };
