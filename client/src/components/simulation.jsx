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
        this.tooglechat=this.tooglechat.bind(this)
        this.tooglechatinvitations=this.tooglechatinvitations.bind(this)
    }
    tooglechatinvitations(){
      this.setState({displaychat:false,displayInvitations:!this.state.displayInvitations})
    }
    tooglechat(){
      this.setState({displaychat:!this.state.displaychat,displayInvitations:false})
    }
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
      '/fechdata'
     setInterval(()=>{
      axios({
        url: '/fechdata',
        method: 'post',
      }).then(result=>{
        this.setState({PsPositions:result.data})
      })
     },150)


      // var idSend=true  //We change from using socke.io To normal fetching function
      // const socket=socketIOClient(Endpoint)
      // socket.on("Simulationdata",data=>{
      //   console.log(data)
      //   this.setState({PsPositions:data})
      //   if(idSend){
      //     socket.emit('id',this.state.id)
      //   }
      //   idSend=false
      // })
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
        <img src="Friends.png" id="FriendsLogo" onClick={this.tooglechat}/>
        <img src="invitations.png" id="invitations" onClick={this.tooglechatinvitations}/>
      </div>
    }
  }

  export default Simulation