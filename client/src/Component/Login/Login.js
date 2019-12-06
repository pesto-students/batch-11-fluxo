import React, {Component} from 'react';

class Login extends Component {
  state = {
    email: '',
    password: '',
    token: ''
  }

  emailChange = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  passwordChange = (e) => {
    this.setState({
      password : e.target.value
    });
  }

  loginHandler = (e) => {
    const data = {
      email: this.state.email,
      password: this.state.password
    };

    e.preventDefault();

    fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(content => document.cookie = content.token)
      .catch(err => console.log(err));
  };

  render(){
    return (
      <div>
        <form style={{ border: '1px solid #ccc',margin: '400px' }}>
          <h1 style={{textAlign: "center"}}>Login</h1>
  
          <label htmlFor="email" style={{textAlign: "center"}}>
            <b>Email:</b>
            <input type="text" placeholder="Enter Email" name="email" required onChange= {this.emailChange} />
          </label><br/>
  
          <label htmlFor="psw">
            <b>Password:</b>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              onChange= {this.passwordChange}
            />
          </label><br/>
  
          <div>
            <button type="submit" onClick={this.loginHandler}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
