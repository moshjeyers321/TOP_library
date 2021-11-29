let myLibrary = []

const form = document.querySelector('[name="bookInput"]')
const libraryDisplay = document.querySelector('#libraryDisplay')
const bookShelf = document.querySelector('.bookShelf')

form.addEventListener('submit', function (e) {
    console.log(e);
    const book = getBookFromInput();
    addBookToLibrary(book);
    e.preventDefault();
})

function Book(title, author, numPages, read) {
    this.title = title
    this.author = author
    this.numPages = numPages
    this.read = read
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read === true ? 'read' : 'not yet read'}`;
}

function getBookFromInput() {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pageCount = document.getElementById('pageCount').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pageCount, isRead);
}

function addBookToLibrary(book) {
    if (!isInLibrary(book)) {
        addBookToDisplay(book);
        myLibrary.push(book);
        // displayLibrary();
    } else {
        alert("Book Already Exists")
    }
}

function addBookToDisplay(bookInfo) {
    const book = document.createElement("div");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const pageCount = document.createElement("div");
    const bookBtns = document.createElement("div")
    const readBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    book.classList.add('book');
    book.dataset.id = bookInfo.title;
    title.classList.add('bookTitle');
    author.classList.add('bookAuthor');
    pageCount.classList.add('bookPageCount');
    bookBtns.classList.add('bookBtns');
    readBtn.classList.add('bookReadBtn', `${bookInfo.isRead === true ? "read" : "unread"}`, 'bookBtn');
    deleteBtn.classList.add('bookDelBtn', 'bookBtn');

    readBtn.addEventListener('click', () => {
        // console.log(readBtn.parentElement.parentElement)
        toggleRead(book, bookInfo.title);
    })

    deleteBtn.addEventListener('click', () => {
        removeBook(bookInfo.title);
    })

    title.textContent = bookInfo.title
    author.textContent = bookInfo.author
    pageCount.textContent = `Page Count: ${bookInfo.numPages}`
    readBtn.textContent = `${bookInfo.read === true ? "Read" : "Not Read"}`;
    deleteBtn.textContent = "Delete";

    bookBtns.appendChild(readBtn);
    bookBtns.appendChild(deleteBtn);

    book.appendChild(title);
    book.appendChild(author);
    book.appendChild(pageCount);
    book.appendChild(bookBtns);

    bookShelf.appendChild(book);
}

function isInLibrary(newBook) {
    return myLibrary.some(book => book.title === newBook.title)
}

function removeBook(title) {
    myLibrary = myLibrary.filter((book) => book.title !== title);
    const bookToRemove = bookShelf.querySelector(`[data-id = ${CSS.escape(title)}]`)
    console.log(bookToRemove)
    bookShelf.removeChild(bookToRemove);
}

function toggleRead(book, title) {
    const readBtn = book.lastChild.querySelector(".bookReadBtn")
    readBtn.textContent === "Read" ? readBtn.textContent = "Unread" : readBtn.textContent = "Read";
    myLibrary.map(el => {
        if (el.title == title) {
            el.read ? el.read = false : el.read = true;
        }
    })
}

const book1 = new Book("Harry Potter", 'JK Rowling', 534, true)
const book2 = new Book("Cat in the Hat", 'Dr. Seuss', 42, true)

addBookToLibrary(book1);
addBookToLibrary(book2);
