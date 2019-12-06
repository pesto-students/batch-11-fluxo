import React, { Component } from 'react';
import style from './Login.module.scss';
import Logo from '../../Assets/Img/logo.png';
import { withRouter } from 'react-router-dom';
import { RSA_NO_PADDING } from 'constants';
class Login extends Component {
  state = {
    email: '',
    password: '',
    token: '',
  };

  emailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  loginHandler = async (e) => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    e.preventDefault();
    const res = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const content = await res.json();
    if (content.token) {
      this.props.history.push('/dashboard');
    }
  };

  render() {
    return (
      <div className={style.Login}>
        <img src={Logo} alt='logo'></img>
        <form>
          <label htmlFor='email'>
            {' '}
            <strong>Email</strong>
          </label>
          <input
            id='email'
            type='text'
            placeholder='Enter Email'
            name='email'
            required
            onChange={this.emailChange}
          />
          <label htmlFor='psw'>
            <strong>Password</strong>
          </label>
          <input
            id='psw'
            type='password'
            placeholder='Enter Password'
            name='psw'
            required
            onChange={this.passwordChange}
          />

          <button type='submit' onClick={this.loginHandler}>
            <strong>Login</strong>
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
// <div>
//   <form style={{ border: '1px solid #ccc', margin: '400px' }}>
//     <h1>Login</h1>

//     <label htmlFor='email'>
//       <b>Email:</b>
//       <input
//         type='text'
//         placeholder='Enter Email'
//         name='email'
//         required
//         onChange={this.emailChange}
//       />
//     </label>
//     <br />

//     <label htmlFor='psw'>
//       <b>Password:</b>
//       <input
//         type='password'
//         placeholder='Enter Password'
//         name='psw'
//         required
//         onChange={this.passwordChange}
//       />
//     </label>
//     <br />

//     <div>
//       <button type='submit' onClick={this.loginHandler}>
//         Login
//       </button>
//     </div>
//   </form>
// </div>
