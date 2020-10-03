import React, { Component } from "react";
import axios from "axios";

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      reason: "",
      date: "",
      dataF: [],
      displayBann: true,
      displayFeedback: false,
      dataR : []
    };
    this.AxiosBann = this.AxiosBann.bind(this);
    this.handlClick = this.handlClick.bind(this);
    this.handleBack = this.handleBack.bind(this);

  }
  componentWillMount(){
    axios({
      url: "/freports",
      method: "post",
    }).then(result=>{
      this.setState({dataR:result.data})
    })
  }
  
  handleBack() {
    this.setState({ displayBann: true, displayFeedback: false });
  }

  handlClick(e) {
    this.setState({ displayBann: false, displayFeedback: true });
    axios({
      url: "/Feeds",
      method: "GET",
    })
      .then((result) => {
        console.log(result);
        console.log(result.data);
        this.setState({ dataF: result.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  AxiosBann() {
    axios({
      url: "/banaccount",
      method: "post",
      data: {
        username: this.state.username,
        reason: this.state.reason,
        date: this.state.date,
      },
    });
  }

  render() {
    return (
      <div id="admin">
        {this.state.displayBann ? (
          <div>
            <h1 id="ban">Admin Interface</h1>
            <div id="userBann">
              <h1 className="h1a">Banned Accounts</h1>
              <input
                type="username"
                placeholder="Username"
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
                required
              />
              <input
                type="text"
                placeholder="reason"
                onChange={(e) => {
                  this.setState({ reason: e.target.value });
                }}
                required
              />

              <input
                type="date"
                onChange={(e) => {
                  this.setState({ date: e.target.value });
                }}
                required
              />
              <br></br>
              <button id="buttValid" onClick={this.AxiosBann}>
                Validate
              </button>
              <button id="getfeeds" onClick={this.handlClick}>
                See Feedbacks
              </button>
            </div>
            <div id="repo">
              <h1 id="repN">Reports</h1>   
           {this.state.dataR.map((elem,index)=>{
             return <div className="reposes" key={index}>{elem.to} Said : {elem.report}</div>
           })}
              
            </div>
          </div>
        ) : null}
        {this.state.displayFeedback ? (
          <div>
            <h1 id="feed" className="h1a">Users Feedbacks</h1>
            <button id="back" onClick={this.handleBack}>
              Back
            </button>
            <div id="feeds">
              {this.state.dataF.map((element, key) => {
                return (
                  <div>
                    <div id="feedhold">{element.feedbacks}</div> <br />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Admin;