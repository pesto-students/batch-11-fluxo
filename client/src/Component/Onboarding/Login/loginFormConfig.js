const formState = {
  userEmail: {
    isValid: false,
    touched: false,
    error: 'Email is not valid.',
    value: '',
    rule: {
      required: true,
      validEmail: true,
    },
  },
  userPassword: {
    isValid: false,
    touched: false,
    error: 'Password should be atleast 4 characters long.',
    value: '',
    rule: {
      required: true,
      minLength: 4,
    },
  },
};

export { formState };
