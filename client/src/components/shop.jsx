import React from "react";
import axios from 'axios';
import Token from "./Token.jsx"

class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Token />
        <div className="card" id='items'>
          <img className="avatar_image" src={this.props.image}></img>
          <h1 className="avatar_name" id='avName'> {this.props.avatar} </h1>
          <h2 className="avatar_price" id='avPrice'>{this.props.price} M-J</h2>
          <button className="btn" id='btnchop' onClick={this.props.handleClick}>purchase</button>
        </div></div>
    )
  };
};


class Shop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      avatars: [],
      price: "",
      balance: "",
    }

    this.updateBalance = this.updateBalance.bind(this);
    this.getAvatarPrice = this.getAvatarPrice.bind(this);
  }

  componentDidMount() {
    axios.get('/shop')
      .then(response => {
        this.setState({ avatars: response.data });
        console.log(this.state)
      })
      .catch(error => {
        console.log(error)
      })
  };

  getUsersBalance() {
    axios.get('/balance')
      .then(response => {
        this.setState({ balance: response.data.Balance });
        console.log(this.state)
      })
      .catch(error => {
        console.log(error)
      });
  };

  getAvatarPrice(e) {
    var price = e.target.className('avatar_price')
    console.log(e.target)
    this.setState({ price })
    console.log(this.state.price)
  };

  updateBalance() {
    axios({
      url: '/balance',
      method: 'post',
      data: {
        Balance: this.state.balance - this.state.price,
      }
    }).then((data) => {
      this.props.id(data.data.AccountNumber)
      //save data in the database
      // data.save()
      //   .then(item => {
      //     res.send("item saved to database");
      //   })
      //   .catch(err => {
      //     res.status(400).send("unable to save to database");
      //   });
    });
  };

  render() {
    return (
      <div className="shopBody">
        <div className="Row">
          {this.state.avatars.map((element, key) => {
            return (
              <Avatar key={key} avatar={element.avatar} image={element.image} price={element.price} handleClick={this.getAvatarPrice} handleClick={this.updateBalance} />
            );
          })};
    </div>
      </div>
    )
  };
};

export default Shop