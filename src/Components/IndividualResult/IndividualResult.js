import React from 'react';
import './IndividualResult.css';

class IndividualResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    addSeed = () => {
        this.props.addSeed(this.props.name, this.props.id, this.props.artist, this.props.image)
    }

    render() { 
        return ( 
        <div className="individualResult" onClick={this.addSeed}>
            <h3 className="individualResultName">{this.props.name}</h3>
            <h4 className="individualResultArtist">{this.props.artist}</h4>
        </div>
        );
    } 
}
 
export default IndividualResult;