document.addEventListener("DOMContentLoaded", function () {
  // cuando se cargue el documento ejecuta el codigo
  const buttonNumm = document.querySelectorAll(".number"); //  seleccionamos todos los botones que tengan la clase number
  const buttonOper = document.querySelectorAll(".operator"); //  seleccionamos todos los botones que tengan la clase operator
  const buttonEqual = document.querySelector(".equal");
  const buttonErase = document.querySelector(".erase");
  const buttonEraseAll = document.querySelector(".erase-all");
  const textSuperiorValue = document.querySelector(".superior_value");
  const textInferiorValue = document.querySelector(".inferior_value");

  class Calculator {
    constructor(textInferiorValue, textSuperiorValue) {
      this.textInferiorValue = textInferiorValue;
      this.textSuperiorValue = textSuperiorValue;
      this.inferiorValue = "";
      this.superiorValue = "";
      this.operator = undefined; //para guardar la operacion que se va a realizar
    }
    addNumber(number) {
      if (number === "." && this.inferiorValue.includes(".")) return; //si el numero es un punto y el valor inferior incluye un punto no hace nada.
      this.inferiorValue += number; //concatena el numero que se presiona
    }
    updateDisplay() {
      this.textInferiorValue.textContent = this.inferiorValue;
      this.textSuperiorValue.textContent = this.superiorValue;
    }
    erase() {
      this.inferiorValue = this.inferiorValue.slice(0, -1); //elimina el ultimo elemento de la cadena
    }
    chooseOperation(operator) {
      if (this.inferiorValue === "") return; //
      if (this.superiorValue !== "") {
        this.compute(); //si el valor superior no esta vacio realiza la operacion
      }
      this.operator = operator; //guarda el operador
      this.superiorValue = this.inferiorValue; //guarda el valor inferior en el superior
      this.inferiorValue = ""; //limpia el valor inferior
    }
    compute() {
      let result;
      let convertSuperiorValue = parseFloat(this.superiorValue);
      let convertInferiorValue = parseFloat(this.inferiorValue);
      if (isNaN(convertSuperiorValue) || isNaN(convertInferiorValue)) return; //si no es un numero no hace nada
      switch (this.operator) {
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
        case "%":
          result = (convertSuperiorValue * convertInferiorValue) / 100;
        default: //si no se cumple ninguno de los casos no hace nada
          return;
      }
      this.inferiorValue = result.toString();
      this.operator = undefined;
      this.superiorValue = "";
    }
    eraseScreen() {
      this.inferiorValue = "";
      this.superiorValue = "";
      this.operator = undefined;
    }
  }
  const calculator = new Calculator(textInferiorValue, textSuperiorValue);

  buttonNumm.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.addNumber(button.textContent);
      calculator.updateDisplay();
    });
  });
  buttonErase.addEventListener("click", () => {
    calculator.erase();
    calculator.updateDisplay();
  });

  buttonOper.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.chooseOperation(button.textContent);
      calculator.updateDisplay();
    });
  });

  buttonEqual.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
  });

  buttonEraseAll.addEventListener("click", () => {
    calculator.eraseScreen();
    calculator.updateDisplay();
  });
});
