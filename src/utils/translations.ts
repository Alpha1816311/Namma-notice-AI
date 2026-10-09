import { LanguageCode } from '../types/notice';

export interface UiTranslations {
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  uploadTitle: string;
  uploadSubtitle: string;
  dragDropText: string;
  browseFiles: string;
  supportedFormats: string;
  sampleNoticesTitle: string;
  sampleNoticesSubtitle: string;
  analyzeButton: string;
  analyzingButton: string;
  modelStatusOnline: string;
  modelStatusOffline: string;
  changeLanguage: string;
  overviewTab: string;
  actionChecklistTab: string;
  deadlinesTab: string;
  documentsTab: string;
  eligibilityTab: string;
  missingInfoTab: string;
  trustSafetyTab: string;
  askAiTab: string;
  listenSummary: string;
  stopAudio: string;
  copyChecklist: string;
  checklistCopied: string;
  addToCalendar: string;
  printReport: string;
  verifiedSeal: string;
  sealDetected: string;
  signatureDetected: string;
  confidenceScore: string;
  strictFacts: string;
  contextualNotes: string;
  unverifiedClaims: string;
  disclaimer: string;
  howToApply: string;
  contactHelpline: string;
  missingAlertTitle: string;
  missingAlertDesc: string;
  hackathonBadge: string;
  runLocallyBtn: string;
}

