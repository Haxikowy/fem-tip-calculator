class tipCalculator {
  constructor(tipOutput, totalOutput) {
    this.tipOutput = tipOutput;
    this.totalOutput = totalOutput;
    this.resetUI();
  }
  resetUI() {
    this.tipOutput.innerText = '$0.00';
    this.totalOutput.innerText = '$0.00';
  }
  init(bill, tip, people) {
    if (bill === '' || bill === '0' || isNaN(bill)) return
    if (tip === '' || tip === '0' || isNaN(tip)) return
    if (people === '' || people === '0' || isNaN(people)) return

    this.value1 = (bill * tip) / people
    this.value2 = (bill / people) + this.value1

    this.updateUI(round2Fixed(this.value1), round2Fixed(this.value2))
  }

  updateUI(value1, value2) {
    this.tipOutput.innerText = `$${value1}`;
    this.totalOutput.innerText = `$${value2}`;
  }
}