import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './SignUp.module.scss';
import Logo from '../../Assets/Img/logo.png';
class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  nameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  passwordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  emailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  signUpHandler = async (e) => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    e.preventDefault();
    const res = await fetch('http://localhost:5000/users/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const content = await res.json();
    if (content.token !== null) {
      document.cookie = content.token;
      this.props.signUpToken(content.token);
      this.props.history.push('/dashboard');
    }
  };

  render() {
    return (
      <div className={style.SignUp}>
        <img src={Logo} alt='logo'></img>
        <form>
          <label htmlFor='name'>
            <strong>Name</strong>
          </label>
          <input
            type='text'
            placeholder='Enter Email'
            name='name'
            required
            onChange={this.nameChange}
          />

          <label htmlFor='email'>
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
          <label htmlFor='psw-repeat'>
            <strong>Confirm Password</strong>
          </label>
          <input
            id='psw-repeat'
            type='password'
            placeholder='Repeat Password'
            name='psw-repeat'
            required
          />

          <button type='submit' onClick={this.signUpHandler}>
            <strong>Login</strong>
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpToken: (token) => {
      dispatch({ type: 'SIGN_UP_TOKEN', token: token });
    },
  };
};
export default connect(null, mapDispatchToProps)(SignUp);
// return (
//   <div>
//     <form style={{ border: '1px solid #ccc', margin: '400px' }}>
//       <h1>Sign Up</h1>
//       <p>Please fill in this form to create an account.</p>

//       <label htmlFor='name'>
//         <b>Name:</b>
//         <input
//           type='text'
//           placeholder='Enter Email'
//           name='name'
//           required
//           onChange={this.nameChange}
//         />
//       </label>
//       <br />

//       <label htmlFor='email'>
//         <b>Email:</b>
//         <input
//           type='email'
//           placeholder='Enter Email'
//           name='email'
//           required
//           onChange={this.emailChange}
//         />
//       </label>
//       <br />

//       <label htmlFor='password'>
//         <b>Password:</b>
//         <input
//           type='password'
//           placeholder='Enter Password'
//           name='password'
//           required
//           onChange={this.passwordChange}
//         />
//       </label>
//       <br />

//       <label htmlFor='psw-repeat'>
//         <b>Confirm Password:</b>
//       </label>
//       <input
//         type='password'
//         placeholder='Repeat Password'
//         name='psw-repeat'
//         required
//       />
//       <br />

//       <div>
//         <button onClick={this.signUpHandler}>Sign Up</button>
//       </div>
//     </form>
//   </div>
// );
