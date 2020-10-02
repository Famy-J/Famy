import React from "react"
import Maincharacter from "./Mainchar.jsx"
import axios from "axios"
import socketIOClient from "socket.io-client"
import { id } from "../../../db/schema.js"
const Endpoint="http://127.0.0.1:4001"


class Simulation extends React.Component {
    constructor(props){
        super(props)
        this.state={
          MpPosition:{},
          PsPositions:[],
          id:0,
          name:"",
          currentcharacter:""
        }
    }
    static getDerivedStateFromProps(nextprops){
      console.log(nextprops.data.Id)
      
      return {
    id:nextprops.data.Id,
    name:nextprops.data.name
      }

    }
    componentDidMount(){
      axios({
        url: '/Rposition',
        method: 'post',
        data:{id:this.props.data.Id}
      }).then(data=>{
        this.setState({MpPosition:data.data})
      })
      
      var idSend=true
      const socket=socketIOClient(Endpoint)
      socket.on("Simulationdata",data=>{
        if(idSend){
          socket.emit('id',this.state.id)
        }
        idSend=false
      })
    }
    render() {
      return <div id="map"> 
             <Maincharacter MainP={this.state.MpPosition} id={this.state.id} skin={this.props.data.skin}/>
      </div>
    }
  }

  export default Simulation