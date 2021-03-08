import React from 'react';
import './Selection.scss';

class Selection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    removeSeed = () => {
        this.props.removeSeed(this.props.id);
    }

    setRemove = () => {
        if(this.props.type === 'seed'){
            return (<button onClick={this.removeSeed}>Remove</button>);
        }else{
            return;
        }
    }

    render() { 
        return ( 
        <div className="selectionWrapper">
            <img src={this.props.imageUrl} alt="cover" width="150px"></img>
            <p className="selectionName">{this.props.name}</p>
            <p className="selectionArtist">{this.props.artist}</p>
            {this.setRemove()}
        </div> 
        );
    }
}
 
export default Selection;