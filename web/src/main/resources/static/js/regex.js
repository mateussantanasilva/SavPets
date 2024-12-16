// Regex CPF
const inputCPF = document.getElementById("cpf");

if (inputCPF != null) {
	inputCPF.addEventListener("keypress", () => {
		const inputLength = inputCPF.value.length;

		if (inputLength === 3 || inputLength === 7)
			inputCPF.value += ".";

		if (inputLength === 11)
			inputCPF.value += "-";
	})
}

// Regex Telefone
const inputTelefone = document.getElementById("telefone");

if (inputTelefone != null) {
	inputTelefone.addEventListener("keypress", () => {
		const inputLength = inputTelefone.value.length;

		if (inputLength === 0)
			inputTelefone.value += "(";

		if (inputLength === 3)
			inputTelefone.value += ")";

		if (inputLength === 4)
			inputTelefone.value += " ";

		if (inputLength === 9)
			inputTelefone.value += "-";
	})
}

// Regex CEP
const inputCEP = document.getElementById("cep");

if (inputCEP != null) {
	inputCEP.addEventListener("keypress", () => {
		const inputLength = inputCEP.value.length;

		if (inputLength === 5)
			inputCEP.value += "-";
	})
}

// Regex CNPJ
const inputCNPJ = document.getElementById("cnpj");

if (inputCNPJ != null) {
	inputCNPJ.addEventListener("keypress", () => {
		const inputLength = inputCNPJ.value.length;

		if (inputLength === 2)
			inputCNPJ.value += ".";
		if (inputLength === 6)
			inputCNPJ.value += ".";
		if (inputLength === 10)
			inputCNPJ.value += "/";
		if (inputLength === 15)
			inputCNPJ.value += "-";
	})
}

// Regex Data
const inputData = document.getElementById("data");

if (inputData != null) {
	inputData.addEventListener("keypress", () => {
		const inputLength = inputData.value.length;

		if (inputLength === 2 || inputLength === 5)
			inputData.value += "/";
	})
}