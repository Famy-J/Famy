import React from "react"
import axios from "axios"

class Friends extends React.Component {
constructor(props){
  super(props)
}
    render() {
      return <div id="friendContainer">
     <div className="profilfriend">
       <div>jammy</div>
       <img src="chat.png" className="chatl"/>
     </div>
      </div>
    }
  }
  export default Friends