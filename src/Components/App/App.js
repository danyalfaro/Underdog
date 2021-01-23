import './App.css';
import Spotify from '../../util/Spotify';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ResultsList from '../ResultsList/ResultsList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      seed: [],
      recommended: [],
    };
  }

  search = (term) => {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  addSeed = (name, track) => {
    this.setState({seed: [{name: name, id: track}]});
    this.getRecommended();
    console.log("clicked");
  }

  getRecommended = () => {
    if(this.state.seed.length > 0){
      Spotify.getRecommended(this.state.seed[0]).then(recommendedResult => {
        this.setState({recommended: recommendedResult});
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Underdog
          <SearchBar onSearch={this.search} />
          <ResultsList results={this.state.searchResults} addSeed={this.addSeed}/>
        </header>
      </div>
    );
  }
}

export default App;
