import React from 'react';
import './SelectionList.scss';
import Selection from '../Selection/Selection';

class SelectionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        if(this.props.seed.length > 0){
            return ( 
                this.props.selection.map((select, i) => {
                    if(i < 15){
                        if(this.props.selectionType === "seed"){
                            return ( 
                                <Selection name={select.name} artist={select.artist} id={select.id} imageUrl={select.image} key={select.id} type="seed" removeSeed={this.props.removeSeed}/>
                            );
                        }else{
                            return ( 
                                <Selection name={select.name} artist={select.artist} id={select.id} imageUrl={select.image} key={select.id}/>
                            );
                        }
                    }else{
                        return null;
                    }
                    
                })
            );
        }else{
            return null;
        }
        
    }
}
 
export default SelectionList;