class Post {
  async fetchAPI(url) {
    try {
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
      }

      return await response.json();
    } catch (e) {
      console.log("Error:", e);
    }
  }

  async getComments(output, postId) {
    let post = await this.getPostById(postId);
    let user = await this.fetchUser(post.userId);
    let comments = await this.fetchComments(postId);

    let commentOutput = "";
    for (let comment of comments) {
      commentOutput += `
        <div class="post-comments">
          <div class="post-comments-item" userId=${comment.id}>
            <p class="comment-author show-profile-modal">
              ${comment.email}
            </p>
            <p class="comment-body">${comment.body}</p>
          </div>
        </div>
      `;
    }
    output.innerHTML = `
      <header class="post-header" postId="${postId}">
        <a class="exit-comments-modal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="var(--text)"
          >
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            />
          </svg>
          Fechar
        </a>
        <a class="show-profile-modal">${user.email}</a>
        <h2>${post.title}</h2>
      </header>
      <main class="post-main">
        <p>${post.body}</p>
        <p class="hashtags">
          <strong>#lorem #ipsum #dolor</strong>
        </p>
      </main>
      <footer class="post-footer">
        ${commentOutput}
      </footer>
    `;
  }

  async fetchComments(postId) {
    let url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
    let response = await this.fetchAPI(url);
    return response;
  }

  async searchUser(email) {
    let url = `https://jsonplaceholder.typicode.com/users/`;
    let response = await this.fetchAPI(url);
    console.log(response)

    for (let user of response) {
      if (user.email == email) {
        return user.id;
      }
    }
  }

  async getUser(output, email) {
    let userId = await this.searchUser(email);
    console.log(userId)
    let user = await this.fetchUser(userId);
    output.innerHTML = `
    <header class="profile-header">
      <a class="exit-profile-modal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="var(--text)"
        >
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
          />
        </svg>
        Fechar
      </a>
      <h2 class="profile-name">${user.name}</h2>
      <p class="profiphonele-email">${user.email}</p>

      <h3 class="profile-info-title">Informações</h3>

      <ul class="profile-info-list">
        <li><strong>Email: </strong>${user.email}</li>
        <li><strong>Telefone: </strong>${user.phone}</li>
        <li><strong>Cidade: </strong>${user.city}</li>
        <li>
          <strong>Website: </strong
          ><a class="profile-info-website" href="https://${user.website}">${user.website}</a>
        </li>
      </ul>
      </header>
    `;
  }

  async fetchUser(userId) {
    let url = `https://jsonplaceholder.typicode.com/users/${userId}`;

    let response = await this.fetchAPI(url);
    return {
      id: response.id,
      name: response.name,
      username: response.username,
      phone: response.phone,
      email: response.email,
      city: response.address.city,
      website: response.website,
    };
  }

  async getPostById(id) {
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    let response = await this.fetchAPI(url);
    return response;
  }

  async getPost(output) {
    let url = `https://jsonplaceholder.typicode.com/posts/`;

    let response = await this.fetchAPI(url);

    output.innerHTML = "";
    for (let result of response) {
      output.innerHTML += `
      <section class="post" postId="${result.id}">
          <header class="post-header">
            <span class="show-profile-modal author">
              ${(await this.fetchUser(result.userId)).email}
            </span>
            <h2>${result.title}</h2>
          </header>
          <main class="post-main">
            <p>${result.body}</p>
            <p class="hashtags">
              <strong>#lorem #ipsum #dolor</strong>
            </p>
          </main>
          <footer class="post-footer">
            <a class="show-comments-modal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="var(--text)"
              >
                <path
                  d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"
                />
              </svg>
              Ver comentários
            </a>
          </footer>
        </section>
      `;
    }
  }
}

let post = new Post();

document.addEventListener("DOMContentLoaded", async () => {
  let output = document.querySelector(".main");
  await post.getPost(output);

  let showCommentsModal = document.querySelectorAll(".show-comments-modal");
  let commentModal = document.querySelector(".comment-modal");

  let showProfileModal = document.querySelectorAll(".show-profile-modal");
  let profileModal = document.querySelector(".profile-modal");


  showCommentsModal.forEach((element) => {
    element.addEventListener("click", (event) => {
      commentModal.innerHTML = "<p>Carregando...</p>";
      let tag = event.target.closest("section[postId]");
      if (tag) {
        let postId = tag.getAttribute("postId");
        post.getComments(commentModal, postId);
      }
      commentModal.showModal();
      setTimeout(() => {
        let exitCommentsModal = document.querySelectorAll(
          ".exit-comments-modal"
        );

        exitCommentsModal.forEach((element) => {
          element.addEventListener("click", () => {
            commentModal.close();
          });
        });
      }, 100);
    });
  });

  showProfileModal.forEach((element) => {
    element.addEventListener("click", (event) => {
      profileModal.innerHTML = "<p>Carregando...</p>";
      let tag = event.target.closest(".author");
      if (tag) {
        let userEmail = tag.innerHTML.trim();
        post.getUser(profileModal, userEmail);
      }
      profileModal.showModal();

      setTimeout(() => {
        let exitProfileModal = document.querySelectorAll(".exit-profile-modal");
        exitProfileModal.forEach((element) => {
          element.addEventListener("click", () => {
            profileModal.close();
          });
        });
      }, 100);
    });
  });
});

let themeSwitcher = document.querySelector("#themeSwitcher");
themeSwitcher.addEventListener("click", () => {
  if (document.querySelector("html").className == "default-mode") {
    document.querySelector("html").className = "alternative-mode";
  } else {
    document.querySelector("html").className = "default-mode";
  }
});
