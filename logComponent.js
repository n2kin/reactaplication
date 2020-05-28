import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import { render } from "react-dom";
import "./style.css";

class Log extends Component {
  constructor() {
    super();
    email: "";
    password: "";
  }

  submitHanlerMail(event) {
    event.preventDefault(), this.setState({ email: event.target.value });
  }

  submitHanlerPassword(event) {
    event.preventDefault(), this.setState({ password: event.target.value });
  }

  logIn(e) {
    e.preventDefault()
    var xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    xhr.open("POST", "https://reactAppBackend.kirilkuzmanovsk.repl.co/logIn");
    console.log(formData)
    xhr.send(formData);
    xhr.onloadend = () => {
      console.log(xhr.response)
      localStorage.setItem('user', xhr.response)
    };
    window.location.href = 'https://reactaplication.stackblitz.io/list'
  }

  redirectSignIn() {
    window.location.href = 'https://reactaplication.stackblitz.io/sign'
  }

  render() {
    return (
      <div class="container login-container">
        <div class="col-md-6 login-form-2">
          <h3>Login</h3>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Your Email *" onChange={this.submitHanlerMail.bind(this)} />
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Your Password *" onChange={this.submitHanlerPassword.bind(this)}/>
          </div>
          <div class="form-group">
            <input type="submit" class="btnSubmit" value='Log in' onClick={this.logIn.bind(this)} />
          </div>
          <div class="form-group">
            <input type="submit" class="btnSubmit" value='Sign in' onClick={this.redirectSignIn.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default Log;
