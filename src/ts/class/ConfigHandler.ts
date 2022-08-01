import { config } from "../types/config";

export class ConfigHandler {

    private _config: config;

    private static instance: ConfigHandler;

    constructor() {
        this.loadConfigFromFile();
    }

    public static getInstance(): ConfigHandler {
        if (!ConfigHandler.instance) {
            ConfigHandler.instance = new ConfigHandler();
        }
        return ConfigHandler.instance;
    }

    public getConfig(): config {
        return this._config;
    }

    private loadConfigFromFile(): void {
        fetch('./config/config.json').then(res => res.json()).then(data => {
            this._config = data;
        });
    }
}