class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  
  
}

let myLibrary = [];
const bookGrid = document.querySelector('.book-grid');
const odyssey = new Book("The Odyssey", "Homer", 300, true);
const secretHistory = new Book("The Secret History", "Donna Tartt", 300, false);
let removeButtons = document.querySelectorAll('.remove-button');
let toggleReadButtons = document.querySelectorAll('.read-toggle');



addBookToLibrary(odyssey);
addBookToLibrary(secretHistory);


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function displayNewBook(book, index) {
    
    let newBook = document.createElement("div");
    newBook.dataset.index = index;
    bookGrid.appendChild(newBook);
    newBook.classList.add('book-card');
    let titleName = document.createElement("p");
    newBook.appendChild(titleName);
    titleName.textContent = book.title;
    let authorName = document.createElement("p");
    newBook.appendChild(authorName);
    authorName.textContent = book.author;
    let numOfPages = document.createElement("p");
    newBook.appendChild(numOfPages);
    numOfPages.textContent = book.pages;
    let readOrNot = document.createElement("button");
    readOrNot.classList.add('read-toggle');
    if (book.read) {
      readOrNot.textContent='Read';
    } else {
      readOrNot.textContent='Not yet read'
    }
    newBook.appendChild(readOrNot);
    let removeButton = document.createElement('button');
    newBook.appendChild(removeButton);
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButtons = document.querySelectorAll('.remove-button');
    toggleReadButtons = document.querySelectorAll('.read-toggle');
  };



function displayBooks() {
  removeAllChildNodes(bookGrid);
  myLibrary.forEach(displayNewBook);
  removeButtons.forEach(removeBook);
  toggleReadButtons.forEach(toggleRead);
}

function addBookToLibrary(input) {
  myLibrary.push(input);
  displayBooks();
}






const addBookBtn = document.querySelector('.add-book');
const dialog = document.querySelector('dialog');
const closeDialogBtn = document.querySelector('.close-dialog-btn')


const form = document.querySelector('.book-form');
const bookFormSubmit = document.querySelector('.book-form-submit')


bookFormSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  // realized that need to call variable.value instead of using .value in variable!!!
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const numOfPages = document.querySelector('#num-of-pages');
  const read = document.querySelector('#read');

  if(title.validity.valueMissing) {
    title.setCustomValidity("Enter a title!!!")
    title.reportValidity();
  } else if(author.validity.valueMissing) {
    author.setCustomValidity("Enter the name of the author!!!")
    author.reportValidity()
  } else if (numOfPages.validity.valueMissing){
    numOfPages.setCustomValidity("Enter the number of pages!!!")
    numOfPages.reportValidity()
  } else if (numOfPages.validity.typeMismatch){
    numOfPages.setCustomValidity('No letter, only numbers!')
    numOfPages.reportValidity()
  }
    else {

    let newBook = new Book(title.value, author.value, numOfPages.value, read.checked);
    addBookToLibrary(newBook);
    author.value = '';
    title.value='';
    numOfPages.value='';
    read.value='';
    dialog.close();
  }
  
  
  
})




addBookBtn.addEventListener("click", () => {
  dialog.showModal();
})

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
})


function removeBook(button, index) {
  
  button.addEventListener('click', () => {
    if (myLibrary.length === 1) {
      myLibrary = [];
      removeAllChildNodes(bookGrid);
    } else {
      myLibrary.splice(index, 1);
      displayBooks();
    }
    
    
  })
}

function toggleRead(button, index) {
  button.addEventListener('click', () => {
    if(myLibrary[index].read) {
      myLibrary[index].read = false;
      displayBooks();
    } else {
      myLibrary[index].read = true;
      displayBooks();
    }
  })
}
