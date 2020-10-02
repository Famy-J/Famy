import React from "react";
import axios from "axios";
import { id } from "../../../db/schema";
class Token extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: 0,
      token: 0 + "_MJ",
    };
    // this.useEffect = this.useEffect.bind(this);
  }
  componentDidMount() {
    const id = this.state.userId;
    setInterval(() => {
      axios({
        method: "POST",
        url: "/tokens/users",
        data: {
          token: id,
        },
      })
        .then((result) => {
          this.setState({ token: result });
        })
        .catch((e) => {
          console.log(e);
        });
    }, 100000);
  }

  render() {
    return (
      <div className="tokens">
        <img src="token.png" alt="" id="tokenImage" />

        <h3 id="token">{this.state.token}</h3>
      </div>
    );
  }
}
export default Token;