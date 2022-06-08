const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText //valor impresso
        this.currentOperationText = currentOperationText //valor impresso
        this.currentOperation = "" //valor digitando
    }

    //adiciona numero na tela
    addNumber(Number) {
        console.log(Number)
        if (Number === "." && this.currentOperationText.innerText.includes(".")) { //se o número ja tiver ponto
            return
        }
        this.currentOperation = Number
        this.updateScreen()
    }


    //processamento das operações da calculadora
    processOperation(operation) {
        // se o valor tiver vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // Condição para mudar a operação
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation)
            }
            return
        }

        // Pega valores a serem utilizados (atual e anterior)
        let operationValue
        let previous = +this.previousOperationText.innerText.split(" ")[0] //pega o número de cima com o split
        let current = +this.currentOperationText.innerText

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "DEL":
                this.processDelOperator()
                break
            case "CE":
                this.processClearCurrentOperator()
                break
            case "C":
                this.processClearOperator()
                break
            case "=":
                this.processEqualOperator()
                break
            default:
                return
        }
    }

    // Muda os valores na tela
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation //o que digitar é acrescentado ao que foi digitado
        } else {
            // Se for a primeira operação, adiciona o valor lá em cima
            if (previous === 0) {
                operationValue = current
            }
            // Adiciona o valor atual ao antigo
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }

    // muda a operação matemática
    changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"]

        if (!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation
    }

    // deleta um numero
    processDelOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1)
    }

    // Limpa a operação atual
    processClearCurrentOperator() {
        this.currentOperationText.innerText = ""
    }

    // Limpar a operações
    processClearOperator() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

    // Processa a operação
    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation)
    }
}


const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => { //botão = btn e cada btn vai ter evento click e seu objeto (e)
    btn.addEventListener("click", (e) => {
        const valueText = e.target.innerText //pegar valor do que a pessoa selecionou

        if (+valueText >= 0 || valueText === ".") {
            console.log(valueText)
            calc.addNumber(valueText)
        } else {
            calc.processOperation(valueText)
        }
    })
})
