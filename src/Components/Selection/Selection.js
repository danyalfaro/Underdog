import React from "react";
import "./Selection.scss";

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  removeSeed = () => {
    this.props.removeSeed(this.props.id);
  };

  setRemove = () => {
    if (this.props.type === "seed") {
      return (
        <button className="removeBtn" onClick={this.removeSeed}>
          X
        </button>
      );
    } else {
      return;
    }
  };

  render() {
    return (
      <div className="selectionWrapper">
        <img
          className={this.props.artist ? "songImage" : "artistImage"}
          src={this.props.imageUrl}
          alt="cover"
          width="190px"
        ></img>
        {this.setRemove()}
        <div className="selectionName">{this.props.name}</div>
        <div className="selectionArtist">{this.props.artist}</div>
      </div>
    );
  }
}

export default Selection;
