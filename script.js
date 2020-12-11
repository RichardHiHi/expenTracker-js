const submitBTN = document.querySelector(".submit-BTN");
const inputName = document.querySelector(".input-name");
const list = document.querySelector(".list");

const inputMoney = document.querySelector(".input-money");

let inc = 0,
    exp = 0,
    balance = 0;

function addTransaction(e) {
    e.preventDefault();
    console.log(inputName.value);
    console.log(typeof inputMoney.value);
    if (inputName.value && inputMoney.value) {
        let addClassList;
        if (inputMoney.value < 0) {
            addClassList = `item-exp`;
        } else {
            addClassList = `item-inc`;
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

function updateMoney() {
    const incMoney = document.querySelector(".inc-money");
    const expMoney = document.querySelector(".exp-money");
    const balanceMoney = document.querySelector(".balance");
    if (inputMoney.value < 0) {
        exp += -inputMoney.value;
        console.log(exp);
        expMoney.innerHTML = `$${exp}.00`;
    } else {
        inc += +inputMoney.value;
        console.log(inc);
        incMoney.innerHTML = `$${inc}.00`;
    }
    balance = inc - exp;
    balanceMoney.innerHTML = `$${balance}.00`;
}

function deleteTransaction(e) {
    console.log(e.path);
}

submitBTN.addEventListener("click", addTransaction);
list.addEventListener("click", deleteTransaction);