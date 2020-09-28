function deleteCard(cardID){
    var card = document.getElementById(cardID);
    card.parentNode.removeChild(card);
}

currentMovieID = 0;
function updateCard(cardID){
    console.log("update" + cardID);
    var card = document.getElementById(cardID);
    
    var titleField = document.getElementById("movieTitleModal");
    titleField.value = card.children[1].children[0].textContent;

    var urlField = document.getElementById("imageURLModal");
    urlField.value = card.children[0].getAttribute('src');

    var ratingField = document.getElementById("ratingModal");
    ratingField.value = card.children[1].children[1].textContent;

    var reviewField = document.getElementById("reviewModal");
    reviewField.value = card.children[1].children[2].textContent;

    currentMovieID = cardID;
}

function saveChanges(){
    console.log("save changes to id " + currentMovieID);
    var card = document.getElementById(currentMovieID);

    //upate title
    card.children[1].children[0].textContent = document.getElementById("movieTitleModal").value;

    //update url
    card.children[0].setAttribute('src', document.getElementById("imageURLModal").value);

    //update rating
    card.children[1].children[1].textContent = document.getElementById("ratingModal").value;

    //update reviewfield
    card.children[1].children[2].textContent = document.getElementById("reviewModal").value;
}


idCounter = 69;
function addReview(){
    var title = document.getElementById("movieTitle").value;
    var imageUrl = document.getElementById("imageURL").value;
    var rating = document.getElementById("rating").value;
    var review = document.getElementById("review").value;

    var div = document.createElement('div');
    var newID = idCounter;
    idCounter++;
    div.innerHTML = `<div id="` + newID + `" class="card" style="width: 18rem;">
                        <img class="card-img-top" src="` + imageUrl +`" alt="Card image cap">
                        <div class="card-body">
                            <h3 class="card-title">` + title +`</h3>
                            <h5 class="card-title">` + rating +`</h5>
                            <p class="card-text">` + review + `</p>
                            <a onclick="updateCard(\'` + newID + `\')" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Update</a>
                            <a onclick="deleteCard(\'` + newID + `\')" class="btn btn-primary">Delete</a>
                        </div>
                    </div>`;
    document.getElementById("reviewGrid").appendChild(div);
}

document.getElementById("submitReview").addEventListener('click', addReview);