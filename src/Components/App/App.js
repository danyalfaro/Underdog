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

  search = (term, searchType) => {
    if(searchType === "artist"){
      Spotify.searchArtist(term).then(searchResults => {
        this.setState({searchResults: searchResults});
      });
    }else{
      Spotify.search(term).then(searchResults => {
        this.setState({searchResults: searchResults});
      });
    }
  }

  addSeed = (name, track, artist, image) => {
    if(!artist){
      this.setState({seed: [{name: name, id: track, image: image}]}, this.getRecommended("artists"));
    }else{
      this.setState({seed: [{name: name, id: track, artist: artist, image: image}]}, this.getRecommended("tracks"));
    }
    console.log("clicked");
  }

  getRecommended = (type) => {
    if(this.state.seed.length > 0){
      Spotify.getRecommended(this.state.seed[0], type).then(recommendedResult => {
        this.setState({recommended: recommendedResult});
      })
    }
  }

  createPlaylist = () => {
    let uris = this.state.recommended.map(elem => elem.uri);
    // console.log(uris);
    Spotify.savePlaylist("NewPlaylist", uris);
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
              <div className="recommendedDetail">
                <div className="detailWording">seeds</div>
                <div className="detailHighlight"></div>
              </div>
              <SelectionList selection={this.state.seed}/>
            </div>
            <div className="recommendedList">
              <div className="recommendedDetail">
                <div className="detailWording">underdogs</div>
                <div className="detailHighlight"></div>
              </div>
              <div className="selectionList">
                <SelectionList selection={this.state.recommended}/>
              </div>
            </div>
            <button type="button" className="playlistButton" onClick={this.createPlaylist}>Save to Playlist</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
