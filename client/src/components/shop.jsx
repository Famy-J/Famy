import React from "react";
import axios from "axios";
import Token from "./token.jsx";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
    this.updateBalance = this.updateBalance.bind(this);
  }
  updateBalance() {
    
    if(this.props.balance>=this.props.price){
      this.props.changeb(this.props.balance-this.props.price)
    }else{
      alert("You dont have enough ToKenS Check AboutUs For MoRe Informations")
    }
  }

  render() {
    return (
      <div>
        <div  className="card" id="items">
          <img className="avatar_image" src={this.props.image}></img>
          <h1 className="avatar_name" id="avName">
            {this.props.avatar}
          </h1>
          <h2 className="avatar_price" id="avPrice">
          {this.props.price} M-J
          </h2>
          <button className="btn" id="btnchop" onClick={this.updateBalance}>
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
    };

    
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

  }

  getCardPrice(price) {
    this.setState({ price });
   setTimeout(() => {
    console.log("price=>", this.state.price)
   }, 100);;
  }

  

  render() {
    return (
      <div>
        <div className="shopBody">
          <div className="Row">
            {this.state.avatars.map((element, key) => {
              return (
                <Avatar
                changeb={this.props.setnewbalance}
                  key={key}
                  id={this.props.id}
                  avatar={element.avatar}
                  image={element.image}
                  price={element.price}
                  balance={this.props.token}
                  handleClick={
                    this.getCardPrice
                    }
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