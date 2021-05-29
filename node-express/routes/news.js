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

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    res.redirect("/");
  } else {
    const news = await News.getById(req.params.id);
    res.render("newsEdit", {
      title: `Edit: ${news.title}`,
      news,
    });
  }
});

router.post("/edit", async (req, res) => {
  await News.update(req.body);
  res.redirect("/news");
});

router.get("/:id", async (req, res) => {
  const news = await News.getById(req.params.id);
  res.render("newsFull", {
    layout: "empty",
    title: news.title,
    news,
  });
});

module.exports = router;
