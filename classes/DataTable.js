export default class DataTable {
  constructor (x, y) {
    this._numberOfColumns = x;
    this._numberOfRows = y;
    this.data = Array(x * y).fill(false);
  }

  _getKey(x, y) {
    if (x >= 0) {
      x = x % this._numberOfColumns;
    } else {
      x = this._numberOfColumns + x;
    }

    if (y >= 0) {
      y = y % this._numberOfRows;
    } else {
      y = this._numberOfRows + y;
    }

    const key = (this._numberOfColumns * y + x);

    return key;
  }

  clear () {
    this.data.fill(false);
  }

  setCell (x, y, state) {
    const key = this._getKey(x, y); 
    this.data[key] = state;
  }

  getCell (x, y) {
    const key = this._getKey(x, y); 
    return this.data[key];
  }

  toggle (x, y) {
    const key = this._getKey(x, y);
    this.data[key] = !this.data[key];
    return this.data[key];
  }
}