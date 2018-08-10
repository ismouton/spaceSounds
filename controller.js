import GameOfLife from './classes/GameOfLife.js';
import Audio from './classes/Audio.js';
import Video from './classes/Video.js';

const numberOfRows = 7;
const numberOfColumns = 12;
const gol = new GameOfLife(numberOfColumns, numberOfRows);
const controls = document.querySelector('#controlPanel');
const videoBindingPoint = document.querySelector('#videoController');
const audio = new Audio();
const video = new Video(videoBindingPoint, numberOfColumns, numberOfRows);

function ControlsController () {
  const playButton = document.createElement('div');
  playButton.classList = "button play";
  playButton.innerText = "Play";
  playButton.onclick = undefined=>this.play();

  const stopButton = document.createElement('div');
  stopButton.classList = "button stop";
  stopButton.innerText = "Stop";
  stopButton.onclick = undefined=>this.stop();

  this.appendChild(playButton);
  this.appendChild(stopButton);

  this.play = () => {
    if (this.running) return;
    this.running = true;

    this.querySelector('.play.button').style.display = "none";
    this.querySelector('.stop.button').style.display = "inline-block";

    const loop = () => {
      if (this.running) {
        this.running = true;
        const changes = gol.iterate();

        changes.forEach((item)=>{
          updateState(item);
        });

        setTimeout(loop, 200);
      }
    };

    loop();
  };

  this.stop = () => {
    this.running = false;

    this.querySelector('.play.button').style.display = "inline-block";
    this.querySelector('.stop.button').style.display = "none";
  };
}

/* updates dom state based on gol state */
function updateState(item) {
  const { x, y, targetState } = item;
  const key = (numberOfColumns * y + x);

  if (targetState) {
    audio.playNote(key);
  } else {
    audio.endNote(key);
  }

  video.setCell(x,y,targetState)
}

function clickCallback (x, y, state) {
  const targetState = !state;

  /* update gol */
  gol.setCell(x, y, targetState);

  /* update interface and sound */
  updateState({x, y, targetState});
}

(function init () {
  /* Bind control controller to DOM */
  ControlsController.bind(controls)();
  video.on('click', clickCallback);
})();