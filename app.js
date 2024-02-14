const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.querySelector("#sound");
const btn = document.querySelector(".search-btn");
const input = document.getElementById("inp-word");

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});

btn.addEventListener("click", () => {
  let inpWord = document.querySelector("#inp-word").value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="sound.play()"><i class="fas fa-volume-up"></i></button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${data[0].phonetic}</p>
                </div>
                <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
                <p class="word-example">${data[0].meanings[0].definitions[0].example}</p>
            `;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
  document.querySelector("#inp-word").value = "";
  document.querySelector(".container").style.paddingBottom = "40px";
});