export const UI_TRANSLATIONS: Record<LanguageCode, UiTranslations> = {
  en: {
    appTitle: 'NammaNotice AI',
    appSubtitle: 'Multimodal Gemma 4 Public Notice Decoder',
    tagline: 'Upload any government circular, scholarship notice, or college circular to decode deadlines, documents, and action steps.',
    uploadTitle: 'Upload Notice Photo / Circular',
    uploadSubtitle: 'Take a photo or upload an image file of any public notification',
    dragDropText: 'Drag & drop notice image here, or',
    browseFiles: 'Browse File',
    supportedFormats: 'Supports JPG, PNG, WEBP (Clear, readable photos produce best results)',
    sampleNoticesTitle: 'Try with Bengaluru & Karnataka Public Circulars',
    sampleNoticesSubtitle: 'Test Gemma 4 multimodal reasoning with real official notices',
    analyzeButton: 'Analyze Notice with Gemma 4',
    analyzingButton: 'Gemma 4 Multimodal Reasoning in Progress...',
    modelStatusOnline: 'Gemma 4 26B A4B IT Active',
    modelStatusOffline: 'Model Reconnecting',
    changeLanguage: 'Language',
    overviewTab: 'Notice Summary',
    actionChecklistTab: 'Action Checklist',
    deadlinesTab: 'Deadlines & Timeline',
    documentsTab: 'Required Documents',
    eligibilityTab: 'Eligibility & Rules',
    missingInfoTab: 'Missing / Unclear Info',
    trustSafetyTab: 'Trust & Authenticity',
    askAiTab: 'Ask Gemma 4',
    listenSummary: 'Listen in English',
    stopAudio: 'Stop Audio',
    copyChecklist: 'Copy Action Plan',
    checklistCopied: 'Copied to Clipboard!',
    addToCalendar: 'Add to Calendar',
    printReport: 'Print / Save Report',
    verifiedSeal: 'Official Seal & Signature',
    sealDetected: 'Seal Detected',
    signatureDetected: 'Authorized Signatory Detected',
    confidenceScore: 'Authenticity Confidence',
    strictFacts: 'Strictly Extracted from Image',
    contextualNotes: 'Contextual Citizen Guidance',
    unverifiedClaims: 'Unverified / Ambiguous Items',
    disclaimer: 'Extracted strictly from the provided notice. For legal decisions, always cross-verify with the issuing authority.',
    howToApply: 'Application Instructions',
    contactHelpline: 'Official Helpline & Contacts',
    missingAlertTitle: 'Unclear or Missing Information Flagged',
    missingAlertDesc: 'Gemma 4 detected that certain critical details are torn, blurred, or missing in the notice image.',
    hackathonBadge: 'Hacktoberfest Hack Day Bengaluru × IEEE CIS',
    runLocallyBtn: 'Run Locally Guide',
  },
  kn: {
    appTitle: 'ನಮ್ಮ ನೋಟಿಸ್ AI',
    appSubtitle: 'ಜೆಮ್ಮಾ ೪ ಆಧಾರಿತ ಸಾರ್ವಜನಿಕ ಸುತ್ತೋಲೆ ವಿಶ್ಲೇಷಕ',
    tagline: 'ಯಾವುದೇ ಸರ್ಕಾರಿ ಆದೇಶ, ವಿದ್ಯಾರ್ಥಿವೇತನ ಅಥವಾ ಕಾಲೇಜು ಸುತ್ತೋಲೆಯ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ - ಕೊನೆಯ ದಿನಾಂಕ ಮತ್ತು ಮುಂದಿನ ಕ್ರಮಗಳನ್ನು ತಿಳಿಯಿರಿ.',
    uploadTitle: 'ಸುತ್ತೋಲೆಯ ಫೋಟೋ / ನೋಟಿಸ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    uploadSubtitle: 'ಸಾರ್ವಜನಿಕ ಪ್ರಕಟಣೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಥವಾ ಇಮೇಜ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    dragDropText: 'ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆದು ಹಾಕಿ, ಅಥವಾ',
    browseFiles: 'ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ',
    supportedFormats: 'JPG, PNG, WEBP ಬೆಂಬಲಿಸುತ್ತದೆ (ಸ್ಪಷ್ಟವಾದ ಚಿತ್ರ ಉತ್ತಮ ಫಲಿತಾಂಶ ನೀಡುತ್ತದೆ)',
    sampleNoticesTitle: 'ಬೆಂಗಳೂರು ಮತ್ತು ಕರ್ನಾಟಕದ ಮಾದರಿ ಸುತ್ತೋಲೆಗಳು',
    sampleNoticesSubtitle: 'ಜೆಮ್ಮಾ ೪ ಸಾಮರ್ಥ್ಯವನ್ನು ಪರೀಕ್ಷಿಸಲು ಅಧಿಕೃತ ಮಾದರಿಗಳನ್ನು ಬಳಸಿ',
    analyzeButton: 'ಜೆಮ್ಮಾ ೪ ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಿ',
    analyzingButton: 'ಜೆಮ್ಮಾ ೪ ನೋಟಿಸ್ ಪರಿಶೀಲಿಸುತ್ತಿದೆ...',
    modelStatusOnline: 'ಜೆಮ್ಮಾ ೪ 26B ಸಕ್ರಿಯವಾಗಿದೆ',
    modelStatusOffline: 'ಮರುಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ',
    changeLanguage: 'ಭಾಷೆ',
    overviewTab: 'ಸಾರಾಂಶ',
    actionChecklistTab: 'ಕ್ರಮಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',
    deadlinesTab: 'ಕೊನೆಯ ದಿನಾಂಕಗಳು',
    documentsTab: 'ಅಗತ್ಯ ದಾಖಲೆಗಳು',
    eligibilityTab: 'ಅರ್ಹತೆ ಮತ್ತು ಷರತ್ತುಗಳು',
    missingInfoTab: 'ಅಪೂರ್ಣ ಅಥವಾ ಅಸ್ಪಷ್ಟ ಮಾಹಿತಿ',
    trustSafetyTab: 'ವಿಶ್ವಾಸಾರ್ಹತೆ ವರದಿ',
    askAiTab: 'ಪ್ರಶ್ನೋತ್ತರ',
    listenSummary: 'ಕನ್ನಡದಲ್ಲಿ ಆಲಿಸಿ',
    stopAudio: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    copyChecklist: 'ಪಟ್ಟಿ ನಕಲಿಸಿ',
    checklistCopied: 'ಕ್ಲಿಪ್‌ಬೋರ್ಡ್‌ಗೆ ನಕಲಿಸಲಾಗಿದೆ!',
    addToCalendar: 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ',
    printReport: 'ವರದಿ ಮುದ್ರಿಸಿ',
    verifiedSeal: 'ಅಧಿಕೃತ ಮುದ್ರೆ ಮತ್ತು ಸಹಿ',
    sealDetected: 'ಮುದ್ರೆ ಗುರುತಿಸಲಾಗಿದೆ',
    signatureDetected: 'ಅಧಿಕೃತ ಸಹಿ ಪತ್ತೆಯಾಗಿದೆ',
    confidenceScore: 'ವಿಶ್ವಾಸಾರ್ಹತೆಯ ಅಂಕ',
    strictFacts: 'ದಾಖಲೆಯಿಂದ ಮಾತ್ರ ಪಡೆದ ಮಾಹಿತಿ',
    contextualNotes: 'ಸಹಾಯಕಾರಿ ನಾಗರಿಕ ಮಾಹಿತಿ',
    unverifiedClaims: 'ದೃಢೀಕರಿಸದ ಅಂಶಗಳು',
    disclaimer: 'ಈ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸಿದ ನೋಟಿಸ್‌ನಿಂದ ಮಾತ್ರ ಹೊರತೆಗೆಯಲಾಗಿದೆ. ನಿರ್ಣಾಯಕ ವಿಷಯಗಳಿಗಾಗಿ ಮೂಲ ಇಲಾಖೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    howToApply: 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ',
    contactHelpline: 'ಸಹಾಯವಾಣಿ ಮತ್ತು ಸಂಪರ್ಕ',
    missingAlertTitle: 'ಅಸ್ಪಷ್ಟ ಅಥವಾ ಬಿಟ್ಟುಹೋದ ಮಾಹಿತಿ',
    missingAlertDesc: 'ನೋಟಿಸ್‌ನಲ್ಲಿ ಕೆಲವು ಪ್ರಮುಖ ವಿವರಗಳು ಹರಿದಿವೆ ಅಥವಾ ಉಲ್ಲೇಖಿಸಿಲ್ಲ ಎಂದು ಜೆಮ್ಮಾ ೪ ಗುರುತಿಸಿದೆ.',
    hackathonBadge: 'ಹ್ಯಾಕ್‌ಟೋಬರ್‌ಫೆಸ್ಟ್ ಹ್ಯಾಕ್ ಡೇ ಬೆಂಗಳೂರು × IEEE CIS',
    runLocallyBtn: 'ಲೋಕಲ್ ರನ್ ಗೈಡ್',
  },
  hi: {
    appTitle: 'नम्मा नोटिस AI',
    appSubtitle: 'जेम्मा 4 आधारित सार्वजनिक सूचना विश्लेषक',
    tagline: 'किसी भी सरकारी आदेश, छात्रवृत्ति या कॉलेज सर्कुलर की फोटो अपलोड करें और अंतिम तिथि, दस्तावेज व आगे के कदम जानें।',
    uploadTitle: 'सूचना पत्र / सर्कुलर अपलोड करें',
    uploadSubtitle: 'किसी भी सार्वजनिक नोटिस की स्पष्ट फोटो या इमेज अपलोड करें',
    dragDropText: 'इमेज यहाँ ड्रैग व ड्रॉप करें, या',
    browseFiles: 'फ़ाइल चुनें',
    supportedFormats: 'JPG, PNG, WEBP समर्थित (साफ़ फोटो से बेहतर परिणाम मिलते हैं)',
    sampleNoticesTitle: 'बेंगलुरु और कर्नाटक के आधिकारिक नमूने',
    sampleNoticesSubtitle: 'जेम्मा 4 की क्षमता परखने के लिए नमूना सर्कुलर चुनें',
    analyzeButton: 'जेम्मा 4 से विश्लेषण करें',
    analyzingButton: 'जेम्मा 4 मल्टीमॉडल विश्लेषण जारी है...',
    modelStatusOnline: 'जेम्मा 4 26B सक्रिय है',
    modelStatusOffline: 'पुनः कनेक्ट हो रहा है',
    changeLanguage: 'भाषा',
    overviewTab: 'सूचना सारांश',
    actionChecklistTab: 'कार्य सूची (चेकलिस्ट)',
    deadlinesTab: 'अंतिम तिथियां',
    documentsTab: 'आवश्यक दस्तावेज',
    eligibilityTab: 'पात्रता व शर्तें',
    missingInfoTab: 'लापता या अस्पष्ट जानकारी',
    trustSafetyTab: 'सत्यता व विश्वास रिपोर्ट',
    askAiTab: 'जेम्मा 4 से पूछें',
    listenSummary: 'हिंदी में सुनें',
    stopAudio: 'आवाज रोकें',
    copyChecklist: 'कार्य सूची कॉपी करें',
    checklistCopied: 'कॉपी हो गया!',
    addToCalendar: 'कैलेंडर में जोड़ें',
    printReport: 'रिपोर्ट प्रिंट करें',
    verifiedSeal: 'आधिकारिक मुहर और हस्ताक्षर',
    sealDetected: 'मुहर पहचानी गई',
    signatureDetected: 'हस्ताक्षरकर्ता पहचाना गया',
    confidenceScore: 'विश्वसनीयता स्कोर',
    strictFacts: 'दस्तावेज से सीधे प्राप्त तथ्य',
    contextualNotes: 'नागरिक सहायक जानकारी',
    unverifiedClaims: 'अपुष्ट या अस्पष्ट दावे',
    disclaimer: 'यह जानकारी सीधे अपलोड किए गए नोटिस से निकाली गई है। कानूनी या वैधानिक मामलों के लिए आधिकारिक विभाग से संपर्क करें।',
    howToApply: 'आवेदन कैसे करें',
    contactHelpline: 'हेल्पलाइन व संपर्क विवरण',
    missingAlertTitle: 'अस्पष्ट या अधूरी जानकारी का अलर्ट',
    missingAlertDesc: 'जेम्मा 4 ने पाया कि नोटिस में कुछ महत्वपूर्ण विवरण अनुपस्थित या कटे-फटे हैं।',
    hackathonBadge: 'हैक्टोबरफेस्ट हैक डे बेंगलुरु × IEEE CIS',
    runLocallyBtn: 'लोकल रन गाइड',
  },
};
