import React, { Component } from "react";
import "./Detail.css";
import crash from "./crash.jpg";
import crash2 from "./crash2.jpg"
import tagline from './aotagline.png'

export default class Home extends Component {
  constructor(props) {
     super(props);
     this.curClaim = {claimNumber: "330-876543-2018",
                      insured: "Joseph Gregors",
                      reportDate: "01/01/2018",
                      dol: "12/22/2017",
                      claimaint: "Jeff Jefferson",
                      contact: "248-890-7654"
                      };


  }

  createTable = () => {
    let table = []

    for(let i=0; i < 20; i++) {
        table.push(<tr><td>{this.curClaim.reportDate}</td>
                       <td>{this.curClaim.insured}</td>
                       <td id="symbolCol"><i class="fa fa-car"></i></td>
                       <td><i class="fa fa-car"></i></td>
                       <td>{this.curClaim.claimNumber}</td>
                       <td>{this.curClaim.dol}</td>
                       <td>{this.curClaim.claimaint}</td>
                       <td>{this.curClaim.contact}</td></tr>)
    }
    return table
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <p id="DashboardTitle">Dashboard</p>
          <div id="detailFrontPanel" className="card">
            <div id="titlePanel">
                <h1 id="ClaimNumberHead">Bert Renoylds</h1>
                <br/><br/>
                <h2 id="ClaimTitle">{this.curClaim.claimNumber}</h2>
                <br/><br/>
                <i className="fa fa-car" id="titleSymbol"></i>
                <label id = "titleSymbol">Date of Loss: </label>
                <label id="titleSymbol" className="dolLabel">01/01/2018</label>
            </div>
            <div id="titleDivider"></div>
            <div id="detailPanel" className="row">
                <div className="wrapper">
                <div className="one">
                    <label id="LossDescLabel"className="detailLabel">Loss Description</label>
                    <div id="lossDescDiv">
                        <p id="lossDesc">Claimaint was driving down I-75 and was struck from behind by Semi-truck. Deer jumped on car and broke windshield post collision</p>
                    </div>
                    <br/><br/><br/>
                    <label id="LossLocationLabel" className="detailLabel">Loss Location</label>
                    <br/><br/>
                    <div id="lossLocDiv">
                        <p id="location">6101 Anacapri Blvsd</p>
                        <br/><br/><br/>
                        <p id="locationLine2">Lansing, MI 48917</p>
                    </div>
                </div>

                <div className="two" id="RiskUnitContact">
                    <div id="NotesDiv">
                        <label id="RiskUnitLabel" className="detailLabel">Risk Units</label>
                        <p>001 Ford F-150 Raptor 2018</p>
                    </div>
                    <div id="seperator"></div>
                        <div id="NotesDiv">
                        <label id="ContactForLoss" className="detailLabel">Contact for Loss</label>
                    <p>John Test <br/>248-908-7896</p>
                    </div>
                </div>
                <div className="three" id="photos">
                    <label id="PhotosLabel" className="detailLabel">Photos</label>
                    <div id="gallery">
                        <img src={crash} alt="logo" id="galleryImage"/>
                        <img src={crash2} alt="logo" id="galleryImage"/>
                    </div>
                </div>
                <div className ="four" id="claimBranch">
                    <div id="NotesDiv">
                        <label id="AssignedBranchLabel" className="detailLabel">Assigned Claim Branch</label>
                        <p>Albany, MI</p>
                    </div>
                    <div id="seperator"></div>
                    <div id="NotesDiv">
                        <label id="Notes" className="detailLabel">Notes</label>
                        <p>Insured brother was driving vehicle. Brother is not listed on policy. Uninsured Motorist coverage present on policy</p>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>
        <div id="footerLine"></div>
        <img src={tagline} className="tagline" />
      </div>
    );
  }
}