import React from 'react';

import './SearchBar.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      searchType: "song",
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  songType = (e) => {
    this.setState({searchType: "song"});
  }

  artistType = (e) => {
    this.setState({searchType: "artist"});
  }

  onSearch = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.term, this.state.searchType);
  }

  render() {
    return (
      <div>
        <div className="seedType">
          <button className={(this.state.searchType === "artist" ? 'selected' : ' ')} onClick={this.artistType}>artist</button>
          <button className={(this.state.searchType === "song" ? 'selected' : ' ')} onClick={this.songType}>song</button>
        </div>
        <div className="searchBar">
          <form onSubmit={this.onSearch}>
            <input type="text" className="searchInput" placeholder="enter a song or artist..." onChange={this.handleTermChange} />
            <button type="submit" className="searchButton" onClick={this.search}>search</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;