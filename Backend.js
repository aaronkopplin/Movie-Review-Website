currentMovieID = 0;
idCounter = 69;
var movieDataBase = [];
var admin = true;


function deleteCard(cardID){
    if (admin){
        movieDataBase = movieDataBase.filter(item => item.id != cardID);
        refreshMoviePanel();
    } else {
        alert("Only admins can delete reviews.");
    }
}

function updateCard(cardID){
    //only admins can update
    if (admin){

        //open the modal
        $("#myModal").modal();
        
        //load the review data to the modal
        var movieDatabaseEntry = movieDataBase.find(item => item.id == cardID);
        document.getElementById("movieTitleModal").value = movieDatabaseEntry.title;
        document.getElementById("imageURLModal").value = movieDatabaseEntry.url;
        document.getElementById("ratingModal").value = movieDatabaseEntry.rating;
        document.getElementById("reviewModal").value = movieDatabaseEntry.review;

        currentMovieID = cardID;
    } else {
        alert("Only admins can update reviews.");
    }
}

function saveChanges(){
    var newTitle = document.getElementById("movieTitleModal").value;
    var newUrl = document.getElementById("imageURLModal").value;
    var newRating = document.getElementById("ratingModal").value;
    var newReview = document.getElementById("reviewModal").value;

    //find the review that was just updated
    var movieEntry = movieDataBase.find( item => item.id == currentMovieID);
    movieEntry.title = newTitle;
    movieEntry.url = newUrl;
    movieEntry.rating = newRating;
    movieEntry.review = newReview;

    refreshMoviePanel();
}

function makeMovieCard(newID, imageUrl, title, rating, review){
    var card = document.createElement('div');
    card.innerHTML =    `<div id="` + newID + `" class="card" style="width: 18rem;">
                            <img class="card-img-top" src="` + imageUrl +`" alt="Card image cap">
                            <div class="card-body">
                                <h3 class="card-title">` + title +`</h3>
                                <h5 class="card-title">` + rating +`</h5>
                                <p class="card-text">` + review + `</p>
                                <a onclick="updateCard(\'` + newID + `\')" class="btn btn-primary" >Update</a>
                                <a onclick="deleteCard(\'` + newID + `\')" class="btn btn-primary">Delete</a>
                            </div>
                        </div>`;
    return card;            
}

function assignNewID(){
    var id = idCounter;
    idCounter++;
    return id;
}

function addReview(){
    var title = document.getElementById("movieTitle").value;
    var imageUrl = document.getElementById("imageURL").value;
    var rating = document.getElementById("rating").value;
    var review = document.getElementById("review").value;
    var newID = assignNewID();

    var movieCard = makeMovieCard(newID, imageUrl, title, rating, review);
    document.getElementById("moviePanel").appendChild(movieCard);

    var movieEntry = {
        title: title,
        url: imageUrl,
        rating: rating,
        review: review,
        id: newID
    }

    movieDataBase.push(movieEntry);
}

function refreshMoviePanel(){
    var moviePanel = document.getElementById("moviePanel");

    //clear all the reviews from the movie panel
    moviePanel.innerHTML = "";

    //add all the movies back
    for (index = 0; index < movieDataBase.length; index++){

        //generate a new card
        var card = makeMovieCard(movieDataBase[index].id, 
            movieDataBase[index].url,
            movieDataBase[index].title, 
            movieDataBase[index].rating, 
            movieDataBase[index].review);

        moviePanel.appendChild(card);
    }
}

function showAdminPanel(){
    //enter admin mode
    admin = true;

    //show admin panel
    var form = document.getElementById("adminPanel");
    form.style.display = "block";

    refreshMoviePanel();

    //hide user panel
    var userPanel = document.getElementById("userPanel");
    userPanel.style.display = "none";
}

function showUserPanel(){
    //enter user mode
    admin = false;

    //hide admin form
    var form = document.getElementById("adminPanel");
    form.style.display = "none";

    //show user form
    var userPanel = document.getElementById("userPanel");
    userPanel.style.display = "block";

    document.getElementById("resultsGrid").innerHTML = "";
}

function searchMovies(){
    //clear results
    document.getElementById("resultsGrid").innerHTML = "";

    var searchTerms = document.getElementById("searchBar").value.split(/[ ]+/);

    //loop through movies
    for(index = 0; index < movieDataBase.length; index++){
        var currMovie = movieDataBase[index];

        //loop through search terms
        for(termIndex = 0; termIndex < searchTerms.length; termIndex++){
            var term = searchTerms[termIndex];

            //if the search term is included in the title or review
            if (currMovie.title.split(/[ ]+/).includes(term) || currMovie.review.split(/[ ]+/).includes(term)){

                //add the movie to the search results
                var resultsGrid = document.getElementById("resultsGrid");
                var card = makeMovieCard(movieDataBase[index].id, 
                    movieDataBase[index].url,
                    movieDataBase[index].title, 
                    movieDataBase[index].rating, 
                    movieDataBase[index].review);
                resultsGrid.appendChild(card);
            }
        }
    }
}