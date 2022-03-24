//npm install react-dropdown --save
//npm install react-date-picker       npm install moment
//npm install react-radio-buttons --save
import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import "./Search.css";
import crash from "./crash.jpg";
import crash2 from "./crash2.jpg"
import tagline from './aotagline.png'
import Dropdown from 'react-dropdown'
import DatePicker from 'react-datepicker'
import Checkbox from "./Checkbox"
import moment from 'moment'
import axios from 'axios';
import SearchCard from "../components/SearchCard.js";
import HomeCard from "../components/HomeCard.js";
import TableResults from "../components/TableResults.js";
import 'react-dropdown/style.css'
import 'react-datepicker/dist/react-datepicker.css';
var that;
var API_SEARCH_URL = "https://aocapstone.me/api/search?";
var API_POLICY_URL = "https://aocapstone.me/api/policy?policyNum="
var API_CLAIM_URL = "https://aocapstone.me/api//claim?claimNum="
var policyTypes = ["fa fa-car", "fa fa-home"];
var homeLossOptions = ['Fire', 'Lightning', 'Theft'];
var autoLossOptions = ['Impact', 'Crime', 'Fire/Smoke/Explosion', 'Weather', 'Other'];

export default class Home extends Component {
  constructor(props) {
     super(props);
     this.state = {   curClaim : {claimNumber: "330-876543-2018",
                      insured: "Joseph Gregors",
                      reportDate: "01/01/2018",
                      dol: "12/22/2017",
                      claimaint: "Jeff Jefferson",
                      contact: "248-890-7654"
                      }, 
                      claimSelected : false,
                      showResults : false,
                      claimNumberInput : "",
                      policyNumberInput : "",
                      policytype : "",
                      startdate : "",
                      enddate : "",
                      losscause: "",
                      firstNameInput : "",
                      lastNameInput : "",
                      results: [],
                      lossOptions: homeLossOptions.concat(autoLossOptions),
                      source: ""
                    }

           this.claims = [{claimNumber: "330-786532-2015",
                      insured: "Megan Dixon",
                      reportDate: "05/02/2015",
                      dol: "05/01/2015",
                      claimaint: "Mark Conyers",
                      contact: "875-840-9034"
                      },
                      {claimNumber: "330-873986-2017",
                      insured: "Marshall Powers",
                      reportDate: "05/02/2017",
                      dol: "04/06/2017",
                      claimaint: "Cathy Ortiz",
                      contact: "313-855-5034"
                      },
                      {claimNumber: "330-936585-2018",
                      insured: "Beatrice Cook",
                      reportDate: "10/02/2018",
                      dol: "10/01/2018",
                      claimaint: "Peter Lynch",
                      contact: "432-442-8434"
                      },
                      {claimNumber: "330-689365-2014",
                      insured: "Kayla Wilkins",
                      reportDate: "07/06/2014",
                      dol: "07/02/2014",
                      claimaint: "Luke Cross",
                      contact: "983-433-9434"
                      },
                      {claimNumber: "330-093658-2018",
                      insured: "Glenn Holmes",
                      reportDate: "01/01/2018",
                      dol: "12/01/2017",
                      claimaint: "Angela Mckenzie",
                      contact: "374-144-3534"
                      }];
     this.curClaim = {claimNumber: "330-876543-2018",
                      insured: "Joseph Gregors",
                      reportDate: "01/01/2018",
                      dol: "12/22/2017",
                      claimaint: "Jeff Jefferson",
                      contact: "248-890-7654"
                      };
      this.checked = true;
      that = this;
      this.state.handeDateChange = this.handleDateChange.bind(this);

  }

