import React, { Component } from 'react';
import axios from "axios";

export class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            reason: "",
            date: "",
            dataF : [],
            displayBann: true,
            displayFeedback:false,
        }
        this.AxiosBann = this.AxiosBann.bind(this);
        this.handlClick = this.handlClick.bind(this);
        this.changeState = this.changeState.bind(this);
    }

  handlClick (e){
    this.setState({displayBann:false,displayFeedback:true})
    axios({
        url: '/ban',
        method: 'GET',
        
    }).then(result =>{ 
        this.setState({dataF : result.data})
    })

  }
    AxiosBann() {
        axios({
            url: '/ban',
            method: 'post',
            data: { username: this.state.username, reason: this.state.reason, date: this.state.date }
        })
    }
    changeState() {
       
    }


    render() {
        return (
            <div id="admin" >
                {this.state.displayBann ? <div>
                <h1 id="ban"  >Admin Interface</h1>
                <div id="userBann">
                    <h1>Banned Accounts</h1>
                    <input type="username" placeholder="Username" onChange={(e) => { this.setState({ username: e.target.value }) }} required />
                    <input type="text" placeholder="reason" onChange={(e) => { this.setState({ reason: e.target.value }) }} required />

                    <input type="date" onChange={(e) => { this.setState({ date: e.target.value }) }} required />
                    <br></br>
                    <button id="buttValid" onClick={this.AxiosBann} >Validate</button>
                    <button id="getfeeds" onClick={this.handlClick} >See Feedbacks </button>
                </div>

                <div id="repo">
                    <h1 id="repN">Reports</h1>
                    <div id="reposes">
                    </div>
                    <br></br>
                    <div id="reposes">
                    </div>
                    <br></br>
                    <div id="reposes">
                    </div>
                    <br></br>
                    <div id="reposes">
                    </div>
                    <br></br>
                    <div id="reposes">
                        
                    </div>

                </div> </div> : null }
                {this.state.displayFeedback ?
                <div>
                    <h1 id="feed">Users Feedbacks</h1>
                    <div id="feeds">
                    <div id="feedhold">
                    </div>
                    <br></br>
                    <div id="feedhold">
                    </div>
                    <br></br>
                    <div id="feedhold">
                    </div>
                    <br></br>
                    <div id="feedhold">
                    </div>
                    <br></br>
                    <div id="feedhold">
                    </div>
                    <br></br>
                    <div id="feedhold">
                    </div>

                    </div>
                </div>
                :null }
            </div> 

        )
    }
}

export default Admin
