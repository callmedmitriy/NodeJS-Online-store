const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("news", {
    title: "News list",
    isNewsList: true,
  });
});

module.exports = router;
