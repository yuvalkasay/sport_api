const options = {
  method: "GET",
  url: "https://football-transfer-news1.p.rapidapi.com/news",
  headers: {
    "X-RapidAPI-Host": "football-transfer-news1.p.rapidapi.com",
    "X-RapidAPI-Key": "1d5977ec8dmshc0b76105b157a63p10bf0cjsnb2582ada8a05",
  },
};

axios
  .request(options)
  .then((response) => {
    console.log(response.data);
    const html = response.data
      .map((title) => {
        return `
        <div class="user">
        <p>🎯 ${title.title}</p>
        <h4>🗣️ ${title.source}</h4>
        <a class="link" href=${title.url}>👉 Click for the article</a>
        </div>`;
      })
      .join("");
    // console.log(html);
    document.querySelector("#para").insertAdjacentHTML("afterbegin", html);
  })
  .catch(function (error) {
    console.error(error);
  });
