import React from "react"
import Shop from "./shop.jsx";
import AboutUs from "./aboutUs.jsx";
import Simulation from "./simulation.jsx";
import Toast from "light-toast";

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayshop: false,
      displayAboutUs: false,
      displaySimulation: false,
    }
    this.handlAbout = this.handlAbout.bind(this);
    this.handleshop = this.handleshop.bind(this);
    this.handleSimulation = this.handleSimulation.bind(this);

  }
  handleshop() {
    this.setState({ displayshop: true, 
    displayAboutUs: false,
    displaySimulation: false });
  
  }
  handlAbout() {
    this.setState({ 
      displayAboutUs: true, 
      displaySimulation: false,
      displayshop: false }); 

  }
  handleSimulation() {
    this.setState({ 
      displaySimulation: true ,
      displayAboutUs: false,
      displayshop : false});
  }

  render() {
    return (
      <div>

        <div className="container">
          <ul>
            <li onClick={this.handleSimulation}><a >HOME</a></li>
            <li onClick={this.handleshop}><a >SHOP</a></li>
            <li onClick={this.handlAbout}><a >ABOUT</a></li>
            <li onClick={() => { location.reload() }}><a>LOGOUT</a></li>

          </ul>


        </div>
        {this.state.displayshop ? <Shop /> : null}
        {this.state.displayAboutUs ? <AboutUs /> : null}
        {this.state.displaySimulation ? <Simulation /> : null}
      </div>
    )


  }
}

export default Navbar
  // {this.state.displayshop ? <Shop /> : null}

