import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css"
import tagline from './aotagline.png'
import axios from 'axios';
import {RadioButton} from "react-radio-buttons";

var API_URL = "https://aocapstone.me/user?"
var that;

export default class Login extends Component {
  constructor(props) {
       super(props);
       this.state = {username: "", password: "", saveSession: false}
       that = this;
  }

   handleChange = event => {
      this.setState({[event.target.id]: event.target.value});
   }

   requiredFieldsFilled = () => {
    var success = true;
    var fieldsMissing = 0;
    //reset login errors
    document.getElementById("loginFailed").style.display = "none";
    document.getElementById("username").className = "";
    document.getElementById("password").className = "";
    document.getElementById("emailMissing").style.display = "none";
    document.getElementById("passwordMissing").style.display = "none";
    document.getElementById("frontPanel").className = "card"

    if (that.state.username == "") {
      fieldsMissing = 1;
      document.getElementById("username").className = "errorField";
      document.getElementById("emailMissing").style.display = "block";
      document.getElementById("frontPanel").className = "panelOneMissing";
      var success = false;
    }
    if (that.state.password == "") {
      if (fieldsMissing === 1) {
        document.getElementById("frontPanel").className = "panelTwoMissing";
      } else {
        document.getElementById("frontPanel").className = "panelOneMissing";
      }
      document.getElementById("password").className = "errorField";
      document.getElementById("passwordMissing").style.display = "block";
      var success = false;
    }
    return success;
   }

   handleLogin = async event => {
        event.preventDefault();
        if (this.requiredFieldsFilled()) {
          try {
            var request1 = "email=" + this.state.username + "&password=" + this.state.password
            axios.get(API_URL + request1)
            .then(function (response) {
              console.log(response);
              if (response.data.id !== -1) {
                  if(this.state.saveSession) {
                      localStorage.setItem('userId', response.data.id)
                  }
                  this.setState({userId : response.data.id});
                  that.props.userHasAuthenticated(true);
                  that.props.history.push("/");
              } else {
                document.getElementById("frontPanel").className = "panelOneMissing";
                document.getElementById("loginFailed").style.display = "block";
                that.setState({username: "dickmann.michael@aoins.com", password: "dick123"})
              }
            })
          } catch(e) {
              alert(e.message);
          }
        }
   }

  render() {
    return (
                <div id="frontPanel" className="card">
              <div id="loginBox">
                  <form onSubmit={this.handleLogin}>
                      <FormGroup controlId="username" bsSize="large" className="loginForm">
                          <ControlLabel>Username:&nbsp;&nbsp;</ControlLabel>
                          <FormControl
                                  autoFocus
                                  type="username"
                                  defaultValue={this.state.username}
                                  onChange={this.handleChange}
                          />
                      </FormGroup>
                      <p id="emailMissing">Email required</p>
                      <FormGroup controlId="password" bsSize="large" className="loginForm">
                          <ControlLabel>Password:&nbsp;&nbsp;&nbsp;</ControlLabel>
                          <FormControl
                                  autoFocus
                                  type="password"
                                  defaultValue={this.state.password}
                                  onChange={this.handleChange}
                          />
                      <p id="passwordMissing">Password required</p>
                      <p id="loginFailed">Login Failed: Email or Password incorrect</p>
                      </FormGroup>
                      <div id = "rememberMeDiv">
                          <input type='checkbox' name="Remember me" checked = {this.state.saveSession} onChange={() => this.setState({saveSession: !this.state.saveSession})}/>
                          <p>Remember me</p>
                      </div>
                      <Button
                              id="loginButton"
                              block
                              bsSize="large"
                              type="submit"
                      >LOGIN</Button>
                  </form>
              </div>
              <div id="loginDecor">
                <h1 id="claimPortalTitle">Claim Portal</h1>
                <img src={tagline} className="tagline" />
              </div>
          </div>
    );
  }
}