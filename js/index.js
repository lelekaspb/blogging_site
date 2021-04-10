let url = `https://s2t7movies-ca80.restdb.io/rest/posts?q={"approved":true}&sort=date&dir=-1&max=5`;

function getData() {
  fetch(url, {
    method: "GET",
    headers: {
      "x-apikey": "602e3b2b5ad3610fb5bb62ca",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      showPosts(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

getData();

function showPosts(posts) {
  console.log(posts);
  //grab the template
  const myTemplate = document.querySelector("template.post-template").content;

  posts.forEach((element) => {
    //clone
    const myClone = myTemplate.cloneNode(true);

    //populate it
    myClone.querySelector("h3").textContent = element.title;
    myClone.querySelector("span.post-author").textContent = element.username;
    console.log(element.username);
    const dateJS =
      new Date(element.date).toLocaleDateString("en-GB") +
      " " +
      new Date(element.date).toLocaleTimeString("it-IT");
    myClone.querySelector("span.post-date").textContent = dateJS;
    myClone.querySelector("a").href = `article.html?article=${element._id}`;

    //append
    document.querySelector(".posts").appendChild(myClone);
  });
}

document.querySelector(".all-posts").addEventListener("click", (e) => {
  e.preventDefault();
  url = `https://s2t7movies-ca80.restdb.io/rest/posts?q={"approved":true}&sort=date&dir=-1&skip=5`;
  getData();
  document.querySelector(".all-posts").classList.toggle("hidden");
});
