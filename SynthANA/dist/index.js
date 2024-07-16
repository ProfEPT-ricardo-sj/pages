"use strict";
class SoundPlayer {
    constructor() {
        this.audioContext = null;
        this.frequencies = [
            261.625519, 277.182648, 293.664734, 311.126984,
            329.627533, 349.228241, 369.994385, 391.995392,
            415.304688, 440, 466.163788, 493.883301,
            523.251099, 554.365234, 587.329529, 622.253906,
            659.255127, 698.456482, 739.988831, 783.990845,
            830.609375, 880, 932.327576, 987.766602,
            1046.502075, 1108.730591, 1174.659058, 1244.507935,
            1318.510254, 1396.912964, 1479.977539, 1567.981812,
            1661.21875, 1760, 1864.654785, 1975.533325,
        ];
        this.oscillators = [];
        this.gainNodes = []; // Array de nós de ganho para controlar o volume dos osciladores
        this.startAudioContext();
        this.setupOscillators();
    }
    startAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.audioContext.resume();
            this.setupOscillators();
        }
    }
    setupOscillators() {
        if (this.audioContext) {
            this.frequencies.forEach((frequency) => {
                const oscillator = this.audioContext.createOscillator();
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                const gainNode = this.audioContext.createGain();
                gainNode.gain.value = 0.0; // Volume inicialmente zero
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                oscillator.start();
                this.oscillators.push(oscillator);
                this.gainNodes.push(gainNode);
            });
        }
        else {
            console.error('AudioContext is not available.');
        }
    }
    playSound(index) {
        console.log("playSound");
        if (this.audioContext && this.oscillators[index] && this.gainNodes[index]) {
            const gainNode = this.gainNodes[index];
            gainNode.gain.value = 1.0; // Aumenta o volume para reproduzir o som
        }
        else {
            console.error('AudioContext or oscillator is not available.');
        }
    }
    stopSound(index) {
        console.log("stopSound");
        if (this.audioContext && this.oscillators[index] && this.gainNodes[index]) {
            const gainNode = this.gainNodes[index];
            gainNode.gain.value = 0.0; // Volume zero para interromper o som
        }
        else {
            console.error('AudioContext or oscillator is not available.');
        }
    }
}
