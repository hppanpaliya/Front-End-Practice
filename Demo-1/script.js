document.getElementById('filter-news').addEventListener('click', function() {
    fetchNews();
});
fetchNews();

function fetchNews() {
  const category = document.getElementById("category").value;
  const country = document.getElementById("country").value;
  let url = `https://projects.harshal.pro/v2/top-headlines?language=en`;

  if (category) url += `&category=${category}`;
  if (country) url += `&country=${country}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayNews(data.articles))
    .catch((error) => console.error("Error fetching news:", error));
}

function displayNews(articles) {
  console.log(articles);
  const newsContainer = document.getElementById("news-container");
  if (articles.length === 0) {
    newsContainer.innerHTML = "No news available";
    return;
  }
  newsContainer.innerHTML = articles
    .map((article) => {
      return article.title !== "[Removed]"
        ? `
        <div class="news-articles">
            <h3>${article.title}</h3>
            <br>
            <div class="news-article">
            <img src="${article.urlToImage}" alt="${
            article.title
          }" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';" />
            <div>
            <p>${article.description || ""}</p>
            <a href="${article.url}" target="_blank">Read more</a>
            </div>
            </div>
        </div>
    `
        : "";
    })
    .join("");
}
