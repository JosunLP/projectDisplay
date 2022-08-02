import { Configuration } from "../config/configuration.js";

/**
 * Config handler
 * @class ConfigHandler
 */
export class ConfigHandler {
  /**
   * Config  of config handler
   */
  private _config: Configuration;

  /**
   * Instance  of config handler
   */
  private static instance: ConfigHandler;

  /**
   * Creates an instance of config handler.
   */
  constructor() {
    this._config = new Configuration();
  }

  /**
   * Gets instance
   * @returns instance
   */
  public static getInstance(): ConfigHandler {
    if (!ConfigHandler.instance) {
      ConfigHandler.instance = new ConfigHandler();
    }
    return ConfigHandler.instance;
  }

  /**
   * Gets config
   * @returns config
   */
  public getConfig(): Configuration {
    return this._config;
  }
}
