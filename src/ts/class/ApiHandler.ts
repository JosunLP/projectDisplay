import { ConfigHandler } from "./ConfigHandler.js";
import { placeHolderPair } from "../types/placeholder.js";

export class ApiHandler {
    
    private _config: object;

    constructor() {
        const ch = new ConfigHandler;
        this._config = ch.getConfig();
    }

    public getGithubProfile(username: string): Promise<Object> {
        const apiKey = this.replacePlaceholders(this._config['github_profile_api']['api_key'], [{ placeHolder: '{username}', replacement: username }]);
        return fetch(apiKey);
    }

    public getGithubRepos(username: string, page: number): Promise<any[]> {
        const apiKey = this.replacePlaceholders(this._config['github_repos_api']['api_key'], [{ placeHolder: '{username}', replacement: username }, { placeHolder: '{page}', replacement: page.toString() }]);
        return fetch(apiKey).then(res => res.json());
    }

    private replacePlaceholders(str: string, pairs: placeHolderPair[]): string {
        pairs.forEach(pair => {
            str.replace(pair.placeHolder, pair.replacement);
        });
        return str;
    }
}