import { UiBuilder } from "./class/UiBuilder.js";
import { ApiHandler } from "./class/ApiHandler.js";
import { ConfigHandler } from "./class/ConfigHandler.js";
import { EventHandlerCustom } from "./class/EventHandler.js";

async function main() {
  const ui = new UiBuilder();
  const api = new ApiHandler();
  const config = new ConfigHandler().getConfig();
  document.title = config.default_profile.username + "'s Projects";
  ui.display(
    await api.getGithubProfile(config.default_profile.username),
    await api.getGithubRepos(config.default_profile.username)
  );
  EventHandlerCustom.getInstance();
}

main();
