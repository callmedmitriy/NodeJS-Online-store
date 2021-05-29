const { Router } = require("express");
const News = require('../models/news');
const router = Router();

router.get("/", (req, res) => {
  res.render("add", {
    title: "Add News",
    isAddNews: true,
  });
});

router.post("/", async (req, res) => {
  const news = new News(req.body.title, req.body.description, req.body.img);
  await news.save();
  res.redirect("/news")
})

module.exports = router;
