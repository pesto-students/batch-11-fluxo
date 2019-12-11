import validator from 'validator';

const checkValidity = (value, rule, myFormState) => {
  let valid = true;
  if (rule.required) {
    valid = value.trim() === '' ? false : true && valid;
  }
  if (rule.validEmail) {
    valid = validator.isEmail(value) && valid;
  }
  if (rule.minLength) {
    valid = value.trim().length >= '4' && valid;
  }
  if (rule.matchWithPassword) {
    valid = myFormState.userPassword.value === value && valid;
  }

  return valid;
};
const completeFormValidation = (myFormState) => {
  const keys = Object.keys(myFormState);
  let notValidElement = keys.find((i) => {
    return myFormState[i].isValid === false;
  });
  if (notValidElement) return myFormState[notValidElement].error;
};
export { checkValidity, completeFormValidation };
