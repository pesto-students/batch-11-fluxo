import React, { useState } from 'react';
import TextField from '../../../MaterialUI/Component/TextField/TextField';
import Button from '../../../MaterialUI/Component/Button/Button';
import style from './Login.module.scss';
import { checkValidity, completeFormValidation } from '../formValidation';
import { formState } from './loginFormConfig';
import { userInfoToServer } from '../../../apis/onBoarding/onBoarding';
import Error from '../../../MaterialUI/Component/Error/Error';
import constants from '../../../constants/constants';

const Login = (props) => {
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
      userEmail: myFormState.userEmail.value,
      userPassword: myFormState.userPassword.value,
    };
    const url = `${constants.serverURL}/users/login`;
    const resData = userInfoToServer(formData, url);
    if (resData.error) {
      changeSubmitState({
        error: resData.error,
      });
    } else {
      props.history.push('/');
    }
  };
  const modeChangeHandle = () => {
    props.history.push('/signup');
  };
  return (
    <div className={style.MainContainer}>
      {submitState.error ? <Error errorText={submitState.error} /> : null}
      <h1>Fluxo</h1>
      <form onSubmit={formSubmitHandle}>
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
        <Button
          buttonColor='primary'
          variant='contained'
          buttonText='submit'
          type='submit'
          fullWidth={true}
        />
      </form>
      <p>
        Do not hava an account?{' '}
        <span className={style.ModeChange} onClick={modeChangeHandle}>
          Sign up here
        </span>
      </p>
    </div>
  );
};

export default Login;
