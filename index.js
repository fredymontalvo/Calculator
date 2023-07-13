document.addEventListener("DOMContentLoaded", function () {
    const buttonNumm = document.querySelectorAll(".number");
    const buttonOper = document.querySelectorAll(".operator");
    const buttonEqual = document.querySelector(".equal");
    const buttonErase = document.querySelector(".erase");
    const buttonEraseAll = document.querySelector(".erase-all");
    const textSuperiorValue = document.querySelector(".superior-value");
    const textInferiorValue = document.querySelector(".inferior-value");
  
    class Calculator {
      constructor(textInferiorValue, textSuperiorValue) {
        this.textInferiorValue = textInferiorValue;
        this.textSuperiorValue = textSuperiorValue;
        this.inferiorValue = "";
        this.superiorValue = "";
        this.operation = undefined; //para guardar la operacion que se va a realizar
      }
  
      addNumber(number) {
        if (number === "." && this.inferiorValue.includes(".")) return; //si el numero es un punto y ya hay un punto en la variable no hace nada
        this.inferiorValue = this.inferiorValue + number; //guardamos el valor del boton en la variable
      }
      updateDisplay() {
        this.textInferiorValue = this.inferiorValue; //mostramos el valor del boton en la pantalla
        this.textSuperiorValue = this.superiorValue;
      }
      erase() {
        this.textInferiorValue.innerText = this.textInferiorValue.innerText.slice(
          0,
          -1
        ); //eliminamos el ultimo valor de la variable
      }
      chooseOperation(operator) {
        if (this.inferiorValue === "") return; //si no hay valor en la variable no hace nada
        if (this.superiorValue !== "") {
          //si hay valor en la variable
          this.compute(); //llamamos al metodo compute
        }
        this.operator = operator; //guardamos el valor del boton en la variable
        this.superiorValue = this.inferiorValue;
        this.inferiorValue = ""; //limpiamos la variable
      }
  
      compute() {
        let result;
        let convertSuperiorValue = parseFloat(this.superiorValue); //convertimos el valor de la variable en un numero
        let convertInferiorValue = parseFloat(this.inferiorValue); //convertimos el valor de la variable en un numero
        if (isNaN(convertSuperiorValue) || isNaN(convertInferiorValue)) return; //si no es un numero no hace nada
  
        switch (
          this.operator //switch compara casos y cuando encuentra el caso que es igual al valor de la variable ejecuta el codigo.
        ) {
          case "+":
            result = convertSuperiorValue + convertInferiorValue;
            break;
          case "-":
            result = convertSuperiorValue - convertInferiorValue;
            break;
          case "*":
            result = convertSuperiorValue * convertInferiorValue;
            break;
          case "/":
            result = convertSuperiorValue / convertInferiorValue;
            break;
          default:
            return;
        }
        this.inferiorValue = result; //guardamos el resultado en la variable
        this.operator = undefined; //limpiamos la variable
        this.superiorValue = ""; //limpiamos la variable
      }
      eraseScreen() {
        this.inferiorValue = ""; //limpiamos la variable
        this.superiorValue = ""; //limpiamos la variable
        this.operator = undefined; //limpiamos la variable
      }
    }
  
    const calculator = new Calculator(textInferiorValue, textSuperiorValue); //creamos una instancia de la clase Calculator
  
    buttonNumm.forEach((button) => {
      button.addEventListener("click", () => {
        calculator.addNumber(button.innerText); //llamamos al metodo addNumber de la clase Calculator
        calculator.updateDisplay(); //llamamos al metodo updateDisplay de la clase Calculator
      });
    });
  
    buttonErase.addEventListener("click", () => {
      calculator.erase();
      calculator.updateDisplay();
    });
  
    buttonOper.forEach((button) => {
      button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText); //llamamos al metodo addNumber de la clase Calculator
        calculator.updateDisplay(); //llamamos al metodo updateDisplay de la clase Calculator
      });
    });
  
    buttonEqual.addEventListener("click", () => {
      calculator.compute(); //llamamos al metodo compute de la clase Calculator
      calculator.updateDisplay(); //llamamos al metodo updateDisplay de la clase Calculator
    });
  
    buttonEraseAll.addEventListener("click", () => {
      calculator.eraseScreen();
      calculator.updateDisplay();
    });
  });
  