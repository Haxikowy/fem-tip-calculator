const validate = (value) => {
  let valid = true;
  let err = '';

  if (parseFloat(value) === 0) {
    valid = false;
    err = "Can't be a zero";
    return [valid, err];
  } else if (isNaN(value) && value !== '') {
    valid = false;
    err = "Can't be a letter";
    return [valid, err];
  } else if (value < 0) {
    valid = false;
    err = "Type positive number";
    return [valid, err];
  }

  return [valid, err];
}

const errUI = (inputElement, [boolean, err]) => {
  if (inputElement.classList.contains('tip-custom')) {
    if (boolean) {
      if (inputElement.classList.contains('text-error')) {
        inputElement.classList.remove('text-error');
        return
      }
    } else {
      inputElement.classList.add('text-error');
      return
    }
    return
  }

  const textInput = inputElement[0];
  const errorInput = inputElement.children[0].children[1]
  if (boolean) {
    if (textInput.classList.contains('text-error')) textInput.classList.remove('text-error')
    errorInput.textContent = '';
  } else {
    textInput.classList.add('text-error');
    errorInput.textContent = err
  }
}