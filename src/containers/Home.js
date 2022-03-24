import React, { Component } from "react";
import ReactDOM from 'react-dom';
import "./Home.css";
import crash from "./crash.jpg";
import tagline from './aotagline.png'
import $ from 'jquery';
import HomeCard from "../components/HomeCard.js";
import axios from 'axios';
import pdf from "./pdf.png";
import word from "./word.png";
import excel from "./excel.png";
import text from "./text.png";
import {PopupboxContainer, PopupboxManager} from 'react-popupbox';
var that;
var currentClaim;
var API_CLAIM_URL = "https://aocapstone.me/api/claim?claimNum="
var currentClaim = ""
var API_URL = "https://aocapstone.me/api/"
var API_FILE_URL = "https://aocapstone.me/api/getfiles?claimId="
var lossCauses = ["Wind", "Fire", "Flood"]
var policyTypes = ["fa fa-car", "fa fa-home"]
var docs = [pdf, word, excel, text]
var docDec = ["Estimate.pdf", "Policy.docx", "Invoice.xls", "Sample.txt"]
var tempFilename = "image not found"

export default class Home extends Component {
  constructor(props) {
     super(props);
     let params = this.props.location.search;
     let redirect = (params !== "");
     currentClaim = params.substring(7);
     this.state = {
                    curClaim : {},
                    param: redirect,
                    paramVal: currentClaim,
                    symbol: "",
                    filename: "",
                    renderImage: true,
                    renderDoc: true,
                    claims: [],
                    userId: this.props.userId,
                    queried: false,
                    tempFilename: "Open Gallery",
                    links: "",
                    tab: "detailsLink"
                  };
     that = this;
     this.symbol = ""
     this.tempFilename = 'No images found';
  }

  closeBox() {
      var el = document.getElementsByClassName("popupbox-wrapper")
      if (el.length > 0) {
          document.getElementsByClassName("popupbox-wrapper")[0].classList.remove("unhide");
      }
      PopupboxManager.close();
  }

  openBox(src) {
      const content = (<img id = "openimage" src={src} onClick={this.closeBox}/>)
      PopupboxManager.open({content});
      document.getElementsByClassName("popupbox-wrapper")[0].classList.add("unhide");
      document.body.classList.add("greyed");
  }

  openPopupbox(i) {
      var source = "data:image/png;base64,";
      var encode = this.state.links[i][1];
      source += encode
      that.openBox(source)
  }

    openBoxVideo(src) {
        const content = (<video controls> <source type="video/mp4" src = {src}/> </video>);
        PopupboxManager.open({content});
        document.getElementsByClassName("popupbox-wrapper")[0].classList.add("unhide");
        document.body.classList.add("greyed");
    }

    openPopupboxVideo(i) {
        var source = "data:video/mp4;base64,";
        var encode = this.state.links[i][1];
        source += encode
        that.openBoxVideo(source)
    }



    claimSelected(i) {
    let claim = this.state.claims[i];
    this.setState({curClaim:  claim});
  }


  setClaimParam(res, claimNum) {
        this.state = {curClaim : res.data, paramVal: this.state.paramVal, param: true};
  }

  getClaimParam() {

      let req = "https://aocapstone.me/api/claim?claimNum=" + this.state.paramVal;
      var that = this;
      axios.get(req)
          .then(function (response) {
              that.setClaimParam(response, that.state.paramVal);
          })
  }


  setClaims(res) {
      var claims = res.data;
      var mostRecent = claims.reverse();
      var currClaim = mostRecent[0];
      if (this.state.param === true) {
          currClaim = this.state.curClaim;
      }
      this.setState({claims : mostRecent, curClaim : currClaim, userId : this.props.userId, queried: true});
      this.getLinks();
  }


  getClaimList() {
      let user = this.state.userId;
      let req = "https://aocapstone.me/api/accountclaims?acctId=" + user;
      var that = this;
      axios.get(req)
          .then(function (response) {
              that.setClaims(response);
          });
  }


  addLinks() {
          var gal = [];
          document.body.addEventListener('click', that.closeBox, true);
          var links = that.state.links;
          for (let i = 0; i < links.length; i++) {
              var name = links[i][0].substr(0, 12);
              var type = links[i][0].substr(links[i][0].indexOf("."));
              var y = links[i][1].endsWith("==") ? 2 : 1;
              var size = (links[i][1].length * (3/4)) - y
              var mb = (size / 1000000).toFixed(3);
              if (type === ".jpg") {
                  gal.push(<tr><td><i className ="fa fa-image"></i></td><td><a id ="imageLink" onClick = {() => that.openPopupbox(i)}>{name}</a></td><td>{type}</td><td>{mb}</td></tr>);
              } else if (type === ".mp4") {
                  gal.push(<tr><td><i className ="fa fa-video"></i></td><td><a id = "videoLink" onClick = {() => that.openPopupboxVideo(i)}>{name}</a></td><td>{type}</td><td>{mb}</td></tr>);
              }
          }
          return gal;
  }

