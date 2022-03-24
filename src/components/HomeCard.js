import React from "react";
import PropTypes from "prop-types";
import "../containers/Home.css";
import crash from "./crash.jpg";
import crash2 from "./crash2.jpg";
import home1 from "./home1.jpg";
import home2 from "./home2.jpg";
import crash3 from "./crash3.jpg";
import home3 from "./home3.jpg";
import pdf from "./pdf.png";
import word from "./word.png";
import excel from "./excel.png";
import text from "./text.png"
import axios from 'axios';
import ModalImage from 'react-modal-image';
import {PopupboxManager, PopupboxContainer} from 'react-popupbox';

import "./HomeCard.css";

var pics = [crash2, crash3, home1, home2, crash2, home3]
var docs = [pdf, word, excel, text]
var docDec = ["Estimate.pdf", "Policy.docx", "Invoice.xls", "Sample.txt"]
var lossCauses = ["Impact","Weather","Theft of Entire Vehicle","Explosion","Fire","Fire - Incendiary","Smoke","Hit While Parked","Impact w/ Animal","Impact w/ Person","Impact w/ Stationary Object","Impact w/ Vehicle ","Pothole","Impact - Other",
    "Earthquake","Flood","Hail","Wind","Weather - Other","Other","Lightning","Water Overflow","Weight of Ice","Construction","Crime","Fire","Other","Wind","Water Backup","Ice Dam","Aircraft","Vandalism","Frozen Pipes","Mold","Smoke","Building Collapse","Flood","Explosion","Earthquake","Riot"];
var symbol;
var policyTypes = ["fa fa-car", "fa fa-home"];

class HomeCard extends React.Component {

    render() {
        var c = this.props.curClaim;
    return (
            <div id="homeFrontPanel" className="card">
            <div id="titlePanel">
                <h1 id="ClaimNumberHead">Joseph Greggors</h1>
                <br/><br/>
                <h2 id="ClaimTitle">{c.claimNumber}</h2>
                <br/><br/>
                <i className={c.policyType === "Auto" ? policyTypes[0] : policyTypes[1]} id="titleSymbol"></i>
                <label id = "titleSymbol">Date of Loss: </label>
                <label id="titleSymbol" className="dolLabel">{c.lossDate}</label>
            </div>
            <div id="titleDivider"></div>
                <div id="tabs">
                    <nav>
                        <ul>
                            <li id="detailsLink" className="selectedTab"><a onClick = {() => this.props.changeTab("detailsLink", this.props.tab)}>Details</a></li>
                            <li id="filesLink"><a onClick = {() => this.props.changeTab("filesLink", this.props.tab)}>Uploaded files</a></li>
                            <li id="incidentLink"><a onClick = {() => this.props.changeTab("incidentLink", this.props.tab)}>Incidents</a></li>
                        </ul>
                    </nav>
                </div>
            <div id="detailPanel" className="row">
                    {this.props.tab === "detailsLink" ?
                        <table id="detailTable">
                        <tr>
                            <td id= "tCol1" >
                                <label id="LossDescLabel"className="detailLabel">Loss Description</label>
                                <div id="lossDescDiv">
                                    <p id="lossDesc">{c.lossDescription}</p>
                                </div>
                                <br/><br/>
                                <label id="LossLocationLabel" className="detailLabel">Loss Cause</label>
                                <br/>
                                <p id="location">{lossCauses[c.lossCause - 1]}</p>
                            </td>
                            <td id="tCol2">
                                <label id="locationDetailLabel" className="detailLabel">Location</label>
                                <p id = "locationLines">{c.addressLine === "" ? <i className = "fa fa-question-circle"></i> : c.addressLine}</p>
                            </td>
                            <td>
                                <div id="NotesDiv">
                                    <label id="ContactForLoss" className="detailLabel">Main Contact</label>
                                    <p id="mainContactName"> {c.mainFirstName} <br/>{c.mainLastName}</p>
                                </div>
                            </td>

                        </tr>
                        </table>

                         : this.props.tab === "filesLink" ?  <div id="photoListDiv">
                                                            <table>
                                                                <th></th>
                                                                <th>Name</th>
                                                                <th>Type</th>
                                                                <th>Size (mb)</th>
                                                                {this.props.addLinks()}
                                                            </table>
                            </div> :
                            <div id="incTable">
                                <table id="detailsTableInc">
                                    {this.props.getIncidents()}
                                </table>
                            </div>


                    }
                <div className ="four" id="claimBranch">

                    {this.props.fromSearch ? <button id="returnFromSearch" className="returnLink"onClick={this.props.returnToSearch}>Return to Search</button> : ""}
                </div>
              </div>
            </div>
    );
    }
}

HomeCard.propTypes = {
    curClaim: PropTypes.object
};

export default HomeCard;