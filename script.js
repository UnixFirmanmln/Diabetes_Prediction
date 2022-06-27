getFormData = (selector) => Object.fromEntries(new FormData(document.querySelector(selector)));

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x)); // if result > 0.5
}

function predict(input) {
  fetch('diabetes_model.json')
    .then(response => response.json())
    .then(jsonData => {
      const params = jsonData['params'];

      const input_with_bias = [1, ...input];

      let weights = [];
      weights.push(params['intercept'][0]);
      weights.push(...params['coefficient'][0]);

      if (input_with_bias.length !== weights.length) {
        console.log("Error: input and weights have different length");
        return;
      }

      let sum = 0;
      for (let i = 0; i < input_with_bias.length; i++) {
        sum += input_with_bias[i] * weights[i];
      }

      const output = sigmoid(sum);

      console.log(sum);
      console.log(output);

      if (output > 0.5) {
        document.getElementById("result").innerHTML = "Diabetic";
      } else {
        document.getElementById("result").innerHTML = "Not diabetic";
      }
    });
}


const process = () => {
  let input_pregnancies = parseFloat(document.getElementById("id_pregnancies").value);
  let input_glucose = parseFloat(document.getElementById("id_glucose").value);
  let input_bloodPressure = parseFloat(document.getElementById("id_bloodPressure").value);
  let input_skinThickness = parseFloat(document.getElementById("id_skinThickness").value);
  let input_insulin = parseFloat(document.getElementById("id_insulin").value);
  let input_bmi = parseFloat(document.getElementById("id_bmi").value);
  let input_diabetesPedigreeFunction = parseFloat(document.getElementById("id_diabetesPedigreeFunction").value);
  let input_age = parseFloat(document.getElementById("id_age").value);

  const input = [input_pregnancies, input_glucose, input_bloodPressure, input_skinThickness, input_insulin, input_bmi, input_diabetesPedigreeFunction, input_age];

  predict(input);
}
