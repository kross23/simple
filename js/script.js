"use strict";

const start = document.getElementById("start"); //Кнопку "Рассчитать" через id

// alert(' ошибка,поле "месячный доход" должно быть заоплнено ! ');

start.disabled = true;

let btnPlusIcome = document.getElementsByTagName("button")[0],
    btnPlusExpenses = document.getElementsByTagName("button")[1],
    depositCheck = document.querySelector("#deposit-check"),
    additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
    periOd = document.querySelector(".period-select"),
    targetAmount = document.querySelector(".target-amount"),
    expensesItem = document.querySelectorAll(".expenses-items"),
    incomeItems = document.querySelectorAll(".income-items"),
    salaryAmount = document.querySelector(".salary-amount"),
    result = document.getElementsByClassName("result")[0],
    budgetMonthValue = result.getElementsByClassName("budget_month-value")[0],
    budgetDayValue = result.getElementsByClassName("budget_day-value")[0],
    expensesMonthValue = result.getElementsByClassName("expenses_month-value")[0],
    additionalIncomeValue = result.getElementsByClassName(
        "additional_income-value"
    )[0],
    additionalExpensesValue = result.getElementsByClassName(
        "additional_expenses-value"
    )[0],
    //accumulatedMonthValue = document.querySelector('.accumulated_month-value')[0];

    incomePeriodValue = result.getElementsByClassName("income_period-value")[0],
    targetMonthValue = result.getElementsByClassName("target_month-value")[0],
    additionalExpensesItem = document.querySelector(".additional_expenses-item"),
    periodSelect = document.querySelector(".period-select"),
    incomeItem = document.querySelectorAll(".income-items"),
    periodAmount = document.querySelector(".period-amount");

//console.log("periodSelect: ", periodSelect.value);

//console.log("start: ", start);

let money,
    IsNamber = (n) => !isNaN(parseFloat(n)) && isFinite(n); //!isNaN(parseFloat(n)) && n !== '';

