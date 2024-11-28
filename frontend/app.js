document.addEventListener('DOMContentLoaded', function() {
    const cupcakes = [
        { name: 'Cupcake de Baunilha', image: 'https://br.freepik.com/fotos-gratis/deliciosa-variedade-de-cupcakes-com-esmalte_15852462.htm#fromView=keyword&page=1&position=10&uuid=c7799a20-b4f3-48a2-90fa-73086359be9f' },
        { name: 'Cupcake de Chocolate', image: 'https://s2-receitas.glbimg.com/qnGmSYvyFRY6VZUt8rCESvKtKps=/0x0:600x538/984x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2014/06/11/18_45_10_844_ultimate_chocolate_cupcakes_1_600.jpg' },
        { name: 'Cupcake de Morango', image: 'https://www.istockphoto.com/br/foto/cupcakes-de-morango-gm467245498-60970062?searchscope=image%2Cfilm' }
    ];

    const cupcakeList = document.getElementById('cupcake-list');

    cupcakes.forEach(cupcake => {
        const cupcakeElement = document.createElement('div');
        cupcakeElement.classList.add('cupcake-item');
        cupcakeElement.innerHTML = `
            <img src="${cupcake.image}" alt="${cupcake.name}">
            <p>${cupcake.name}</p>
        `;
        cupcakeList.appendChild(cupcakeElement);
    });
});
