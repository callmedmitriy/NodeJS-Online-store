const toCurrency = (price) => {
    return new Intl.NumberFormat('en-EN', {
        currency: 'usd',
        style: 'currency'
    }).format(price)
}
document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})

const cart = document.querySelector('.cart')
if (cart) {
    const cartRender = (newCart) => {
        if (newCart.news.length) {
            const html = newCart.news.map(news => {
                return `
                <tr>
                    <td>${news.title}</td>
                    <td><span class="price">${news.price}</span></td>
                    <td>
                        <button class="btn-floating btn-small teal js-edit" data-type="remove" data-id="${news.id}">-</button>
                        ${news.count}
                        <button class="btn-floating btn-small teal js-edit" data-type="add" data-id="${news.id}">+</button>
                    </td>
                    <td>
                        <button class="btn btn-small teal js-delete" data-id=${news.id}>Delete</button>
                    </td>
                </tr>
                `
            }).join('')
            cart.querySelector('tbody').innerHTML = html;
            cart.querySelector('#cartPrice').innerHTML = newCart.price;
            cart.querySelectorAll('.price').forEach(node => {
                node.textContent = toCurrency(node.textContent)
            })
        } else {
            cart.innerHTML = '<p>Cart is empty</p>'
        }
    }
    cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-delete')) {
            const id = event.target.dataset.id;
            fetch('/cart/delete/' + id, {
                method: 'DELETE'
            }).then(res => res.json())
            .then((cart) => cartRender(cart))
        }
    })

    cart.addEventListener('click', event => {
        if (event.target.classList.contains('js-edit')) {
            const id = event.target.dataset.id;
            const type = event.target.dataset.type;
            fetch('/cart/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ type, id })
            }).then(res => res.json())
            .then((cart) => cartRender(cart))
        }
    })
}