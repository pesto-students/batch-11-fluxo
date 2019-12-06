import React, { Component } from 'react';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  nameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  passwordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  emailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  signUpHandler = e => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    e.preventDefault();
    fetch('http://localhost:5000/users/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(content => document.cookie = content.token);
  };

  render() {
    return (
      <div>
        <form style={{ border: '1px solid #ccc', margin: '400px' }}>
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>

          <label htmlFor="name">
            <b>Name:</b>
            <input
              type="text"
              placeholder="Enter Email"
              name="name"
              required
              onChange={this.nameChange}
            />
          </label>
          <br />

          <label htmlFor="email">
            <b>Email:</b>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              onChange={this.emailChange}
            />
          </label>
          <br />

          <label htmlFor="password">
            <b>Password:</b>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              onChange={this.passwordChange}
            />
          </label>
          <br />

          <label htmlFor="psw-repeat">
            <b>Confirm Password:</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            required
          />
          <br />

          <div>
            <button onClick={this.signUpHandler}>Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}
export default SignUp;
