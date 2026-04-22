const myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robinson Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    render();
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = Number(pagesInput.value);
  const isRead = checkInput.checked;
  if (!title || !author || pagesInput.value.trim() === "" ) {
    alert("Please fill all fields!");
    return;
  } 
  if (Number.isNaN(pages) || pages <= 0) {
    alert("Please enter a valid number of pages!");
    return;
  }
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function showMessage(text) {
  const msg = document.getElementById("message");
  msg.innerText = text;

  setTimeout(() => {
    msg.innerText = "";
  }, 2000);
}

function render() {
  const table = document.getElementById("display");

  table.innerHTML = table.rows[0].outerHTML;
  myLibrary.forEach((book, index) => {
    const row = table.insertRow();

    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    titleCell.innerText = book.title;
    authorCell.innerText = book.author;
    pagesCell.innerText = book.pages;
  
  //delete old table
  //insert updated row and cells
  

    //add and wait for action for read/unread button
    const toggleReadButton = document.createElement("button");
    toggleReadButton.className = "btn btn-success";
    toggleReadButton.innerText = book.check ? "Yes" : "No";

    toggleReadButton.addEventListener("click", () => {
      book.check = !book.check;
      render();
    });

    wasReadCell.appendChild(toggleReadButton);

    //add delete button to every row and render again
   const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-warning";
    deleteButton.innerText = "Delete";

    deleteButton.addEventListener("click", () => {
      showMessage(`Book "${book.title}" deleted!`);
      myLibrary.splice(index, 1);
      render();
    });

    deleteCell.appendChild(deleteButton);
  });
}

