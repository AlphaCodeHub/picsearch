const accesskey = "d0_obbdSCU6zk5Bn0m-NwQK5Sbs3J0ddt5I2WKTaWK0";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showBtn = document.getElementById("show-more-btn");
let keyword = "";
let page = 1;
let searchPerformed = false;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=21&orientation=landscape`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = ""; // Clear previous search results
    searchPerformed = true;
  }

  results.forEach((result) => {
    const imageCard = document.createElement("div");
    imageCard.classList.add("image-card");

    const image = document.createElement("img");
    image.src = result.urls.small;

    const downloadButton = document.createElement("a");
    downloadButton.classList.add("download-btn");
    downloadButton.textContent = "Download";
    downloadButton.href = result.urls.full;
    downloadButton.setAttribute("download", "");
    downloadButton.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    imageCard.appendChild(image);
    imageCard.appendChild(downloadButton);

    searchResult.appendChild(imageCard);
  });

  if (searchPerformed) {
    showBtn.style.display = "block";
    showBtn.style.margin = "10px auto";
  } else {
    showBtn.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showBtn.addEventListener("click", () => {
  page++;
  searchImages();
});

// Get the "Show More" button element
var showMoreBtn = document.getElementById("show-more-btn");

// Function to show or hide the button based on the search input
function toggleShowMoreButton() {
  var searchBox = document.getElementById("search-box");
  if (searchBox.value === "") {
    showMoreBtn.style.display = "none"; // Hide the button if the search box is empty
  } else {
    showMoreBtn.style.display = "block"; // Show the button if the search box has a value
  }
}

// Add an event listener to the search box for input changes
document.getElementById("search-box").addEventListener("input", toggleShowMoreButton);

