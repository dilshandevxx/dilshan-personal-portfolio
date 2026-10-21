"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

export interface SoundTrack {
  id: string;
  name: string;
  artist: string;
  subtitle: string;
  mood: string;
  src: string;
  coverImage?: string;
  duration?: string;
}

export const SOUND_TRACKS: SoundTrack[] = [
  {
    id: "tozen",
    name: "Tôzen",
    artist: "Chillhop",
    subtitle: "Mellow Rhodes jazz chords & relaxing lo-fi head-nodder",
    mood: "Chill • Focus",
    src: "/audio/tozen.mp3",
    duration: "2:32",
  },
  {
    id: "endless-sunset",
    name: "Endless Sunset",
    artist: "Chillhop",
    subtitle: "Golden hour tape warmth & calm ambient melodies",
    mood: "Calm • Sunset",
    src: "/audio/endless-sunset.mp3",
    duration: "3:26",
  },
  {
    id: "floating-vibes",
    name: "Floating Vibes",
    artist: "Chillhop",
    subtitle: "Dreamy acoustic guitar plucks & floating relaxed rhythms",
    mood: "Dreamy • Relax",
    src: "/audio/floating-vibes.mp3",
    duration: "2:36",
  },
  {
    id: "night-waves",
    name: "Night Waves",
    artist: "Chillhop",
    subtitle: "Late-night soothing ocean breeze & smooth lo-fi bassline",
    mood: "Soothing • Ocean",
    src: "/audio/waves.mp3",
    duration: "2:34",
  },
  {
    id: "with-you",
    name: "With You",
    artist: "Chillhop",
    subtitle: "Warm coffeehouse piano, vinyl grain & intimate groove",
    mood: "Cozy • Soul",
    src: "/audio/with-you.mp3",
    duration: "2:54",
  },
  {
    id: "apple-juice",
    name: "Apple Juice",
    artist: "Chillhop",
    subtitle: "Crisp sunny morning beat with relaxing guitar loops",
    mood: "Chill • Study",
    src: "/audio/apple-juice.mp3",
    duration: "2:11",
  },
];

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: SoundTrack;
  volume: number;
  currentTime: number;
  duration: number;
  isShuffle: boolean;
  isLooping: boolean;
  togglePlay: () => void;
  play: () => void;
  pause: () => void;
  setVolume: (vol: number) => void;
  selectTrack: (track: SoundTrack) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (seconds: number) => void;
  playRandomTrack: () => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SoundTrack>(SOUND_TRACKS[0]);
  const [volume, setVolumeState] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(true);
  const [isLooping, setIsLooping] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<SoundTrack>(currentTrack);
  currentTrackRef.current = currentTrack;
  const isShuffleRef = useRef<boolean>(isShuffle);
  isShuffleRef.current = isShuffle;
  const isLoopingRef = useRef<boolean>(isLooping);
  isLoopingRef.current = isLooping;

  // Initialize HTML5 Audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = volume;
    audio.src = currentTrack.src;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      if (isLoopingRef.current) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }
      if (isShuffleRef.current) {
        // Pick random different track
        const remaining = SOUND_TRACKS.filter((t) => t.id !== currentTrackRef.current.id);
        const next = remaining[Math.floor(Math.random() * remaining.length)];
        selectTrack(next);
      } else {
        // Next sequential track
        const currIdx = SOUND_TRACKS.findIndex((t) => t.id === currentTrackRef.current.id);
        const nextIdx = (currIdx + 1) % SOUND_TRACKS.length;
        selectTrack(SOUND_TRACKS[nextIdx]);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn("Audio play prevented:", err);
      });
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      play();
    } else {
      pause();
    }
  }, [play, pause]);

  const selectTrack = useCallback(
    (track: SoundTrack) => {
      setCurrentTrack(track);
      if (!audioRef.current) return;

      audioRef.current.src = track.src;
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Track play error:", err);
        });
    },
    []
  );

  const nextTrack = useCallback(() => {
    if (isShuffle) {
      const remaining = SOUND_TRACKS.filter((t) => t.id !== currentTrack.id);
      const next = remaining[Math.floor(Math.random() * remaining.length)];
      selectTrack(next);
    } else {
      const currIdx = SOUND_TRACKS.findIndex((t) => t.id === currentTrack.id);
      const nextIdx = (currIdx + 1) % SOUND_TRACKS.length;
      selectTrack(SOUND_TRACKS[nextIdx]);
    }
  }, [isShuffle, currentTrack, selectTrack]);

  const prevTrack = useCallback(() => {
    // If more than 3 seconds in, restart track
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const currIdx = SOUND_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const prevIdx = (currIdx - 1 + SOUND_TRACKS.length) % SOUND_TRACKS.length;
    selectTrack(SOUND_TRACKS[prevIdx]);
  }, [currentTrack, selectTrack]);

  const seek = useCallback((seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = seconds;
    setCurrentTime(seconds);
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  }, []);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev);
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLooping((prev) => !prev);
  }, []);

  const playRandomTrack = useCallback(() => {
    const remaining = SOUND_TRACKS.filter((t) => t.id !== currentTrack.id);
    const random = remaining[Math.floor(Math.random() * remaining.length)];
    selectTrack(random);
  }, [currentTrack, selectTrack]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in form controls
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        nextTrack();
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        prevTrack();
      } else if (e.key === "l" || e.key === "L") {
        e.preventDefault();
        toggleLoop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, nextTrack, prevTrack, toggleLoop]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrack,
        volume,
        currentTime,
        duration,
        isShuffle,
        isLooping,
        togglePlay,
        play,
        pause,
        setVolume,
        selectTrack,
        nextTrack,
        prevTrack,
        seek,
        playRandomTrack,
        toggleShuffle,
        toggleLoop,
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
