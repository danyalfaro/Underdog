const {
  REACT_APP_CLIENT_ID,
  REACT_APP_REDIRECT_URL
} = process.env;
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REACT_APP_REDIRECT_URL}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        image: track.album.images[1].url,
        uri: track.uri
      }));
    });
  },

  searchArtist(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=artist&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.artists) {
        return [];
      }
        return jsonResponse.artists.items.map((artist) => {
          if(artist.images[1]){
            return({
              id: artist.id,
              name: artist.name,
              uri: artist.uri,
              image: artist.images[1].url,
          })
          }else{
            return({
              id: artist.id,
              name: artist.name,
              uri: artist.uri,
              image: "https://via.placeholder.com/150",
            })
          }
        }
      );
    });
  },

  getRecommended(seeds, type) {
    const accessToken = Spotify.getAccessToken();
    let trackUris = [];
    let artistUris = [];
    let trackQuery = "";
    let artistQuery = "";
    let finalQuery = "";
    seeds.forEach((seed) => {
      if(seed.artist){
        trackUris.push(seed.id);
      }else{
        artistUris.push(seed.id);
      }
    })
    if(trackUris.length > 0){
      for(let i = 0; i < (trackUris.length - 1); i++){
        trackQuery += trackUris[i];
        trackQuery += "%2C";
      }
      trackQuery += trackUris[trackUris.length - 1];
      console.log(trackQuery);
    }
    if(artistUris.length > 0){
      for(let i = 0; i < (artistUris.length - 1); i++){
        artistQuery += artistUris[i];
        artistQuery += "%2C";
      }
      artistQuery += artistUris[artistUris.length - 1];
      console.log(artistQuery);
    }
    
    if(trackQuery && artistQuery){
      //Query with both artist and track
      finalQuery = `https://api.spotify.com/v1/recommendations?seed_artists=${artistQuery}&seed_tracks=${trackQuery}&max_popularity=50`;
    }else if(trackQuery){
      //query with only track
      finalQuery = `https://api.spotify.com/v1/recommendations?seed_tracks=${trackQuery}&max_popularity=50`;
    }else if(artistQuery){
      //query with only artist
      finalQuery = `https://api.spotify.com/v1/recommendations?seed_artists=${artistQuery}&max_popularity=50`;
    }
    console.log(finalQuery);
    return fetch(finalQuery, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        image: track.album.images[1].url,
        uri: track.uri
      }));
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;