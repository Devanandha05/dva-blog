/* ============================================================
   DVA — ARTICLES DATA
   ------------------------------------------------------------
   This is the single "database" for every article on the
   site. The blog listing page (blog.html) and the "related
   articles" section on every article page both read from
   this array.

   HOW TO ADD A NEW ARTICLE (do this every time you publish):
   1. Copy an existing article page in /articles/ and rename it
      to match your new article's slug (Stage 4 covers this).
   2. Add ONE new object to the "articles" array below with
      that same slug.
   3. That's it — the blog page and related-articles sections
      will pick it up automatically. No other file needs to
      change.

   FIELD NOTES:
   - id: any unique number, just increase by 1 each time.
   - slug: must exactly match the article's .html filename
           (without ".html") and its folder path. Use lowercase
           and hyphens only, e.g. "my-new-article".
   - image: path to the card thumbnail, starting from the site
            root, e.g. "images/wedding-gown.jpg".
   - isAffiliate: set to true if this article was built from
           affiliate-article-template.html (contains shopping/
           affiliate links). Set to false, or leave it out
           entirely, for regular inspiration articles built
           from article-template.html. This flag doesn't change
           anything automatically yet — it's here so you (or
           future site features, like a "Shop" filter) can tell
           affiliate posts apart from inspiration posts at a
           glance when scanning this file.
   ============================================================ */

const articles = [
  {
    id: 1,
    slug: "elegant-gown-designs",
    title: "5 Elegant Gown Designs",
    category: "Elegance",
    description: "Explore elegant gown designs for a timeless and beautiful look.",
    image: "images/cape-gown.jpg",
    isAffiliate: false
  },
  {
    id: 2,
    slug: "easy-oil-pastel-drawing-ideas",
    title: "15 Easy Oil Pastel Drawing Ideas",
    category: "Art",
    description: "Beautiful and beginner-friendly oil pastel ideas to try when you want to create something.",
    image: "images/oil-pastel/oil-pastel.png",
    isAffiliate: false
  },
  {
    id: 3,
    slug: "minimal-nail-designs",
    title: "20 Minimal Nail Designs to Try",
    category: "Beauty",
    description: "Simple and elegant nail ideas that work beautifully with everyday jewelry and outfits.",
    image: "images/nails.jpg",
    isAffiliate: false
  },
  {
    id: 4,
    slug: "outfit-ideas-with-sandals",
    title: "15 Outfit Ideas to Style With Sandals",
    category: "Fashion",
    description: "Easy outfit inspiration featuring stylish and comfortable sandals.",
    image: "images/sandals.jpg",
    isAffiliate: false
  },
  {
    id: 5,
    slug: "affordable-room-decor",
    title: "Shop Affordable Room Decor We Love",
    category: "Affordable Room Decor",
    description: "Our favorite affordable room decor items to shop right now, for a minimal decor look.",
    image: "images/desk-decor/vase-decor.jpg",
    isAffiliate: true
  }

  /* ----------------------------------------------------------
     Add new article objects below this line, following the
     same format. Don't forget the comma after the closing }
     of the article above it.

     Example affiliate article entry:
     {
       id: 5,
       slug: "best-wedding-guest-dresses",
       title: "Shop the Look: Wedding Guest Dresses We Love",
       category: "Wedding",
       description: "Our favorite wedding guest dresses to shop right now.",
       image: "images/wedding-guest-dresses.jpg",
       isAffiliate: true
     }
     ---------------------------------------------------------- */
];
