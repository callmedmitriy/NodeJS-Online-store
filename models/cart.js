const path = require("path");
const fs = require("fs");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

class Cart {
  static async add(news) {
    const cart = await Cart.fetch();

    const idx = cart.news.findIndex((n) => n.id === news.id);
    const candidate = cart.news[idx];
    if (candidate) {
      candidate.count += 1;
      cart.news[idx] = candidate;
    } else {
      news.count = 1;
      cart.news.push(news);
    }

    cart.price += +news.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  static async delete(id) {
    const cart = await Cart.fetch();

    const idx = cart.news.findIndex((n) => n.id === id);
    const news = cart.news[idx];
    const updatedPrice = news.price * news.count;

    cart.news = cart.news.filter((n) => n.id !== id);
    cart.price -= updatedPrice;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          reject(err);
        }
        resolve(cart);
      });
    });
  }

  static async edit(id, type) {
    const cart = await Cart.fetch();

    const idx = cart.news.findIndex((n) => n.id === id);
    const news = cart.news[idx];

    if (type === "add") {
      cart.news[idx].count += 1;
      cart.price += +news.price;
    }

    if (type === "remove") {
      if (news.count === 1) {
        cart.news = cart.news.filter((n) => n.id !== id);
      } else {
        cart.news[idx].count -= 1;
      }
      cart.price -= +news.price;
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          reject(err);
        }
        resolve(cart);
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(content));
      });
    });
  }
}

module.exports = Cart;
