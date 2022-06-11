const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const newspapers = [
  {
    name: "theguardian",
    address: "https://www.theguardian.com/football",
    base: "",
  },
  {
    name: "skysports",
    address: "https://www.skysports.com/football",
    base: "",
  },
  {
    name: "espn",
    address: "https://www.espn.com/soccer/transfers-news-and-features/",
    base: "https://www.espn.com/soccer",
  },
];

const app = express();

const articles = [];

newspapers.forEach((newspaper) => {
  axios.get(newspaper.address).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('a:contains("transfer")', html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      console.log(newspaper);
      console.log("title:", title);
      console.log("url:", url);

      articles.push({
        title,
        url: newspaper.base + url,
        source: newspaper.name,
      });
    });
  });
});

app.get("/", (req, res) => {
  res.json("Welcome to my football transfer API");
});

app.get("/news", (req, res) => {
  res.json(articles);
});

app.get("/news/:newspaperId", (req, res) => {
  const newspaperId = req.params.newspaperId;

  const newspaperAdress = newspapers.filter(
    (newspaper) => newspaper.name == newspaperId
  )[0].address;
  const newspaperBase = newspapers.filter(
    (newspaper) => newspaper.name == newspaperId
  )[0].base;

  axios
    .get(newspaperAdress)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const specificArticles = [];

      $('a:contains("transfer")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        specificArticles.push({
          title,
          url: newspaperBase + url,
          source: newspaperId,
        });
      });
      res.json(specificArticles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
