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
        readButton.addEventListener('click', removeCard);
        card.appendChild(readButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = "remove";
        removeButton.addEventListener('click', removeElement);
        card.appendChild(removeButton);
    })
}
