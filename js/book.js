async function loadBook(){
    try{
        //10
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id'); 
        
        const response = await fetch('data/books.json');
        const list = await response.json();
        const book = list.find(b => b.id == id); 
        if(book){
            //getting
            document.getElementById("book-image").src = book.image;
            document.getElementById("book-title").textContent = book.title;
            document.getElementById("book-description").textContent = book.description;
            document.getElementById("book-rating").textContent = book.rating;  
            loadReviews(id);                             
        }
        else{//si le book introuvable
            document.getElementById("book-title").textContent = "Livre introuvable";
        }
    }
    catch(error){
       console.error("Erreur lors du chargement du livre");
    }
}    
async function loadReviews(currentBookId) {
    const response = await fetch('data/reviews.json');
    const allReviews = await response.json();

    //garde uniquement les avis de bookid
    const filterReviews = allReviews.filter(r => r.bookId == currentBookId);   
    const reviewslist = document.getElementById("reviews-list");
    // si aucun avis
    if (filterReviews.length === 0) {
        reviewslist.innerHTML = "<p class='text-muted'>Aucun avis pour ce livre.</p>";
        return;
    }
    //afichage(parcourir les avis)
    filterReviews.forEach(review => {
    const reviewdiv = document.createElement("div");
    reviewdiv.innerHTML =  `
        <div class="py-2">
            <strong>${review.user}</strong> 
            <span class="badge bg-warning text-dark">${review.rating}/5 </span>
            <p class="text-secondary ">"${review.comment}"</p>
        </div>
    `;
    reviewslist.appendChild(reviewdiv);
    });
}

//ajoute commrnt
document.getElementById("review-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("user-name").value;
    const rating = document.getElementById("user-rating").value;
    const comment = document.getElementById("user-comment").value;

    const reviewslist = document.getElementById("reviews-list");   
    const reviewlist = document.createElement("div");
    reviewlist.innerHTML = `
            <div class="py-2">
            <strong>${name}</strong> 
            <span class="badge bg-warning text-dark">${rating}/5 </span>
            <p class="text-secondary ">"${comment}"</p>
        </div>
    `;
    reviewslist.appendChild(reviewlist);
});
document.addEventListener("DOMContentLoaded", loadBook);
