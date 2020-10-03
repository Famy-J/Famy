import React from "react";
import Navbar from "./navbar.jsx";
import axios from "axios";
import { get } from "mongoose";


class AboutUs extends React.Component {
  constructor() {
    super();
    this.state = {
      feedback: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCange = this.handleCange.bind(this);
  }

  handleCange(event) {
    this.setState({
      feedback: event.target.value,
    });
  }

  handleClick() {
    axios({
      url: "/feedbacks",
      method: "post",
      data: {
        feedback: this.state.feedback,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    Toast.success("Thank you for your feedback", 2500, () => {
      location.reload();
    });
  }

  render() {
    return (
      <div className="aboutus">
        {/* <Navbar /> */}
        <h1>About Us</h1>
        <p>Welcome to FAMY organization first social media life simulation. </p>
        <h3>description </h3>
        <p>Our product is basically a social media application but it looks a better way different than other social media applications</p>
        <h4>what are Mary-j Tokens ?</h4>
        <p> Mary-J tokens are usefull to allow users to buy real e-cards like PayPal card
          we appreciate your time spent on connecting to our application, for this reason we allow users to gain 5 tokens per 10 minutes   
        </p>
        <h2>Team members</h2>
        <h4>
          <a href="https://github.com/Firas-Bchir">Firas Bchir</a> <br />
          <a href="https://github.com/alaa-lasoued">Ala lassoued</a> <br />
          <a href="https://github.com/malek-chebil">Malek Chebil</a> <br />
          <a href="https://github.com/Yassine-Knaizia">Yassine Knaizia</a>{" "}
          <br />
        </h4>
        <h3>Contact Us</h3>
        <input
          type="text"
          placeholder="send us a feedback or find support"
          onChange={this.handleCange}
          required
        />
        <button id="feedback" onClick={this.handleClick}>
          send
        </button>
      </div>
    );
  }
}
export default AboutUs;