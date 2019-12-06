import React from 'react';

const SignUp = () => {
  return (
    <div>
      <form action="/" style={{ border: '1px solid #ccc',margin: '400px' }}>
        <h1>Login</h1>

        <label for="email" >
          <b>Email:</b>
          <input type="text" placeholder="Enter Email" name="email" required />
        </label><br/>

        <label for="psw">
          <b>Password:</b>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />
        </label><br/>

        <div class="clearfix">
          <button type="submit" class="signupbtn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
