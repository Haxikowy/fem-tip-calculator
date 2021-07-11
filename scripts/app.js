const billForm = document.querySelector('.bill-form');
const selectTipInputs = document.querySelectorAll('input[type="radio"]');
const customTipInput = document.querySelector('.tip-custom');
const peopleNRForm = document.querySelector('.peoplenr-form');
const tipOutput = document.querySelector('#tip-output');
const totalOutput = document.querySelector('#total-output');
const mainElement = document.querySelector('main');


const calculator = new tipCalculator(tipOutput, totalOutput);

mainElement.addEventListener('change', e => {

  const billValue = billForm[0].value.trim();
  const peopleValue = peopleNRForm[0].value.trim();

  selectTipInputs.forEach(tipInput => {
    if (customTipInput.value !== '') {
      if (customTipInput.value.trim().includes('%')) {
        let tipValue = customTipInput.value.trim().slice(0, -1);
        tipValue = tipValue / 100;

        calculator.init(billValue, tipValue, peopleValue)
      }
      let tipValue = customTipInput.value.trim();
      tipValue = tipValue / 100;

      calculator.init(billValue, tipValue, peopleValue)
    } else if (tipInput.checked) {
      const tipValue = tipInput.attributes[3].value.trim();

      calculator.init(billValue, tipValue, peopleValue)
    }
  })
})

mainElement.addEventListener('submit', e => {
  e.preventDefault();
})

mainElement.addEventListener('click', e => {
  if (e.target.classList.contains('reset')) {
    calculator.reset();
    billForm.reset();
    peopleNRForm.reset();
    customTipInput.value = '';
  }
});