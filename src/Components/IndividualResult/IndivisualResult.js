import React from 'react';

class IndividualResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    addSeed = () => {
        this.props.addSeed(this.props.name, this.props.id)
    }

    render() { 
        return ( 
        <div onClick={this.addSeed}>
            <h2>{this.props.name}</h2>
            <h4>{this.props.artist}</h4>
        </div>
        );
    } 
}
 
export default IndividualResult;