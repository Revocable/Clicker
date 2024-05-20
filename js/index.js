let coins = 200;
let coinsText = document.querySelector("#coinsText");
let buttonComprar = document.querySelectorAll(".buttonComprar");

function Click() {
    coins++;
    console.log(coins);
    coinsText.innerHTML = `Coins: ${coins}`;

}

let clickArea = document.querySelector("#clickArea");

clickArea.addEventListener("click", Click);

let itens = [];

function refreshCoins() {
    itens.forEach(element => {
        switch (element) {
            case 1:
                coins += 2;
        }
    });

    coinsText.innerHTML = `Coins: ${coins}`;
}

function Comprar(item) {
    switch (item) {
        case "1":
            if (coins >= 200) {
                itens.push(1);
                coins-=200;
            }
    }
}

buttonComprar.forEach(element => {
    element.addEventListener("click", () =>{
        let item = element.parentElement.id;
        console.log(item);  
        Comprar(item);
    })
    
    
});



setInterval(refreshCoins, 1000);