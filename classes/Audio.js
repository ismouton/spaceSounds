  export default class Audio {
    constructor () {
      let audioCtx = window.AudioContext || window.webkitAudioContext; 
      this.audioCtx = new audioCtx();
      this.oscillators = [];
      this.gains = [];
  
      this.noteArray = [];
      this.noteArray[87] = 4186.009;
      this.noteArray[86] = 3951.066;
      this.noteArray[85] = 3729.310;
      this.noteArray[84] = 3520.000;
      this.noteArray[83] = 3322.438;
      this.noteArray[82] = 3135.963;
      this.noteArray[81] = 2959.955;
      this.noteArray[80] = 2793.826;
      this.noteArray[79] = 2637.020;
      this.noteArray[78] = 2489.016;
      this.noteArray[77] = 2349.318;
      this.noteArray[76] = 2217.461;
      this.noteArray[75] = 2093.005;
      this.noteArray[74] = 1975.533;
      this.noteArray[73] = 1864.655;
      this.noteArray[72] = 1760.000;
      this.noteArray[71] = 1661.219;
      this.noteArray[70] = 1567.982;
      this.noteArray[69] = 1479.978;
      this.noteArray[68] = 1396.913;
      this.noteArray[67] = 1318.510;
      this.noteArray[66] = 1244.508;
      this.noteArray[65] = 1174.659;
      this.noteArray[64] = 1108.731;
      this.noteArray[63] = 1046.502;
      this.noteArray[62] = 987.7666;
      this.noteArray[61] = 932.3275;
      this.noteArray[60] = 880.0000;
      this.noteArray[59] = 830.6094;
      this.noteArray[58] = 783.9909;
      this.noteArray[57] = 739.9888;
      this.noteArray[56] = 698.4565;
      this.noteArray[55] = 659.2551;
      this.noteArray[54] = 622.2540;
      this.noteArray[53] = 587.3295;
      this.noteArray[52] = 554.3653;
      this.noteArray[51] = 523.2511;
      this.noteArray[50] = 493.8833;
      this.noteArray[49] = 466.1638;
      this.noteArray[48] = 440.0000;
      this.noteArray[47] = 415.3047;
      this.noteArray[46] = 391.9954;
      this.noteArray[45] = 369.9944;
      this.noteArray[44] = 349.2282;
      this.noteArray[43] = 329.6276;
      this.noteArray[42] = 311.1270;
      this.noteArray[41] = 293.6648;
      this.noteArray[40] = 277.1826;
      this.noteArray[39] = 261.6256;
      this.noteArray[38] = 246.9417;
      this.noteArray[37] = 233.0819;
      this.noteArray[36] = 220.0000;
      this.noteArray[35] = 207.6523;
      this.noteArray[34] = 195.9977;
      this.noteArray[33] = 184.9972;
      this.noteArray[32] = 174.6141;
      this.noteArray[31] = 164.8138;
      this.noteArray[30] = 155.5635;
      this.noteArray[29] = 146.8324;
      this.noteArray[28] = 138.5913;
      this.noteArray[27] = 130.8128;
      this.noteArray[26] = 123.4708;
      this.noteArray[25] = 116.5409;
      this.noteArray[24] = 110.0000;
      this.noteArray[23] = 103.8262;
      this.noteArray[22] = 97.99886;
      this.noteArray[21] = 92.49861;
      this.noteArray[20] = 87.30706;
      this.noteArray[19] = 82.40689;
      this.noteArray[18] = 77.78175;
      this.noteArray[17] = 73.41619;
      this.noteArray[16] = 69.29566;
      this.noteArray[15] = 65.40639;
      this.noteArray[14] = 61.73541;
      this.noteArray[13] = 58.27047;
      this.noteArray[12] = 55.00000;
      this.noteArray[11] = 51.91309;
      this.noteArray[10] = 48.99943;
      this.noteArray[9] = 46.24930;
      this.noteArray[8] = 43.65353;
      this.noteArray[7] = 41.20344;
      this.noteArray[6] = 38.89087;
      this.noteArray[5] = 36.70810;
      this.noteArray[4] = 34.64783;
      this.noteArray[3] = 32.70320;
      this.noteArray[2] = 30.86771;
      this.noteArray[1] = 29.13524;
      this.noteArray[0] = 27.50000;
    }

    playNote (key) {
      this.oscillators[key] = this.audioCtx.createOscillator();
      this.gains[key] = this.audioCtx.createGain();

      this.oscillators[key].type = "sine";
      this.oscillators[key].frequency.value = this.noteArray[key];

      this.gains[key].gain.value = 0.03;
      this.oscillators[key].connect(this.gains[key]);
      this.gains[key].connect(this.audioCtx.destination)

      this.oscillators[key].start();
    };

    endNote (key) {
      const gainConstant = 0.25;
      this.gains[key].gain.setTargetAtTime(0, this.audioCtx.currentTime, gainConstant);
      this.oscillators[key].stop(this.audioCtx.currentTime + (gainConstant * 3));
    };
}