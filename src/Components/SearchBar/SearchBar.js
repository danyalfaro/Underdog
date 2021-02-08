import React from 'react';

import './SearchBar.scss';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="searchBar">
        <input type="text" className="searchInput" placeholder="Enter A Song Title" onChange={this.handleTermChange} />
        <button type="submit" className="SearchButton" onClick={this.search}>search</button>
      </div>
    );
  }
}

export default SearchBar;