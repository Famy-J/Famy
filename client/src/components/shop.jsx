import React from "react";
import axios from "axios";
import Token from "./token.jsx";
import { get } from "mongoose";

class Avatar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e){
var price=this.props.price
    this.props.handleClick(price)
  }

  render() {
    return (
      <div>
        <div  className="card" id="items">
          <img className="avatar_image" src={this.props.image}></img>
          <h1 className="avatar_name" id="avName">
            {" "}
            {this.props.avatar}{" "}
          </h1>
          <h2 className="avatar_price" id="avPrice">
          {this.props.price} M-J
          </h2>
          <button className="btn" id="btnchop" onClick={this.handleClick}>
            purchase
          </button>
        </div>
      </div>
    );
  }
}

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatars: [],
      price: "",
      balance: "",
    };

    this.updateBalance = this.updateBalance.bind(this);
    this.getCardPrice = this.getCardPrice.bind(this);
  }

  componentDidMount() {
    axios
      .get("/shop")
      .then((response) => {
        this.setState({ avatars: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/balance")
      .then((response) => {
        this.setState({ balance: response.data.Balance });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getCardPrice(price) {
    this.setState({ price });
   setTimeout(() => {
    console.log("price=>", this.state.price)
   }, 100);;
  }

  updateBalance() {
    axios({
      url: "/purchase",
      method: "post",
      data: {
        Balance: this.state.balance - this.state.price,
      },
    }).then((data) => {
      console.log("data =>", data);
      //   save data in the database
      //   this.props.IdA(data.data.AccountNumber);
          // .then(item => {
          //   res.send("item saved to database");
          // })
          // .catch(err => {
          //   res.status(400).send("unable to save to database");
          // });
    });
  }

  render() {
    return (
      <div>
        <Token />
        <div className="shopBody">
          <div className="Row">
            {this.state.avatars.map((element, key) => {
              console.log(this.state.avatars)
              return (
                <Avatar
                  key={key}
                  avatar={element.avatar}
                  image={element.image}
                  price={element.price}
                  handleClick={ this.getCardPrice}
                />
              );
            })}
            ;
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
