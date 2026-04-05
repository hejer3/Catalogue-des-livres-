const booklist = document.querySelector("#book-list");
async function loadBooks(){
    try{
        const response=await fetch("data/books.json");
        if(!response.ok)
            throw new error ('Error HTTP');
        const books = await response.json();
        displayBooks(books);
    }
    catch(erreur){       
        console.error("Erreur lors du chargement du livre ");
    }
}
function displayBooks(books){
    booklist.innerHTML="";//vider booklist
    books.forEach(book => {
        const divnew = document.createElement("div");
        divnew.className = "col-md-3 mb-4";//afiche les livres en mm ligne
        divnew.innerHTML=`
        <div class= "card h-100 shadow-sm">
            <img src="${book.image}">
            <div class="card-body">
                <h5>${book.title}</h5>
                <button class="btn btn-mauve btn-details"  data-id="${book.id}">voir detailles</button>
            </div>        
        </div>` 
        divnew.querySelector('.btn-details').addEventListener("click",() => {
            window.location = "book.html?id="+ book.id; 
        } );
        booklist.appendChild(divnew);
    });
}
document.addEventListener("DOMContentLoaded", loadBooks);