import React, { useState } from 'react';
import TextField from '../../MaterialUI/Component/TextField/TextField';
import Button from '../../MaterialUI/Component/Button/Button';
import style from './SignUp.module.scss';
import { checkValidity, completeFormValidation } from './formValidation';
import { formState } from './formElementConfig';
import { dataToServer } from './dataToServer';
import Error from '../../MaterialUI/Component/Error/Error';

const SignUp = (props) => {
  const [submitState, changeSubmitState] = useState({
    error: false,
  });

  const [myFormState, changeFormState] = useState(formState);

  const inputHandle = (e) => {
    const element = e.target.name;
    const updateFormState = { ...myFormState };
    const findElement = updateFormState[element];
    findElement.touched = true;
    findElement.value = e.target.value;
    findElement.isValid = checkValidity(
      e.target.value,
      findElement.rule,
      myFormState,
    );
    changeFormState({
      ...updateFormState,
      ...[findElement],
    });
  };

  const formSubmitHandle = (e) => {
    e.preventDefault();
    const inValidError = completeFormValidation(myFormState);
    if (inValidError) {
      changeSubmitState({ error: inValidError });
      return;
    }
    const formData = {
      userName: myFormState.userName.value,
      userEmail: myFormState.userEmail.value,
      userPassword: myFormState.userPassword.value,
    };
    const { resData } = dataToServer(formData);
    if (resData.error) {
      changeSubmitState({
        error: resData.error,
      });
    } else {
      props.history.push('/');
    }
  };
  const modeChangeHandle = () => {
    props.history.push('/login');
  };
  return (
    <div className={style.MainContainer}>
      {submitState.error ? <Error errorText={submitState.error} /> : null}
      <h1>Fluxo</h1>
      <form onSubmit={formSubmitHandle}>
        <TextField
          name='userName'
          label='Name'
          variant='outlined'
          color='primary'
          type='text'
          inputHandle={inputHandle}
          error={!myFormState.userName.isValid && myFormState.userName.touched}
          helperText={
            !myFormState.userName.isValid && myFormState.userName.touched
              ? 'Name is required'
              : ''
          }
        />
        <TextField
          name='userEmail'
          label='Email'
          variant='outlined'
          type='email'
          color='primary'
          inputHandle={inputHandle}
          error={
            !myFormState.userEmail.isValid && myFormState.userEmail.touched
          }
          helperText={
            !myFormState.userEmail.isValid && myFormState.userEmail.touched
              ? 'Email is invalid'
              : ''
          }
        />
        <TextField
          name='userPassword'
          label='Password'
          variant='outlined'
          type='password'
          color='primary'
          inputHandle={inputHandle}
          error={
            !myFormState.userPassword.isValid &&
            myFormState.userPassword.touched
          }
          helperText={
            !myFormState.userPassword.isValid &&
            myFormState.userPassword.touched
              ? 'Password should be atleast 4 characters long'
              : ''
          }
        />
        <TextField
          name='userConfirmPwd'
          label='Confirm Password'
          variant='outlined'
          type='password'
          color='primary'
          inputHandle={inputHandle}
          error={
            !myFormState.userConfirmPwd.isValid &&
            myFormState.userConfirmPwd.touched
          }
          helperText={
            !myFormState.userConfirmPwd.isValid &&
            myFormState.userConfirmPwd.touched
              ? 'Password does not match'
              : ''
          }
        />
        <Button
          buttonColor='primary'
          variant='contained'
          buttonText='submit'
          type='submit'
          fullWidth={true}
        />
      </form>
      <p>
        Already hava an account?{' '}
        <span className={style.ModeChange} modeChangeHandle={modeChangeHandle}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default SignUp;
