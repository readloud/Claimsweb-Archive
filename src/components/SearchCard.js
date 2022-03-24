import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Dropdown from 'react-dropdown'
import DatePicker from 'react-date-picker'
import Checkbox from "./Checkbox"
import moment from 'moment'
import 'react-dropdown/style.css'
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from "prop-types";
import "../containers/Search.css";
import "./HomeCard.css";
import "./SearchCard.css";

class SearchCard extends React.Component {
	render() {
		    const insuredOptions = [
      'Bob Smith', 'Burt Renoylds'
    ]
    const propertyOptions = [
      '2012 Ford F150', '2014 Jeep Grand Cherokee'
    ]
		return (
			    <div id="homeFrontPanel" className="card">
                <div className="wrapper">
                <div className="one">
                    <div id="firstSearchDiv">
                      <label id="claimNumberLabel"className="detailLabel">Claim Number</label>
                            <FormControl id="claimNumberInput"
                                    autoFocus
                                    type="firstName"
                                    placeholder="XXX-XXXXXX-XXXX"
                                    onChange={this.props.handleChange}
                            />
                      <div id="policySearchDiv">
                        <label id="policyNumberLabel" className="detailLabel">Policy Number</label>
                              <FormControl id="policyNumberInput"
                                      autoFocus
                                      type="firstName"
                                      placeholder="XX-XXXXXX-XX"
                                      onChange={this.props.handleChange}
                              />
                      </div>
                        <div id="LossCauseDiv">
                            <label id="lossCauseLabel" className="detailLabel">LossCause</label>
                            <Dropdown className="dropdown3" id="losscause" options={this.props.lossOptions} onChange={this.props.handleLossCause} value={this.props.losscause}/>
                        </div>
                    </div>

                </div>
                <div className="three">
                    <div id="firstSearchDiv">
                    <label id="policyTypeLabel" className="detailLabel">Policy Type</label>
                    <RadioGroup id="radioGroup" onChange={this.props.handlePolicyType} value={this.props.policytype}>
                      <RadioButton id="radioButton1" value="Auto">Auto</RadioButton>
                      <RadioButton id="radioButton2" value="Home">Home</RadioButton>
                    </RadioGroup>
                    </div>

                </div>
                <div className="five">
                    <div id="StartDateLabelDiv">
                      <label id="StartDateLabel" className="detailLabel">Date of Loss</label>
                      <div id="StartDatePickerDiv">
                        <FormControl id="startdate" type="date" value={this.props.startdate} onChange={this.props.handleDateChange} onSelect={this.props.handleDateChange}/>
                        <p id="dateDash">-</p>
                      </div>
                    </div>

                    <div id="NameHolderDiv">
                        <FormGroup controlId="password" bsSize="large" className="loginForm">
                         <div id="FirstNameDiv">
                          <label id="mainContactLabel" className="detailLabel">Insured&nbsp;&nbsp;&nbsp;</label><br/><br/>
                          <FormControl id="firstNameInput"
                                  autoFocus
                                  type="firstName"
                                  placeholder="First Name"
                                  onChange={this.props.handleChange}
                          />
                         </div>
                      </FormGroup>
                        <div id="LastNameDiv">
                        <FormGroup controlId="password" bsSize="large" className="loginForm">
                          <FormControl id="lastNameInput"
                              autoFocus
                              type="firstName"
                              placeholder="Last Name"
                              onChange={this.props.handleChange}
                          />
                        </FormGroup>
                    </div>
                        <button id="SearchButton" onClick={this.props.submit} className="btn btn-default" >Search</button>
                    </div>
                </div>
                <div className="four">
                    <div id="EndDatePickerDiv">
                      <FormControl id="enddate" type="date" value={this.props.enddate} onChange={this.props.handleChange}/>
                    </div>
                </div>
                </div>
          </div>
		);
	}
}

SearchCard.propTypes = {
    curClaim: PropTypes.object
};

export default SearchCard;