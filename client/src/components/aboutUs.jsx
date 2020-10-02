import React from "react";
import Navbar from "./navbar.jsx";
import axios from "axios";
import { get } from "mongoose";
import Toast from "light-toast";
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
        <h3>description:</h3>
        <h4>what are Mary-j Tokens ?</h4>
        <p>description here</p>
        <h2>development team:</h2>
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