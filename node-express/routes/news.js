const { Router } = require("express");
const News = require("../models/news");

const router = Router();

router.get("/", async (req, res) => {
  const newsList = await News.getAll();
  res.render("news", {
    title: "News list",
    isNewsList: true,
    newsList,
  });
});

router.get("/:id", async (req, res) => {
  const newsItem = await News.getById(req.params.id);
  res.render('newsFull', {
    layout: 'empty',
    title: newsItem.title,
    newsItem,
  })
})

module.exports = router;
