import React, { Component, Fragment } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import logo from './logo.png';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import './App.css';
import Routes from "./Routes"
import axios from 'axios';

class App extends Component {
  state = {
    contacts: [], authenticated: false
  };

  constructor(props) {
       super(props);
       this.handleLogout= this.handleLogout.bind(this);
       if (localStorage.getItem('userId') !== undefined) {
           this.state = {isAuthenticated : true, userId: localStorage.getItem('userId')};
           let params = this.props.location.search;
           if (params === "") {
               this.props.history.push("/");
           }
       } else {
           this.state = {isAuthenticated : false};
           this.props.history.push("/login");
       }
  }


  userHasAuthenticated = authenticated => {
      this.setState({ isAuthenticated: authenticated });
  }

   handleChange = event => {
    console.log()
     this.setState({[event.target.id]: event.target.value});
   }

  handleLogout(authenticated) {
    this.setState({ isAuthenticated: false });
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Navbar.Collapse>
              <Nav pullRight  className="loginLinks">
                {this.state.isAuthenticated ? <NavItem onClick={this.handleLogout} className="link"><i class="fa fa-user"></i>&nbsp;&nbsp;Logout</NavItem>
                                            : ""
                }
              </Nav>
              <Nav pullLeft className="pageLinks" id="navLink">
                  { this.state.isAuthenticated ?
                                                <div id="linkHolderDiv">
                                                { this.props.location.pathname === "/" ? 
                                                    <Fragment>
                                                        <LinkContainer to="/search">
                                                          <NavItem className="link"><i class="fa fa-search"></i>&nbsp;&nbsp;Search</NavItem>
                                                        </LinkContainer>
                                                    </Fragment> :
                                                    <Fragment>
                                                        <LinkContainer to="/">
                                                          <NavItem className="link"><i class="fa fa-tachometer-alt"></i>&nbsp;&nbsp;Dashboard</NavItem>
                                                        </LinkContainer>
                                                    </Fragment>
                                                }
                                                </div>
                    : ""
                  }
              </Nav>
            </Navbar.Collapse>
          </Navbar.Header>
        </Navbar>
        <Routes childProps={childProps}/>
      </div>

    );
  }



}

export default withRouter(App);