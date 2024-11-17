const backendurl = "http://localhost:3000/futar";
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("deleteButton").addEventListener("click", function () {
        let futarvaltozo = (document.getElementById("deleteform"));
        let id = document.getElementById("id").value;
        futarvaltozo = Object.fromEntries(futarvaltozo);
        fetch(backendurl + "/" + id, {
            method: "DELETE",
        });       
        const response = fetch(backendurl + "/" + id);
        document.getElementById("id").value = "";
    })


})