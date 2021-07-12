const billForm = document.querySelector('.bill-form');
const selectTipInputs = document.querySelectorAll('input[type="radio"]');
const customTipInput = document.querySelector('.tip-custom');
const peopleNRForm = document.querySelector('.peoplenr-form');
const tipOutput = document.querySelector('#tip-output');
const totalOutput = document.querySelector('#total-output');
const mainElement = document.querySelector('main');
const resetButton = document.querySelector('.reset');


const calculator = new tipCalculator(tipOutput, totalOutput);

mainElement.addEventListener('change', e => {

  const billValue = billForm[0].value.trim();
  const peopleValue = peopleNRForm[0].value.trim();
  const customTipValue = customTipInput.value.trim();

  if (billValue || peopleValue || customTipValue) {
    resetButton.classList.remove('reset-off');
  }

  selectTipInputs.forEach(tipInput => {
    if (customTipValue !== '') {
      if (customTipValue.includes('%')) {
        let tipValue = customTipValue.slice(0, -1);
        tipValue = tipValue / 100;

        calculator.init(billValue, tipValue, peopleValue)
      }
      let tipValue = customTipValue;
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
  if (customTipInput === document.activeElement) {
    selectTipInputs.forEach(input => {
      input.checked = false;
    });
  }
  if (e.target.classList.contains('reset')) {
    e.target.classList.add('reset-off');
    calculator.resetUI();
    billForm.reset();
    peopleNRForm.reset();
    customTipInput.value = '';
  }
});