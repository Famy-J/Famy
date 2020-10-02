import React from "react"
import axios from "axios"

class Friends extends React.Component {
constructor(props){
  super(props)
}
    render() {
      return <div id="friendContainer">
     {this.props.friends.map((elem,index)=>{
   return <div key={index} className="profilfriend">
    <div>{elem.name}</div>
    <img src="chat.png" className="chatl" id={index} onClick={this.props.chat}/>
   </div>
     })}
      </div>
    }
  }
  export default Friends
 