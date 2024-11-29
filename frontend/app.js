document.addEventListener('DOMContentLoaded', function() {
    const cupcakes = [
        { id: 1, name: 'Cupcake de Baunilha', price: 5.00, image: 'img/cupcake-baunilha.jpg', category: 'baunilha' },
        { id: 2, name: 'Cupcake de Chocolate', price: 6.00, image: 'img/cupcake-chocolate.png', category: 'chocolate' },
        { id: 3, name: 'Cupcake de Morango', price: 6.50, image: 'img/cupcake-morango.jpg', category: 'morango' }
    ];

    // Recuperar carrinho do LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Função para exibir cupcakes na página
    function displayCupcakes(filteredCupcakes) {
        const cupcakeList = document.getElementById('cupcake-list');
        cupcakeList.innerHTML = '';
        filteredCupcakes.forEach(cupcake => {
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
    }

    displayCupcakes(cupcakes);

    // Função para atualizar o ícone do carrinho com o número de itens
    function updateCartIcon() {
        const cartIconCount = document.getElementById('cart-icon-count');
        cartIconCount.textContent = cart.length;
    }

    // Adicionar cupcakes ao carrinho
    document.getElementById('cupcake-list').addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const cupcakeId = parseInt(event.target.dataset.id);
            const cupcake = cupcakes.find(c => c.id === cupcakeId);
            const existingCupcake = cart.find(item => item.id === cupcake.id);
            if (existingCupcake) {
                existingCupcake.quantity += 1;
            } else {
                cart.push({ ...cupcake, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartIcon();  // Atualiza o número de itens no carrinho
        }
    });

    // Exibir carrinho na página
    function displayCartPage() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartPage = document.getElementById('cart-page');
        cartPage.style.display = 'block';  // Exibir a página do carrinho

        cartItems.innerHTML = '';  // Limpar antes de exibir os itens
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}
                <button class="remove-item" data-id="${item.id}">Remover</button>
                <button class="decrease-item" data-id="${item.id}">Diminuir Quantidade</button>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    // Redirecionar para a página do carrinho ao clicar no ícone
    document.getElementById('cart-icon').addEventListener('click', function() {
        displayCartPage();
    });

    // Fechar a página do carrinho
    document.getElementById('close-cart').addEventListener('click', function() {
        const cartPage = document.getElementById('cart-page');
        cartPage.style.display = 'none';
    });

    // Remover item do carrinho
    document.getElementById('cart-items').addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const cupcakeId = parseInt(event.target.dataset.id);
            // Remover o cupcake do carrinho
            cart = cart.filter(item => item.id !== cupcakeId);
            updateCart(); // Atualiza o carrinho
        }
    });

    // Diminuir quantidade de um item no carrinho
    document.getElementById('cart-items').addEventListener('click', function(event) {
        if (event.target.classList.contains('decrease-item')) {
            const cupcakeId = parseInt(event.target.dataset.id);
            const cupcake = cart.find(item => item.id === cupcakeId);
            if (cupcake && cupcake.quantity > 1) {
                cupcake.quantity -= 1;
            } else {
                // Se a quantidade for 1, remove o item
                cart = cart.filter(item => item.id !== cupcakeId);
            }
            updateCart(); // Atualiza o carrinho
        }
    });

    // Atualizar carrinho no LocalStorage
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
        displayCartPage(); // Exibe o carrinho atualizado
    }

    // Finalizar compra e redirecionar para o cadastro
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length > 0) {
            document.getElementById('cart-page').style.display = 'none';  // Esconde o carrinho
            document.getElementById('signup-page').style.display = 'block';  // Exibe a página de cadastro
        } else {
            alert('Carrinho vazio!');
        }
    });

    // Página de Cadastro
    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;

        alert(`Conta criada com sucesso! Bem-vindo, ${newUsername}`);
        document.getElementById('signup-page').style.display = 'none';  // Esconde a página de cadastro
    });

    // Atualizar o carrinho no ícone sempre que a página for carregada
    updateCartIcon();
});
