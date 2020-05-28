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

class Sign extends Component {
  constructor() {
    this.state = {
      email: '',
      password: '',
    };
  }

  submitHanlerPostTitle(event) {
    event.preventDefault(), this.setState({ email: event.target.value });
  }

  submitHanlerPostContent(event) {
    event.preventDefault(), this.setState({ password: event.target.value });
  }

  createUser(e) {
    e.preventDefault()
    var xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    xhr.open("POST", "https://reactAppBackend.kirilkuzmanovsk.repl.co/register");
    xhr.send(formData);
    window.location.href = 'https://reactaplication.stackblitz.io/'
  }

  render() {
    return (
      <div class="container login-container">
        <div class="col-md-6 login-form-2">
          <h3>Register</h3>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Your Email *" onChange={this.submitHanlerPostTitle.bind(this)} />
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Your Password *" onChange={this.submitHanlerPostContent.bind(this)}/>
          </div>
          <div class="form-group">
            <input type="submit" class="btnSubmit" value='Register' onClick={this.createUser.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default Sign;
