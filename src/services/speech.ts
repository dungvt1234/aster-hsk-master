/**
 * Web Speech API wrapper for authentic Mandarin Chinese pronunciation
 */
export function playChineseAudio(text: string, rate = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Trình duyệt không hỗ trợ Web Speech API.');
      resolve();
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate; // hơi chậm để người học nghe rõ thanh điệu
    utterance.pitch = 1.0;

    // Tìm giọng tiếng Trung tự nhiên nếu có
    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find(
      (v) => v.lang.startsWith('zh') || v.lang.includes('cmn') || v.name.includes('Chinese')
    );
    if (zhVoice) {
      utterance.voice = zhVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}
