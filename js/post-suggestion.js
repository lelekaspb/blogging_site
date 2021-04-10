const form = document.querySelector(".post-form");
const pics = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const modal = document.querySelector("#modal");

function randomPics(pics) {
  return pics[Math.floor(Math.random() * pics.length)];
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  console.log(form.elements.name.value);
  console.log(form.elements.title.value);
  console.log(form.elements.content.value);
  form.elements.submit.disabled = true;

  const payload = {
    title: form.elements.title.value,
    username: form.elements.name.value,
    content: form.elements.content.value,
    date: Date.now(),
    picId: randomPics(pics),
  };

  fetch("https://s2t7movies-ca80.restdb.io/rest/posts", {
    method: "POST",
    headers: {
      "x-apikey": "602e3b2b5ad3610fb5bb62ca",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      showModal();
      clearForm();
    })
    .catch((err) => {
      console.error(err);
    });
});

function clearForm() {
  document.querySelector("input[type=submit").disabled = false;
  form.elements.name.value = "";
  form.elements.title.value = "";
  form.elements.content.value = "";
  // document.querySelector("p").classList.toggle("hidden");
}

function showModal() {
  modal.style.display = "block";
  document.querySelector("span.close").addEventListener("click", (e) => {
    e.stopPropagation();
    modal.style.display = "none";
  });
  window.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
