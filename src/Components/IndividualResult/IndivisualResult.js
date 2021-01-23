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
            <p>{this.props.name}</p>
        </div>
        );
    } 
}
 
export default IndividualResult;