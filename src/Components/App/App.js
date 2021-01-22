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
      seed: []
    };

    // this.search = this.search.bind(this);
    // this.addSeed = this.addSeed.bind(this);
  }

  search = (term) => {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  addSeed = (track) => {
    this.setState({seed: track});
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
