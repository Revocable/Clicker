let coins = 0;
let coinsText = document.querySelector("#coinsText");
let buttonComprar = document.querySelectorAll(".buttonComprar");

// Função para clicar na área
function Click() {
    coins++;
    console.log(coins);
    coinsText.innerHTML = `${coins}`;
    picareta.style.transform = 'rotate(90deg)';
    setTimeout(() => {
        picareta.style.transform = 'rotate(0deg)';
    }, 40);
    clickArea.style.transform = 'scale(0.9)';
    setTimeout(()=>{
        clickArea.style.transform = 'scale(1)';
    }, 40);

}

// Seleciona a área de clique e adiciona um ouvinte de evento de clique
let clickArea = document.querySelector("#clickArea");
clickArea.addEventListener("click", Click);

// Inicializa a lista de itens
let itens = [];

// Função para atualizar as moedas
function refreshCoins() {
    itens.forEach(element => {
        switch (element) {
            case 1:
                coins += 0.2;
                break;
            case 2:
                coins += 6;
                break;
        }
    });
    coins = parseFloat(coins.toFixed(1));
    coinsText.innerHTML = `${coins}`;

    // Atualiza o cache do navegador
    updateLocalStorage();
}

// Função para comprar um item
function Comprar(item, elemento) {
    switch (item) {
        case "1":
            if (coins >= 20) {
                itens.push(1);
                coins -= 20;
            }
            break;
        case "2":
            if(coins >= 1500){
                itens.push(2);
                coins -= 1500;
            }
            break;
    }

    let id = elemento.parentElement.parentElement;
    let qtde = 0;
    itens.forEach(element => {
        if(element == item){
            qtde +=1;
        }
    });
    
    id.querySelector(".qtde").innerHTML = `${qtde}X`;
    
    updateLocalStorage();
}

function repopularQuantidades() {
    let qtdeElements = document.querySelectorAll(".qtde");
    qtdeElements.forEach(qtdeElement => {
        let itemId = qtdeElement.parentElement.id;
        let qtde = itens.filter(item => item == itemId).length;
        qtdeElement.innerHTML = `${qtde}X`;
    });
}


buttonComprar.forEach(element => {
    element.addEventListener("click", () =>{
        let item = element.parentElement.parentElement.id;
        Comprar(item,element);
    })
});

let picareta = document.getElementById('picareta');

// Função para atualizar o armazenamento local com moedas e itens
function updateLocalStorage() {
    localStorage.setItem('coins', coins);
    localStorage.setItem('itens', JSON.stringify(itens));
}

// Função para recuperar dados do armazenamento local
function retrieveData() {
    let savedCoins = localStorage.getItem('coins');
    if (savedCoins !== null) {
        coins = parseInt(savedCoins);
    }

    let savedItens = localStorage.getItem('itens');
    if (savedItens !== null) {
        itens = JSON.parse(savedItens);
    }
}

function limparDadosUsuario() {
    localStorage.removeItem('coins');
    localStorage.removeItem('itens');
    window.location.reload();
}

    let botaoLimpar = document.querySelector("#botaoLimpar")
    botaoLimpar.addEventListener('click', limparDadosUsuario);



// Recupera dados do armazenamento local ao carregar a página
window.onload = function () {
    retrieveData();
    refreshCoins();
    repopularQuantidades();
};

setInterval(refreshCoins, 100);