const appData = {
    budget: 0,

    income: {}, //

    addIncome: [],

    IncomeSumm: 0,

    incomeMonth: 0,

    expenses: {},

    addExpenses: [],

    cashIncome: 0,

    deposit: false,

    percentDeposit: 0,

    manyDeposit: 0,

    mission: 150000,

    period: 3,

    budgetDay: 0,

    budgetMonth: 0,

    expensesMonth: 0,

    start: () => {
        // return;///document.getElementById("MyButton").disabled = true;

        appData.budget = +salaryAmount.value;

        console.log("appData.budget: ", appData.budget);

        console.log("salaryAmount.value: ", salaryAmount.value);

        appData.getExpenses();

        // appData.asking();

        appData.getExpensesMonth();

        appData.getBudget();

        appData.getAddExpenses();

        appData.getAddIncam();

        appData.getIcome();

        appData.showResult();
    },

    showResult: () => {
        budgetMonthValue.value = appData.budgetMonth;

        budgetDayValue.value = appData.budgetDay;

        expensesMonthValue.value = appData.expensesMonth;

        additionalExpensesValue.value = appData.addExpenses.join(", ");

        additionalIncomeValue.value = appData.addIncome.join(", ");

        targetMonthValue.value = Math.ceil(appData.getTargetMonth());

        incomePeriodValue.value = appData.calcSavedMoney();

        periodSelect.addEventListener("input", () => {
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },

    addExpensesBlock: () => {
        //console.log('', expensesItem.parentNode);

        const cloneExpensesItem = expensesItem[0].cloneNode(true);

        const expenValue = cloneExpensesItem.querySelector(".expenses-title"),
            expenAmount = cloneExpensesItem.querySelector(".expenses-amount");

        expenValue.value = "";

        expenAmount.value = "";

        expensesItem[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpenses);

        expensesItem = document.querySelectorAll(".expenses-items");

        if (expensesItem.length === 3) {
            btnPlusExpenses.style.display = "none";
        }
    },

    getExpenses: () => {
        expensesItem.forEach((item) => {
            // console.log('item', item);

            const itemExpenses = item.querySelector(".expenses-title").value;

            const keshExpenses = item.querySelector(".expenses-amount").value;

            if (itemExpenses !== "" && keshExpenses !== "") {
                appData.expenses[itemExpenses] = keshExpenses;
            }
        });
    },

    addIncomeBlock: () => {
        const cloneincomeItems = incomeItems[0].cloneNode(true);

        const incomValue = cloneincomeItems.querySelector(".income-title"),
            incomAmount = cloneincomeItems.querySelector(".income-amount");

        incomValue.value = "";

        incomAmount.value = "";

        incomeItems[0].parentNode.insertBefore(cloneincomeItems, btnPlusIcome);

        incomeItems = document.querySelectorAll(".income-items");

        console.log("leigh", incomeItems.length);

        if (incomeItems.length === 3) {
            btnPlusIcome.style.display = "none";
        }
    },

    getIcome: () => {
        incomeItems.forEach((item) => {
            // console.log('item', item);

            const itemIncome = item.querySelector(".income-title").value;

            const keshIncome = item.querySelector(".income-amount").value;

            if (itemIncome !== "" && keshIncome !== "") {
                appData.income[itemIncome] = keshIncome;
            }

            console.log("appData.income", appData.income);
        });

        //...............................

        for (const key in appData.income) {
            appData.incomeMonth += appData.income[key];
        }
    },

    getAddExpenses: () => {
        const addExpenses = additionalExpensesItem.value.split(",");

        addExpenses.forEach((item) => {
            item = item.trim();

            if (item !== "") {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncam: () => {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();

            if (itemValue !== "") {
                appData.addIncome.push(itemValue);
            }
        });
    },

    //---методы----

    getExpensesMonth: () => {
        for (const i in appData.expenses) {
            appData.expensesMonth += +appData.expenses[i];
        }

        console.log("сумма расходов-", appData.expensesMonth);
    },

    getBudget: () => {
        // пере

        appData.budgetMonth = appData.budget - appData.expensesMonth;

        console.log(
            "appData.expensesMonth: ",

            appData.expensesMonth,

            typeof appData.expensesMonth
        );

        console.log("appData.budget: ", appData.budget, typeof appData.budget);

        console.log("appData.budgetMonth: ", appData.budgetMonth);

        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },

    getTargetMonth: () => targetAmount.value / appData.budgetMonth,

    getStatusIncome: () => {
        // функция урвень дохода

        if (appData.budgetDay > 1200) {
            console.log("у вас высокий уровень дохода");
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            console.log("у вас средний уровень дохода");
        } else if (appData.budgetDay < 600 && appData.budgetDay >= 1) {
            console.log("у вас низкий уровень дохода");
        } else {
            console.log("Что то пошло не так");
        }
    },

    getInfoDeposit: () => {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt("годовой процент ?", 0.5);
            } while (
                !IsNamber(appData.percentDeposit) ||
                appData.percentDeposit === "" ||
                appData.percentDeposit === null
            );

            do {
                appData.manyDeposit = prompt("сумма депозита ", 10000);
            } while (
                !IsNamber(appData.manyDeposit) ||
                appData.manyDeposit === "" ||
                appData.manyDeposit === null
            );

            appData.percentDeposit = +appData.percentDeposit;

            appData.manyDeposit += appData.manyDeposit;
        }
    },

    calcSavedMoney: () => appData.budgetMonth * periodSelect.value,
};

salaryAmount.addEventListener("input", () => {
    if (salaryAmount.value !== "" && IsNamber(salaryAmount.value)) {
        //start.setAttribute('disabled' , false);//start.removeAttribute(disabled);

        start.removeAttribute("disabled");
    } else {
        start.disabled = true;
    }
});

start.addEventListener("click", appData.start);

//........................................................

btnPlusExpenses.addEventListener("click", appData.addExpensesBlock);

btnPlusIcome.addEventListener("click", appData.addIncomeBlock);

periodSelect.addEventListener("input", () => {
    periodAmount.innerHTML = periodSelect.value;
});