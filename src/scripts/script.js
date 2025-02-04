import { Post } from "./utils/post.js";

let post = new Post();

document.addEventListener("DOMContentLoaded", async () => {
  let output = document.querySelector(".main");
  await post.getPost(output);

  let showCommentsModal = document.querySelectorAll(".show-comments-modal");
  let commentModal = document.querySelector(".comment-modal");

  let showProfileModal = document.querySelectorAll(".show-profile-modal");
  let profileModal = document.querySelector(".profile-modal");

  showCommentsModal.forEach((element) => {
    element.addEventListener("click", async (event) => {
      commentModal.innerHTML = "<p>Carregando...</p>";
      let tag = event.target.closest("section[postId]");
      if (tag) {
        let postId = tag.getAttribute("postId");
        await post.getComments(commentModal, postId);
      }
      commentModal.showModal();
      let exitCommentsModal = document.querySelectorAll(".exit-comments-modal");

      exitCommentsModal.forEach((element) => {
        element.addEventListener("click", () => {
          commentModal.close();
        });
      });
    });
  });

  showProfileModal.forEach((element) => {
    element.addEventListener("click", async (event) => {
      profileModal.innerHTML = "<p>Carregando...</p>";
      let tag = event.target.closest(".author");
      if (tag) {
        let userEmail = tag.innerHTML.trim();
        await post.getUser(profileModal, userEmail);
      }
      profileModal.showModal();

      let exitProfileModal = document.querySelectorAll(".exit-profile-modal");
      exitProfileModal.forEach((element) => {
        element.addEventListener("click", () => {
          profileModal.close();
        });
      });
    });
  });
});
