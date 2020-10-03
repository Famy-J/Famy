import React from "react"
import axios from "axios"
import Toast from "light-toast";
class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state={
          username:"",
          password:"",
          email:""
        
        }
        this.AxiosRegister=this.AxiosRegister.bind(this)
    }
    AxiosRegister(){ //send axios request To register the user
      axios({
          url: '/register',
          method: 'post',
          data:{name:this.state.username,password:this.state.password,email:this.state.email}
        }).then(data=>{
           console.log(data)
            if(data.data.Registred){
                Toast.fail("Account exist")
                this.setState({username:"",password:""})
            }else{
              Toast.success("Success Registration Please Pick A character", 1500)
              this.props.IdS(data.data.id)
              } 
        })
  }
    render() {
      return <div className="body">
        
      <h1>Sign Up</h1>
      <input type="username" placeholder="Username" onChange={(e)=>{this.setState({username:e.target.value})}}  required/>
      <input type="email" placeholder="Email" onChange={(e)=>{this.setState({email:e.target.value})}}  required/>
      <input type="password" placeholder="Password" onChange={(e)=>{this.setState({password:e.target.value})}}  required/>
      <button onClick={this.AxiosRegister}>Sign Up</button>
      <h5>I Already have an <a href="#" onClick={this.props.toogle}>Account</a></h5>
    </div>
    }
  }

  export default Signup