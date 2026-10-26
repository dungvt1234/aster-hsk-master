import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Play, Sparkles, Activity } from 'lucide-react';
import { soundEffects } from '../services/audioSynthesizer';

interface PitchContourVisualizerProps {
  pinyin: string;
  chinese: string;
  isRecording: boolean;
  audioStream: MediaStream | null;
  score?: number | null;
}

// Extract tones from Pinyin syllables
function extractTonesFromPinyin(pinyinStr: string): { syllable: string; tone: 1 | 2 | 3 | 4 | 5 }[] {
  const words = pinyinStr.split(/\s+/).filter(Boolean);
  return words.map((w) => {
    const clean = w.replace(/[,.?!:;，。？！]/g, '');
    let tone: 1 | 2 | 3 | 4 | 5 = 5; // default neutral tone
    if (/[āēīōūǖĀĒĪŌŪǕ]/.test(clean)) tone = 1;
    else if (/[áéíóúǘÁÉÍÓÚǗ]/.test(clean)) tone = 2;
    else if (/[ǎěǐǒǔǚǍĚǏǑǓǙ]/.test(clean)) tone = 3;
    else if (/[àèìòùǜÀÈÌÒÙǛ]/.test(clean)) tone = 4;
    return { syllable: clean, tone };
  });
}

