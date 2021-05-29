const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const homeRoutes = require('./routes/home')
const newsRoutes = require('./routes/news')
const addNewsRoutes = require('./routes/addNews')
const cartRoutes = require('./routes/cart')

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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/', homeRoutes)
app.use('/news', newsRoutes)
app.use('/add', addNewsRoutes)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
