class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    }
    del() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
            //alert(isNan(prev))
            //alert(isNan(current))
            //if (isNaN(prev) || isNaN(current))
            //return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '^':
                computation = Math.pow(prev, current)
                break
            default:
                return

        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    squareRoot() {
        const current = parseFloat(this.currentOperand)
        const computation = Math.sqrt(current)
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }
    squared() {
        const current = parseFloat(this.currentOperand)
        const computation = current * current
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    cubed() {
        const current = parseFloat(this.currentOperand)
        const computation = current * current * current
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }


    chooseOperation(operation) {
        if (this.currentOperand !== '' && operation === '√') {
            this.compute()
        }

        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }


    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const squareRootButton = document.querySelector('.square_root')
const squaredButton = document.querySelector('.square')
const cubedButton = document.querySelector('.cube')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()


    })
})
deleteButton.addEventListener('click', button => {
    calculator.del()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()

})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()



    })

})
squareRootButton.addEventListener('click', button => {
    calculator.squareRoot()
    calculator.updateDisplay()
})
squaredButton.addEventListener('click', button => {
    calculator.squared()
    calculator.updateDisplay()
})
cubedButton.addEventListener('click', button => {
    calculator.cubed()
    calculator.updateDisplay()
})