let backendurl = "http://localhost:3000/futar";

document.addEventListener("DOMContentLoaded",async function () {

const response = await fetch(backendurl);   
const data = await response.json();
console.log(data);
if(data.length > 0) {
    listCards(data);
} else {
    console.log("Nincs megjeleníthető adat");
    const cardContainer = document.getElementById("karty");
    cardContainer.innerHTML = "<h2>Nincs megjeleníthető adat</h2>";
}

});
function listCards(data){
    const cardContainer = document.getElementById("kartya");
    cardContainer.innerHTML = "";
    data.forEach((element) => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<div class="card-body">
        <h5 class="card-title">${element.fnev}</h5>
        <p class="card-text"><i>tel</i>: ${element.ftel}</p>
        </div>`;
        cardContainer.appendChild(card);}
    );
}