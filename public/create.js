const backendurl = "http://localhost:3000/futar";

document.addEventListener("DOMContentLoaded", function () {
  const createButton = document.getElementById("createButton");


  createButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const nev = document.getElementById("name").value;
    const jsontext = {fnev: nev};
    const response = await fetch(backendurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsontext),
    });
    if (response.status === 201) {
      console.log("Sikeres adatfelvitel");
      document.getElementById("name").value = "";
    } else {
      alert("Sikertelen adatfelvitel");
    }
  });
});
