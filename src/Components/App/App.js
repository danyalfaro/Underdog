import "./App.scss";
import Spotify from "../../util/Spotify";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import ResultsList from "../ResultsList/ResultsList";
import SelectionList from "../SelectionList/SelectionList";

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
    if (searchType === "artist") {
      Spotify.searchArtist(term).then((searchResults) => {
        this.setState({ searchResults: searchResults });
      });
    } else {
      Spotify.search(term).then((searchResults) => {
        this.setState({ searchResults: searchResults });
      });
    }
  };

  addSeed = (name, track, artist, image) => {
    if (this.state.seed.length < 3) {
      if (this.state.seed.some((elem) => elem.id === track)) {
        alert("Song already selected!");
      } else {
        let newSeedList = this.state.seed;
        if (!artist) {
          let newSeedObject = { name: name, id: track, image: image };
          newSeedList.push(newSeedObject);
          this.setState({ seed: newSeedList }, this.getRecommended);
        } else {
          let newSeedObject = {
            name: name,
            id: track,
            artist: artist,
            image: image,
          };
          newSeedList.push(newSeedObject);
          this.setState({ seed: newSeedList }, this.getRecommended);
        }
      }
    }
  };

  removeSeed = (track) => {
    let newSeedList = this.state.seed.filter((seed) => seed.id !== track);
    this.setState({ seed: newSeedList }, this.getRecommended);
  };

  getRecommended = () => {
    if (this.state.seed.length > 0) {
      Spotify.getRecommended(this.state.seed).then((recommendedResult) => {
        this.setState({ recommended: recommendedResult });
      });
    }
  };

  createPlaylist = () => {
    let uris = this.state.recommended.map((elem) => elem.uri);
    let playlistName = "";
    for (let i = 0; i < this.state.seed.length; i++) {
      if (i === 0) {
        playlistName += this.state.seed[0].name;
      } else {
        playlistName += ` + ${this.state.seed[i].name}`;
      }
    }
    Spotify.savePlaylist(playlistName, uris);
    alert(
      "Playlist being saved to your Spotify account... Wait a couple of seconds and then Enjoy! :)"
    );
  };

  componentDidMount() {
    //As app is mounted, redirect to spotify login for first time users.
    Spotify.getAccessToken();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">underdog</header>
        <div className="App-body">
          <div className="searchSection">
            <SearchBar onSearch={this.search} />
            <div className="resultsList">
              <ResultsList
                results={this.state.searchResults}
                addSeed={this.addSeed}
              />
            </div>
          </div>
          <div className="divider"></div>
          <div className="recommendedSection">
            <div className="seedList">
              <div className="recommendedDetail">
                <div className="detailWording">seeds</div>
                <div className="detailHighlight"></div>
              </div>
              <SelectionList
                selection={this.state.seed}
                seed={this.state.seed}
                selectionType="seed"
                removeSeed={this.removeSeed}
              />
            </div>
            <div className="recommendedList">
              <div className="recommendedDetail">
                <div className="detailWording">underdogs</div>
                <div className="detailHighlight"></div>
              </div>
              <div className="selectionList">
                <SelectionList
                  selection={this.state.recommended}
                  seed={this.state.seed}
                />
              </div>
            </div>
            <button
              type="button"
              className="playlistButton"
              onClick={this.createPlaylist}
            >
              Save to Playlist
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