export function PitchContourVisualizer({
  pinyin,
  chinese,
  isRecording,
  audioStream,
  score,
}: PitchContourVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const [activeToneIndex, setActiveToneIndex] = useState<number | null>(null);

  const tonesList = extractTonesFromPinyin(pinyin);

  // Setup Web Audio Analyser when recording starts
  useEffect(() => {
    if (isRecording && audioStream) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.8;
        analyserRef.current = analyser;

        const source = ctx.createMediaStreamSource(audioStream);
        source.connect(analyser);
      } catch (err) {
        console.warn('AudioContext Analyser not available:', err);
      }
    } else {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        void audioContextRef.current.close();
      }
      audioContextRef.current = null;
      analyserRef.current = null;
    }

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        void audioContextRef.current.close();
      }
    };
  }, [isRecording, audioStream]);

  // Main Canvas Rendering Loop (Target Pitch Curves vs User Live Pitch)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const userPitchPoints: number[] = [];

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      time += 0.04;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Background & Chao 5-degree Pitch Scale (55, 35, 214, 51)
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#0f172a' : '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      // Draw horizontal level lines (Level 5=High, Level 3=Mid, Level 1=Low)
      ctx.lineWidth = 1;
      const levels = [
        { lvl: 5, label: '5 (Cao 55)', y: height * 0.18, color: 'rgba(239, 68, 68, 0.3)' },
        { lvl: 4, label: '4 (Nửa cao)', y: height * 0.36, color: 'rgba(245, 158, 11, 0.2)' },
        { lvl: 3, label: '3 (Trung bình)', y: height * 0.54, color: 'rgba(56, 189, 248, 0.25)' },
        { lvl: 2, label: '2 (Nửa thấp)', y: height * 0.72, color: 'rgba(168, 85, 247, 0.2)' },
        { lvl: 1, label: '1 (Thấp 11)', y: height * 0.90, color: 'rgba(16, 185, 129, 0.3)' },
      ];

      levels.forEach((l) => {
        ctx.strokeStyle = l.color;
        ctx.beginPath();
        ctx.setLineDash([4, 6]);
        ctx.moveTo(40, l.y);
        ctx.lineTo(width - 15, l.y);
        ctx.stroke();

        ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
        ctx.font = '10px Inter, sans-serif';
        ctx.fillText(l.label, 6, l.y + 3);
      });
      ctx.setLineDash([]);

      // 2. Draw Target Chinese Pitch Contours for each syllable
      const segWidth = (width - 60) / Math.max(1, tonesList.length);

      tonesList.forEach((item, idx) => {
        const startX = 50 + idx * segWidth + 10;
        const endX = startX + segWidth - 20;
        const tone = item.tone;

        ctx.lineWidth = 4;
        ctx.lineCap = 'round';

        // Target Pitch Contour Curve
        ctx.strokeStyle = '#f59e0b'; // Amber Gold target line
        ctx.beginPath();

        if (tone === 1) {
          // Tone 1: 5-5 (Flat high)
          ctx.moveTo(startX, height * 0.18);
          ctx.lineTo(endX, height * 0.18);
        } else if (tone === 2) {
          // Tone 2: 3-5 (Rising)
          ctx.moveTo(startX, height * 0.54);
          ctx.quadraticCurveTo((startX + endX) / 2, height * 0.40, endX, height * 0.18);
        } else if (tone === 3) {
          // Tone 3: 2-1-4 (Dipping)
          ctx.moveTo(startX, height * 0.72);
          ctx.quadraticCurveTo((startX + endX) / 2, height * 0.92, endX, height * 0.36);
        } else if (tone === 4) {
          // Tone 4: 5-1 (Falling fast)
          ctx.moveTo(startX, height * 0.18);
          ctx.lineTo(endX, height * 0.90);
        } else {
          // Tone 5: Short mid dot
          ctx.arc((startX + endX) / 2, height * 0.54, 4, 0, Math.PI * 2);
        }
        ctx.stroke();

        // Syllable Label Below
        ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.syllable, (startX + endX) / 2, height - 6);
        ctx.textAlign = 'left';
      });

      // 3. User Voice Live Pitch Waveform
      if (isRecording && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Find dominant frequency peak
        let maxVal = 0;
        let maxIdx = 0;
        for (let i = 2; i < 60; i++) {
          if (dataArray[i] > maxVal) {
            maxVal = dataArray[i];
            maxIdx = i;
          }
        }

        // Map frequency peak to 0..height
        if (maxVal > 30) {
          const estimatedY = height - (maxIdx / 40) * (height * 0.8) - height * 0.1;
          userPitchPoints.push(Math.max(10, Math.min(height - 20, estimatedY)));
          if (userPitchPoints.length > 50) {
            userPitchPoints.shift();
          }
        }

        // Draw Live Pitch Waveform
        if (userPitchPoints.length > 1) {
          ctx.lineWidth = 3.5;
          ctx.strokeStyle = '#10b981'; // Jade green user voice
          ctx.beginPath();
          const stepX = (width - 60) / 50;
          userPitchPoints.forEach((pt, pIdx) => {
            const px = 50 + pIdx * stepX;
            if (pIdx === 0) ctx.moveTo(px, pt);
            else ctx.lineTo(px, pt);
          });
          ctx.stroke();

          // Glowing voice orb at the tip
          const lastY = userPitchPoints[userPitchPoints.length - 1];
          const lastX = 50 + (userPitchPoints.length - 1) * stepX;
          ctx.beginPath();
          ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRecording, tonesList]);

  // Handle tone demo sound
  const handlePlayToneSound = (tone: 1 | 2 | 3 | 4 | 5, idx: number) => {
    setActiveToneIndex(idx);
    soundEffects.playTonePitchGlide(tone);
    setTimeout(() => setActiveToneIndex(null), 600);
  };

  return (
    <div className="pitch-contour-wrapper">
      <div className="pitch-contour-header">
        <div className="pitch-header-title">
          <Activity size={18} color="#10b981" />
          <span>ĐỒ THỊ THANH ĐIỆU CAO ĐỘ (PITCH CONTOUR REAL-TIME)</span>
        </div>
        <div className="pitch-legend">
          <span className="legend-item target">
            <span className="legend-dot" style={{ background: '#f59e0b' }} />
            Đường cao độ chuẩn Bắc Kinh
          </span>
          <span className="legend-item user">
            <span className="legend-dot" style={{ background: '#10b981' }} />
            Giọng nói thực tế của bạn
          </span>
        </div>
      </div>

      {/* Main Canvas Display */}
      <div className="pitch-canvas-box">
        <canvas
          ref={canvasRef}
          width={600}
          height={160}
          className="pitch-canvas"
        />
      </div>

      {/* Syllables Tone Pitch Controls & Audio Guidance */}
      <div className="pitch-syllables-row">
        <span className="pitch-row-hint">Nghe chuẩn đường lượn thanh mẫu:</span>
        <div className="pitch-syllables-chips">
          {tonesList.map((t, idx) => {
            const isPlaying = activeToneIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                className={`pitch-tone-chip ${isPlaying ? 'is-playing' : ''}`}
                onClick={() => handlePlayToneSound(t.tone, idx)}
                title={`Nghe đường cao độ mẫu của Thanh ${t.tone}`}
              >
                <span className="chip-pinyin">{t.syllable}</span>
                <span className="chip-tone">Thanh {t.tone}</span>
                <Volume2 size={13} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
