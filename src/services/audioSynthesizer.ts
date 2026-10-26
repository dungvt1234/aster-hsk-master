// Audio Synthesizer utilizing Web Audio API and Web Speech API
// Clean, low-latency, zero external asset dependencies

class SoundEffectsManager {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  // Duolingo-style crisp 2-note chime for correct answer (C5 -> E5 -> G5)
  playCorrect() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Note 1: E5 (659.25Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.18, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.18);

      // Note 2: C6 (1046.50Hz) - punchy triumph
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1046.50, now + 0.12);
      gain2.gain.setValueAtTime(0.24, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.45);
    } catch {
      // AudioContext unavailable or blocked by autoplay
    }
  }

  // Duolingo-style low buzz for wrong answer
  playIncorrect() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.3);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Ignore
    }
  }

  // Pop sound when selecting/tapping a token
  playTap() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Ignore
    }
  }

  // Smooth flip chime for Flashcard 3D
  playCardFlip() {
    this.playTap();
  }

  toggleLofi(): boolean {
    return this.toggleLofiBeats();
  }

  // Pair matched sound in match challenge
  playMatch() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Ignore
    }
  }

  // Fanfare when lesson completed
  playFanfare() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const time = now + idx * 0.1;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  // Speech synthesis for native Chinese voice (Mandarin)
  speakChinese(text: string, rate: number = 0.85) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate; // 0.85 for clear beginner-friendly pronunciation, 0.5 for turtle mode

    // Prefer Chinese voices if installed in browser
    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find((v) => v.lang.startsWith('zh') || v.name.includes('Chinese') || v.name.includes('Mandarin'));
    if (zhVoice) {
      utterance.voice = zhVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  // Pure mathematical pitch contour glide (Zhao Yuanren 5-degree Chao scale)
  playTonePitchGlide(tone: 1 | 2 | 3 | 4 | 5) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      gain.gain.setValueAtTime(0.2, now);

      if (tone === 1) {
        // Tone 1: 5-5 (High level ~440Hz, 0.45s)
        osc.frequency.setValueAtTime(440, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (tone === 2) {
        // Tone 2: 3-5 (Rising 300Hz -> 440Hz, 0.38s)
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.38);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc.start(now);
        osc.stop(now + 0.42);
      } else if (tone === 3) {
        // Tone 3: 2-1-4 (Dipping 250Hz -> 190Hz -> 370Hz, 0.5s)
        osc.frequency.setValueAtTime(250, now);
        osc.frequency.exponentialRampToValueAtTime(190, now + 0.22);
        osc.frequency.exponentialRampToValueAtTime(370, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);
        osc.start(now);
        osc.stop(now + 0.52);
      } else if (tone === 4) {
        // Tone 4: 5-1 (Falling fast 440Hz -> 190Hz, 0.28s)
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(190, now + 0.28);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.start(now);
        osc.stop(now + 0.32);
      } else {
        // Tone 5: Neutral dot (~280Hz, 0.12s short)
        osc.frequency.setValueAtTime(280, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
    } catch {
      // AudioContext unavailable
    }
  }

  // --- Lo-Fi Ambient Study Beats Procedural Generator ---
  private lofiInterval: ReturnType<typeof setInterval> | null = null;
  private lofiPlaying: boolean = false;

  isLofiActive(): boolean {
    return this.lofiPlaying;
  }

  toggleLofiBeats(): boolean {
    if (this.lofiPlaying) {
      this.stopLofiBeats();
      return false;
    } else {
      this.startLofiBeats();
      return true;
    }
  }

  startLofiBeats() {
    try {
      this.stopLofiBeats();
      const ctx = this.getContext();
      this.lofiPlaying = true;

      // Relaxing Chinese traditional pentatonic scale notes (Gong, Shang, Jue, Zhi, Yu)
      // C4 (261.63Hz), D4 (293.66Hz), E4 (329.63Hz), G4 (392.00Hz), A4 (440.00Hz), C5 (523.25Hz)
      const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 392.00, 329.63];
      let step = 0;

      const playChord = () => {
        if (!this.lofiPlaying) return;
        const now = ctx.currentTime;
        const freq = pentatonic[step % pentatonic.length];
        step++;

        // Warm ambient sine bell
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Low-pass filter for vintage lo-fi warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);

        // Soft attack, gentle sustained tail
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.045, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.8);
      };

      playChord();
      this.lofiInterval = setInterval(playChord, 1600); // Gentle 75 BPM rhythm
    } catch {
      this.lofiPlaying = false;
    }
  }

  stopLofiBeats() {
    this.lofiPlaying = false;
    if (this.lofiInterval) {
      clearInterval(this.lofiInterval);
      this.lofiInterval = null;
    }
  }
}

export const soundEffects = new SoundEffectsManager();

