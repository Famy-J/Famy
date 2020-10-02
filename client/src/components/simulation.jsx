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
          UnmountPX:"",
          UnmountPY:"",
          friends:[],
          MpPosition:{},
          PsPositions:[],
          id:0,
          name:"",
          currentcharacter:"",
          displayInvitations:false,
          displayFriends:false,
          displayChat:false,
          displayAboutUs:false,
          selectedfriend:null,
          s:setInterval(()=>{
            axios({
              url: '/fechdata',
              method: 'post',
            }).then(result=>{
              this.setState({PsPositions:result.data})
            })
           },150),
           d:setInterval(()=>{
            axios({
           url: '/fetchFriends',
           method: 'post',
           data:{id:this.state.id}
        }).then(result=>{
          this.setState({friends:result.data})
        })},2000)
        }
        this.tooglechatinvitations=this.tooglechatinvitations.bind(this)
        this.tooglefriends=this.tooglefriends.bind(this)
        this.showchat=this.showchat.bind(this)
        this.hideInv=this.hideInv.bind(this)
        this.UnmountP=this.UnmountP.bind(this)
        this.deleteposition=this.deleteposition.bind(this)
    }

   deleteposition(){
    axios({
      url: '/deleteP',
      method: 'post',
      data:{x:this.state.UnmountPX,y:this.state.UnmountPY}
    })
   }

  UnmountP(x,y){
    this.setState({UnmountPX:x,UnmountPY:y})
  }

  hideInv(){
      this.setState({displayInvitations:false})
    }
    //////////////////
  showchat(selected){
    this.setState({displayChat:true,displayFriends:false,selectedfriend:(selected.target.id*1)})
  }
/////////////////////
    tooglechatinvitations(){
      this.setState({displayFriends:false,displayInvitations:!this.state.displayInvitations,displayChat:false})
    }
///////////////////
    tooglefriends(){
      this.setState({displayFriends:!this.state.displayFriends,displayInvitations:false,displayChat:false})
      
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
  //    var FD=setInterval(()=>{
  //     axios({
  //       url: '/fechdata',
  //       method: 'post',
  //     }).then(result=>{
  //       this.setState({PsPositions:result.data})
  //     })
  //    },150)
     
  //   var FF= setInterval(()=>{
  //     axios({
  //    url: '/fetchFriends',
  //    method: 'post',
  //    data:{id:this.state.id}
  // }).then(result=>{
  //   this.setState({friends:result.data})
  // })},2000)
    }

    componentWillUnmount(){
      this.deleteposition()
      clearInterval(this.state.s)
      clearInterval(this.state.d)
    }
    render() {
     var state=this.state
    var Players=  Object.keys(this.state.PsPositions).map(function(keyName, keyIndex) {
      if((keyName*1)!=state.id){
        return <Characters key={keyIndex} position={state.PsPositions[keyName]} id={keyName} Mid={state.id}/>
      }
       
})
      return <div id="map"> 
             <Maincharacter MainP={this.state.MpPosition} id={this.state.id} skin={this.props.data.skin} unmount={this.UnmountP}/>
        {Players}
        {this.state.displayInvitations?<Invitations id={this.props.data.Id} hide={this.hideInv}/>:null}
        {this.state.displayFriends?<Friends friends={this.state.friends} chat={this.showchat}/>:null}
        {this.state.displayChat?<Chat messages={this.state.friends[this.state.selectedfriend]} from={this.state.name} position={this.state.selectedfriend}/>:null}
        <img src="Friends.png" id="FriendsLogo" onClick={this.tooglefriends}/>
        <img src="invitations.png" id="invitations" onClick={this.tooglechatinvitations} />
      </div>
    }
  }

  export default Simulation