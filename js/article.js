const searchParams = new URLSearchParams(window.location.search);
const articleId = searchParams.get("article");
console.log(articleId);
const commentsTemplate = document.querySelector("template.comment-template")
  .content;

fetch(
  "https://s2t7movies-ca80.restdb.io/rest/posts/" +
    articleId +
    "?fetchchildren=true&max=1",
  {
    method: "GET",
    headers: {
      "x-apikey": "602e3b2b5ad3610fb5bb62ca",
      "Content-Type": "application/json",
    },
  }
)
  .then((res) => res.json())
  .then((response) => {
    showPost(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(data) {
  console.log(data);
  document.querySelector(".post h1").textContent = data.title;
  document.querySelector(".left span.post-author").textContent = data.username;
  document.querySelector(".post span.post-author").textContent = data.username;
  document.querySelector("p.post-content").textContent = data.content;
  const picId = data.picId;
  document.querySelector("#avatar").src = `images/svg/${picId}.svg`;
  document.querySelector("#avatar").alt = data.username;
  document.querySelector("#avatar-mobile").src = `images/svg/${picId}.svg`;
  document.querySelector("#avatar-mobile").alt = data.username;
  const dateJS =
    new Date(data.date).toLocaleDateString("en-GB") +
    " " +
    new Date(data.date).toLocaleTimeString("it-IT");
  console.log(dateJS);
  document.querySelector("p.post-date").textContent = dateJS;
  if (data.comments.length > 0) {
    // data.comments.sort((a, b) => {
    //   return new Date(b.date) - new Date(a.date);
    // });
    console.log(data.comments);
    //console.log(commentsTemplate);
    //console.log(data.comments.length);
    data.comments.forEach((comment) => {
      showComment(comment);
    });
  } else {
    document.querySelector("section.no-comments").classList.remove("hidden");
    document.querySelector("section.comments").classList.add("hidden");
  }
}

const commentForm = document.querySelector(".comment-form");

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  console.log(commentForm.elements.username.value);
  console.log(commentForm.elements.email.value);
  console.log(commentForm.elements.content.value);
  commentForm.elements.submit.disabled = true;

  const payload = {
    email: commentForm.elements.email.value,
    username: commentForm.elements.username.value,
    content: commentForm.elements.content.value,
    date: Date.now(),
  };

  fetch(
    "https://s2t7movies-ca80.restdb.io/rest/posts/" + articleId + "/comments",
    {
      method: "POST",
      headers: {
        "x-apikey": "602e3b2b5ad3610fb5bb62ca",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      clearForm();
      showComment(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

function clearForm() {
  commentForm.elements.submit.disabled = false;
  commentForm.elements.email.value = "";
  commentForm.elements.username.value = "";
  commentForm.elements.content.value = "";
}

function showComment(comment) {
  const commentsClone = commentsTemplate.cloneNode(true);
  commentsClone.querySelector("h4").textContent = comment.username;
  commentsClone.querySelector("p.comment").textContent = comment.content;
  const dateJS =
    new Date(comment.date).toLocaleDateString("en-GB") +
    " " +
    new Date(comment.date).toLocaleTimeString("it-IT");
  commentsClone.querySelector("p.comment-date").textContent = dateJS;
  document.querySelector("section.comments").prepend(commentsClone);
  document.querySelector("section.comments").classList.remove("hidden");
  document.querySelector("section.no-comments").classList.add("hidden");
}