  onChange = date => this.setState({ date })

claimSelected(i) {
    var claim = that.state.results[i][3];
    window.location.assign('http://aocapstone.me/?claim='+claim);
}

submit = async event => {
    
  console.log(this.state);
  var query = "";
  var start = new Date(this.state.startdate);
  var end = new Date(this.state.enddate);
  start.setDate(start.getDate()+1);
  end.setDate(end.getDate()+1);
  query += "claimNum=" + this.state.claimNumberInput;
  query += "&policyNum=" + this.state.policyNumberInput;
  //query += "&lossDateStart=" + (this.state.startdate !== "" ? dateformat(start, "yyyy-mm-dd") : "");
  //query += "&lossDateEnd=" + (this.state.enddate !== "" ? dateformat(end, "yyyy-mm-dd") : "");
  query += "&policyType=" + (this.state.policytype === "Auto" ? 1 : 2);
  query += "&lossCause=" + this.state.losscause;
  query += "&firstName=" + this.state.firstNameInput;
  query += "&lastName=" + this.state.lastNameInput;
  event.preventDefault();
  console.log(query);

  try {
  axios.get(API_SEARCH_URL + query)
  .then(function (response) {
    console.log(response)
    var queryResult = response.data
    that.setState({results : queryResult})
  })
 } catch(e) {
    alert(e.message);
 }
 this.setState({showResults: true})
}

returnToSearch() {
  that.setState({claimSelected: false, results: []});
}

handleChange = event => {
  this.setState({[event.target.id]: event.target.value});
}

handlePolicyType = event => {
  if (event === "Auto") {
    if (this.state.losscause !== "Auto") {
      this.setState({lossOptions : autoLossOptions});
    } else {
      this.setState({lossOptions: autoLossOptions.concat(homeLossOptions), policytype : ""})
    }
  } else {
    this.setState({lossOptions : homeLossOptions});
  }
  this.setState({policytype : event});
}

handleLossCause = cause => {
  this.setState({losscause : cause.value});
}

handleDateChange = event => {
  this.setState({startdate : event.target.value}); 
}

handleEndChange = event => {
  this.setState({enddate : event.target.value});
}

toggleCheckbox = label => {
  if (this.checked) {
    this.checked = false;
  } else {
    this.checked = true;
  }
}

  createTable = () => {
    let table = []
    var toList = this.state.results;
    var start;
    var end;
    try {
          axios.get(API_POLICY_URL + 9712345600)
              .then(function (response) {
                
              })
         } catch(e) {
            alert(e.message);
         }
    for(let i=0; i < toList.length; i++) {
          var c = toList[i];


        table.push(<tr onClick={() => this.claimSelected(i)}><td>{c[0]}</td>
                       <td>{c[1]}</td>
                       <td id="typeSymbol"><i class="fa fa-car"></i></td>
                       <td>{c[3]}</td>
                       <td>{c[4]}</td>
                       <td>2018-10-08</td>
                       <td id="lastCol">2019-04-07</td></tr>)
    }
    return table
  }

  render() {
    const insuredOptions = [
      'Bob Smith', 'Burt Renoylds'
    ]
    const propertyOptions = [
      '2012 Ford F150', '2014 Jeep Grand Cherokee'
    ]
    const lossOptions = [
      'Wind', 'Fire', 'Impact with Animal'
    ]
    return (
      <div className="Home">
        <div className="lander">
          {this.state.claimSelected ? <HomeCard curClaim = {this.state.curClaim} fromSearch={true} returnToSearch={this.returnToSearch}/> :
          <SearchCard policyType = {this.state.policytype} curClaim = {this.state.curClaim} lossOptions = {this.state.lossOptions} losscause = {this.state.losscause} handleChange={this.handleChange} handlePolicyType={this.handlePolicyType} submit={this.submit} returnToSearch={this.returnToSearch} handleDateChange={this.handleDateChange} handleEndChange={this.handEndChange} handleLossCause={this.handleLossCause}/>}
          <TableResults result = {this.state.results} createTable = {this.createTable} showResults = {this.state.showResults}/>
        </div>
        <div></div>
        <img src={tagline} className="tagline" />
      </div>
    );
  }
}