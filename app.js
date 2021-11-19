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
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${this.read === true ? 'read' : 'not year read'}`;
}

function getBookFromInput() {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pageCount = document.getElementById('pageCount').value
    const isRead = document.getElementById('isRead').value
    return new Book(title, author, pageCount, isRead);
}

function addBookToLibrary(book) {
    if (!isInLibrary(book)) {
        myLibrary.push(book);
        addBookToDisplay(book);
        // displayLibrary();
    } else {
        alert("Book Already Exists")
    }
}

function addBookToDisplay(bookInfo) {
    const book = document.createElement("div");
    const displayTitle = document.createElement("div");
    const displayAuthor = document.createElement("div");
    const displayPageCount = document.createElement("div");
    const bookBtns = document.createElement("div")
    const displayRead = document.createElement("button");
    const displayDelete = document.createElement("button");

    book.classList.add('book');
    displayTitle.classList.add('bookTitle');
    displayAuthor.classList.add('bookAuthor');
    displayPageCount.classList.add('bookPageCount');
    bookBtns.classList.add('bookBtns');
    displayRead.classList.add('bookReadBtn');
    displayDelete.classList.add('bookDelBtn');


    displayTitle.textContent = bookInfo.title
    displayAuthor.textContent = bookInfo.author
    displayPageCount.textContent = `Page Count: ${bookInfo.numPages}`
    displayRead.textContent = `${bookInfo.read === true ? "Read" : "Not Read"}`;
    displayDelete.textContent = "Delete";

    bookBtns.appendChild(displayDelete);
    bookBtns.appendChild(displayRead);

    book.appendChild(displayTitle);
    book.appendChild(displayAuthor);
    book.appendChild(displayPageCount);
    book.appendChild(bookBtns);

    bookShelf.appendChild(book);
}

function isInLibrary(newBook) {
    return myLibrary.some(book => book.title === newBook.title)
}


const book1 = new Book("Harry Potter", 'JK Rowling', 534, true)
const book2 = new Book("Cat in the Hat", 'Dr. Seuss', 42, true)

addBookToLibrary(book1);
addBookToLibrary(book2);
