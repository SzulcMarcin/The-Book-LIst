let inputTitle; //input głownego formularza
let inputAuthor; //input głownego formularza
let inputCategory; //input głownego formularza
let addBtn;//przycisk dodawania książki
let table; //tabela z książkami
let infoAlert;//Tekst informujący pod 
let myBook;//wiersz z książkami
let idNumber = 0;
let newBook;
let readBtn;//przycisk oznaczania przeczytanej książi
let delBtn;//przycisk usuwania książki
let editBtn;//przycisk edycji książki
let allBooks;
let acceptBtn; //przycisk potwierdzajacy usuwanie w popupie
let cancelBtn;//przycisk anulująćy usuwanie w popupie
let popupCheck;//popup potwierdzający chęc usunięcia książki
let deletedBook;//usuwana książka
let popupBody;//popupedycji książki
let editedBook;//edytowana książka
let popupInputTitle; //input formularza edycji
let popupInputAuthor; //input formularza edycji
let popupInputCategory; //input formularza edycji
let accept;//przycisk zatwierdzajacy wprowadzona zmiane e edycji
let cancelEditBtn;// przycisk anulowania zmiany w edycji
let form;//formularz głowny



const main = ()=>{
    myDOMElements();
    myDOMEvents();
}

const myDOMElements = ()=>{
    inputTitle = document.querySelector('.title');
    inputCategory = document.querySelector('.category');
    inputAuthor = document.querySelector('.author');
    addBtn = document.querySelector('.addBtn');
    table = document.querySelector('.table-body');
    infoAlert = document.querySelector('.info-alert');
    myBook = document.querySelector('.my-book');
    readBtn = document.querySelector('.readBtn');
    editBtn = document.querySelector('.editBtn');
    delBtn = document.querySelector('.deleteBtn');
    allBooks = document.getElementsByTagName('tr');
    popupCheck = document.querySelector('.popup-check');
    acceptBtn = document.querySelector('.accept-btn');
    cancelBtn = document.querySelector('.cancel-btn');
    popupBody = document.querySelector('.popup-window');
    popupInputTitle = document.querySelector('.title-popup');
    popupInputAuthor = document.querySelector('.author-popup');
    popupInputCategory = document.querySelector('.category-popup');
    acceptEditBtn = document.querySelector('.accept');
    cancelEditBtn = document.querySelector('.cancel');
    form = document.querySelector('.form');

}

const myDOMEvents = ()=>{
    addBtn.addEventListener('click', addNewBook);
    table.addEventListener('click', checkClick);
    acceptBtn.addEventListener('click', delFunction);
    cancelBtn.addEventListener('click', closeCheckPopup)
    acceptEditBtn.addEventListener('click', editFunction);
    cancelEditBtn.addEventListener('click', cancelEditFunction);
    form.addEventListener('keyup', addByKey);
    search.addEventListener('input', searchFunction)
}

//Funkcja dodawania książki
const addNewBook = ()=>{
    // e.preventDefault();
    if(inputTitle.value!=='' && inputAuthor.value!=='' && inputCategory.value!==''){
        idNumber++;
        infoAlert.innerText = '';
        newBook = document.createElement('tr');
        newBook.setAttribute('id', `table-${idNumber}`);
        // arrBooks.push(newBook)
        myBook.appendChild(newBook);

        const newTitle = document.createElement('th');
        newTitle.innerText = inputTitle.value
        newTitle.style.textTransform = 'capitalize'
        newBook.appendChild(newTitle);

        const newAuthor = document.createElement('th');
        newAuthor.innerText = inputAuthor.value;
        newAuthor.style.textTransform = 'capitalize'
        newBook.appendChild(newAuthor);

        const newCategory = document.createElement('th');
        newCategory.innerText = inputCategory.value;
        newCategory.style.textTransform = 'capitalize'
        newBook.appendChild(newCategory);

        inputTitle.value = '';
        inputAuthor.value = '';
        inputCategory.value = '';
        CreateToolsPanel()

        
    }else if (inputTitle.value!=='' && inputAuthor.value!==''){
        infoAlert.innerText = 'Dodaj Gatunek!!!';
    }else if (inputAuthor.value!=='' && inputCategory.value!==''){
        infoAlert.innerText = 'Dodaj tytuł książki';
    }else if (inputTitle.value!=='' && inputCategory.value!==''){
        infoAlert.innerText = 'Dodaj autora';
    }else if(inputTitle.value!=='') {
        infoAlert.innerText = 'Dodaj autora i gatunek!!!';
    }else if(inputAuthor.value!=='') {
        infoAlert.innerText = 'Dodaj tytuł i gatunek!!!';
    }else if(inputCategory.value!=='') {
        infoAlert.innerText = 'Dodaj tytuł i autora!!!';
    }else{
        infoAlert.innerText = 'Nie podałes żadnych informacji!';
    }
}

