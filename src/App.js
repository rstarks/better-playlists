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
          {name:'One', duration: 1345},
          {name:'Two', duration: 1234},
          {name:'Three', duration: 1515}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name:'Four', duration: 635},
          {name:'Five', duration: 1236},
          {name:'Six', duration: 1634}
        ]
      },
      {
        name: 'Another playlist',
        songs: [
          {name:'Seven', duration: 972},
          {name:'Eight', duration: 1614},
          {name:'Nine', duration: 1712}
        ]
      },
      {
        name: 'Yet another playlist',
        songs: [
          {name:'Ten', duration: 1261},
          {name:'Eleven', duration: 834},
          {name:'Twelve', duration: 1231}
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
        <h2>{Math.round(totalDuration/60)} hours</h2>
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
    return (
      <div style={{...defaultStyle,display:'inline-block',width: "25%"}}>
        <img/>
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
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
            <Playlist/>
            <Playlist/>
            <Playlist/>
            <Playlist/>
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;