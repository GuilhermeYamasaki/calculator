const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor() {
        
    }
}

buttons.forEach((btn) => { //botão = btn e cada btn vai ter evento click e ação e
    btn.addEventListener("click", (e) => {
        const valueText = e.target.innerText
        
        if(+valueText >= 0 || valueText ===".") {
            console.log(valueText)
        } else {
            console.log("Op: " + valueText)
        }
    })
})