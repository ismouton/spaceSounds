import GameOfLife from './classes/GameOfLife.js';
import Audio from './classes/Audio.js';

const numberOfRows = 7;
const numberOfColumns = 12;
const gol = new GameOfLife(numberOfColumns, numberOfRows);
const controls = document.querySelector('#controlPanel');
const entryPoint0 = document.querySelector('#entryPoint0');
const audio = new Audio();

/* Bind controls controller to DOM */
function InterActiveTableController () {
  ControlsController.bind(controls)(this);
  function ControlsController (table) {
    this.table = table;
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
      function updateDom(item) {
        const { x, y, targetState } = item;
        const key = (numberOfColumns * y + x);
        const el = document.querySelector(`*[data-x="${x}"][data-y="${y}"]`)
    
        if (targetState) {
          audio.playNote(key);
          el.classList.add("on");
        } else {
          audio.endNote(key);
          el.classList.remove("on");
        }
      }

      if (this.running) return;
      this.running = true;

      this.querySelector('.play.button').style.display = "none";
      this.querySelector('.stop.button').style.display = "inline-block";

      const loop = () => {
        if (this.running) {
          this.running = true;
          const changes = gol.iterate();

          changes.forEach((item)=>{
            updateDom(item);
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

  this.toggle = (e) => {
    function extractCoordinates (e) {
      const el = e.target;
      let { x, y } = el.dataset;
      x = parseInt(x);
      y = parseInt(y);
  
      return { x, y };
    }

    const el = e.target;
    const { x, y } = extractCoordinates(e);
    const toggle = gol.toggle(x, y);
    const key = (numberOfColumns * y + x);

    if (toggle) {
      el.classList.add("on");
      audio.playNote(key);
    } else {
      el.classList.remove("on");
      audio.endNote(key);
    }
  };

  let table = document.createElement('table');
  for(let y = 0; y < numberOfRows; y++) {
    let tr = document.createElement('tr')
    for(let x = 0; x < numberOfColumns; x++) {
      let td = document.createElement('td')
      td.dataset.x = x;
      td.dataset.y = y;
      td.onclick = this.toggle;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  this.appendChild(table);
}

function init () {
  /* Bind table controller to DOM */
  InterActiveTableController.bind(entryPoint0)();
}

init();
