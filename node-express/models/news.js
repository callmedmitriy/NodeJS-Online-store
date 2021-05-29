const uuid = require("uuid")
const fs = require("fs")
const path = require("path")

class News {
    constructor(title, description, price, img) {
        this.title = title;
        this.description = description;
        this.img = img;
        this.price = price;
        this.availableToBuy = !!price;
        this.id = uuid.v4();
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            img: this.img,
            price: this.price,
            availableToBuy: this.availableToBuy,
            id: this.id,
        }
    }

    async save() {
        const newsList = await News.getAll()
        newsList.push(this.toJSON())
        
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'news.json'),
                JSON.stringify(newsList),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
    
                }
            )
        })
    }

    static async update(news) {
        const newsList = await News.getAll()
        const idx = newsList.findIndex(n => n.id === news.id)
        newsList[idx] = {
            ...news,
            availableToBuy: !!news.price,
        };
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'news.json'),
                JSON.stringify(newsList),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
    
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'news.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getById(id) {
        const newsList = await News.getAll();
        return newsList.find(news => news.id === id)
    }
}

module.exports = News;