import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Navigation from "./Navigation";
import ScaleOptions from "./ScaleOptions";
import ChordOptions from "./ChordOptions";
import FretLabels from "./FretLabels";
import FretBoard from "./FretBoard";
import Chords from "./Chords";

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.buildState();
  }

  buildState() {
    var newState = {
      guitar: {
        tuning:[7+12,2+12,10+12,5,0,7],
        semitones:25,
        octave:12
      },
      fretboard: [],
      highlight: [],
      options: {
        root: '0',
        scale: '0',
        mode: '0'
      }
    }
    newState.fretboard = this.buildFretboard(newState);
    newState.highlight = this.buildHighlights(newState);
    return newState;
  }

  buildFretboard(newState){
    var fretboard = [];
    for (var i = 0; i < newState.guitar.tuning.length; i++) {
      var notes = [];
      for(var n = 0; n < newState.guitar.semitones; n++){
        var note = newState.guitar.tuning[i]+n;
        notes.push(note);
      }
      fretboard.push(notes);
    }
    return fretboard
  }

  buildHighlights(newState){
    var highlight = [];
    if(newState.options.scale === '0'){
      highlight = [0,2,4,5,7,9,11];
    }else if(newState.options.scale === '1'){
      highlight = [0,2,3,5,7,8,11];
    }else if(newState.options.scale === '2'){
      highlight = [0,3,5,6,7,10];
    }
    return highlight;
  }

  changeOptions(newOptions){
    var newState = Object.assign( {}, this.state);
    newState.options = newOptions;
    newState.highlight = this.buildHighlights(newState);
    this.setState(newState);

  }
/*
<Route path='/' render={() => ()}/>
<Route path='/scale' render={() => (
  <ScaleOptions changeOptions={this.changeOptions.bind(this)} root={this.state.options.root} scale={this.state.options.scale} mode={this.state.options.mode}/>
)}/>
<Route path='/chord' render={() => (
  <ChordOptions changeOptions={this.changeOptions.bind(this)} root={this.state.options.root} scale={this.state.options.scale} mode={this.state.options.mode}/>
)}/>
*/
  render() {
    return <Router basename="/react/fretboard">
      <div className="Layout">
        <h1>Guitar Fretboard Mapper</h1>
        {/*
        <Route exact path='/' component={Navigation}/>

        <Route path='/scale' render={() => (
          <ScaleOptions changeOptions={this.changeOptions.bind(this)} root={this.state.options.root} scale={this.state.options.scale} mode={this.state.options.mode}/>
        )}/>
        <Route path='/chord' render={() => (
          <ChordOptions changeOptions={this.changeOptions.bind(this)} root={this.state.options.root} scale={this.state.options.scale} mode={this.state.options.mode}/>
        )}/>
        */}

        <ScaleOptions changeOptions={this.changeOptions.bind(this)} root={this.state.options.root} scale={this.state.options.scale} mode={this.state.options.mode}/>

        <FretLabels guitar={this.state.guitar}/>
        <FretBoard fretboard={this.state.fretboard} options={this.state.options} highlight={this.state.highlight} />
        <Chords options={this.state.options} highlight={this.state.highlight}/>
      </div>
    </Router>;
  }
}
