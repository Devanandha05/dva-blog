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
  const grid = document.getElementById("blog-grid");
  if (!grid) return;

  const filtersEl = document.getElementById("blog-filters");
  const featureEl = document.getElementById("blog-feature");

  // Featured article: the first one with featured: true, else the first in the list
  const featured = articles.find((a) => a.featured) || articles[0];
  const categories = [...new Set(articles.map((a) => a.category))];
  let activeCategory = "All";

  // Change this to your real Pinterest profile URL
  const PINTEREST_URL = "https://www.pinterest.com/YOUR-USERNAME/";

  function cardHTML(a) {
    return `
      <a href="articles/${a.slug}.html" class="blog-card">
        <div class="blog-card-image">
          <img src="${a.image}" alt="${a.title}" loading="lazy" />
          ${a.isAffiliate ? '<span class="card-badge">Shop</span>' : ""}
          <span class="card-arrow">&rarr;</span>
          <div class="blog-card-overlay">
            <span class="blog-category">${a.category}</span>
            <h2>${a.title}</h2>
          </div>
        </div>
      </a>`;
  }

  function featureHTML(a) {
    return `
      <a href="articles/${a.slug}.html" class="blog-feature-card">
        <div class="blog-feature-media">
          <img src="${a.image}" alt="${a.title}" />
        </div>
        <div class="blog-feature-body">
          <span class="feature-flag">Featured</span>
          <p class="blog-category">${a.category}</p>
          <h2>${a.title}</h2>
          <p class="blog-description">${a.description}</p>
          <span class="read-more">Read article</span>
        </div>
      </a>`;
  }

  const stripHTML = `
    <div class="blog-strip">
      <p class="kicker">Follow along</p>
      <h2>Save your favourite ideas on Pinterest</h2>
      <p>New boards and pins every week.</p>
      <a href="${PINTEREST_URL}" class="hero-button" target="_blank" rel="noopener">Follow on Pinterest</a>
    </div>`;

  function drawFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = ["All", ...categories].map((c) => `
      <button type="button" class="filter-pill ${c === activeCategory ? "is-active" : ""}" data-category="${c}">${c}</button>
    `).join("");
  }

  function reveal() {
    const items = document.querySelectorAll(".blog-card, .blog-feature-card, .blog-strip");
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  function draw() {
    // Featured block only shows on "All"
    const showFeature = activeCategory === "All" && articles.length > 1;
    if (featureEl) featureEl.innerHTML = showFeature ? featureHTML(featured) : "";

    const list = articles.filter((a) =>
      (activeCategory === "All" || a.category === activeCategory) &&
      !(showFeature && a === featured)
    );

    const cards = list.map(cardHTML);
    // Break up the grid with a strip after the 6th card (only if there are more than 6)
    if (cards.length > 6) cards.splice(6, 0, stripHTML);
    grid.innerHTML = cards.join("");

    reveal();
  }

  if (filtersEl) {
    filtersEl.addEventListener("click", (e) => {
      const pill = e.target.closest(".filter-pill");
      if (!pill) return;
      activeCategory = pill.dataset.category;
      drawFilters();
      draw();
    });
  }

  drawFilters();
  draw();
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

/* ------------------------------------------------------------
   Transparent navbar (homepage only)
   Adds the "scrolled" class once the visitor scrolls down a bit,
   which makes the navbar solid. Does nothing on pages without
   a .navbar-overlay.
   ------------------------------------------------------------ */
function initTransparentNavbar() {
  const navbar = document.querySelector(".navbar-overlay");
  if (!navbar) return;

  const update = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };

  update(); // set the correct state on load (e.g. after a refresh mid-page)
  window.addEventListener("scroll", update, { passive: true });
}

document.addEventListener("DOMContentLoaded", initTransparentNavbar);

/* ------------------------------------------------------------
   Scroll reveal (homepage About section)
   Fades elements in once as they scroll into view.
   ------------------------------------------------------------ */
function initScrollReveal() {
  const targets = document.querySelectorAll(".about-collage, .about-copy");
  if (!targets.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  targets.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", initScrollReveal);

function renderShopPage() {
  const picksContainer = document.getElementById("shop-picks-list");
  const listContainer = document.getElementById("shop-list");

  // Do nothing on pages that aren't shop pages
  if (!picksContainer || !listContainer) return;

  // Which product list does THIS page want?
  const category = listContainer.dataset.category;
  const products = productLists[category];

  if (!products || products.length === 0) {
    console.warn("No products found for category:", category);
    return;
  }

  picksContainer.innerHTML = products.map((p, i) => `
    <li>
      <a href="#product-${i}">
        <img src="../${p.image}" alt="" />
        <span>${p.name}</span>
      </a>
    </li>
  `).join("");

  listContainer.innerHTML = products.map((p, i) => `
    <article class="shop-item" id="product-${i}">
      <div class="shop-item-media">
        <img src="../${p.image}" alt="${p.name}" />
      </div>
      <div class="shop-item-body">
        <span class="shop-item-number">${String(i + 1).padStart(2, "0")}</span>
        <h2>${p.name}</h2>
        <p class="shop-item-price">${p.price}</p>
        <p class="shop-item-text">${p.description}</p>
        <a href="${p.link}" class="shop-item-button" target="_blank" rel="sponsored noopener">
          ${p.buttonText || "Shop now"}
        </a>
        <span class="shop-item-note">Affiliate link — we may earn a commission.</span>
      </div>
    </article>
  `).join("");
}