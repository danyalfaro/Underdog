import './App.scss';
import Spotify from '../../util/Spotify';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ResultsList from '../ResultsList/ResultsList';
import SelectionList from '../SelectionList/SelectionList';

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

  addSeed = (name, track, artist, image) => {
    this.setState({seed: [{name: name, id: track, artist: artist, image: image}]}, this.getRecommended);
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
          underdog
        </header>
        <div className="App-body">
          <div className="searchSection">
            <SearchBar onSearch={this.search} />
            <div className="resultsList">
              <ResultsList results={this.state.searchResults} addSeed={this.addSeed}/>
            </div>
          </div>
          <div className="divider"></div>
          <div className="recommendedSection">
            <div className="seedList">
              <SelectionList selection={this.state.seed}/>
            </div>
            <div className="recommendedList">
              {/* <div className="recommendedDetail"></div> */}
              <div className="selectionList">
                <SelectionList selection={this.state.recommended}/>
              </div>
            </div>
            <button type="button" className="playlistButton">Save to Playlist</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