  setLinks(res) {
      if(this._mounted) {
          this.setState({links: res});
      }
  }

  getLinks() {
      var req = API_URL + "getfiles?claimId=" + this.state.curClaim.id
      var that = this;
      axios.get(req)
          .then(function (response) {
              if (response.data.length > 0) {
                  that.setLinks(response.data);
              }
          })
  }

  changeTab(tab, current) {
      document.getElementById(current).classList.remove("selectedTab")
      document.getElementById(tab).classList.add("selectedTab")
      that.setState({tab: tab});
  }

  getIncidents() {
      var inc = [];
      var incidents = that.state.curClaim.incidents;
      for (let i = 0; i < incidents.length; i++) {
          var cur = incidents[i];
          var name = "";
          var type = "";
          var desc = "";
          var first = "";
          var last = "";
          try {
            name = cur[0];
            type = cur[1];
            desc = cur[2];
            first = cur[3];
            last = cur[4];
          } catch(err) {
              console.log("caught incident exc")
          }
          if(type === "2") {
            inc.push(<table><th></th><th>Vehicle</th><th>Driver</th><th>Description</th><tr><td><i className ="fa fa-car"></i></td><td id="nameColTd">{name}</td><td>{first+" " + last}</td><td>{desc}</td></tr></table>)
          } else if (type === "3") {
              inc.push(<table><tr><th></th><th>Injured</th><th>Description</th></tr><tr><td id="incIcon"><i className ="fa fa-user"></i></td><td id="nameColTd">{first + " " + last}</td><td>{desc}</td></tr></table>)
          } else if (type === "1") {
              inc.push(<table><tbody><tr><th></th><th>Location</th><th>Description</th></tr><tr><td id="incIcon"><i className ="fa fa-home"></i></td><td id="nameColTd">{name}</td><td>{desc}</td></tr></tbody></table>)
          }
      }
      return inc;
  }


  createTable = () => {
    let table = []
      var claims = this.state.claims;
    for(let i=0; i < claims.length; i++) {
        var currentClaim = claims[i];
        table.push(<tr onClick={() => this.claimSelected(i)}><td>{currentClaim.reportedDate}</td>
                       <td id="insuredtd">{currentClaim.insuredFirstName + " " + currentClaim.insuredLastName}</td>
                       <td id="symboltd"><i id="symbolIcon" className={currentClaim.policyType === "Auto" ? "fa fa-car" : "fa fa-home"}></i></td>
                       <td class="claimNumberVal">{currentClaim.claimNumber}</td>
                       <td>{currentClaim.lossDate}</td>
                       <td>{currentClaim.mainFirstName + " " + currentClaim.mainLastName}</td>
                       <td id="lastCol">{currentClaim.mainContactPhone === null ? "Unknown" : currentClaim.mainContactPhone}</td></tr>)
    }

    return table;
  }


  componentDidMount = () => {
      this._mounted = true;
      if (this.state.param === true) {
          this.getClaimParam();
      }
      this.getClaimList();
      this.addLinks();
  }

  componentWillUnmount = () => {
      this._mounted = false;
  }

  

  render() {
          return (
              <div>
                  <PopupboxContainer/>

              <div className="Home">

                  <div className="lander">

                      <HomeCard  getIncidents = {this.getIncidents} addLinks = {this.addLinks} changeTab = {this.changeTab} tab = {this.state.tab} getFilename = {this.getFilename} tempFilename = {this.state.tempFilename} openPopupbox = {this.openPopupbox} getLinks = {this.getLinks} curClaim = {this.state.curClaim} fromSearch = {false} getImage = {this.getImage} getDocs = {this.getDocs} loading = {text}/>;
                      <div>
                          <table id="claimList">
                              <tbody>
                              <tr id="headerRow">
                                  <th>Report Date</th>
                                  <th>Insured</th>
                                  <th id="type">Type</th>
                                  <th>ClaimNumber</th>
                                  <th>DOL</th>
                                  <th>Contact</th>
                                  <th id="contactPhoneHeader">Contact Phone</th>
                              </tr>
                              {this.createTable()}
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <img src={tagline} className="tagline" />
              </div>
              </div>

          );
      }

}