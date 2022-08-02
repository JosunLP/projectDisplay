import { config } from "../types/config.js";

/**
 * Configuration
 */
export class Configuration implements config {
  /**
   * Default profile of configuration
   */
  public readonly default_profile = {
    username: "JosunLP",
    maxPages: 2,
  };

  /**
   * Github profile api of configuration
   */
  public readonly github_profile_api = {
    url: "https://api.github.com/users/{username}",
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  };

  /**
   * Github repos api of configuration
   */
  public readonly github_repos_api = {
    url: "https://api.github.com/users/{username}/repos?sort=pushed&per_page=100&page={page}",
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  };
}
