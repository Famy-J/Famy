import React from "react";
class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <div id="feedhold">{this.props.feedbacks}</div> <br />
      </div>
    );
  }
}
export default Feedback;
