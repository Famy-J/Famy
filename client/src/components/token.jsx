import React from "react";
import axios from "axios";
import { id } from "../../../db/schema";
class Token extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: "ab",
      balance: 0,
    };
    // this.useEffect = this.useEffect.bind(this);
  }
  componentDidMount() {
    axios({
      method: "GET",
      url: "/balance",
    }).then((res) => {
      console.log(this.state.balance);
      this.setState({ balance: res.data.Balance });
    }).catch((e) => {
      res.status(404);
    });

    axios({
      method: "post",
      url: "/balance",
      data: {
        name: this.state.userId,
      },
    });

    setInterval(() => {
      axios({
        method: "POST",
        url: "/tokens/users",
        data: {
          token: this.state.balance + 1,
        },
      }).catch((e) => {
        res.status(404);
      });

      axios({
        method: "GET",
        url: "/balance",
      }).then((res) => {
        console.log(this.state.balance);
        this.setState({ balance: res.data.Balance });
      }).catch((e) => {
        res.status(404);
      });
    }, 100000);
  }

  render() {
    return (
      <div className="tokens">
        <img src="token.png" alt="" id="tokenImage" />

        <h3 id="token">{this.state.balance}_MJ</h3>
      </div>
    );
  }
}
export default Token;
