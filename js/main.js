/* ============================================================
   DVA — MAIN JS
   ------------------------------------------------------------
   Shared JavaScript used across pages. This file assumes
   articles-data.js has ALREADY been loaded on the page (it
   defines the global "articles" array) — so in any HTML page
   that uses these functions, load articles-data.js BEFORE
   main.js in a <script> tag.
   ============================================================ */


/* ------------------------------------------------------------
   renderBlogGrid()
   ------------------------------------------------------------
   Builds one "blog card" per article and inserts them all into
   the element with id="blog-grid" (used on blog.html).

   This is what makes adding new articles easy: this function
   loops over the "articles" array automatically, so you never
   hand-write a new card in HTML — you just add a new object to
   articles-data.js and this function does the rest.
   ------------------------------------------------------------ */
function renderBlogGrid() {
  const gridContainer = document.getElementById("blog-grid");

  // Safety check: if this page has no #blog-grid element, do nothing.
  // (Prevents errors on pages that load main.js but aren't the blog page.)
  if (!gridContainer) return;

  // Build one HTML card per article, then join them into a single string.
  const cardsHTML = articles.map((article) => `
    <a href="articles/${article.slug}.html" class="blog-card">
      <div class="blog-card-image">
        <img src="${article.image}" alt="${article.title}" />
      </div>
      <div class="blog-card-content">
        <p class="blog-category">${article.category}</p>
        <h2>${article.title}</h2>
        <p class="blog-description">${article.description}</p>
        <span class="read-more">Read article</span>
      </div>
    </a>
  `).join("");

  gridContainer.innerHTML = cardsHTML;
}


/* ------------------------------------------------------------
   renderRelatedArticles(currentSlug)
   ------------------------------------------------------------
   Builds the "You might also like" grid at the bottom of an
   article page, into the element with id="related-grid".

   currentSlug: the slug of the article currently being viewed
   (so we don't show the article as "related" to itself). Each
   article page passes its own slug in when calling this.

   Shows up to 3 other articles, in the order they appear in
   articles-data.js.
   ------------------------------------------------------------ */
function renderRelatedArticles(currentSlug) {
  const relatedContainer = document.getElementById("related-grid");

  if (!relatedContainer) return;

  const relatedArticles = articles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, 3);

  const cardsHTML = relatedArticles.map((article) => `
    <a href="${article.slug}.html" class="related-card">
      <div class="related-card-image">
        <img src="../${article.image}" alt="${article.title}" />
      </div>
      <p>${article.category}</p>
      <h3>${article.title}</h3>
    </a>
  `).join("");

  relatedContainer.innerHTML = cardsHTML;
}


/* ------------------------------------------------------------
   Run renderBlogGrid() once the page has finished loading.
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", renderBlogGrid);


/* ------------------------------------------------------------
   addPinterestSaveButtons()
   ------------------------------------------------------------
   Finds every element with class="pinnable" (a wrapper placed
   around an <img>) and injects a "Save" button that links to
   Pinterest's own share-link format. No external script needed.

   HOW TO ADD A SAVE BUTTON TO ANY IMAGE:
   Wrap the image in a <div class="pinnable"> and give that same
   div a "data-description" attribute with the pin caption text
   you want to appear on Pinterest, e.g.:

     <div class="pinnable" data-description="15 elegant wedding gown ideas">
       <img src="..." alt="..." />
     </div>

   This function reads the image's own src + the wrapper's
   data-description, and builds the Pinterest share URL
   automatically. Call this once per page, after the images
   you want pinnable buttons on already exist in the DOM.
   ------------------------------------------------------------ */
function addPinterestSaveButtons() {
  const pinnableWrappers = document.querySelectorAll(".pinnable");

  pinnableWrappers.forEach((wrapper) => {
    const img = wrapper.querySelector("img");
    if (!img) return; // skip if this wrapper has no image inside it

    // Build absolute URLs. Pinterest needs the FULL image and page
    // URL, not a relative path like "../images/photo.jpg" — so we
    // resolve them against the current page location.
    const imageUrl = new URL(img.getAttribute("src"), window.location.href).href;
    const pageUrl = window.location.href;
    const description = wrapper.getAttribute("data-description") || img.getAttribute("alt") || "";

    const pinterestShareUrl =
      "https://pinterest.com/pin/create/button/" +
      "?url=" + encodeURIComponent(pageUrl) +
      "&media=" + encodeURIComponent(imageUrl) +
      "&description=" + encodeURIComponent(description);

    // Build the button and insert it inside the wrapper.
    const button = document.createElement("a");
    button.href = pinterestShareUrl;
    button.className = "pin-save-button";
    button.target = "_blank";       // opens Pinterest in a new tab
    button.rel = "noopener";        // security best practice for target="_blank" links
    button.textContent = "Save";

    wrapper.appendChild(button);
  });
}

document.addEventListener("DOMContentLoaded", addPinterestSaveButtons);

