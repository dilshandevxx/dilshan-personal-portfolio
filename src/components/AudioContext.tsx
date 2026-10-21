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
    id: "snapback",
    name: "Snapback",
    artist: "Chillhop Music",
    subtitle: "Classic dusty boom-bap drums & chill jazz Rhodes chords",
    mood: "Lo-Fi Hip Hop",
    src: "/audio/snapback.mp3",
    duration: "2:46",
  },
  {
    id: "moods",
    name: "Moods",
    artist: "Chillhop Music",
    subtitle: "Mellow tape saturation, nostalgic chords & warm vinyl bass",
    mood: "Lo-Fi Study",
    src: "/audio/moods.mp3",
    duration: "3:31",
  },
  {
    id: "fade",
    name: "Fade",
    artist: "Chillhop Music",
    subtitle: "Late-night vinyl crackle, atmospheric pads & head-nodder beat",
    mood: "Late Night Lo-Fi",
    src: "/audio/fade.mp3",
    duration: "3:40",
  },
  {
    id: "trouble",
    name: "Trouble",
    artist: "Chillhop Music",
    subtitle: "Deep soulful bassline, hip hop groove & warm Rhodes keys",
    mood: "Chill Lo-Fi",
    src: "/audio/trouble.mp3",
    duration: "4:00",
  },
  {
    id: "swiss",
    name: "Swiss",
    artist: "Chillhop Music",
    subtitle: "Coffeehouse jazz chords & relaxed boom-bap rhythm",
    mood: "Jazzhop • Cafe",
    src: "/audio/swiss.mp3",
    duration: "5:53",
  },
  {
    id: "tozen",
    name: "Tôzen",
    artist: "Chillhop Music",
    subtitle: "Mellow Rhodes jazz chords & relaxing lo-fi head-nodder",
    mood: "Lo-Fi Focus",
    src: "/audio/tozen.mp3",
    duration: "3:48",
  },
  {
    id: "with-you",
    name: "With You",
    artist: "Chillhop Music",
    subtitle: "Warm vinyl grain, intimate piano & soulful hip hop groove",
    mood: "Cozy Lo-Fi",
    src: "/audio/with-you.mp3",
    duration: "4:22",
  },
  {
    id: "apple-juice",
    name: "Apple Juice",
    artist: "Chillhop Music",
    subtitle: "Sunny morning beat with relaxing guitar loops & clean boom-bap",
    mood: "Lo-Fi Morning",
    src: "/audio/apple-juice.mp3",
    duration: "3:17",
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
