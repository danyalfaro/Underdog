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
            this.props.seeds.map((seed) => {
                return ( 
                    <Selection name={seed.name} artist={seed.artist} id={seed.id} imageUrl={seed.image} key={seed.id}/>
                );
            })
        );
    }
}
 
export default SelectionList;