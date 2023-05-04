const { Big } = require('bigdecimal.js');

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

let prevBigNum = new Big('0');
let prevOperator = null;
let isPrevStepCalc = false;

const calcWithDisplayNum = (operator) => {
    console.log(prevBigNum.toString(), operator, display.innerText);
    switch (operator) {
        case 'divide': {
            try {
                prevBigNum = prevBigNum.divide(display.innerText);
            } catch (e) {
                console.error(e);
                prevBigNum = new Big('0');
                window.alert('Error: divide by 0');
            }
            break;
        }
        case 'multiply': {
            prevBigNum = prevBigNum.multiply(display.innerText);
            break;
        }
        case 'subtract': {
            prevBigNum = prevBigNum.subtract(display.innerText);
            break;
        }
        case 'add': {
            prevBigNum = prevBigNum.add(display.innerText);
            break;
        }
        default: {
            break;
        }
    }
    display.innerText = prevBigNum.toString();
};

buttons.forEach(button => {
    button.addEventListener('click', event => {
        const target = event.target;
        console.log(target.id, target.innerText);
        switch (target.id) {
            case 'ac': {
                prevBigNum = new Big('0');
                prevOperator = null
                display.innerText = '0';
                isPrevStepCalc = false;
                break;
            }
            case 'negative':
                if (display.innerText === '0') {
                    break;
                }
                display.innerText = new Big(display.innerText).multiply(-1).toString();
                isPrevStepCalc = true;
                break;
            case 'percentage': {
                if (display.innerText === '0') {
                    break;
                }
                const displayBigNum = new Big(display.innerText);
                display.innerText = displayBigNum.divide(100).toString();
                isPrevStepCalc = true;
                break;
            }
            case 'divide': {
                if (prevOperator) {
                    calcWithDisplayNum(prevOperator);
                }
                prevOperator = 'divide';
                isPrevStepCalc = true;
                break;
            }
            case 'multiply': {
                if (prevOperator) {
                    calcWithDisplayNum(prevOperator);
                }
                prevOperator = 'multiply';
                isPrevStepCalc = true;
                break;
            }
            case 'subtract': {
                if (prevOperator) {
                    calcWithDisplayNum(prevOperator);
                }
                prevOperator = 'subtract';
                isPrevStepCalc = true;
                break;
            }
            case 'add': {
                if (prevOperator) {
                    calcWithDisplayNum(prevOperator);
                }
                prevOperator = 'add';
                isPrevStepCalc = true;
                break;
            }
            case 'equals': {
                if (prevOperator) {
                    calcWithDisplayNum(prevOperator);
                }
                prevOperator = null;
                isPrevStepCalc = true;
                break;
            }
            default: {
                if (isPrevStepCalc) {
                    isPrevStepCalc = false;
                    prevBigNum = new Big(display.innerText);
                    display.innerText = '';
                }

                if (target.innerText === '.' && !display.innerText.includes('.')) {
                    break;
                }
                if (display.innerText === '0' && target.innerText !== '.') {
                    display.innerText = target.innerText;
                } else {
                    display.innerText += target.innerText;
                }
                break;
            }
        }
    });
});