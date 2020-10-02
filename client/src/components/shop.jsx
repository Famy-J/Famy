import React from "react";
import axios from 'axios';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card">
        <h1 className="avatar_name"> {this.props.name} </h1>
        <img className="avatar_image" src={this.props.avatarImage}></img>
        <h2 className="avatar_price">{this.props.price}</h2>
        <button className="btn" onClick={this.props.handleClick}>purchase</button>
      </div>
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

  // Fetching avatar data to display it when the user switch to the shop component  
  componentDidMount() {
    axios.get('/shop')
      .then(response => {
        this.setState({ avatars: response.data });
        // console.log(this.state)
      })
      .catch(error => {
        console.log(error)
      })
  };

  // Fetching the user's current balance
  componentDidMount() {
    axios.get('/token')
      .then(response => {
        this.setState({ balance: response.data });
        console.log(this.state)
      })
      .catch(error => {
        console.log(error)
      });
  }

  // Get avatar price to handleClick button 
  getAvatarPrice(e) {
    var price = e.target.className('avatar_price')
    // console.log(e.target)
    this.setState({ price })
    // console.log(this.state.price)
  };

  // Update user's balance after making a purchase and saving it in the database
  updateBalance() {
    axios({
      url: '/token',
      method: 'post',
      data: {
        Balance: this.state.balance - this.state.price,
      }
    }).then((data) => {
      this.props.IdA(data.data.AccountNumber)
      this.setState({ balance: this.state.balance - this.state.price })
      location.reload();
      //save data in the database
    });
  };

  render() {
    return (
      <div className="shopBody">
        <div className="Row">
          {this.state.avatars.map((element, key) => {
            return (
              <Avatar key={key} name={element.name} image={element.avatarImage} price={element.price} handleClick={this.getAvatarPrice} handleClick={this.updateBalance} />
            );
          })};
          <h2>{this.state.Balance}</h2>
        </div>
      </div>
    )
  };
};

export default Shop