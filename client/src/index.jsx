import React from "react";
import ReactDOM from "react-dom";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Shop from "./components/shop.jsx";
import Simulation from "./components/simulation.jsx";
import NavBar from "./components/navbar.jsx";
import Logo from "./components/logo.jsx";
import Signup0 from "./components/signup0.jsx";
import Token from "./components/token.jsx";
import AboutUs from "./components/aboutUs.jsx";
import Admin from "./components/Admin.jsx";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      userdata: {},
      displaynavbar: true,
      displaylogin: false,
      displaysignup: false,
      displayshop: true,
      displaySimulation: false,
      displaylogo: false,
      displaySignup0: false,
      displayToken: false,
      displayAboutUs: false,
      displayAdmin: false,
    };
    this.UpdateData = this.UpdateData.bind(this);
    this.selectCharId = this.selectCharId.bind(this);
    this.startS = this.startS.bind(this);
    this.Mlogin = this.Mlogin.bind(this);
    this.toggleLoginSignup = this.toggleLoginSignup.bind(this);
  }
  toggleLoginSignup() {
    // Toggle between login and signup if you have Already an account or you dont
    this.setState({
      displaylogin: !this.state.displaylogin,
      displaysignup: !this.state.displaysignup,
    });
  }

  UpdateData(data) {
    this.setState({ userdata: data });
  }

  selectCharId(id) {
    // Display the secound Signup component which is (signup0) To select the character that you will play with
    this.setState({ ID: id, displaySignup0: true, displaysignup: false });
  }

  startS() {
    this.setState({
      displaySimulation: true,
      displaySignup0: false,
      displaylogo: false,
      displaynavbar: true,
      displaylogin: false,
    });
  }

  Mlogin() {
    this.setState({ displaySignup0: false, displaylogin: true });
  }
  render() {
    return (
      <div>
        {this.state.displaynavbar ? <NavBar /> : null}
        {this.state.displaylogo ? <Logo /> : null}
        {this.state.displaysignup ? (
          <Signup IdS={this.selectCharId} toogle={this.toggleLoginSignup} />
        ) : null}
        {this.state.displayshop ? <Shop /> : null}
        {this.state.displaylogin ? (
          <Login
            start={this.startS}
            toogle={this.toggleLoginSignup}
            updatedata={this.UpdateData}
          />
        ) : null}
        {this.state.displaySimulation ? (
          <Simulation data={this.state.userdata.data} />
        ) : null}
        {this.state.displaySignup0 ? (
          <Signup0 id={this.state.ID} login={this.Mlogin} />
        ) : null}
        {this.state.displayToken ? <Token /> : null}
        {this.state.displayAboutUs ? <AboutUs /> : null}
        {this.state.displayAdmin ? <Admin /> : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("App"));