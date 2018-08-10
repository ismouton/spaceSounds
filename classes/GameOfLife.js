import DataTable from './DataTable.js'

export default class GameOfLife {
  constructor (x, y) {
    this._tables = Array(2).fill(null);
    this._tables = this._tables.map(undefined=>new DataTable(x,y));
    this._iteration = 0;
    this._numberOfRows = y;
    this._numberOfColumns = x;

    /* B36/S23 - Highlife ruleset */
    this.rules = {
      S: [
        /*0*/ false,
        /*1*/ false,
        /*2*/ true,
        /*3*/ true,
        /*4*/ false,
        /*5*/ false,
        /*6*/ false,
        /*7*/ false,
        /*8*/ false,
      ],
      B: [
        /*0*/ false,
        /*1*/ false,
        /*2*/ false,
        /*3*/ true,
        /*4*/ false,
        /*5*/ false,
        /*6*/ true,
        /*7*/ false,
        /*8*/ false,
      ]
    };
  }

  setCell (x, y, state) {
    this._sourceBoard.setCell(x,y,state)
  }

  _countNeighbors(x, y) {
    const cur = this._sourceBoard;

    const neighborHoodMap = [
      {x: -1, y: -1, weight: 1},
      {x:  0, y: -1, weight: 1},
      {x: -1, y:  0, weight: 1},
      {x:  1, y: -1, weight: 1},
      {x: -1, y:  1, weight: 1},
      {x:  1, y:  1, weight: 1},
      {x:  0, y:  1, weight: 1},
      {x:  1, y:  0, weight: 1},
    ];

    return neighborHoodMap.map((item) => {
      if (cur.getCell(x + item.x, y + item.y)) {
        return item.weight;
      } else {
        return 0;
      }
    })
    .reduce((a,b)=>a+b);
  }

  _applyRules () {
    const source = this._sourceBoard;
    const target = this._targetBoard;

    const changes = [];

    for (let y = 0; y < this._numberOfRows; y++) {
      for (let x = 0; x < this._numberOfColumns; x++) {
        const cellLiving = source.getCell(x, y);
        const numberOfNeighbors = this._countNeighbors(x, y);
        let targetState;

        if (cellLiving) {
          /* Do we kill living cells? */
          targetState = this.rules.S[numberOfNeighbors];
        } else {
          /* Do we create life from dead cells? */
          targetState = this.rules.B[numberOfNeighbors];
        }

        target.setCell(x, y, targetState)

        if (targetState !== cellLiving) {
          changes.push({ x, y, targetState});
        }
      }
    }

    return changes;
  }

  get _sourceBoard () {
    return this._tables[this._iteration % 2];
  }

  get _targetBoard() {
    return this._tables[Math.abs((this._iteration - 1) % 2)];
  }

  iterate () {
    const target = this._targetBoard;
    target.clear();

    const changes = this._applyRules();
    this._iteration++;

    return changes;
  }
}