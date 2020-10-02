import React from "react"

class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.state={
          displayshop : false,
          displayAboutUs : false,
          displaySimulation: false,
        }
        this.handleshop= this.handleshop.bind(this);
    }
    handleshop(){
      this.setState({displayshop:true});
    }

    render() {
      return <div className="container">
      <ul>
        <li><a>HOME</a></li>
        <li><a  onClick = { this.handleshop}>SHOP</a></li>
        <li><a>ABOUT</a></li>
        <li onClick={()=>{location.reload()}}><a>LOGOUT</a></li>
      </ul>
    </div>;
    }
  }

  export default Navbar