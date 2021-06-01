const { Router } = require("express");

const router = Router();
const Cart = require("../models/cart");
const News = require("../models/news");

router.post("/add", async (req, res) => {
  const news = await News.getById(req.body.id);
  await Cart.add(news);
  res.redirect("/cart");
});

router.delete("/delete/:id", async (req, res) => {
  const cart = await Cart.delete(req.params.id);
  res.status(200).json(cart);
});
router.post("/edit", async (req, res) => {
  const cart = await Cart.edit(req.body.id, req.body.type);
  res.status(200).json(cart);
});

router.get("/", async (req, res) => {
  const cart = await Cart.fetch();
  res.render("cart", {
    isCart: true,
    title: "Cart",
    news: cart.news,
    price: cart.price,
  });
});

module.exports = router;
