//creo le cards:
function getResults(element) {
    let imageRow = document.getElementById("imageRow"); // parent
    //creo col:
    let imageCol = document.createElement("div");
    imageCol.classList.add("col", "col-12", "col-sm-6", "col-md-4", "col-lg-3");
    //appendo col:
    imageRow.appendChild(imageCol);

    //creo card:
    let imageCard = document.createElement("div");
    imageCard.classList.add("card");

    //creo elementi card:
    let imageImg = document.createElement("img");
    imageImg.classList.add("card-img-top", "img-fluid");
    imageImg.setAttribute("alt", `${element.alt}`);
    imageImg.src = element.src.portrait;
    let imageCardBody = document.createElement("div");
    imageCardBody.classList.add("card-body");

    let divIcons = document.createElement("div");
    divIcons.classList.add("card-icons");

    let favIcon = document.createElement("i");
    favIcon.classList.add("fa-regular", "fa-heart");
    let bookIcon = document.createElement("i");
    bookIcon.classList.add("fa-regular", "fa-bookmark");

    let textCard1 = document.createElement("p");
    textCard1.classList.add("card-text");
    textCard1.innerText = `author: ${element.photographer}`;

    let textCard2 = document.createElement("p");
    textCard1.classList.add("card-text");
    textCard2.innerText = `main color: ${element.avg_color}`;

    //appendo gli elementi:
    imageCol.appendChild(imageCard);
    imageCard.appendChild(imageImg); 
    imageCard.appendChild(imageCardBody);
    imageCardBody.appendChild(divIcons);
    divIcons.appendChild(favIcon);
    divIcons.appendChild(bookIcon);
    imageCardBody.appendChild(textCard1);
    imageCardBody.appendChild(textCard2);
}

// fetch for search field
let searchBtn = document.getElementById("searchButton");
searchBtn.addEventListener ("click", (event) => {
    // let reset = document.querySelector(".form-control").value;
    // reset.innerText = ""; //
    let searchValue = document.getElementById("searchField").value; //catturo il value dell'utente e lo passo come query
    fetch(`https://api.pexels.com/v1/search?query=${searchValue}`, {
        method: "GET",
        headers: {
            Authorization: "jLOvsujcsOzgW6hZdjcZ7DXUM5ucAw1jfcNjQZin8p1zjkQ1q9NIO7Yv"
        }
    })
    .then((response) => response.json())
    .then((json) => {
            let footer = document.getElementById("footer").classList.remove("fixed-bottom"); //rimuove il fixed dal footer
            let imageFeed = document.getElementById("imageFeed");
            imageFeed.classList.remove("d-none");
            let titleSection = document.querySelector("h5.text-secondary");
            titleSection.innerText = `Search Results for "${searchValue}"`;

            let dataArray = randomAlbum(json.photos, 12);

            let imageRow = document.getElementById("imageRow");
            imageRow.innerHTML = ""; //svuoto

            dataArray.map((element) => {       
            getResults(element)
            })
    })
    .catch((err) => console.log("Error detected: ", err));
})

//funzione immagini Random:
function randomAlbum (array, n) {
        let result = [];
        for (let i = 0; i < n; i++) {
            let showRandom = Math.floor(Math.random() * array.length);
            result.push(array[showRandom]);
            array.splice(showRandom, 1);
        }
        return result;
    }