setInterval(function() {
    infoAlert.style.visibility = (infoAlert.style.visibility == 'hidden' ? '' : 'hidden');
}, 500);

//fumkcja dodawania przyciskow do do wiersza z książką
const CreateToolsPanel =()=>{
    const completeCol = document.createElement('th')
    newBook.appendChild(completeCol)
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML =  `<i class='fas fa-check'></i>`;
    completeBtn.classList.add('readBtn')
    completeBtn.classList.add('btn')
    completeCol.appendChild(completeBtn )
    
    const editCol = document.createElement('th')
    newBook.appendChild(editCol)
    const editBtn = document.createElement('button');
    editBtn.innerHTML = `<i class='fas fa-pencil-alt'></i>`;
    editBtn.classList.add('editBtn')
    editBtn.classList.add('btn')
    editCol.appendChild(editBtn)
    
    const deleteCol = document.createElement('th')
    newBook.appendChild(deleteCol)
    const delBtn = document.createElement('button');
    delBtn.innerHTML =`<i class='fas fa-times'></i>`;
    delBtn.classList.add('deleteBtn')
    delBtn.classList.add('btn')
    deleteCol.appendChild(delBtn)
}

//funkcja sprawdzająca co zostało kliknięte
const checkClick = (e)=>{
    if(e.target.closest('button').classList.contains('readBtn')){
        e.target.closest('tr').classList.toggle('read');
        e.target.closest('button').classList.toggle('read')
        console.log('read');

    }else if(e.target.closest('button').classList.contains('editBtn')){
        console.log('edit');
        editedBook = e.target.closest('tr').lastChild.parentElement.children;
        popupInputTitle.value = editedBook[0].textContent;
        popupInputAuthor.value = editedBook[1].textContent;
        popupInputCategory.value = editedBook[2].textContent;
        popupBody.style.display = 'block';

    }else if(e.target.closest('button').classList.contains('deleteBtn')){
        popupCheck.style.display = 'block';
        deletedBook = e.target.closest('tr');
    }
}

//funkcja usuwająca książkę z listy
const delFunction = (e)=>{
    deletedBook.remove();
    popupCheck.style.display = 'none';
    if(allBooks.length===1){
        infoAlert.innerText = 'Nie masz żadnych książek na liście';
    }else{
        infoAlert.innerText = '';
    }
    idNumber--
}

//funkcja zamykajaca popup sprawdzajacy chęć usunięcia książki
const closeCheckPopup = ()=>{
    popupCheck.style.display = 'none';
}

//funkcja edycji książi
const editFunction = (e)=>{
    if(popupInputTitle.value!=="" && popupInputAuthor.value!=='' && popupInputCategory.value!==''){
        editedBook[0].textContent = popupInputTitle.value;
        editedBook[1].textContent = popupInputAuthor.value;
        editedBook[2].textContent = popupInputCategory.value;
        popupBody.style.display = 'none';
    }else if(popupInputTitle.value === "" || popupInputAuthor.value === '' || popupInputCategory.value === ''){
        const nameTitle = document.getElementsByName('title')[0].placeholder = ('Brak tresci')
        popupInputTitle.style.border='4px solid red'
        const nameAuthor = document.getElementsByName('author')[0].placeholder = ('Brak tresci');
        popupInputAuthor.style.border='4px solid red'
        const nameCategory = document.getElementsByName('category')[0].placeholder = ('Brak tresci');
        popupInputCategory.style.border='4px solid red'
    }
}

//funkcja anulująca chęć wprowadzania zmiany
const cancelEditFunction = ()=>{
    popupBody.style.display = 'none';
}

const addByKey = ()=>{
    if(event.keyCode===13){
        if(inputTitle.value!=='' && inputAuthor.value!=='' && inputCategory.value!==''){
            addNewBook()
        }else{
            infoAlert.innerText = 'Wypełnij wszystkie pola';
        }
    }else{
        infoAlert.innerText = '';
    }
}

// funkcja wyszukiwania 
    function searchFunction() {
        const input = document.getElementById("search");
        const inputStr = input.value.toUpperCase();
        document.querySelectorAll('#my-book tr:not(.header)').forEach((tr) => {
          const anyMatch = [...tr.children]
            .some(td => td.textContent.toUpperCase().includes(inputStr));
          if (anyMatch) tr.style.removeProperty('display');
          else tr.style.display = 'none';
        });
          }
 

document.addEventListener('DOMContentLoaded', main);
