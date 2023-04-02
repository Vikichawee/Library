function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return console.log(`${title}, ${author}, ${pages}, ${read}`);
  };
}

let myLibrary = [];
let book = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  pages: 218,
  read: true,
};
myLibrary.push(book);

let submitButton = document.querySelector(`.submitButton`);
submitButton.addEventListener(`click`, addBookToLibrary);

let addButton = document.querySelector(`.showFormButton`);
addButton.addEventListener(`click`, showForm);

let displayButton = document.querySelector(`.displayButton`);
displayButton.addEventListener(`click`, displayBooks);

function showForm() {
  let showFormButton = document.querySelector(".showFormButton");
  let bookForm = document.querySelector(".bookForm");

  showFormButton.addEventListener("click", () => {
    bookForm.style.display = "grid";
  });
}

function addBookToLibrary(e) {
  let title = document.querySelector(`#title`).value;
  let author = document.querySelector(`#author`).value;
  let pages = document.querySelector(`#pages`).value;
  let readValue = document.querySelector(`#read`).value;
  let read = ` `;
  if (readValue == `on`) {
    read = `Yes`;
  } else {
    read = `No`;
  }
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
  let bookForm = document.querySelector(".bookForm");
  bookForm.style.display = "none";
  resetForm();
  e.preventDefault();
}

function resetForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;
}

function displayBooks() {
  let container = document.querySelector(`.container`);
  document.querySelectorAll(".cardContainer").forEach((el) => el.remove());
  for (const book of myLibrary) {
    let div = document.createElement("div");
    div.className = `cardContainer`;
    let title = book.title;
    let author = book.author;
    let pages = book.pages;
    let read = book.read;
    let titleDiv = document.createElement("div");
    titleDiv.className = `title`;
    titleDiv.textContent = title;
    let authorDiv = document.createElement("div");
    authorDiv.className = `author`;
    authorDiv.textContent = author;
    let pagesDiv = document.createElement("div");
    pagesDiv.className = `pages`;
    pagesDiv.textContent = pages;
    let readDiv = document.createElement("div");
    readDiv.className = `read`;
    readDiv.textContent = read;

    div.appendChild(titleDiv);
    div.appendChild(authorDiv);
    div.appendChild(pagesDiv);
    div.appendChild(readDiv);
    container.appendChild(div);
  }
}
