const submitBTN = document.querySelector(".submit-BTN");
const inputName = document.querySelector(".input-name");
const list = document.querySelector(".list");
const inputMoney = document.querySelector(".input-money");

let inc = 0,
    exp = 0,
    balance = 0;
// let data = {
//     total: {
//         inc: 0,
//         exp: 0,
//     }
//     balance = 0;
// }

// let transactions = [];


// function showTransaction() {
//     const transaction = {
//         id: transactions.length,

//     }
// }

function addTransaction(e) {
    e.preventDefault();

    if (inputName.value && inputMoney.value) {
        let addClassList;
        if (inputMoney.value < 0) {
            addClassList = `item-exp`;
            exp += -inputMoney.value;
        } else {
            addClassList = `item-inc`;
            inc += +inputMoney.value;
        }
        const item = document.createElement("LI");
        item.classList.add("item");
        item.classList.add(addClassList);
        list.appendChild(item);
        item.innerHTML = `<span class="name">${inputName.value}</span>
        <span class="value">${inputMoney.value}</span>
        <button class="detele-BTN">
            <span>x</span>
        </button>`;
        updateMoney();
    } else {
        alert("mời bạn nhập vào ô nhập");
    }
}

function updateMoney(inputMoney) {
    const incMoney = document.querySelector(".inc-money");
    const expMoney = document.querySelector(".exp-money");
    const balanceMoney = document.querySelector(".balance");
    expMoney.innerHTML = `$${exp}.00`;
    incMoney.innerHTML = `$${inc}.00`;
    balance = inc - exp;
    balanceMoney.innerHTML = `$${balance}.00`;
}

function deleteTransaction(e) {
    const element = e.path.find(function(path) {
        return path.classList.contains("item");
    })
    const value = +element.querySelector('.value').innerHTML

    if (element.classList.contains("item-inc")) {
        inc -= value

    } else {
        exp -= -value
    }
    updateMoney();
    element.remove();
}



submitBTN.addEventListener("click", addTransaction);
list.addEventListener("click", deleteTransaction);