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

  //reset button -> make it inactive and updateui if u delete 
  //everything from any input
  if (!billValue || !peopleValue || !customTipValue) {
    resetButton.classList.add('reset-off');
    calculator.resetUI();
  }

  //reset button -> make it visible if u typed smh in inputs
  if (billValue || peopleValue || customTipValue) {
    resetButton.classList.remove('reset-off');
  }

  // first we validate all values
  // next we check if custom tip input is being used
  // and also we format input
  // if not we search for all radio inputs if they are checked

  if (validate(billValue)) {
    if (validate(peopleValue)) {
      if (validate(customTipValue)) {
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
      }
    }
  }
})

mainElement.addEventListener('submit', e => {
  e.preventDefault();
})

mainElement.addEventListener('click', e => {
  // uncheck radio button if u wanna type custom tip
  if (customTipInput === document.activeElement) {
    selectTipInputs.forEach(input => {
      input.checked = false;
    });
  }

  // reset button feature -> reset all inputs and outputs
  // *by clicking on button*
  if (e.target.classList.contains('reset')) {
    e.target.classList.add('reset-off');
    calculator.resetUI();
    billForm.reset();
    peopleNRForm.reset();
    customTipInput.value = '';

    // if you wanna to update errUI correctly u need to make change
    // event yourself
    billForm.dispatchEvent(new Event('change'));
    peopleNRForm.dispatchEvent(new Event('change'));
    customTipInput.dispatchEvent(new Event('change'));
  }
});


// Errors section -> eventListeners to listen for changes
// in forms that need to be validated
billForm.addEventListener('change', (e) => {
  errUI(billForm, validate(billForm[0].value));
});
peopleNRForm.addEventListener('change', () => {
  errUI(peopleNRForm, validate(peopleNRForm[0].value));
});
customTipInput.addEventListener('change', () => {
  errUI(customTipInput, validate(customTipInput.value));
});