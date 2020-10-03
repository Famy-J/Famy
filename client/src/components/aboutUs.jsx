import React from "react";
import axios from "axios";
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
        <h2 id="abs">About Us</h2>
        <h3>Our product is basically a social media application but it looks a better way different than other social media applications</h3>
        <h4>what are Mary-j Tokens ?</h4>
        <p>Mary-J tokens are usefull to allow users to buy real e-cards like PayPal card
          we appreciate your time spent on connecting to our application, for this reason we allow users to gain 5 tokens per 10 minutes</p>
        <h2>development team:</h2>
        <h4 id="devName" >
          <a id="namedevlop" href="https://github.com/Firas-Bchir">*Firas Bchir*</a> <br />
          <a id="namedevlop" href="https://github.com/alaa-lasoued">*Ala lassoued*</a> <br />
          <a id="namedevlop" href="https://github.com/malek-chebil">*Malek Chebil*</a> <br />
          <a id="namedevlop" href="https://github.com/Yassine-Knaizia">*Yassine Knaizia*</a>{" "}
          <br />
        </h4>
        <h3 id="contact" >FeedBack</h3>
        <input id="Fid"
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