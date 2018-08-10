export default class TabularVideo {
  constructor (bindingNode, numberOfColumns, numberOfRows) {
    this._callbacks = {};

    let table = document.createElement('table');
    for(let y = 0; y < numberOfRows; y++) {
      let tr = document.createElement('tr')
      for(let x = 0; x < numberOfColumns; x++) {
        let td = document.createElement('td')
        td.dataset.x = x;
        td.dataset.y = y;

        td.onclick = this._click.bind(this);

        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    bindingNode.appendChild(table);
  }

  // register an event
  on (eventType, callback) {
    this._callbacks[eventType] = callback;
  }

  setCell(x, y, state) {
    const el = document.querySelector(`*[data-x="${x}"][data-y="${y}"]`);

    if (state) {
      el.classList.add("on");
    } else {
      el.classList.remove("on");
    }
  }

  _click (e) {
    function extractCoordinates (e) {
      const el = e.target;
      let { x, y } = el.dataset;
      x = parseInt(x);
      y = parseInt(y);
  
      return { x, y };
    }

    const el = e.target;
    const state = el.classList.contains("on");
    const { x, y } = extractCoordinates(e);

    this._callbacks.click(x, y, state);
  }
}