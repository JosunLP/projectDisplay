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
  public display(profile: Profile, repos: Repository[]) {
    this._root.innerHTML = `
            <h1>All Of My Projects</h1>
            <small>Some useful, some stupid, all fun!</small>
            <section class="intro">
                <div class="user-info"></div>
            </section>

            <section class="repos">
                <input type="text" class="filter-repos hide" placeholder="Search Projects" />
                <ul class="repo-list"></ul>
            </section>
        `;

    const userInfo = <Element>document.querySelector(".user-info");

    userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
            <h2><a href=${profile.blog}><strong>${profile.name}</strong></a></h2>
            <p>${profile.bio}</p>
            <p>
                <strong>Location:</strong> ${profile.location}
            </p>
            <p>
                <strong>@${profile.login} </strong>
                Repos: ${profile.public_repos}
                Gists: ${profile.public_gists}
            </p>
        </div>
        `;

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
      if (repo.language) {
        devIncon = (devicons as any)[repo.language];
      }
      let listItem = document.createElement("li");
      listItem.classList.add("repo");
      listItem.innerHTML = `
            <h3>${repo.name}</h3>
            <span>${repo.description}</span> <br/><br/>
            <span>${devIncon}</span> <br />
            <br />
            <a href=${repo.html_url}>View Project</a>`;
      repoList.append(listItem);
    }
  }

  /**
   * Displays profile
   * @param profile
   */
  private displayProfile(profile: Profile) {
    const userInfo = <Element>document.querySelector(".user-info");
    userInfo.innerHTML = `
            <figure>
                <img alt="user avatar" src=${profile.avatar_url} />
            </figure>
            <div>
                <h2><a href=${profile.blog}><strong>${profile.name}</strong></a></h2>
                <p>${profile.bio}</p>
                <p>
                    <strong>Location:</strong> ${profile.location}
                </p>
                <p>
                    <strong>@${profile.login} </strong>
                    Repos: ${profile.public_repos}
                    Gists: ${profile.public_gists}
                </p>
            </div>
        `;
  }
}
