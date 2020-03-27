import React from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    // make a POST request with { username, password } to get the token back
    // endpoint will be "http://localhost:5000/api/login"
    // we will store the token in localstorage
    // if this call is successful we will navigate the user to the /protected route
    // TODO handle errors to show error state on the login form
    axiosWithAuth()
      .post('/api/login', this.state.credentials)
      .then(res => {
        // res.data.payload
        console.log(res);
        localStorage.setItem('token', JSON.stringify(res.data.payload));
        this.props.history.push('/protected');
      })
      .catch(err => console.log(err.response));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
