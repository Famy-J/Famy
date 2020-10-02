import React from "react";
import Navbar from "./navbar.jsx";
import Token from "./token.jsx";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Column">
        <h1 className="avatar_name"> {this.props.avatar} </h1>
        <h3 className="avatar_name">price:{this.props.price} </h3>
        <img className="avatar_image" src={this.props.image}></img>
        <button className="btn">purchase</button>
      </div>
    );
  }
}

const character = [
  {
    avatar: "pokemon",
    image:
      "https://fr.web.img2.acsta.net/r_640_360/newsv7/19/11/20/17/13/0883987.jpg",
  },
  {
    avatar: "heyy",
    image:
      "https://fr.web.img2.acsta.net/r_640_360/newsv7/19/11/20/17/13/0883987.jpg",
  },
  {
    avatar: "heyy",
    image:
      "https://fr.web.img2.acsta.net/r_640_360/newsv7/19/11/20/17/13/0883987.jpg",
  },
  {
    avatar: "heyy",
    image:
      "https://fr.web.img2.acsta.net/r_640_360/newsv7/19/11/20/17/13/0883987.jpg",
  },
  {
    avatar: "heyy",
    image:
      "https://fr.web.img2.acsta.net/r_640_360/newsv7/19/11/20/17/13/0883987.jpg",
  },
  {
    avatar: "heyy",
    image:
      "https://fr.web.img2.acsta.net/r_640_360/newsv7/19/11/20/17/13/0883987.jpg",
  },
];

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Token />
        <div className="shopBody">
          <div className="Row">
            {character.map((element, key) => {
              return (
                <Avatar
                  key={key}
                  avatar={element.avatar}
                  image={element.image}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Shop;
