import React from "react"
import axios from "axios"
class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state={
            message:""
        }
        this.sendmessage=this.sendmessage.bind(this)
        this.sendreport=this.sendreport.bind(this)
    }
    sendreport(e){
       
        var msgnumber=e.target.id[(e.target.id).length-1]
        console.log()
        var message=this.props.messages.Messages[msgnumber]
        axios({
            url: "/reports",
            method: 'post',
            data:{to:e.target.id.substring(0, e.target.id.length - 1),message:message.message}
          })
    }
    sendmessage(){ //send Request to the server To save the message in the db
 
        axios({
            url: '/message',
            method: 'post',
            data:{from:this.props.from,to:this.props.messages.name,message:document.getElementById("msginput").value,position:this.props.position}
          })
    }
    render() {
      return <div className="screen">
      <div className="conversation">
     {this.props.messages.Messages.map((elem,index)=>{
         if(this.props.from==elem.from){
            return <div className="messages messages--sent">
            <div className="message" key={index}>{elem.message}</div></div>
         }else{
             return <div className="messages messages--received" key={index}>
                 
              <div className="message"><img src="report.png" className="test0" onClick={this.sendreport} id={elem.from+index}/>{elem.message}</div>
             </div>
         }
     })}
      </div>
      <div className="text-bar">
          <form className="text-bar__field" id="form-message">
              <input type="text" placeholder="Text" id="msginput"/>
          </form>
          <div id="sendmsg" onClick={this.sendmessage}>
           Send
          </div>
      </div>
  </div>
    }
  }
  
  export default Chat
