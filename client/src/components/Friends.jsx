import React from "react"
import axios from "axios"

class Friends extends React.Component {
    render() {
      return <h1>Bonjour, {this.props.name}</h1>;
    }
  }
  export default Friends