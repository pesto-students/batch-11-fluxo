const formState = {
  userName: {
    isValid: false,
    touched: false,
    error: 'Name is not valid',
    value: '',
    rule: {
      required: true,
    },
  },
  userEmail: {
    isValid: false,
    touched: false,
    error: 'Email is not valid',
    value: '',
    rule: {
      required: true,
      validEmail: true,
    },
  },
  userPassword: {
    isValid: false,
    touched: false,
    error: 'Password should be atleast 4 characters long',
    value: '',
    rule: {
      required: true,
      minLength: 4,
    },
  },
  userConfirmPwd: {
    isValid: false,
    touched: false,
    error: 'Password does not match',
    value: '',
    rule: {
      required: true,
      matchWithPassword: true,
    },
  },
};

export { formState };
