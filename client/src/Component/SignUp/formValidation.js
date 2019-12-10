import validator from 'validator';
const nameValidation = (e, changeNameState, changeFormState) => {
  if (e.target.value === '') {
    changeNameState({
      isValid: false,
      name: '',
    });
  } else if (e.target.value !== '') {
    changeNameState({ isValid: true, name: e.target.value });
    changeFormState({
      isNameValid: true,
      isEmailValid: false,
      isPasswordValid: false,
    });
  }
};
const emailValidation = (e, changeEmailState) => {
  if (validator.isEmail(e.target.value)) {
    changeEmailState({
      isValid: true,
      email: '',
    });
  } else {
    changeEmailState({
      isValid: false,
      email: e.target.value,
    });
  }
};
const passwordValidation = (e, changePasswordState, changeConfirmPwdState) => {
  if (e.target.value.length < 4) {
    changePasswordState({
      isValid: false,
      password: '',
    });
  } else {
    changePasswordState({
      isValid: true,
      password: e.target.value,
    });
  }
  changeConfirmPwdState({
    isValid: true,
    password: e.target.value,
  });
};
const confirmPwdValidation = (e, myConfirmPwdState, changeConfirmPwdState) => {
  const password = myConfirmPwdState.password;
  if (password !== e.target.value) {
    changeConfirmPwdState({
      isValid: false,
      password: password,
    });
  } else {
    changeConfirmPwdState({
      isValid: true,
      password: password,
    });
  }
};
export {
  nameValidation,
  emailValidation,
  passwordValidation,
  confirmPwdValidation,
};
