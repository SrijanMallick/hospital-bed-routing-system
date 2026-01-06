import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'bn' | 'te' | 'ta' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appTitle: 'Hospital Bed Routing',
    appSubtitle: 'Government Hospital Network',
    heroTitle: 'Quick Patient Triage & Hospital Routing',
    heroSubtitle: 'Find the right hospital bed in under 3 minutes',
    heroDescription: 'For ambulance drivers, caregivers, and healthcare workers',
    beginTriage: 'Begin Triage',
    home: 'Home',
    howItWorks: 'How It Works',
    step1Title: 'Answer Questions',
    step1Desc: 'Simple yes/no questions about visible symptoms - no medical training needed',
    step2Title: 'Get Urgency Level',
    step2Desc: 'System assesses severity: Critical, Urgent, or Stable',
    step3Title: 'Get Hospital Match',
    step3Desc: 'Recommended hospital with available beds and travel time',
    disclaimer: 'This is a demonstration project hosted on GitHub',
    disclaimerWarning: 'DO NOT USE THIS SYSTEM FOR ACTUAL MEDICAL EMERGENCIES',
    disclaimerAction: 'This is a prototype for educational and demonstration purposes only. Always call emergency services (108) for real medical emergencies.',
    notDiagnosis: 'This system does NOT diagnose or treat patients',
    finalAdmission: 'Final admission decision is made by hospital medical staff',
    emergencyCall: 'Always call 108 for emergency ambulance services',
    bedAvailability: 'Bed availability is updated regularly but may change',
    selectLanguage: 'Select Language',
  },
  hi: {
    appTitle: 'अस्पताल बिस्तर रूटिंग',
    appSubtitle: 'सरकारी अस्पताल नेटवर्क',
    heroTitle: 'त्वरित रोगी ट्राइएज और अस्पताल रूटिंग',
    heroSubtitle: '3 मिनट से कम समय में सही अस्पताल बिस्तर खोजें',
    heroDescription: 'एम्बुलेंस चालक, देखभालकर्ता और स्वास्थ्य कर्मियों के लिए',
    beginTriage: 'ट्राइएज शुरू करें',
    home: 'होम',
    howItWorks: 'यह कैसे काम करता है',
    step1Title: 'सवालों के जवाब दें',
    step1Desc: 'दिखाई देने वाले लक्षणों के बारे में सरल हां/नहीं प्रश्न - कोई चिकित्सा प्रशिक्षण की आवश्यकता नहीं',
    step2Title: 'तात्कालिकता स्तर प्राप्त करें',
    step2Desc: 'सिस्टम गंभीरता का आकलन करता है: गंभीर, तत्काल, या स्थिर',
    step3Title: 'अस्पताल मिलान प्राप्त करें',
    step3Desc: 'उपलब्ध बिस्तर और यात्रा समय के साथ अनुशंसित अस्पताल',
    disclaimer: 'यह GitHub पर होस्ट की गई एक प्रदर्शन परियोजना है',
    disclaimerWarning: 'वास्तविक चिकित्सा आपात स्थिति के लिए इस प्रणाली का उपयोग न करें',
    disclaimerAction: 'यह केवल शैक्षिक और प्रदर्शन उद्देश्यों के लिए एक प्रोटोटाइप है। वास्तविक चिकित्सा आपात स्थिति के लिए हमेशा आपातकालीन सेवाओं (108) को कॉल करें।',
    notDiagnosis: 'यह प्रणाली रोगियों का निदान या उपचार नहीं करती है',
    finalAdmission: 'अंतिम प्रवेश निर्णय अस्पताल के चिकित्सा कर्मचारियों द्वारा किया जाता है',
    emergencyCall: 'आपातकालीन एम्बुलेंस सेवाओं के लिए हमेशा 108 पर कॉल करें',
    bedAvailability: 'बिस्तर की उपलब्धता नियमित रूप से अपडेट की जाती है लेकिन बदल सकती है',
    selectLanguage: 'भाषा चुनें',
  },
  bn: {
    appTitle: 'হাসপাতাল বেড রাউটিং',
    appSubtitle: 'সরকারি হাসপাতাল নেটওয়ার্ক',
    heroTitle: 'দ্রুত রোগী ট্রাইএজ এবং হাসপাতাল রাউটিং',
    heroSubtitle: '৩ মিনিটের কম সময়ে সঠিক হাসপাতালের বিছানা খুঁজুন',
    heroDescription: 'অ্যাম্বুলেন্স চালক, যত্নশীল এবং স্বাস্থ্যকর্মীদের জন্য',
    beginTriage: 'ট্রাইএজ শুরু করুন',
    home: 'হোম',
    howItWorks: 'এটি কিভাবে কাজ করে',
    step1Title: 'প্রশ্নের উত্তর দিন',
    step1Desc: 'দৃশ্যমান লক্ষণ সম্পর্কে সহজ হ্যাঁ/না প্রশ্ন - কোন চিকিৎসা প্রশিক্ষণের প্রয়োজন নেই',
    step2Title: 'জরুরিতা স্তর পান',
    step2Desc: 'সিস্টেম তীব্রতা মূল্যায়ন করে: গুরুতর, জরুরি, বা স্থিতিশীল',
    step3Title: 'হাসপাতাল ম্যাচ পান',
    step3Desc: 'উপলব্ধ বিছানা এবং ভ্রমণ সময় সহ প্রস্তাবিত হাসপাতাল',
    disclaimer: 'এটি GitHub-এ হোস্ট করা একটি প্রদর্শন প্রকল্প',
    disclaimerWarning: 'প্রকৃত চিকিৎসা জরুরী অবস্থার জন্য এই সিস্টেম ব্যবহার করবেন না',
    disclaimerAction: 'এটি শুধুমাত্র শিক্ষামূলক এবং প্রদর্শন উদ্দেশ্যে একটি প্রোটোটাইপ। প্রকৃত চিকিৎসা জরুরি অবস্থার জন্য সর্বদা জরুরি সেবা (১০৮) কল করুন।',
    notDiagnosis: 'এই সিস্টেম রোগীদের নির্ণয় বা চিকিৎসা করে না',
    finalAdmission: 'চূড়ান্ত ভর্তির সিদ্ধান্ত হাসপাতালের চিকিৎসা কর্মীদের দ্বারা নেওয়া হয়',
    emergencyCall: 'জরুরি অ্যাম্বুলেন্স সেবার জন্য সর্বদা ১০৮ কল করুন',
    bedAvailability: 'বিছানার উপলব্ধতা নিয়মিত আপডেট করা হয় তবে পরিবর্তন হতে পারে',
    selectLanguage: 'ভাষা নির্বাচন করুন',
  },
  te: {
    appTitle: 'హాస్పిటల్ బెడ్ రూటింగ్',
    appSubtitle: 'ప్రభుత్వ ఆసుపత్రి నెట్‌వర్క్',
    heroTitle: 'శీఘ్ర రోగి ట్రైయేజ్ మరియు ఆసుపత్రి రూటింగ్',
    heroSubtitle: '3 నిమిషాల లోపు సరైన ఆసుపత్రి బెడ్ కనుగొనండి',
    heroDescription: 'అంబులెన్స్ డ్రైవర్లు, సంరక్షకులు మరియు ఆరోగ్య కార్యకర్తల కోసం',
    beginTriage: 'ట్రైయేజ్ ప్రారంభించండి',
    home: 'హోమ్',
    howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
    step1Title: 'ప్రశ్నలకు సమాధానం ఇవ్వండి',
    step1Desc: 'కనిపించే లక్షణాల గురించి సరళమైన అవును/కాదు ప్రశ్నలు - వైద్య శిక్షణ అవసరం లేదు',
    step2Title: 'అత్యవసర స్థాయిని పొందండి',
    step2Desc: 'సిస్టమ్ తీవ్రతను అంచనా వేస్తుంది: క్రిటికల్, అర్జెంట్ లేదా స్టేబుల్',
    step3Title: 'ఆసుపత్రి మ్యాచ్ పొందండి',
    step3Desc: 'అందుబాటులో ఉన్న బెడ్లు మరియు ప్రయాణ సమయంతో సిఫార్సు చేయబడిన ఆసుపత్రి',
    disclaimer: 'ఇది GitHub లో హోస్ట్ చేయబడిన ప్రదర్శన ప్రాజెక్ట్',
    disclaimerWarning: 'వాస్తవ వైద్య అత్యవసర పరిస్థితుల కోసం ఈ వ్యవస్థను ఉపయోగించవద్దు',
    disclaimerAction: 'ఇది కేవలం విద్యా మరియు ప్రదర్శన ప్రయోజనాల కోసం మాత్రమే ఒక నమూనా. నిజమైన వైద్య అత్యవసర పరిస్థితుల కోసం ఎల్లప్పుడూ అత్యవసర సేవలను (108) కాల్ చేయండి।',
    notDiagnosis: 'ఈ వ్యవస్థ రోగులను నిర్ధారించదు లేదా చికిత్స చేయదు',
    finalAdmission: 'తుది ప్రవేశ నిర్ణయం ఆసుపత్రి వైద్య సిబ్బందిచే తీసుకోబడుతుంది',
    emergencyCall: 'అత్యవసర అంబులెన్స్ సేవల కోసం ఎల్లప్పుడూ 108 కు కాల్ చేయండి',
    bedAvailability: 'బెడ్ లభ్యత క్రమం తప్పకుండా నవీకరించబడుతుంది కానీ మారవచ్చు',
    selectLanguage: 'భాషను ఎంచుకోండి',
  },
  ta: {
    appTitle: 'மருத்துவமனை படுக்கை வழிகாட்டல்',
    appSubtitle: 'அரசு மருத்துவமனை வலையமைப்பு',
    heroTitle: 'விரைவான நோயாளி தரப்படுத்தல் மற்றும் மருத்துவமனை வழிகாட்டல்',
    heroSubtitle: '3 நிமிடங்களுக்குள் சரியான மருத்துவமனை படுக்கையைக் கண்டறியவும்',
    heroDescription: 'ஆம்புலன்ஸ் ஓட்டுநர்கள், பராமரிப்பாளர்கள் மற்றும் சுகாதார பணியாளர்களுக்கு',
    beginTriage: 'தரப்படுத்தலைத் தொடங்கு',
    home: 'முகப்பு',
    howItWorks: 'இது எப்படி வேலை செய்கிறது',
    step1Title: 'கேள்விகளுக்கு பதிலளிக்கவும்',
    step1Desc: 'காணக்கூடிய அறிகுறிகள் பற்றிய எளிய ஆம்/இல்லை கேள்விகள் - மருத்துவ பயிற்சி தேவையில்லை',
    step2Title: 'அவசர நிலையைப் பெறுங்கள்',
    step2Desc: 'அமைப்பு தீவிரத்தை மதிப்பிடுகிறது: முக்கியமானது, அவசரமானது அல்லது நிலையானது',
    step3Title: 'மருத்துவமனை பொருத்தத்தைப் பெறுங்கள்',
    step3Desc: 'கிடைக்கக்கூடிய படுக்கைகள் மற்றும் பயண நேரத்துடன் பரிந்துரைக்கப்பட்ட மருத்துவமனை',
    disclaimer: 'இது GitHub இல் ஹோஸ்ட் செய்யப்பட்ட ஒரு செயல்முறை திட்டமாகும்',
    disclaimerWarning: 'உண்மையான மருத்துவ அவசரநிலைகளுக்கு இந்த அமைப்பைப் பயன்படுத்த வேண்டாம்',
    disclaimerAction: 'இது கல்வி மற்றும் செயல்முறை நோக்கங்களுக்காக மட்டுமே ஒரு மாதிரி. உண்மையான மருத்துவ அவசரநிலைகளுக்கு எப்போதும் அவசர சேவைகளை (108) அழைக்கவும்.',
    notDiagnosis: 'இந்த அமைப்பு நோயாளிகளை கண்டறியவோ சிகிச்சையளிக்கவோ இல்லை',
    finalAdmission: 'இறுதி சேர்க்கை முடிவு மருத்துவமனை மருத்துவ ஊழியர்களால் எடுக்கப்படுகிறது',
    emergencyCall: 'அவசர ஆம்புலன்ஸ் சேவைகளுக்கு எப்போதும் 108 ஐ அழைக்கவும்',
    bedAvailability: 'படுக்கை கிடைக்கும் தன்மை தொடர்ந்து புதுப்பிக்கப்படுகிறது ஆனால் மாறலாம்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
  },
  ml: {
    appTitle: 'ആശുപത്രി കിടക്കാ റൂട്ടിംഗ്',
    appSubtitle: 'സർക്കാർ ആശുപത്രി ശൃംഖല',
    heroTitle: 'ദ്രുത രോഗി ട്രയേജും ആശുപത്രി റൂട്ടിംഗും',
    heroSubtitle: '3 മിനിറ്റിനുള്ളിൽ ശരിയായ ആശുപത്രി കിടക്ക കണ്ടെത്തുക',
    heroDescription: 'ആംബുലൻസ് ഡ്രൈവർമാർ, പരിചരണം നൽകുന്നവർ, ആരോഗ്യ പ്രവർത്തകർ എന്നിവർക്കായി',
    beginTriage: 'ട്രയേജ് ആരംഭിക്കുക',
    home: 'ഹോം',
    howItWorks: 'ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു',
    step1Title: 'ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുക',
    step1Desc: 'ദൃശ്യമായ ലക്ഷണങ്ങളെക്കുറിച്ചുള്ള ലളിതമായ അതെ/ഇല്ല ചോദ്യങ്ങൾ - മെഡിക്കൽ പരിശീലനം ആവശ്യമില്ല',
    step2Title: 'അടിയന്തിര നില നേടുക',
    step2Desc: 'സിസ്റ്റം തീവ്രത വിലയിരുത്തുന്നു: നിർണായകം, അടിയന്തിരം അല്ലെങ്കിൽ സ്ഥിരത',
    step3Title: 'ആശുപത്രി മാച്ച് നേടുക',
    step3Desc: 'ലഭ്യമായ കിടക്കകളും യാത്രാ സമയവുമുള്ള ശുപാർശ ചെയ്ത ആശുപത്രി',
    disclaimer: 'ഇത് GitHub-ൽ ഹോസ്റ്റ് ചെയ്ത ഒരു പ്രദർശന പ്രോജക്റ്റാണ്',
    disclaimerWarning: 'യഥാർത്ഥ മെഡിക്കൽ അടിയന്തിരാവസ്ഥകൾക്ക് ഈ സിസ്റ്റം ഉപയോഗിക്കരുത്',
    disclaimerAction: 'ഇത് വിദ്യാഭ്യാസപരവും പ്രദർശനപരവുമായ ഉദ്ദേശ്യങ്ങൾക്കായി മാത്രം ഒരു മാതൃകയാണ്. യഥാർത്ഥ മെഡിക്കൽ അടിയന്തിരാവസ്ഥകൾക്ക് എപ്പോഴും അടിയന്തര സേവനങ്ങളെ (108) വിളിക്കുക.',
    notDiagnosis: 'ഈ സിസ്റ്റം രോഗികളെ രോഗനിർണയം ചെയ്യുകയോ ചികിത്സിക്കുകയോ ചെയ്യുന്നില്ല',
    finalAdmission: 'അന്തിമ പ്രവേശന തീരുമാനം ആശുപത്രി മെഡിക്കൽ സ്റ്റാഫ് എടുക്കുന്നു',
    emergencyCall: 'അടിയന്തര ആംബുലൻസ് സേവനങ്ങൾക്കായി എപ്പോഴും 108 വിളിക്കുക',
    bedAvailability: 'കിടക്ക ലഭ്യത പതിവായി അപ്ഡേറ്റ് ചെയ്യുന്നു എന്നാൽ മാറിയേക്കാം',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

