import React from "react";
import axios from "axios";

class Token extends React.Component {
  constructor() {
    super();
    this.state = {
      balance:0,
      Fb:setInterval(()=>{
        axios({
            method: "POST",
            url: "/balance",
            data:{id:this.props.userid,balance:(document.getElementById("token").innerHTML.split("_")[0])*1}
          })
      },100),
      fd:setInterval(()=>{
this.setState({balance:this.state.balance+10})
this.props.Pass(this.state.balance)
    },10000)
    };
  }
  componentDidMount() {
    setTimeout(() => {
      axios({
        method: "POST",
        url: "/balanceF",
        data:{id:this.props.userid,}
      }).then(result=>{
        this.setState({balance:result.data.balance})
        this.props.Pass(result.data.balance)
      })
    }, 100);

    
  }
  
   static getDerivedStateFromProps(nextprops,prevstate){
   console.log(nextprops.newbalance,prevstate)
   if(nextprops.newbalance!=undefined){
     if(nextprops.newbalance!==prevstate.balance){
      console.log("changed")
      return {
        balance:nextprops.newbalance
            }
     }
   }else{
     return{}
   }
    }

  render() {
    return (
      <div id="tokens">
        <img src="token.png" alt="" id="tokenImage"/>
        <h3 id="token">{this.state.balance}_MJ</h3>
      </div>
    );
  }
}
export default Token;