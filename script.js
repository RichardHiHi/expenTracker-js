const submitBTN = document.querySelector(".submit-BTN");
const inputName = document.querySelector(".input-name");
const list = document.querySelector(".list");
const inputMoney = document.querySelector(".input-money");


let data = {
    total: {
        inc: 0,
        exp: 0,
    },
    balance: 0,
    countID: 0
}


let transactionList = [];




function addTransaction(e) {
    e.preventDefault();
    let className;
    if (inputName.value && inputMoney.value) {
        if (inputMoney.value < 0) {
            className = `item-exp`;
        } else {
            className = `item-inc`;
        }
        const transaction = {
            id: data.countID,
            className: className,
            name: inputName.value,
            money: inputMoney.value,
        }
        transactionList.push(transaction);
        data.countID += 1;
        updateTransaction();
        updatelocalStorage()
    } else {
        alert('moi ban nhap');
    }


}

function updateTransaction() {
    //clear list of transactions
    list.innerHTML = ``;

    transactionList.forEach(function(transaction) {
        const item = document.createElement("LI");
        item.classList.add("item");
        item.classList.add(transaction.className);
        list.appendChild(item);
        item.innerHTML = `<span class="name">${transaction.name}</span>
        <span class="value">${transaction.money}</span>
        <button class="detele-BTN" onclick="removeTransaction(${transaction.id})">
            <span>x</span>
        </button>`;
    })

    //caculate total of exp
    const arrExp = transactionList.filter((transaction) => {
        return transaction.money < 0;
    })
    if (arrExp.length > 0) {
        data.total.exp = arrExp.reduce((acc, transaction) => {
            return acc + -transaction.money
        }, 0)
    } else {
        data.total.exp = 0;
    }


    //caculate total of inc
    const arrInc = transactionList.filter((transaction) => {
        return transaction.money > 0;
    })
    if (arrInc.length > 0) {
        data.total.inc = arrInc.reduce((acc, transaction) => {
            return acc + +transaction.money;
        }, 0)
        console.log(typeof data.total.inc)
    } else {
        data.total.inc = 0;
    }

    //caulate balance
    data.balance = data.total.inc - data.total.exp;
    //add to DOM
    const incMoney = document.querySelector(".inc-money");
    const expMoney = document.querySelector(".exp-money");
    const balanceMoney = document.querySelector(".balance");
    expMoney.innerHTML = `$${data.total.exp.toFixed(2)}`;
    incMoney.innerHTML = `$${data.total.inc.toFixed(2)}`;
    balanceMoney.innerHTML = `$${data.balance}`;
    console.log(transactionList);
};

function updatelocalStorage() {
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('transaction', JSON.stringify(transactionList));
}

function removeTransaction(id) {
    transactionList = transactionList.filter(transaction => transaction.id !== id);
    updateTransaction();
    updatelocalStorage();
}

function init() {
    data = JSON.parse(localStorage.getItem('data'));
    transactionList = JSON.parse(localStorage.getItem('transaction'));
    updateTransaction();
}

submitBTN.addEventListener("click", addTransaction);
init();