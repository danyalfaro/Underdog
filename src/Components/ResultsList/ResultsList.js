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
                if(i < 15){
                    return ( 
                        <div className="resultListWrapper">
                            <IndividualResult name={result.name} artist={result.artist} image={result.image} id={result.id} key={result.id} addSeed={this.props.addSeed}/>
                        </div>
                    );
                }
                return null;
            })
        );
    }
}
 
export default Results;