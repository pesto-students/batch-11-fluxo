import React from 'react';

const SignUp = () => {
  return (
    <div>
      <form action="/" style={{ border: '1px solid #ccc',margin: '400px' }}>
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>

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

        <label for="psw-repeat">
          <b>Confirm Password:</b>
        </label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="psw-repeat"
          required
        /><br/>

        <div class="clearfix">
          <button type="submit" class="signupbtn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
