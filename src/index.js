import React from 'react';
import ReactDOM from 'react-dom';
import './calculator.css';

class DrumPad extends React.Component{
  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e){
    if(e.keyCode === this.props.keyCode){
      let id = this.props.id;
      // console.log(id + " was pressed.");
      this.props.changeText(id);
      this.playSound();
    }
  }

  handleClick(){
    let id = this.props.id;
    this.props.changeText(id);
    this.playSound();
  }

  playSound() {
    const sound = document.getElementById(this.props.innerText);
    sound.currentTime = 0;
    sound.volume = 0.5;
    sound.play();
  }


  render(){
    let id = this.props.id;
    return(
      <div
        onClick = {this.handleClick}
        className = "drum-pad"
        id = {id}
      >
        <audio
          className='clip'
          id={this.props.innerText}
          src={this.props.clip}

        />
        <h2>{this.props.innerText}</h2>
      </div>
    );
  }
}

class DrumMachine extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayText : "hello world",
    };
  }

  changeText(id){
    this.setState({
      displayText : id,
    });
  }

  render(){
    let drumPads = this.props.sounds.map(sound => {
      return <DrumPad 
        innerText = {sound.keyTrigger} 
        id={sound.id}
        changeText = {(id) => this.changeText(id)}
        keyCode = {sound.keyCode}
        clip = {sound.url}
        
      />
    })

    return(
      <div id="drum-machine">
        <div id="display">
          {this.state.displayText}
        </div>
        <div id="drum-pads">
          {drumPads}
        </div>
        
      </div>
    );
  }
}


// Constants

const SOUNDS = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

ReactDOM.render(
  <DrumMachine sounds={SOUNDS}/>,
  document.getElementById('root')
);
