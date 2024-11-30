// Armazenamento de usuários (fake database)
const users = JSON.parse(localStorage.getItem('users')) || [];

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
    const itemInCart = cart.find(item => item.id === cupcakeId);

    if (itemInCart) {
        // Se o item já existe no carrinho, aumenta a quantidade
        itemInCart.quantity += 1;
    } else {
        // Caso contrário, adiciona o item com quantidade 1
        selectedCupcake.quantity = 1;
        cart.push(selectedCupcake);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();

    // Exibe a mensagem de item adicionado
    const toast = document.getElementById('toast');
    toast.textContent = `${selectedCupcake.name} foi adicionado ao seu carrinho!`;
    toast.classList.add('show');

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Função para atualizar o ícone do carrinho
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-icon-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Exibe o carrinho na página
function showCartPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
            <button onclick="addItem(${index})">
                <i class="fas fa-plus"></i> Adicionar
            </button>
            <button onclick="removeItem(${index})">
                <i class="fas fa-trash"></i> Remover
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = `Total: R$ ${total.toFixed(2)}`;
    document.getElementById('cart-page').style.display = 'block';
}

// Adicionar mais um item no carrinho (aumentar a quantidade)
function addItem(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    showCartPage(); // Atualiza o carrinho
}

// Remover um item do carrinho
function removeItem(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Diminui a quantidade
    } else {
        cart.splice(index, 1); // Remove o item se a quantidade for 1
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showCartPage(); // Atualiza o carrinho
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

// Finalizar compra e exibir mensagem
document.getElementById('checkout-btn').addEventListener('click', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert("Seu carrinho está vazio. Adicione produtos ao carrinho antes de finalizar a compra.");
    } else {
        // Exibe a mensagem de envio para pagamento
        alert("Seu pedido foi enviado para pagamento. Aguarde a confirmação.");

        // Limpar o carrinho após a finalização (opcional)
        localStorage.removeItem('cart');
        updateCartIcon(); // Atualiza o ícone do carrinho
        showCartPage(); // Atualiza a página do carrinho
    }
});

// Função de login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Verifica se o usuário existe
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem('userName', user.name);
        document.getElementById('user-name').textContent = `Olá, ${user.name}`;
        document.getElementById('login-btn').innerHTML = `<button onclick="logout()" id="logout-btn">Logout</button>`;
        closeLoginModal();
    } else {
        alert("E-mail ou senha incorretos!");
    }
});

// Função de cadastro
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Verifica se o e-mail já está cadastrado
    if (users.find(user => user.email === email)) {
        alert("E-mail já cadastrado! Tente outro.");
    } else {
        // Adiciona o novo usuário
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Cadastro realizado com sucesso!");
        closeSignupModal();
    }
});

// Função de redefinir senha
document.getElementById('forgot-password-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const resetEmail = document.getElementById('reset-email').value;

    const user = users.find(user => user.email === resetEmail);
    if (user) {
        alert("Instruções para redefinir sua senha foram enviadas para o seu e-mail.");
    } else {
        alert("E-mail não encontrado.");
    }
    closeForgotPasswordModal();
});

// Logout
function logout() {
    localStorage.removeItem('userName');
    document.getElementById('user-name').textContent = '';
    document.getElementById('login-btn').innerHTML = '<button onclick="showLoginModal()">Login</button>';
    updateCartIcon();
}
// Função para exibir o modal de feedback
function showFeedbackModal() {
    document.getElementById('feedback-modal').style.display = 'block';
}

// Função para fechar o modal de feedback
function closeFeedbackModal() {
    document.getElementById('feedback-modal').style.display = 'none';
}

// Função para processar o envio do feedback
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Coletando os dados do formulário
    const name = document.getElementById('feedback-name').value;
    const email = document.getElementById('feedback-email').value;
    const message = document.getElementById('feedback-message').value;

    // Armazenando o feedback no localStorage (ou enviando para um servidor, se necessário)
    const feedback = {
        name,
        email,
        message,
        date: new Date().toISOString(),
    };

    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    // Fechar o modal após o envio
    closeFeedbackModal();

    // Exibir mensagem de sucesso
    alert("Obrigado pelo seu feedback!");

    // Limpar os campos do formulário
    document.getElementById('feedback-form').reset();
});


// Exibir modal de login
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
}

// Fechar modal de login
function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

// Exibir modal de cadastro
function showSignupModal() {
    document.getElementById('signup-modal').style.display = 'block';
}

// Fechar modal de cadastro
function closeSignupModal() {
    document.getElementById('signup-modal').style.display = 'none';
}

// Exibir modal de redefinir senha
function showForgotPasswordModal() {
    document.getElementById('forgot-password-modal').style.display = 'block';
}

// Fechar modal de redefinir senha
function closeForgotPasswordModal() {
    document.getElementById('forgot-password-modal').style.display = 'none';
}

// Inicializa a página
updateCartIcon();
displayCupcakes(cupcakes);

