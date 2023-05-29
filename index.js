const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const entryBoxes = document.querySelectorAll('.entry-section');
const metric = document.querySelector('#metric');
const imperial = document.querySelector('#imperial');
const calculatorSection = document.querySelector('.calculator-section');
const measurementsSection = document.querySelector('.measurements-section');
const heightMetric = document.querySelector('.height-metric');
const weightMetric = document.querySelector('.weight-metric');
const heightImperial = document.querySelector('.height-imperial');
const weightImperial = document.querySelector('.weight-imperial');
const heightFtInput  = document.querySelector('#height-ft');
const heightInInput = document.querySelector('#height-in');
const weightStInput = document.querySelector('#weight-st');
const weightLbInput = document.querySelector('#weight-lb');
const bmiResultHTML = document.querySelector('.bmi-result-meaning');
const initialState = document.querySelector('.initial-state');
const activeState = document.querySelector('.active-state');
let previous;
let heightMetres;
let weight;

metric.addEventListener('change', function () {
    if (this.checked) {
        calculatorSection.style.height = "448px";
        calculatorSection.style.top = "181px";
        measurementsSection.style.flexDirection = "row";
        heightMetric.classList.remove('hidden');
        weightMetric.classList.remove('hidden');
        heightImperial.classList.add('hidden');
        weightImperial.classList.add('hidden');
    }
});


imperial.addEventListener('change', function () {
    if (this.checked) {
        if (window.innerWidth >= 376) {
            calculatorSection.style.height = "606px";
            calculatorSection.style.top = "166px";
            measurementsSection.style.flexDirection = "column";
            heightMetric.classList.add('hidden');
            weightMetric.classList.add('hidden');
            heightImperial.classList.remove('hidden');
            weightImperial.classList.remove('hidden');    
        } else {
            for (let entryBox of entryBoxes) {
                entryBox.style.width = "132px";
                entryBox.style.gap = "16px";
            }
            const imperialInputs = [heightFtInput, heightInInput, weightStInput, weightLbInput];
            for (let inputBox of imperialInputs) {
                inputBox.style.width = "43px";
            }
        }

    }
});

for (let entryBox of entryBoxes) {
    entryBox.addEventListener('click', function () {
        previous = document.querySelector('.targeted');
        entryBox.classList.add('targeted');
        previous.classList.remove('targeted');
    });
}

heightInput.addEventListener('input', calculateBMI);
weightInput.addEventListener('input', calculateBMI);
heightFtInput.addEventListener('input', calculateBMI);
heightInInput.addEventListener('input', calculateBMI);
weightStInput.addEventListener('input', calculateBMI);
weightLbInput.addEventListener('input', calculateBMI);

function calculateBMI () {

    if (metric.checked) {
        const height = parseFloat(heightInput.value);
        weight = parseFloat(weightInput.value);
        heightMetres = height / 100;
    } else {
        const heightFt = parseFloat(heightFtInput.value);
        const heightIn = parseFloat(heightInInput.value);
        const weightSt = parseFloat(weightStInput.value);
        const weightLb = parseFloat(weightLbInput.value);
        heightMetres = (heightFt * 0.3048) + (heightIn * 0.0254);
        weight = (weightSt * 6.35029) + (weightLb * 0.453592);
    }


    if (heightMetres && weight > 10) {
        const bmi = (weight / (heightMetres * heightMetres)).toFixed(1);
        const bmiHTML = document.querySelector('.bmi-reading');
        bmiHTML.innerHTML = bmi;

        let bmiResult;
        if (bmi < 18.5) {
            bmiResult = 'underweight';
        } else if (bmi < 25) {
            bmiResult = 'a healthy weight';
        } else if (bmi < 30) {
            bmiResult = 'overweight';
        } else {
            bmiResult = 'obese';
        }

        const minWeight = (18.5 * (heightMetres * heightMetres)).toFixed(1);
        const maxWeight = (24.9 * (heightMetres * heightMetres)).toFixed(1);

        if (metric.checked) {
            bmiResultHTML.innerHTML =  `Your BMI suggests you're ${bmiResult}. Your ideal weight is between <span class="bold-text">${minWeight}kgs</span> and <span class="bold-text">${maxWeight}kgs</span>.`    
        } else {
            const minImperial = minWeight * 0.157473;
            const minSt = Math.floor(minImperial);
            const minLbs = Math.floor((minImperial - minSt) * 14);
            const maxImperial = maxWeight * 0.157473;
            const maxSt = Math.floor(maxImperial);
            const maxLbs = Math.floor((maxImperial - maxSt) * 14);
            bmiResultHTML.innerHTML =  `Your BMI suggests you're ${bmiResult}. Your ideal weight is between <span class="bold-text">${minSt}st ${minLbs}lbs</span> and <span class="bold-text">${maxSt}st ${maxLbs}lbs</span>.` 
        }

        activeState.classList.remove('hidden');
        initialState.classList.add('hidden');
    }
}

