// Definição dos cupcakes com preço, imagem e categoria
const cupcakes = [
    { id: 1, name: 'Cupcake Baunilha', price: 5.00, image: 'img/cupcake-baunilha.jpg', category: 'baunilha' },
    { id: 2, name: 'Cupcake Chocolate', price: 6.00, image: 'img/cupcake-chocolate.png', category: 'chocolate' },
    { id: 3, name: 'Cupcake Morango', price: 7.00, image: 'img/cupcake-morango.jpg', category: 'morango' }
];

// Carrinho de compras (armazenado no localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Filtro de pesquisa
let searchQuery = ''; // O que o usuário digita na pesquisa
let selectedCategory = 'all'; // Categoria selecionada

// Função para exibir os cupcakes na página com base na pesquisa e filtro
function displayCupcakes(cupcakes) {
    const cupcakeList = document.getElementById('cupcake-list');
    cupcakeList.innerHTML = ''; // Limpa a lista de cupcakes

    // Filtra os cupcakes com base na pesquisa e na categoria selecionada
    const filteredCupcakes = cupcakes.filter(cupcake => {
        const matchesSearchQuery = cupcake.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || cupcake.category === selectedCategory;
        return matchesSearchQuery && matchesCategory;
    });

    filteredCupcakes.forEach(cupcake => {
        const cupcakeItem = document.createElement('div');
        cupcakeItem.classList.add('cupcake-item');
        cupcakeItem.innerHTML = `
            <img src="${cupcake.image}" alt="${cupcake.name}">
            <p>${cupcake.name}</p>
            <p>R$ ${cupcake.price.toFixed(2)}</p>
            <button onclick="addToCart(${cupcake.id})">Adicionar ao Carrinho</button>
        `;
        cupcakeList.appendChild(cupcakeItem);
    });
}

// Função para adicionar cupcakes ao carrinho
function addToCart(cupcakeId) {
    const selectedCupcake = cupcakes.find(cupcake => cupcake.id === cupcakeId);
    cart.push(selectedCupcake);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

// Função para atualizar o ícone do carrinho
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-icon-count').textContent = cart.length;
}

// Exibe o carrinho na página
function showCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('p');
        cartItem.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').textContent = `Total: R$ ${total.toFixed(2)}`;
    document.getElementById('cart-page').style.display = 'block';
}

// Fecha a página do carrinho
function closeCartPage() {
    document.getElementById('cart-page').style.display = 'none';
}

// Função de busca de cupcakes
function searchCupcakes() {
    searchQuery = document.getElementById('search').value;
    displayCupcakes(cupcakes); // Atualiza a lista de cupcakes com base na pesquisa
}

// Função de filtro por categoria
function filterByCategory() {
    selectedCategory = document.getElementById('category-filter').value;
    displayCupcakes(cupcakes); // Atualiza a lista de cupcakes com base na categoria
}

// Login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const userName = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);

    document.getElementById('user-name').textContent = `Olá, ${userName}`;
    document.getElementById('login-btn').innerHTML = `<button onclick="logout()" id="logout-btn">Logout</button>`;

    closeLoginModal();
});

// Logout
function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('cart');
    document.getElementById('user-name').textContent = '';
    document.getElementById('login-btn').innerHTML = '<button onclick="showLoginModal()">Login</button>';
    updateCartIcon();
}

// Exibir modal de login
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
}

// Fechar o modal de login
function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

// Atualiza o ícone do carrinho sempre que a página carregar
window.onload = function() {
    updateCartIcon();
    displayCupcakes(cupcakes); // Exibe os cupcakes
};
