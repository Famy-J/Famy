import React from "react"
import axios from "axios"

class Invitations extends React.Component {
    constructor(props){
        super(props)
        this.state={
       Invitations:[]
        }
        this.rejectinvitation=this.rejectinvitation.bind(this)
        this.acceptinvitation=this.acceptinvitation.bind(this)
    }
rejectinvitation(e){
this.props.hide()
axios({
  url: '/rejectinvitation',
  method: 'post',
  data:{to:this.props.id,id:e.target.id}
})
}
acceptinvitation(e){
  this.props.hide()
console.log(e.target)
axios({
  url: '/acceptinvitation',
  method: 'post',
  data:{to:this.props.id,id:e.target.id}
})
}
    componentDidMount(){
        axios({
            url: '/fetchIn',
            method: 'post',
            data:{id:this.props.id,to:this.props.id}
          }).then(data=>{
              this.setState({Invitations:data.data})
          })
    }
    render() {
      return <div id="invcontainer">
        {this.state.Invitations.map((elem,index)=>{
            return <div>
            <div className="invitations" key={index}>You have invitation from {elem.from}</div>
            <img src="tick-logo.png" alt="" className="tick" id={elem.id}  onClick={this.acceptinvitation}/>
            <img src="X-logo.png" alt="" className="X" id={elem.id}  onClick={this.rejectinvitation}/>
            </div>
        })}
        </div>
              
    }
  }
  export default Invitations