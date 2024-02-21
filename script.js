let num1;
let num2;
let operator;
let displayValue = 0;
const DISPLAY = document.querySelector("#display");
const NUMBERS = document.querySelectorAll(".number");

function add(a, b) {
	return a + b;
}

function substract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(operator, num1, num2) {
	switch (operator) {
		case "+":
			return add(num1, num2);
		case "-":
			return substract(num1, num2);
		case "*":
			return multiply(num1, num2);
		case "/":
			return divide(num1, num2);
		default:
			return "ERROR";
	}
}

NUMBERS.forEach((number) => {
	number.addEventListener("click", () => {
		let input = number.textContent;
		displayValue === 0 ? (displayValue = input) : (displayValue += input);
		DISPLAY.textContent = displayValue;
	});
});
