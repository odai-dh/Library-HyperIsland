const ADD_BOOK_BTN = document.querySelector('#addBookBtn');
const SUBMIT_BTN = document.querySelector('#submitBtn');
const CLOSE_BTN = document.querySelector('#closeBtn');
const FORM = document.querySelector('#toggleForm');
const myLibrary = [];

function showForm() {
    FORM.classList.remove('d-none');
    document.querySelector('body').classList.add('overflow-hidden');
}

function hideForm() {
    FORM.classList.add('d-none');
    document.querySelector('body').classList.remove('overflow-hidden');
}

function getFormValues(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    return formProps
}

// function Book(bookName, bookAuthor, bookPages, bookIsRead) {
//     this.bookName = bookName;
//     this.bookAuthor = bookAuthor;
//     this.bookPages = bookPages;
//     this.bookIsRead = bookIsRead;
// }
  
class Book {
    constructor(bookName, bookAuthor, bookPages, bookPageRead, bookIsRead) {
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookPages = bookPages;
        this.bookPageRead = bookPageRead;
        this.bookIsRead = bookIsRead;
    }
}

function addBookToLibrary(e) {
    const bookInfos = getFormValues(e);
    const book = new Book(bookInfos.bookName, bookInfos.bookAuthor, bookInfos.bookPages, bookInfos.bookPageRead, bookInfos.bookIsRead)
    myLibrary.push(book);
}


function printBooksScreen(e) {
    addBookToLibrary(e);
    let arrayLastEl = myLibrary[myLibrary.length - 1];

    if (!arrayLastEl) {
        console.error("Failed to add the book to the library.");
        return;
    }

    const bookContainer = document.querySelector('.book-container');
    if (!bookContainer) {
        console.error("Book container not found.");
        return;
    }

    bookContainer.innerHTML += `
    <div class="book" data-index="${myLibrary.length - 1}">
        <h2 class="book-title">${arrayLastEl.bookName}</h2>
        <div>
            <h4 class="book-author">Writer By: <span>${arrayLastEl.bookAuthor}</span></h4>
            <h4 class="book-pages">Number of Pages: <span>${arrayLastEl.bookPages}</span></h4>
            <h4 class="book-page-read">Number of Pages Read: <span>${arrayLastEl.bookPageRead}</span></h4>
            <h4 class="book-isRead">${arrayLastEl.bookIsRead ? 'Read' : 'Not Read'}</h4>
            <button class="delete-book" onclick="deleteBook(${myLibrary.length - 1})">Delete</button>
            <button class="edit-book" onclick="editBook(${myLibrary.length - 1})">Edit</button>
        </div>
    </div>
`;
}
function deleteBook(index) {
    myLibrary.splice(index, 1);

    updateBooksDisplay();
}


function editBook(index) {
    let bookToEdit = myLibrary[index];

    // Prompt user for the number of pages they have read
    let newbookPageRead = prompt(`Enter the new number of pages read (current: ${bookToEdit.bookPageRead}):`, bookToEdit.bookPageRead);

    let newReadStatus = confirm("Has the book been read completely? OK for Yes, Cancel for No.");

    // Update the book details in the array with the new values
    bookToEdit.bookPageRead = newbookPageRead;
    bookToEdit.bookIsRead = newReadStatus;

    updateBooksDisplay();
}

function updateBooksDisplay() {
    const bookContainer = document.querySelector('.book-container');
    bookContainer.innerHTML = ''; 

    myLibrary.forEach((book, index) => {
        bookContainer.innerHTML += `
            <div class="book" data-index="${index}">
                <h2 class="book-title">${book.bookName}</h2>
                <div>
                    <h4 class="book-author">Writer: <span>${book.bookAuthor}</span></h4>
                    <h4 class="book-pages">Number of Pages: <span>${book.bookPages}</span></h4>
                    <h4 class="book-page-read">Number of Pages Read: <span>${book.bookPageRead}</span></h4>
                    <h4 class="book-isRead">${book.bookIsRead ? 'Read' : 'Not Read'}</h4>
                    <button class="delete-book" onclick="deleteBook(${index})">Delete</button>
                    <button class="edit-book" onclick="editBook(${index})">Edit</button>
                </div>
            </div>
        `;
    });
}

ADD_BOOK_BTN.addEventListener('click', showForm);
CLOSE_BTN.addEventListener('click', hideForm);
FORM.addEventListener('submit', printBooksScreen);

