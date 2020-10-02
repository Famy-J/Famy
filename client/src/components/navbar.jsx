import React from "react"

class Navbar extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render() {
      return <div className="container">
      <ul>
        <li><a onClick={this.props.Home}>HOME</a></li>
        <li><a onClick={this.props.Shop}>SHOP</a></li>
        <li><a onClick={this.props.Aboutus}>ABOUT</a></li>
        <li onClick={()=>{location.reload()}}><a>LOGOUT</a></li>
      </ul>
    </div>;
    }
  }

  export default Navbar