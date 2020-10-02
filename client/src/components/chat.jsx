import React from "react"
import axios from "axios"
class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state={
            message:""
        }
        this.sendmessage=this.sendmessage.bind(this)
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
            <div className="message">{elem.message}</div> </div>
         }else{
             return <div className="messages messages--received">
             <div className="message">{elem.message}</div>
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
  {/* {this.props.chat.map((elem,index)=>{
              if(this.props.from==elem.from+""){
                  return <div className="messages messages--sent">
                        <div className="message">{elem.from}: {elem.message}</div> </div>
              }else{
                  return  <div className="messages messages--received">
                          <div className="message">{elem.from}: {elem.message}</div>
                          </div>
              }
          })} */}

        //   <div className="messages messages--received">
        //   <div className="message">This codepen is an exemple of</div>
        //       <div className="message">how to create the Facebook thumb up</div>
        //   </div>
        //   <div className="messages messages--sent">
        //       <div className="message">Try to type</div>
        //       <div className="message">or click the thumb up!</div>
        //       <div className="message">;)</div>
        //   </div>
        //   <div className="messages messages--received">
        //       <div className="message">Enjoy!</div>
        //   </div>