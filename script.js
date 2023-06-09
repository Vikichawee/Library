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
// for (let i = 0; i < 30; i++) {
//   myLibrary.push(book);
// }

let submitButton = document.querySelector(`.submitButton`);
submitButton.addEventListener(`click`, addBookToLibrary);

let addButton = document.querySelector(`.showFormButton`);
addButton.addEventListener(`click`, showForm);

let showFormButton = document.querySelector(".showFormButton");
let bookForm = document.querySelector(".bookForm");

let container = document.querySelector(`.container`);

showFormButton.addEventListener("click", () => {
  bookForm.style.display = "grid";
  setTimeout(() => {
    bookForm.classList.add("show");
  }, 100);
  document.body.style.overflow = "hidden";

  container.classList.add(`blur`);
});

function showForm() {
  window.addEventListener("click", function (e) {
    if (!bookForm.contains(e.target) && e.target != showFormButton) {
      bookForm.style.display = "none";
      bookForm.classList.remove(`show`);
      document.body.style.overflow = "auto";

      container.classList.remove(`blur`);
    }
  });

  resetForm();
}

function addBookToLibrary(e) {
  e.preventDefault();
  let title = document.querySelector(`#title`).value;
  let author = document.querySelector(`#author`).value;
  let pages = document.querySelector(`#pages`).value;
  let readCheckbox = document.querySelector(`#read`);
  let readValue = readCheckbox.checked ? "Read" : "Not Read";
  let titleExists = myLibrary.some((book) => book.title === title);
  if (title.trim() === "") {
    alert("Title cannot be empty or only contain spaces");
    return;
  }
  if (author.trim() === "") {
    alert("Author cannot be empty or only contain spaces");
    return;
  }
  if (titleExists) {
    alert("Book with same title already exists in library!");
    return;
  }
  let book = new Book(title, author, pages, readValue);
  myLibrary.push(book);
  let bookForm = document.querySelector(".bookForm");
  bookForm.style.display = "none";
  bookForm.classList.remove(`show`);
  document.body.style.overflow = "auto";
  container.classList.remove(`blur`);

  resetForm();
  displayBooks();
}

function resetForm() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;
}

function displayBooks() {
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
    if (readDiv.textContent == `Read`) {
      readDiv.style.backgroundColor = "#D3FF5C";
    } else {
      readDiv.style.backgroundColor = "#F15558";
    }
    readDiv.addEventListener(`click`, () => {
      if (readDiv.textContent == `Read`) {
        readDiv.textContent = `Not Read`;
        readDiv.style.backgroundColor = "#F15558";
        book.read = `Not Read`;
        return;
      }
      if (readDiv.textContent == `Not Read`) {
        readDiv.textContent = `Read`;
        readDiv.style.backgroundColor = "#D3FF5C";
        book.read = `Read`;
        return;
      }
    });
    let delButton = document.createElement("button");
    delButton.className = `delButton`;
    delButton.textContent = `X`;
    delButton.addEventListener(`click`, deleteCard);
    let pagesCount = document.createElement("div");
    pagesCount.className = `pagesText`;
    pagesCount.textContent = `Pages:`;

    div.appendChild(titleDiv);
    div.appendChild(authorDiv);
    div.appendChild(pagesCount);
    div.appendChild(pagesDiv);
    div.appendChild(readDiv);
    div.appendChild(delButton);

    container.appendChild(div);
  }
}

function deleteCard(e) {
  let delButton = e.target;
  let container = document.querySelector(`.container`);
  let cardContainer = delButton.closest(".cardContainer");
  container.removeChild(cardContainer);
  let title = cardContainer.querySelector(".title").textContent;
  myLibrary = myLibrary.filter((book) => book.title != title);
}
