"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

export interface SoundTrack {
  id: string;
  name: string;
  subtitle: string;
  mood: string;
  type: "lofi" | "piano" | "zen" | "synth" | "meditation" | "guitar";
}

export const SOUND_TRACKS: SoundTrack[] = [
  {
    id: "lofi-beats",
    name: "Midnight Lo-Fi",
    subtitle: "Warm Rhodes 9th chords, chill groove & tape warmth",
    mood: "Chill • Focus",
    type: "lofi",
  },
  {
    id: "coffee-piano",
    name: "Coffeehouse Piano",
    subtitle: "Acoustic grand piano improvisations with room reverb",
    mood: "Melodic • Cozy",
    type: "piano",
  },
  {
    id: "zen-garden",
    name: "Kyoto Bamboo Garden",
    subtitle: "Peaceful koto plucks, flute whispers & temple bowl",
    mood: "Zen • Serene",
    type: "zen",
  },
  {
    id: "sunset-synth",
    name: "Golden Sunset",
    subtitle: "Dreamy analog ambient pads & celestial arpeggios",
    mood: "Dreamy • Warm",
    type: "synth",
  },
  {
    id: "forest-ambient",
    name: "Forest Meditation",
    subtitle: "432Hz healing sound bath & crystalline wind chimes",
    mood: "Spiritual • Healing",
    type: "meditation",
  },
  {
    id: "acoustic-chords",
    name: "Nylon Stargazer",
    subtitle: "Delicate fingerstyle nylon guitar & night ocean swell",
    mood: "Intimate • Peaceful",
    type: "guitar",
  },
];

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: SoundTrack;
  volume: number;
  isShuffle: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  setVolume: (vol: number) => void;
  selectTrack: (track: SoundTrack) => void;
  playRandomTrack: () => void;
  toggleShuffle: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  // Pick random track on initial mount so it's never the same static starting track
  const [currentTrack, setCurrentTrack] = useState<SoundTrack>(SOUND_TRACKS[0]);
  const [volume, setVolumeState] = useState(0.4);
  const [isShuffle, setIsShuffle] = useState(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<Array<{ stop?: (when?: number) => void; disconnect: () => void }>>([]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const currentTrackRef = useRef<SoundTrack>(currentTrack);
  currentTrackRef.current = currentTrack;

  // Track history to avoid repeating the same track
  const lastTrackIdRef = useRef<string>("");

  // Initialize AudioContext on first user interaction
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, [volume]);

  // Clean up all active audio nodes & intervals
  const stopCurrentAudio = useCallback(() => {
    timersRef.current.forEach((t) => clearInterval(t));
    timersRef.current = [];

    activeNodesRef.current.forEach((node) => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch {
        // already disconnected
      }
    });
    activeNodesRef.current = [];
  }, []);

  // Helper: Create soft vinyl crackle / tape hiss
  const createTapeHiss = useCallback((ctx: AudioContext, master: GainNode, level: number = 0.005) => {
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * level;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.setValueAtTime(1400, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.6, ctx.currentTime);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();

    activeNodesRef.current.push(noise, noiseFilter, noiseGain);
  }, []);

  // Track 1: Midnight Lo-Fi Beats & Warm Rhodes
  const startLoFi = useCallback((ctx: AudioContext, master: GainNode) => {
    stopCurrentAudio();
    createTapeHiss(ctx, master, 0.007);

    // 4 Soothing Jazz Chord Progressions
    const progressions = [
      // Progression 1: Dm9 -> G13 -> Cmaj9 -> Am9
      [
        [146.83, 174.61, 220.0, 261.63, 329.63], // Dm9
        [98.0, 164.81, 196.0, 246.94, 329.63],  // G13
        [130.81, 164.81, 196.0, 246.94, 293.66], // Cmaj9
        [110.0, 164.81, 196.0, 261.63, 329.63],  // Am9
      ],
      // Progression 2: Fmaj7 -> Em7 -> Dm9 -> Cmaj7
      [
        [174.61, 220.0, 261.63, 329.63],         // Fmaj7
        [164.81, 196.0, 246.94, 293.66],         // Em7
        [146.83, 174.61, 220.0, 261.63, 329.63], // Dm9
        [130.81, 164.81, 196.0, 246.94],         // Cmaj7
      ],
      // Progression 3: Bbmaj7 -> Am7 -> Gm9 -> Fmaj7
      [
        [116.54, 174.61, 220.0, 261.63],         // Bbmaj7
        [110.0, 164.81, 196.0, 261.63],          // Am7
        [98.0, 146.83, 174.61, 220.0, 293.66],   // Gm9
        [87.31, 130.81, 174.61, 220.0, 261.63],  // Fmaj7
      ],
    ];

    const currentProgression = progressions[Math.floor(Math.random() * progressions.length)];
    let chordIdx = 0;

    const playChord = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
      const now = ctx.currentTime;
      const chordFreqs = currentProgression[chordIdx];
      chordIdx = (chordIdx + 1) % currentProgression.length;

      // Rhodes Lowpass Filter with gentle wow/flutter
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(780, now);
      filter.Q.setValueAtTime(1.1, now);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.3 + Math.random() * 0.15, now);
      lfoGain.gain.setValueAtTime(2.2, now);
      lfo.connect(lfoGain);
      lfo.start(now);

      const chordGain = ctx.createGain();
      chordGain.gain.setValueAtTime(0.001, now);
      chordGain.gain.exponentialRampToValueAtTime(0.18, now + 0.4);
      chordGain.gain.exponentialRampToValueAtTime(0.09, now + 2.2);
      chordGain.gain.exponentialRampToValueAtTime(0.001, now + 3.4);

      chordGain.connect(filter);
      filter.connect(master);

      const oscs: OscillatorNode[] = [];
      chordFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, now);
        lfoGain.connect(osc.frequency);
        osc.connect(chordGain);
        osc.start(now);
        osc.stop(now + 3.5);
        oscs.push(osc);
      });

      // Warm sub-bass note for root
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = "triangle";
      bassOsc.frequency.setValueAtTime(chordFreqs[0] / 2, now);
      bassGain.gain.setValueAtTime(0.001, now);
      bassGain.gain.exponentialRampToValueAtTime(0.14, now + 0.3);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

      const bassFilter = ctx.createBiquadFilter();
      bassFilter.type = "lowpass";
      bassFilter.frequency.setValueAtTime(180, now);

      bassOsc.connect(bassGain);
      bassGain.connect(bassFilter);
      bassFilter.connect(master);
      bassOsc.start(now);
      bassOsc.stop(now + 3.4);

      activeNodesRef.current.push(...oscs, filter, chordGain, lfo, lfoGain, bassOsc, bassGain, bassFilter);
    };

    // Soft improvisational melody bell notes
    const pentatonicMelody = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
    const playMelodyNote = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
      if (Math.random() > 0.65) return; // natural musical space

      const now = ctx.currentTime;
      const pitch = pentatonicMelody[Math.floor(Math.random() * pentatonicMelody.length)];

      const melOsc = ctx.createOscillator();
      const melGain = ctx.createGain();
      melOsc.type = "sine";
      melOsc.frequency.setValueAtTime(pitch, now);

      melGain.gain.setValueAtTime(0.001, now);
      melGain.gain.exponentialRampToValueAtTime(0.045, now + 0.05);
      melGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      melOsc.connect(melGain);
      melGain.connect(master);
      melOsc.start(now);
      melOsc.stop(now + 2.0);

      activeNodesRef.current.push(melOsc, melGain);
    };

    playChord();
    const chordTimer = setInterval(playChord, 3500);
    const melTimer = setInterval(playMelodyNote, 1400);
    timersRef.current.push(chordTimer, melTimer);
  }, [stopCurrentAudio, createTapeHiss]);

  // Track 2: Coffeehouse Piano (Acoustic Grand Melodies & Reverb)
  const startPiano = useCallback((ctx: AudioContext, master: GainNode) => {
    stopCurrentAudio();

    // Key of C / A Minor gentle arpeggio patterns
    const pianoPatterns = [
      // Am9: A2, E3, A3, C4, E4, B4
      [110.0, 164.81, 220.0, 261.63, 329.63, 493.88],
      // Fmaj7: F2, C3, F3, A3, C4, E4
      [87.31, 130.81, 174.61, 220.0, 261.63, 329.63],
      // Cmaj9: C3, G3, C4, E4, G4, D5
      [130.81, 196.0, 261.63, 329.63, 392.0, 587.33],
      // Gsus4 / G: G2, D3, G3, B3, D4, G4
      [98.0, 146.83, 196.0, 246.94, 293.66, 392.0],
      // Em7: E2, B2, E3, G3, B3, D4
      [82.41, 123.47, 164.81, 196.0, 246.94, 293.66],
      // Dm9: D2, A2, D3, F3, A3, E4
      [73.42, 110.0, 146.83, 174.61, 220.0, 329.63],
    ];

    let patternIdx = 0;

    const playArpeggio = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
      const notes = pianoPatterns[patternIdx];
      patternIdx = (patternIdx + 1) % pianoPatterns.length;

      // Play each note in the broken chord with humanized micro-delays
      notes.forEach((freq, i) => {
        const noteDelay = i * 0.28 + (Math.random() * 0.04);
        const now = ctx.currentTime + noteDelay;

        // Dual detuned acoustic piano simulator
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const noteGain = ctx.createGain();
        const pianoFilter = ctx.createBiquadFilter();

        osc1.type = "triangle";
        osc2.type = "sine";
        osc1.frequency.setValueAtTime(freq, now);
        osc2.frequency.setValueAtTime(freq * 1.002, now); // slight unison detune

        pianoFilter.type = "lowpass";
        pianoFilter.frequency.setValueAtTime(1200, now);
        pianoFilter.frequency.exponentialRampToValueAtTime(350, now + 2.0);

        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.09 - i * 0.008, now + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

        osc1.connect(noteGain);
        osc2.connect(noteGain);
        noteGain.connect(pianoFilter);
        pianoFilter.connect(master);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 2.5);
        osc2.stop(now + 2.5);

        activeNodesRef.current.push(osc1, osc2, noteGain, pianoFilter);
      });
    };

    playArpeggio();
    const pianoTimer = setInterval(playArpeggio, 2800);
    timersRef.current.push(pianoTimer);
  }, [stopCurrentAudio]);

  // Track 3: Kyoto Bamboo Garden (Koto, Flute & Singing Bowls)
  const startZen = useCallback((ctx: AudioContext, master: GainNode) => {
    stopCurrentAudio();

    // Insen & Hirajōshi Japanese Pentatonic notes (D, Eb, G, A, C)
    const kotoScale = [
      146.83, 155.56, 196.0, 220.0, 261.63, // Low octave
      293.66, 311.13, 392.0, 440.0, 523.25, // Mid octave
      587.33, 622.25, 783.99, 880.0, 1046.5, // High octave
    ];

    // Plucked Koto String generator
    const playKoto = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
      const count = 1 + Math.floor(Math.random() * 3);

      for (let i = 0; i < count; i++) {
        const now = ctx.currentTime + i * (0.2 + Math.random() * 0.15);
        const pitch = kotoScale[Math.floor(Math.random() * kotoScale.length)];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(pitch, now);
        // Subtle micro pitch bend characteristic of koto string pressing
        osc.frequency.exponentialRampToValueAtTime(pitch * 1.015, now + 0.12);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(pitch * 1.8, now);
        filter.Q.setValueAtTime(2.5, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);

        osc.start(now);
        osc.stop(now + 3.0);
        activeNodesRef.current.push(osc, filter, gain);
      }
    };

    // Shakuhachi Flute Whisper
    const playFlute = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
      const now = ctx.currentTime;
      const flutePitches = [293.66, 392.0, 440.0, 587.33];
      const pitch = flutePitches[Math.floor(Math.random() * flutePitches.length)];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(950, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + 3.5);
      activeNodesRef.current.push(osc, filter, gain);
    };

    // Singing Bowl resonance (deep harmonic bell)
    const playBowl = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
      const now = ctx.currentTime;
      const fundamentals = [216.0, 288.0, 324.0];
      const base = fundamentals[Math.floor(Math.random() * fundamentals.length)];

      [1, 2.76, 5.4].forEach((ratio, idx) => {
        const bowlOsc = ctx.createOscillator();
        const bowlGain = ctx.createGain();
        bowlOsc.type = "sine";
        bowlOsc.frequency.setValueAtTime(base * ratio, now);

        const amp = 0.07 / (idx + 1);
        bowlGain.gain.setValueAtTime(0.001, now);
        bowlGain.gain.exponentialRampToValueAtTime(amp, now + 0.1);
        bowlGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        bowlOsc.connect(bowlGain);
        bowlGain.connect(master);
        bowlOsc.start(now);
        bowlOsc.stop(now + 6.0);
        activeNodesRef.current.push(bowlOsc, bowlGain);
      });
    };

    playBowl();
    playKoto();
    const kotoTimer = setInterval(playKoto, 2400);
    const fluteTimer = setInterval(playFlute, 5500);
    const bowlTimer = setInterval(playBowl, 8500);
    timersRef.current.push(kotoTimer, fluteTimer, bowlTimer);
  }, [stopCurrentAudio]);

  // Track 4: Golden Sunset (Dreamy Analog Pads & Celestial Arpeggio)
  const startSynth = useCallback((ctx: AudioContext, master: GainNode) => {
    stopCurrentAudio();

    // Lush 80s Chillwave 7th Chords
    const chords = [
      [116.54, 146.83, 174.61, 220.0, 261.63], // Bbmaj9
      [98.0, 146.83, 174.61, 220.0, 293.66],   // Gm9
      [73.42, 146.83, 174.61, 220.0, 261.63],  // Dm7
      [87.31, 130.81, 174.61, 220.0, 261.63],  // Fmaj7
    ];

    let chordIdx = 0;

    const playPad = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
      const now = ctx.currentTime;
      const chord = chords[chordIdx];
      chordIdx = (chordIdx + 1) % chords.length;

      // Resonant Lowpass Filter with slow breathing cutoff
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.exponentialRampToValueAtTime(1100, now + 2.0);
      filter.frequency.exponentialRampToValueAtTime(420, now + 4.5);
      filter.Q.setValueAtTime(2.0, now);

      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.001, now);
      padGain.gain.exponentialRampToValueAtTime(0.12, now + 1.2);
      padGain.gain.exponentialRampToValueAtTime(0.08, now + 3.5);
      padGain.gain.exponentialRampToValueAtTime(0.001, now + 4.8);

      padGain.connect(filter);
      filter.connect(master);

      const oscs: OscillatorNode[] = [];
      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now);
        osc.connect(padGain);
        osc.start(now);
        osc.stop(now + 5.0);
        oscs.push(osc);
      });

      // Shimmering Arp note
      const arpNotes = [freqToHigherOctave(chord[2]), freqToHigherOctave(chord[3]), freqToHigherOctave(chord[4])];
      arpNotes.forEach((arpFreq, idx) => {
        const arpNow = now + 0.8 + idx * 0.45;
        const arpOsc = ctx.createOscillator();
        const arpGain = ctx.createGain();
        arpOsc.type = "sine";
        arpOsc.frequency.setValueAtTime(arpFreq, arpNow);

        arpGain.gain.setValueAtTime(0.001, arpNow);
        arpGain.gain.exponentialRampToValueAtTime(0.04, arpNow + 0.05);
        arpGain.gain.exponentialRampToValueAtTime(0.0001, arpNow + 1.2);

        arpOsc.connect(arpGain);
        arpGain.connect(master);
        arpOsc.start(arpNow);
        arpOsc.stop(arpNow + 1.3);
        activeNodesRef.current.push(arpOsc, arpGain);
      });

      activeNodesRef.current.push(...oscs, filter, padGain);
    };

    function freqToHigherOctave(f: number) {
      return f * 2;
    }

    playPad();
    const padTimer = setInterval(playPad, 4600);
    timersRef.current.push(padTimer);
  }, [stopCurrentAudio]);

  // Track 5: Forest Meditation (432Hz Sound Bath & Crystalline Chimes)
  const startMeditation = useCallback((ctx: AudioContext, master: GainNode) => {
    stopCurrentAudio();

    // 432Hz Fundamental Drone
    const droneFreqs = [108.0, 216.0, 432.0];
    const droneOscs: OscillatorNode[] = [];
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.12, ctx.currentTime);

    droneFreqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.connect(droneGain);
      osc.start();
      droneOscs.push(osc);
    });

    droneGain.connect(master);
    activeNodesRef.current.push(...droneOscs, droneGain);

    // Harmonic Crystalline Chimes
    const chimeFrequencies = [1318.51, 1567.98, 1760.0, 2093.0, 2637.02];
    const playChime = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
      const now = ctx.currentTime;
      const pitch = chimeFrequencies[Math.floor(Math.random() * chimeFrequencies.length)];

      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = "sine";
      chimeOsc.frequency.setValueAtTime(pitch, now);

      chimeGain.gain.setValueAtTime(0.001, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.035, now + 0.04);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(master);
      chimeOsc.start(now);
      chimeOsc.stop(now + 4.0);

      activeNodesRef.current.push(chimeOsc, chimeGain);
    };

    const chimeTimer = setInterval(playChime, 2900);
    timersRef.current.push(chimeTimer);
  }, [stopCurrentAudio]);

  // Track 6: Nylon Stargazer (Gentle Fingerstyle Nylon Guitar & Ocean)
  const startGuitar = useCallback((ctx: AudioContext, master: GainNode) => {
    stopCurrentAudio();

    // Soft ocean swell in background
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const oceanSource = ctx.createBufferSource();
    oceanSource.buffer = noiseBuffer;
    oceanSource.loop = true;

    const oceanFilter = ctx.createBiquadFilter();
    oceanFilter.type = "bandpass";
    oceanFilter.frequency.setValueAtTime(260, ctx.currentTime);
    oceanFilter.Q.setValueAtTime(1.5, ctx.currentTime);

    const oceanLfo = ctx.createOscillator();
    const oceanLfoGain = ctx.createGain();
    oceanLfo.frequency.setValueAtTime(0.14, ctx.currentTime);
    oceanLfoGain.gain.setValueAtTime(140, ctx.currentTime);
    oceanLfo.connect(oceanLfoGain);
    oceanLfoGain.connect(oceanFilter.frequency);
    oceanLfo.start();

    const oceanGain = ctx.createGain();
    oceanGain.gain.setValueAtTime(0.18, ctx.currentTime);

    oceanSource.connect(oceanFilter);
    oceanFilter.connect(oceanGain);
    oceanGain.connect(master);
    oceanSource.start();
    activeNodesRef.current.push(oceanSource, oceanFilter, oceanLfo, oceanLfoGain, oceanGain);

    // Fingerpicked Guitar Arpeggios (Modal Nylon Warmth)
    const guitarChords = [
      // Dm7: D3, A3, C4, F4, A4
      [146.83, 220.0, 261.63, 349.23, 440.0],
      // G6: G2, D3, B3, E4, G4
      [98.0, 146.83, 246.94, 329.63, 392.0],
      // Cmaj7: C3, G3, B3, E4, G4
      [130.81, 196.0, 246.94, 329.63, 392.0],
      // Am7: A2, E3, G3, C4, E4
      [110.0, 164.81, 196.0, 261.63, 329.63],
    ];

    let gChordIdx = 0;

    const playGuitarPattern = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
      const chord = guitarChords[gChordIdx];
      gChordIdx = (gChordIdx + 1) % guitarChords.length;

      // Fingerpick pattern: thumb on bass, index, middle, ring, middle
      const pickPattern = [0, 1, 2, 3, 4, 3, 2];
      pickPattern.forEach((noteIdx, step) => {
        const stepDelay = step * 0.32 + (Math.random() * 0.03);
        const now = ctx.currentTime + stepDelay;
        const freq = chord[noteIdx];

        const osc = ctx.createOscillator();
        const stringGain = ctx.createGain();
        const bodyFilter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now);

        // Acoustic wood body resonance
        bodyFilter.type = "lowpass";
        bodyFilter.frequency.setValueAtTime(1100, now);
        bodyFilter.frequency.exponentialRampToValueAtTime(320, now + 1.2);

        stringGain.gain.setValueAtTime(0.001, now);
        stringGain.gain.exponentialRampToValueAtTime(0.11, now + 0.015);
        stringGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(bodyFilter);
        bodyFilter.connect(stringGain);
        stringGain.connect(master);

        osc.start(now);
        osc.stop(now + 2.0);
        activeNodesRef.current.push(osc, bodyFilter, stringGain);
      });
    };

    playGuitarPattern();
    const gTimer = setInterval(playGuitarPattern, 2400);
    timersRef.current.push(gTimer);
  }, [stopCurrentAudio]);

  // Start sound based on track type
  const startTrack = useCallback((track: SoundTrack) => {
    const ctx = getAudioContext();
    if (!masterGainRef.current) return;

    switch (track.type) {
      case "lofi":
        startLoFi(ctx, masterGainRef.current);
        break;
      case "piano":
        startPiano(ctx, masterGainRef.current);
        break;
      case "zen":
        startZen(ctx, masterGainRef.current);
        break;
      case "synth":
        startSynth(ctx, masterGainRef.current);
        break;
      case "meditation":
        startMeditation(ctx, masterGainRef.current);
        break;
      case "guitar":
        startGuitar(ctx, masterGainRef.current);
        break;
      default:
        startLoFi(ctx, masterGainRef.current);
    }
  }, [getAudioContext, startLoFi, startPiano, startZen, startSynth, startMeditation, startGuitar]);

  // Select a random track excluding the current one
  const getRandomTrack = useCallback((excludeId?: string): SoundTrack => {
    const candidates = SOUND_TRACKS.filter((t) => t.id !== excludeId);
    return candidates[Math.floor(Math.random() * candidates.length)] || SOUND_TRACKS[0];
  }, []);

  const selectTrack = useCallback((track: SoundTrack) => {
    setCurrentTrack(track);
    lastTrackIdRef.current = track.id;
    try {
      sessionStorage.setItem("portfolio_audio_track", track.id);
    } catch {
      // ignore
    }
    if (isPlaying) {
      startTrack(track);
    }
  }, [isPlaying, startTrack]);

  const playRandomTrack = useCallback(() => {
    const nextRandom = getRandomTrack(currentTrackRef.current.id);
    selectTrack(nextRandom);
    if (!isPlaying) {
      const ctx = getAudioContext();
      if (ctx.state === "suspended") ctx.resume();
      startTrack(nextRandom);
      setIsPlaying(true);
    }
  }, [getRandomTrack, selectTrack, isPlaying, getAudioContext, startTrack]);

  const play = useCallback(() => {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // If shuffle is active or on first play, pick a random track to avoid always playing the same one
    let trackToPlay = currentTrackRef.current;
    if (isShuffle) {
      trackToPlay = getRandomTrack(lastTrackIdRef.current);
      setCurrentTrack(trackToPlay);
      lastTrackIdRef.current = trackToPlay.id;
    }

    startTrack(trackToPlay);
    setIsPlaying(true);
  }, [getAudioContext, isShuffle, getRandomTrack, startTrack]);

  const pause = useCallback(() => {
    stopCurrentAudio();
    setIsPlaying(false);
  }, [stopCurrentAudio]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(clamped, audioCtxRef.current.currentTime);
    }
    try {
      localStorage.setItem("portfolio_audio_vol", clamped.toString());
    } catch {
      // ignore
    }
  }, []);

  // Pick a random starting track on mount so the initial state is never the same track
  useEffect(() => {
    try {
      const savedLast = sessionStorage.getItem("portfolio_audio_track");
      const randomStart = getRandomTrack(savedLast || undefined);
      setCurrentTrack(randomStart);
      lastTrackIdRef.current = randomStart.id;
    } catch {
      const randomStart = getRandomTrack();
      setCurrentTrack(randomStart);
      lastTrackIdRef.current = randomStart.id;
    }
  }, [getRandomTrack]);

  // Keyboard shortcut: Press 'M' to toggle audio, 'N' to shuffle next
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey
      ) {
        return;
      }

      if (e.key === "m" || e.key === "M") {
        togglePlay();
      } else if (e.key === "n" || e.key === "N") {
        playRandomTrack();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, playRandomTrack]);

  // Restore saved volume
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_audio_vol");
      if (saved) {
        const v = parseFloat(saved);
        if (!isNaN(v)) setVolumeState(v);
      }
    } catch {
      // ignore
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCurrentAudio();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopCurrentAudio]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrack,
        volume,
        isShuffle,
        togglePlay,
        play,
        pause,
        setVolume,
        selectTrack,
        playRandomTrack,
        toggleShuffle,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
