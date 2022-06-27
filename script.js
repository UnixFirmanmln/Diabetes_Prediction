getFormData = (selector) => Object.fromEntries(new FormData(document.querySelector(selector)));

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x)); // if result > 0.5
}

function predict() {
  fetch('diabetes_model.json')
    .then(response => response.json())
    .then(jsonData => {
      const params = jsonData['params'];

      let weights = [];
      weights.push(params['intercept'][0]);
      weights.push(...params['coefficient'][0]);

      console.log(params);
      console.log(weights);
    });
}


const process = () =>{
    let input_pregnancies = document.getElementById("id_pregnancies").value;
    let input_glucose = document.getElementById("id_glucose").value;
    let input_bloodPressure = document.getElementById("id_bloodPressure").value;
    let input_skinThickness = document.getElementById("id_skinThickness").value;
    let input_insulin = document.getElementById("id_insulin").value;
    let input_bmi = document.getElementById("id_bmi").value;
    let input_diabetesPedigreeFunction = document.getElementById("id_diabetesPedigreeFunction").value;
    let input_age = document.getElementById("id_age").value;
    
    document.getElementById("out_input_pregnancies").innerHTML = input_pregnancies; 
}

predict();
