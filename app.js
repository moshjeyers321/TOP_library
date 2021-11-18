let myLibrary = []

const form = document.querySelector('[name="bookInput"]')
const libraryDisplay = document.querySelector('#libraryDisplay')

form.addEventListener('submit', function (e) {
    console.log(e);
    addBookToLibrary(getBookFromInput());
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
    if (!isInLibrary(book)) myLibrary.push(book);
    displayLibrary();
}

function isInLibrary(newBook) {
    return myLibrary.some(book => book.title === newBook.title)
}

function displayLibrary() {
    while (libraryDisplay.firstChild) {
        libraryDisplay.removeChild(libraryDisplay.lastChild)
    }

    myLibrary.forEach(book => {
        const newBook = document.createElement('li')
        newBook.textContent = `${book.title} by ${book.author}`
        libraryDisplay.appendChild(newBook)
    });
}

const book1 = new Book("Harry Potter", 'JK Rowling', 534, true)
const book2 = new Book("Cat in the Hat", 'Dr. Seuss', 42, true)

addBookToLibrary(book1);
addBookToLibrary(book2);
