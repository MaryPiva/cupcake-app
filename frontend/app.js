document.addEventListener('DOMContentLoaded', function() {
    const cupcakes = [
        { id: 1, name: 'Cupcake de Baunilha', price: 5.00, image: 'img/cupcake-baunilha.jpg' },
        { id: 2, name: 'Cupcake de Chocolate', price: 6.00, image: 'img/cupcake-chocolate.png' },
        { id: 3, name: 'Cupcake de Morango', price: 6.50, image: 'img/cupcake-morango.jpg' }
    ];

    let cart = [];

    // Exibir cupcakes na página
    const cupcakeList = document.getElementById('cupcake-list');
    cupcakes.forEach(cupcake => {
        const cupcakeElement = document.createElement('div');
        cupcakeElement.classList.add('cupcake-item');
        cupcakeElement.innerHTML = `
            <img src="${cupcake.image}" alt="${cupcake.name}">
            <p>${cupcake.name}</p>
            <p>R$ ${cupcake.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${cupcake.id}">Adicionar ao Carrinho</button>
        `;
        cupcakeList.appendChild(cupcakeElement);
    });

    // Adicionar cupcakes ao carrinho
    cupcakeList.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const cupcakeId = parseInt(event.target.dataset.id);
            const cupcake = cupcakes.find(c => c.id === cupcakeId);

            if (cupcake) {
                cart.push(cupcake);
                updateCart();
            }
        }
    });

    // Atualizar carrinho
    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        cartItems.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
            cartItems.appendChild(itemElement);
            total += item.price;
        });

        cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    // Finalizar compra
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Compra finalizada com sucesso!');
            cart = [];
            updateCart();
        } else {
            alert('Carrinho vazio!');
        }
    });

    // Enviar formulário de contato
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    });
});
