import { ConfigHandler } from "./ConfigHandler.js";
import { placeHolderPair } from "../types/placeholder.js";
import { config } from "../types/config.js";
import { Repository } from "../types/repository.js";

/**
 * Api handler
 */
export class ApiHandler {
  /**
   * Config of api handler
   */
  private _config: config;

  /**
   * Creates an instance of api handler.
   */
  constructor() {
    const ch = new ConfigHandler();
    this._config = ch.getConfig();
  }

  /**
   * Gets github profile
   * @param username
   * @returns github profile
   */
  public async getGithubProfile(username: string): Promise<any> {
    const apiKey = this.replacePlaceholders(
      this._config.github_profile_api.url,
      [{ placeHolder: "{username}", replacement: username }]
    );
    return await fetch(apiKey).then((res) => res.json());
  }

  /**
   * Gets github repos
   * @param username
   * @returns github repos
   */
  public async getGithubRepos(username: string): Promise<any[]> {
    let repos: Repository[] = [];
    for (let i = 1; i <= this._config.default_profile.maxPages; i++) {
      const apiKey = this.replacePlaceholders(
        this._config.github_repos_api.url,
        [
          { placeHolder: "{username}", replacement: username },
          { placeHolder: "{page}", replacement: i.toString() },
        ]
      );
      let data = await fetch(apiKey).then((res) => res.json());
      repos = repos.concat(data);

      repos.sort((a, b) => b.forks_count - a.forks_count);
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }
    return repos;
  }

  /**
   * Replaces placeholders
   * @param str
   * @param pairs
   * @returns placeholders
   */
  private replacePlaceholders(str: string, pairs: placeHolderPair[]): string {
    pairs.forEach((pair) => {
      str = str.replaceAll(pair.placeHolder, pair.replacement);
    });
    return str;
  }
}
