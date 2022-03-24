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
import "./TableResults.css";

class TableResults extends React.Component {
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
          <div>
          {this.props.showResults ?
            <table id="claimList">
            <tbody>
              <tr>
                <th>Report Date</th>
                <th>Insured</th>
                <th id="type">Type</th>
                <th>ClaimNumber</th>
                <th id="dol">Policy Number</th>
                <th>Policy Start</th>
                <th>Policy End</th>
              </tr>
              {this.props.createTable()}
              </tbody>
            </table> : "" }
          </div>
		);
	}
}

export default TableResults;