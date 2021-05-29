const uuid = require("uuid")
const fs = require("fs")
const path = require("path")

class News {
    constructor(title, description, img) {
        this.title = title;
        this.description = description;
        this.img = img;
        this.id = uuid.v4();
    }

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            img: this.img,
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
}

module.exports = News;