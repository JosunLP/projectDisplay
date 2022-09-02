import { Configuration } from "../config/configuration.js";
import { devicons } from "../constants/devicons.js";
import { Profile } from "../types/profile.js";
import { Repository } from "../types/repository.js";

/**
 * Ui builder
 */
export class UiBuilder {
  /**
   * Root  of ui builder
   */
  private _root: HTMLDivElement;

  private _config: Configuration = new Configuration();

  /**
   * Creates an instance of ui builder.
   */
  constructor() {
    this._root = document.getElementById("container") as HTMLDivElement;
  }

  /**
   * Displays ui builder
   * @param profile
   * @param repos
   */
  public async display(profile: Profile, repos: Repository[]) {
    const rootH1 = document.createElement("h1");
    rootH1.innerHTML = `All Of My Projects`;
    this._root.append(rootH1);

    const rootSmall = document.createElement("small");
    rootSmall.innerHTML = `Some useful, some stupid, all fun!`;
    this._root.append(rootSmall);

    const rootSection = document.createElement("section");
    rootSection.classList.add("intro");
    const sectionDiv = document.createElement("div");
    sectionDiv.classList.add("user-info");
    rootSection.append(sectionDiv);
    this._root.append(rootSection);

    const rootSection2 = document.createElement("section");
    rootSection2.classList.add("repos");
    const input = document.createElement("input");
    input.classList.add("filter-repos");
    input.classList.add("hide");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Search Projects");
    rootSection2.append(input);
    const repoList = document.createElement("ul");
    repoList.classList.add("repo-list");
    rootSection2.append(repoList);
    this._root.append(rootSection2);

    this.displayProfile(profile);
    this.displayRepos(repos);
  }

  /**
   * Displays repos
   * @param repos
   */
  private displayRepos(repos: Repository[]) {
    const filterInput: Element = <Element>(
      document.querySelector(".filter-repos")
    );
    const repoList: Element = <Element>document.querySelector(".repo-list");

    filterInput.classList.remove("hide");
    for (const repo of repos) {
      let devIncon = "";
      const userHome = `https://github.com/${repo.owner.login}`;
      if (repo.language) {
        devIncon = (devicons as any)[repo.language];
      }
      
      if (repo.fork && this._config.default_profile.hideForks) {
        continue;
      }

      const langUrl = `${userHome}?tab=repositories&q=&language=${repo.language}`;
      const starsUrl = `${userHome}/${repo.name}/stargazers`;
      const forksUrl = `${userHome}/${repo.name}/network/members`;

      let listItem = document.createElement("li");
      listItem.classList.add("repo");
      listItem.innerHTML = `
            <h3>${repo.name}</h3>
            <span>${repo.description}</span> <br/><br/>`;

      if (repo.stargazers_count > 0) {
        listItem.innerHTML += `<a href="${starsUrl}">
            <span>⭐ ${repo.stargazers_count}</span></a>
            `;
      }

      if (repo.language) {
        listItem.innerHTML += `<a href="${langUrl}">
            <span>${devIncon}</span></a>`;
      }

      if (repo.forks_count > 0) {
        listItem.innerHTML += `<a href="${starsUrl}">
            <span>${devicons.Git} ${repo.forks_count}</span></a>`;
      }

      if (repo.homepage && repo.homepage !== "") {
        listItem.innerHTML += `<br /> <br />
            <a class="link-btn" href=${repo.html_url}>Code ${devicons.Github}</a>
            <a class="link-btn" href=${repo.homepage}>Live ${devicons.Chrome}</a> <br />`;
      } else {
        listItem.innerHTML += `<br /> <br />
            <a class="link-btn" href=${repo.html_url}>View Project ${devicons.Github}</a><br />`;
      }

      repoList.append(listItem);
    }
  }

  /**
   * Displays profile
   * @param profile
   */
  private displayProfile(profile: Profile) {
    const userInfo = <Element>document.querySelector(".user-info");
    const figure2 = document.createElement("figure");
    const userImg = document.createElement("img");
    userImg.setAttribute("alt", "user avatar");
    userImg.setAttribute("src", profile.avatar_url);
    figure2.append(userImg);
    userInfo.append(figure2);

    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const a = document.createElement("a");
    a.setAttribute("href", "https://" + profile.blog);
    a.setAttribute("target", "_blank");
    a.innerHTML = `<strong>${profile.name}</strong>`;
    h2.append(a);
    div.append(h2);
    const p = document.createElement("p");
    p.innerHTML = profile.bio;
    div.append(p);
    const p2 = document.createElement("p");
    const strong = document.createElement("strong");
    strong.innerHTML = "Location:";
    p2.append(strong);
    p2.innerHTML += profile.location;
    div.append(p2);
    const p3 = document.createElement("p");
    const strong2 = document.createElement("strong");
    strong2.innerHTML = "@" + profile.login;
    p3.append(strong2);
    p3.innerHTML += " Repos: " + profile.public_repos;
    p3.innerHTML += " Gists: " + profile.public_gists;
    div.append(p3);
    userInfo.append(div);
  }
}
