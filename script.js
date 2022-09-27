// Swap Theme

const theme = document.getElementById('themeSelector');
const value = document.getElementById('rangevalue');
const head = document.querySelector('head')


theme.addEventListener('click', () => {
    const theme = value.innerText;
    if (theme === '1') {
     const link = document.createElement('div');
     link.innerHTML = '<link rel="stylesheet" href="style.css"></link>';
     head.appendChild(link);
    }
    if (theme === '2') {
        const link = document.createElement('div');
        link.innerHTML = '<link rel="stylesheet" href="theme2.css"></link>';
        head.appendChild(link);
    }
    if (theme === '3') {
        const link = document.createElement('div');
        link.innerHTML = '<link rel="stylesheet" href="theme3.css"></link>';
        head.appendChild(link);
    }
});


// Calculator logic


const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equal]');
const del = document.querySelector('[data-delete]');
const reset = document.querySelector('[data-reset]');
const previousResult = document.querySelector('[data-previous-result]');
const result = document.querySelector('[data-result]');

class Calculator {
    constructor(previousResult, result) {
        this.previousResult = previousResult;
        this.result = result;
        this.clear();
    }

    clear() {
        this.res = '';
        this.previousRes = '0';
        this.operations = undefined;
    }

    delete() {
        this.res = this.res.toString().slice(0 , -1);
    }

    appendNumber(number) {
        if (number === '.' && this.res.includes('.')) return
        this.res = this.res.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.res === '') return
        if (this.previousRes !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousRes = this.res;
        this.res = '';
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousRes)
        const current = parseFloat(this.res)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
            break
            case '-':
                computation = prev - current
            break
            case 'x':
                computation = prev * current
            break
            case '/':
                computation = prev / current
            break

        default: 
            return

        }

        this.res = computation
        this.operation = undefined
        this.previousRes = ''
    }

    updateDisplay() {
        this.result.innerText = this.res;
        if (this.operation != null) {
            this.previousResult.innerText = 
            `${this.previousRes} ${this.operation}`;
        } else {
            this.previousResult.innerText = this.previousRes;
        }
    }
}

const calculator = new Calculator(previousResult, result);

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equals.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

reset.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

del.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});








 

