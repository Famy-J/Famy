import React from "react"

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
            data:{from:this.props.from,message:this.state.message}
          })
    }
    render() {
      return <div id="chat">
      <div className="screen">
      <div className="conversation">
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
      </div>
      <div className="text-bar">
          <form className="text-bar__field" id="form-message">
              <input type="text" placeholder="Type" id="inpType" onChange={(e)=>{
                  this.setState({message:e.target.value})
              }}/>
          </form>
          <div className="text-bar__thumb">
              <div className="thumb" onClick={this.sendmessage}>Send</div>
          </div>
      </div>
  </div>
  </div>
    }
  }
  
  export default Chat