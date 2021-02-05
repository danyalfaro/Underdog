import React from 'react';
import './Selection.scss';

class Selection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div className="selectionWrapper">
            <img src={this.props.imageUrl} alt="cover" width="200px"></img>
            <p className="selectionName">{this.props.name}</p>
            <p className="selectionArtist">{this.props.artist}</p>
        </div> 
        );
    }
}
 
export default Selection;