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

module.exports = router;
