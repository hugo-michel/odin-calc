const TEST = document.querySelector("#test");
let currVall = null;
let prevValue = null;
let operator = null;
const DISPLAY = document.querySelector("#display");
const NUMBERS = document.querySelectorAll(".number");
const OPERATOR = document.querySelectorAll(".sign");
const RESULT = document.querySelector("#result");
const CLEAR = document.querySelector("#clear");
const CLEARLAST = document.querySelector("#clearLast");
const POINT = document.querySelector("#point");
const ARRAYNUM = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const ARRAYSIGN = ["+", "-", "*", "/"];
const SIGNSPECIAL = document.querySelector(".signSpecial");

// TEST.addEventListener("click", () => {
//     console.log(`
//         currValue : ${currVall},
//         prevValue : ${prevValue},
//         operator : ${operator}
//     `);
// })

function add(a, b) {
	let result = a + b;
	return Math.round(result * 1000000) / 1000000;
}

function substract(a, b) {
	let result = a - b;
	return Math.round(result * 1000000) / 1000000;
}

function multiply(a, b) {
	let result = a * b;
	return Math.round(result * 1000000) / 1000000;
}

function divide(a, b) {
	let result = a / b;
	return Math.round(result * 1000000) / 1000000;
}

function operate(operator, num1, num2) {
	switch (operator) {
		case "+":
			return add(num1, num2);
		case "-":
			return substract(num1, num2);
		case "x":
			return multiply(num1, num2);
		case "*":
			return multiply(num1, num2);
		case "/":
			if (num2 == 0) {
				currVall = null;
				prevValue = null;
				return "LOL";
			}
			return divide(num1, num2);
		default:
			return "ERROR";
	}
}

//afficahge nombre selectionné
NUMBERS.forEach((number) => {
	number.addEventListener("click", () => {
		let input = number.textContent;
		currVall === null ? (currVall = input) : (currVall += input);
		DISPLAY.textContent = currVall;
	});
});

POINT.addEventListener("click", () => {
	let test = currVall.includes(".");
	if (!test) {
		let input = ".";
		currVall === null ? (currVall = input) : (currVall += input);
		DISPLAY.textContent = currVall;
	}
});

//s'il y a un nb precedent (deja tapé 1 nb + 1 operateur) => fait le alcul operate(), sinon prevalue = curvalue
OPERATOR.forEach((sign) => {
	sign.addEventListener("click", () => {
		if (!prevValue) {
			prevValue = currVall;
			currVall = null;
		} else if (currVall && prevValue) {
			let result = operate(operator, Number(prevValue), Number(currVall));
			DISPLAY.textContent = result;
			prevValue = result;
			currVall = null;
		}
		operator = sign.textContent;
	});
});

//btn =
RESULT.addEventListener("click", () => {
	if (currVall && prevValue && operator) {
		let result = operate(operator, Number(prevValue), Number(currVall));
		DISPLAY.textContent = result;
		prevValue = result;
		currVall = null;
	}
});

//btn clear
CLEAR.addEventListener("click", () => {
	currVall = null;
	prevValue = null;
	operator = null;
	DISPLAY.textContent = "0";
});

//btn clear last
CLEARLAST.addEventListener("click", () => {
	let correction = currVall.slice(0, -1);
	currVall = correction;
	DISPLAY.textContent = currVall;
});

//function pour toggle active sur element au clavier
function inputIsActive(str) {
	str.classList.toggle("active");
	setTimeout(() => {
		str.classList.toggle("active");
	}, 100);
}

//support clavier (uniquement pavé num). Toutes les fonctionnalités sauf clear all (quelle touche ??)
document.addEventListener("keydown", (event) => {
	if (event.key === ".") {
		inputIsActive(POINT);
		let test = currVall.includes(".");
		if (!test) {
			let input = ".";
			currVall === null ? (currVall = input) : (currVall += input);
			DISPLAY.textContent = currVall;
		}
	}

	if (ARRAYNUM.includes(event.key)) {
		let input = event.key;
		currVall === null ? (currVall = input) : (currVall += input);
		DISPLAY.textContent = currVall;

		NUMBERS.forEach((number) => {
			if (number.textContent === event.key) {
				inputIsActive(number);
			}
		});
	}

	if (ARRAYSIGN.includes(event.key)) {
		OPERATOR.forEach((operator) => {
			if (operator.textContent === event.key) {
				inputIsActive(operator);
			}
		});

		if (event.key === "*") {
			inputIsActive(SIGNSPECIAL);
		}

		if (!prevValue) {
			prevValue = currVall;
			currVall = null;
		} else if (currVall && prevValue) {
			let result = operate(operator, Number(prevValue), Number(currVall));
			DISPLAY.textContent = result;
			prevValue = result;
			currVall = null;
		}
		operator = event.key;
	}

	if (event.key === "Enter") {
		inputIsActive(RESULT);
		if (currVall && prevValue && operator) {
			let result = operate(operator, Number(prevValue), Number(currVall));
			DISPLAY.textContent = result;
			prevValue = result;
			currVall = null;
		}
	}

	if (event.key === "Backspace") {
		inputIsActive(CLEARLAST);
		let correction = currVall.slice(0, -1);
		currVall = correction;
		DISPLAY.textContent = currVall;
	}
});
