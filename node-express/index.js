const express = require("express");
const exphbs = require("express-handlebars");

const homeRoutes = require('./routes/home')
const newsRoutes = require('./routes/news')
const addNewsRoutes = require('./routes/addNews')

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

// Регистрируем движок в express
app.engine("hbs", hbs.engine);
// Используем его
app.set("view engine", "hbs");
// Указываем где лежат шаблоны верстки
app.set("views", "views");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/news', newsRoutes)
app.use('/add', addNewsRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
