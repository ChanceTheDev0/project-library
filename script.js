let myLibrary = [];

function book(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

function addBookToLibrary(name, author, pages, read) {
    const newBook = new book(name, author, pages, read);
    myLibrary.push(newBook);
    displayLibrary();
}

function displayLibrary() {
    const wrapper = document.querySelector('#card-wrapper');
    wrapper.textContent = '';

    myLibrary.forEach((book, index) => {
        const card = document.createElement('div');
        card.setAttribute('id', 'card');
        card.dataset.index = index;
        wrapper.appendChild(card);

        const nameP = document.createElement('p');
        nameP.textContent = book.name;
        card.appendChild(nameP);

        const authorP = document.createElement('p');
        authorP.textContent = book.author;
        card.appendChild(authorP);

        const pagesP = document.createElement('p');
        pagesP.textContent = book.pages + " pages";
        card.appendChild(pagesP);

        const readButton = document.createElement('button');
        readButton.textContent = book.read ? "Read" : "Unread";
        readButton.classList.add(book.read ? "read" : "unread");
        readButton.addEventListener('click', readFunc);
        card.appendChild(readButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.addEventListener('click', removeElement);
        card.appendChild(removeButton);
    })
}


function createBookForm() {
    const formDiv = document.querySelector("#form-con");
    
    const formTag = document.createElement('form');
    formTag.id = "form";
    formTag.name = "form";
    formDiv.appendChild(formTag);
  
    function appendInput(type, id, labelText) {
      const label = document.createElement('label');
      label.htmlFor = id;
      label.textContent = labelText;
      formTag.appendChild(label);
    
      const input = document.createElement('input');
      input.type = type;
      input.id = id;
      input.name = id;
      if (type !== "checkbox") {
        input.required = true;
      };
      formTag.appendChild(input);
  
      const br = document.createElement('br');
      formTag.appendChild(br);
    }
  
    appendInput("text", "new-book-title", "Title:", "Holy Bible");
    appendInput("text", "new-book-author", "Author:", "God");
    appendInput("number", "new-book-pages", "# of pages:", "9999");
    appendInput("checkbox", "new-book-read", "I've read this book");
  
    const submit = document.createElement('button');
    submit.id = 'submit';
    submit.textContent = 'Submit';
    submit.addEventListener('click', handleFormSubmit);
    formTag.appendChild(submit);
  
    const newBookButton = document.querySelector("#new-book");
    newBookButton.removeEventListener('click', createBookForm);
    newBookButton.textContent = "Close Menu";
    newBookButton.id = "close-menu";
  
    const closeMenuButton = document.querySelector('#close-menu');
    closeMenuButton.addEventListener('click', closeMenu);
  }
  
  function closeMenu() {
    const formDiv = document.querySelector("#form-con");
    formDiv.textContent = '';
  
    const closeMenuButton = document.querySelector('#close-menu');
    closeMenuButton.removeEventListener('click', closeMenu);
    closeMenuButton.textContent = "New Book";
    closeMenuButton.id = "new-book";
  
    const newBookButton = document.querySelector("#new-book");
    newBookButton.addEventListener('click', createBookForm);
  }
  
  function handleFormSubmit(event) {
    const form = document.getElementById('form');
    event.preventDefault();
    
    if (!form.checkValidity()) {
      if (!document.querySelector('#msg')) {
        const msg = document.createElement('p')
        msg.textContent = 'Please fill out all fields';
        msg.id = 'msg';
        form.appendChild(msg);
      }
    } else {
      let formData = new FormData(form).entries();
      let title, author, pages, read;
  
      for (let entry of formData) {
        switch (entry[0]) {
          case "new-book-title":
            title = entry[1];
            break;
          case "new-book-author":
            author = entry[1];
            break;
          case "new-book-pages":
            pages = entry[1];
            break;
          case "new-book-read":
            read = true;
        }
      }
  
      if (read !== true) read === false;
  
      addBookToLibrary(title, author, pages, read);
  
      function clearInput(id) {
        const input = document.getElementById(id);
        input.value = '';
      }
  
      clearInput("new-book-title");
      clearInput("new-book-author");
      clearInput("new-book-pages");
  
      if (document.querySelector('#msg')) {
        document.getElementById('msg').remove();
      }
    }
  }
  
  function readFunc(event) {
    const button = event.target;
    const libraryIndex = button.parentElement.dataset.index;
  
    if (button.classList[0] === "read") {
      button.classList.remove("read")
      button.classList.add("unread")
      button.textContent = "Unread"
      myLibrary[libraryIndex].read = false;
    } else {
      button.classList.remove("unread")
      button.classList.add("read")
      button.textContent = "Read"
      myLibrary[libraryIndex].read = true;
    }
  }
  
  function removeElement(event) {
    const button = event.target;
    const libraryIndex = button.parentElement.dataset.index;
  
    myLibrary.splice(libraryIndex, 1);
  
    displayLibrary();
  }
  
  function onload() {
    const newBookButton = document.querySelector('#new-book');
    newBookButton.addEventListener('click', createBookForm);
  
    displayLibrary();
  }
  
  document.addEventListener("DOMContentLoaded", onload);