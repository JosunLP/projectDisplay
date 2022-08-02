export type config = {
  default_profile: {
    username: string;
    maxPages: number;
  };
  github_profile_api: {
    url: string;
    headers: {
      Accept: string;
    };
  };
  github_repos_api: {
    url: string;
    headers: {
      Accept: string;
    };
  };
};
