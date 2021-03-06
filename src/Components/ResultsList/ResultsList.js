import React from 'react';
import IndividualResult from '../IndividualResult/IndividualResult';

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return(
            this.props.results.map((result, i) => {
                if(i < 9){
                    return ( 
                        <IndividualResult name={result.name} artist={result.artist} image={result.image} id={result.id} key={result.id} addSeed={this.props.addSeed}/>
                        // <IndividualResult result={result} key={result.id} addSeed={this.props.addSeed}/>
                    );
                }
                return null;
            })
        );
    }
}
 
export default Results;