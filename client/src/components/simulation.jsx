import React from "react"
import Maincharacter from "./Mainchar.jsx"
import axios from "axios"
import socketIOClient from "socket.io-client"
import { id } from "../../../db/schema.js"
import Characters from "./chars.jsx"
import Chat from "./chat.jsx"
import Friends from "./Friends.jsx"
import Invitations from "./invitations.jsx"
// const Endpoint="http://127.0.0.1:4001"

class Simulation extends React.Component {
    constructor(props){
        super(props)
        this.state={
          MpPosition:{},
          PsPositions:[],
          id:0,
          name:"",
          currentcharacter:"",
          displayInvitations:false,
          displayFriends:false
        }
        this.tooglechatinvitations=this.tooglechatinvitations.bind(this)
        this.tooglefriends=this.tooglefriends.bind(this)
        this.fetchFriends=this.fetchFriends.bind(this)
    }

    fetchFriends(){
  axios({
     url: '/fetchFriends',
     method: 'post',
     data:{id:this.state.id}
  })
    }
///////////////////
    tooglechatinvitations(){
      this.setState({displayFriends:false,displayInvitations:!this.state.displayInvitations})
    }
///////////////////
    tooglefriends(){
      this.setState({displayFriends:!this.state.displayFriends,displayInvitations:false})
      axios({
        url: '/fetchFriends',
        method: 'post',
        data:{id:this.state.id}
     }).then(result=>{
       console.log(result)
     })
    }
//////////////////
    static getDerivedStateFromProps(nextprops){
      return {
    id:nextprops.data.Id,
    name:nextprops.data.name
      }

    }
    componentDidMount(){
      axios({
        url: '/Rposition',
        method: 'post',
        data:{id:this.props.data.Id,Face:`./chars/${this.props.data.skin}/FD/fd0.png`,skin:this.props.data.skin}
      }).then(data=>{
        this.setState({MpPosition:data.data})
      })
     setInterval(()=>{
      axios({
        url: '/fechdata',
        method: 'post',
      }).then(result=>{
        this.setState({PsPositions:result.data})
      })
     },150)

    }
    render() {
     var state=this.state
    var Players=  Object.keys(this.state.PsPositions).map(function(keyName, keyIndex) {
      if((keyName*1)!=state.id){
        return <Characters key={keyIndex} position={state.PsPositions[keyName]} id={keyName} Mid={state.id}/>
      }
       
})
      return <div id="map"> 
             <Maincharacter MainP={this.state.MpPosition} id={this.state.id} skin={this.props.data.skin}/>
        {Players}
        {this.state.displayInvitations?<Invitations id={this.props.data.Id}/>:null}
        {this.state.displayFriends?<Friends/>:null}
        <img src="Friends.png" id="FriendsLogo" onClick={this.tooglefriends}/>
        <img src="invitations.png" id="invitations" onClick={this.tooglechatinvitations}/>
      </div>
    }
  }

  export default Simulation