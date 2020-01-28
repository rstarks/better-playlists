import React, { Component } from 'react';
import './App.css';
import { render } from '@testing-library/react';

let defaultStyle = {
  color: '#fff'
};
let fakeServerData = {
  user: {
    name: 'User',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name:'One', duration: 345},
          {name:'Two', duration: 234},
          {name:'Three', duration: 415}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name:'Four', duration: 231},
          {name:'Five', duration: 221},
          {name:'Six', duration: 234}
        ]
      },
      {
        name: 'Another playlist',
        songs: [
          {name:'Seven', duration: 272},
          {name:'Eight', duration: 114},
          {name:'Nine', duration: 312}
        ]
      },
      {
        name: 'Yet another playlist',
        songs: [
          {name:'Ten', duration: 261},
          {name:'Eleven', duration: 194},
          {name:'Twelve', duration: 181}
        ]
      }
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display:'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    },[])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, width: "40%", display:'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} minutes</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle,display:'inline-block',width: "25%"}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => 
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle, 'font-size': '54px'}}>
              {this.state.serverData.user.name}'s Playlists
            </h1>
            
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            
            <Filter/>
            
            {this.state.serverData.user.playlists.map(playlist =>
              <Playlist playlist={playlist}/>
            )}

          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;