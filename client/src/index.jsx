import React from "react"
import ReactDOM from 'react-dom'
import Login from "./components/login.jsx"
import Signup from "./components/signup.jsx"
import Shop from "./components/shop.jsx"
import Simulation from "./components/simulation.jsx"
import NavBar from "./components/navbar.jsx"
import Logo from "./components/logo.jsx"
import Signup0 from "./components/signup0.jsx"
import AboutUs from "./components/aboutUs.jsx"
class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
          ID:"",
          userdata:{},
          displaynavbar:false,
          displaylogin:false,
          displaysignup:true,
          displayshop:false,
          displaySimulation:false,
          displaylogo:true,
          displaySignup0:false,
          displayAboutUs:false,
          displayS:false
        }
        this.UpdateData=this.UpdateData.bind(this)
        this.selectCharId=this.selectCharId.bind(this)
        this.startS=this.startS.bind(this)
        this.Mlogin=this.Mlogin.bind(this)
        this.toggleLoginSignup=this.toggleLoginSignup.bind(this)
        this.displayAboutUs=this.displayAboutUs.bind(this)
        this.displayshop=this.displayshop.bind(this)
        this.displaysHome=this.displaysHome.bind(this)
        this.Sset=this.Sset.bind(this)
    }

    Sset(){
      this.setState({displayS:true})
    }

     displaysHome(){
      this.setState({displayAboutUs:false,displaySimulation:true,displayshop:false})
     }

     displayshop(){
      this.setState({displayAboutUs:false,displaySimulation:false,displayshop:true})
     }

     displayAboutUs(){
       this.setState({displayAboutUs:true,displaySimulation:false,displayshop:false})
     }

    toggleLoginSignup(){ // Toogle between login and signup if you have Already an account or you dont
      this.setState({displaylogin:!this.state.displaylogin,displaysignup:!this.state.displaysignup})
    }

    UpdateData(data){
     this.setState({userdata:data})
    }

    selectCharId(id){ // Display the secound Signup component which is (signup0) To select the character that you will play with 
      this.setState({ID:id,displaySignup0:true,displaysignup  :false})
    }

    startS(){
      this.setState({displaySimulation:true,displaySignup0:false,displaylogo:false,displaynavbar:true,displaylogin:false})
    }

    Mlogin(){
      this.setState({displaySignup0:false,displaylogin:true})
    }
    
    render() {
      return <div>
          {this.state.displaynavbar?<NavBar Aboutus={this.displayAboutUs} Shop={this.displayshop} Home={this.displaysHome}/>:null}
          {this.state.displaylogo?<Logo/>:null}
          {this.state.displaysignup?<Signup IdS={this.selectCharId} toogle={this.toggleLoginSignup}/>:null}
          {this.state.displayshop?<Shop/>:null}
          {this.state.displaylogin?<Login start={this.startS} toogle={this.toggleLoginSignup} updatedata={this.UpdateData}/>:null}
          {this.state.displaySimulation?<Simulation data={this.state.userdata.data}/>:null}
          {this.state.displaySignup0?<Signup0 id={this.state.ID} login={this.Mlogin}/>:null}
          {this.state.displayAboutUs?<AboutUs/>:null}
            </div>
    }
  }

  ReactDOM.render(<App/>,document.getElementById("App"))
