import { LanguageCode } from '../types/notice';

class SpeechController {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onStateChangeCb: ((speaking: boolean) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isAvailable(): boolean {
    return Boolean(this.synth);
  }

  public speak(text: string, lang: LanguageCode, onStateChange?: (speaking: boolean) => void) {
    if (!this.synth) return;

    this.stop();
    this.onStateChangeCb = onStateChange || null;

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    const langCodes: Record<LanguageCode, string> = {
      kn: 'kn-IN',
      hi: 'hi-IN',
      en: 'en-IN',
    };

    utterance.lang = langCodes[lang] || 'en-IN';
    utterance.rate = lang === 'kn' ? 0.9 : 0.95;
    utterance.pitch = 1.0;

    // Pick best available voice matching language if available
    const voices = this.synth.getVoices();
    const targetCode = utterance.lang.toLowerCase();
    const matchedVoice = voices.find(
      (v) => v.lang.toLowerCase().startsWith(targetCode) || v.lang.toLowerCase().includes(lang)
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.onStateChangeCb?.(true);
    };

    utterance.onend = () => {
      this.onStateChangeCb?.(false);
      this.currentUtterance = null;
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notification:', e);
      this.onStateChangeCb?.(false);
      this.currentUtterance = null;
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (!this.synth) return;
    this.synth.cancel();
    this.onStateChangeCb?.(false);
    this.currentUtterance = null;
  }
}

export const speechController = new SpeechController();
