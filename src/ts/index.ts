import { UiBuilder } from './class/UiBuilder.js';
import { ApiHandler } from './class/ApiHandler.js';
import { ConfigHandler } from './class/ConfigHandler.js';

const ui = new UiBuilder();
const api = new ApiHandler();
const config = new ConfigHandler().getConfig();

ui.display(api.getGithubProfile(config.default_profile.username), await api.getGithubRepos(config.default_profile.username, 1));