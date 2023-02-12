# sport_api

Create and build API about the transfer windows, using open-source cheerio: 
```javascript
$('a:contains("transfer")', html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
```

You can pull data from a single source, or from all the sources - https://sports-api-8wro.onrender.com/news.
