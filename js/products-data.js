/* ============================================================
   DVA — PRODUCTS DATA
   One list per shop page. The key (e.g. "room-decor") is the
   name each shop page asks for with data-category="...".

   TO ADD A PRODUCT: add one object to the right list.
   TO ADD A NEW SHOP CATEGORY: add a new key with its own list.
   ============================================================ */

const productLists = {

  "room-decor": [
    {
      name: "Flower Table Mirror",
      image: "images/room-decor/flower-mirror.jpg",
      link: "https://amzn.to/4nwDLkw",
      buttonText: "Check it out on Amazon",
      description:
        "A little flower-shaped mirror that makes your vanity corner instantly cuter 🌸✨ The soft, playful shape gives it that Pinteresty feel, while the rotating design and handy tray make it genuinely practical too."
    },
    {
      name: "Wooden Minimal Vase",
      image: "images/room-decor/circle-vase.jpg",
      link: "https://amzn.to/42CRvAT",
      description:
        "A minimal wooden vase that adds a touch of natural elegance to any room."
    },
    {
      name: "Rectangle Mirror",
      image: "images/room-decor/rectangle-mirror.png",
      link: "https://link.amazon/B0dYfmWN5",
      description:
        "A minimal large rectangle mirror that adds a touch of natural elegance to any room."
    },
    {
      name: "White Vase",
      image: "images/room-decor/white-vase.jpg",
      link: "https://amzn.to/42IKj6g",
      description:
        "A minimal white vase that adds a touch of natural elegance to any room."
    },
    {
      name: "Wooden Shelf",
      image: "images/room-decor/wooden-shelf.jpg",
      link: "https://link.amazon/B0dlg0PI0",
      description:
        "A minimal wooden shelf that adds a touch of natural elegance to any room."
    }
  ],

  "wedding-gown": [
    {
      name: "Cape Sleeve Wedding Gown",
      image: "images/gowns/cape-gown.jpg",
      description: "A beautiful cape sleeve wedding gown with a flowing silhouette and elegant design."
     },
    {
      name: "Sleeveless Wedding Gown",
      image: "images/gowns/wedding-gown.jpg",
      description: "A beautiful sleeveless wedding gown with a flowing silhouette and elegant design."
    }
  ],

  "oil-pastels": [
    {
      name: "Blue Eye ",
      image: "images/oil-pastel/blue-eye.jpg",
      description: "A beautiful oil pastel drawing of a blue eye, anyone can try."
    },
    {
      name: "Rose Flower",
      image: "images/oil-pastel/oil-pastel.jpg",
      description: "A beautiful oil pastel drawing of a red rose."
    },
    {
      name: "Purple Eye ",
      image: "images/oil-pastel/purple-eye.jpg",
      description: "A beautiful oil pastel drawing of a purple eye."
    }
  ],

  "affordable-outfits": [
    {
      name: "Long Sleeve White top",
      image: "images/outfits/white-top.jpg",
      link: "https://www.myntra.com/studio/studiopost/21387956?utm_source=ugc_affiliate&utm_medium=social_share_ugc_post&utm_campaign=nc2LPytXfs&affiliate_id=nc2LPytXfs&shared=true",
      description: "A simple long sleeve white top that can be styled in various ways for a chic and sophisticated look."
    }
  ],
    "minimal-nails": [
    {
      name: "Example Dress",
      image: "images/minimal-nails/example.jpg",
      description: "Short description here."
    }
  ]
};