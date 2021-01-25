import React from 'react';
import './SelectionList.scss';
import Selection from '../Selection/Selection';

class SelectionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            this.props.selection.map((select) => {
                return ( 
                    <Selection name={select.name} artist={select.artist} id={select.id} imageUrl={select.image} key={select.id}/>
                );
            })
        );
    }
}
 
export default SelectionList;