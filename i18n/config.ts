import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      "dashboard": "Dashboard",
      "lessons": "Lessons",
      "science": "Science Lab",
      "shop": "Shop",
      "family": "Family Mode",
      "vr_experience": "VR Experience",
      "ar_overlay": "AR Learning",
      "analytics": "Analytics",
      "life_skills": "Life Skills",
      
      // Authentication
      "welcome": "Welcome to NIKOlearn",
      "sign_in": "Sign In",
      "sign_up": "Sign Up",
      "email": "Email",
      "password": "Password",
      "full_name": "Full Name",
      "role": "Role",
      "student": "Student",
      "parent": "Parent",
      "teacher": "Teacher",
      "admin": "Admin",
      "sign_out": "Sign Out",
      
      // Learning
      "start_lesson": "Start Lesson",
      "continue_learning": "Continue Learning",
      "lesson_progress": "Lesson Progress",
      "complete": "Complete",
      "completed": "Completed",
      "in_progress": "In Progress",
      "locked": "Locked",
      "next_lesson": "Next Lesson",
      "previous_lesson": "Previous Lesson",
      
      // VR/AR Features
      "enter_vr": "Enter VR Experience",
      "vr_not_supported": "VR not supported. Try in VR-compatible browser.",
      "start_ar": "Start AR Experience",
      "ar_learning_mode": "AR Learning Mode",
      "scan_objects": "Scan objects to see educational overlays",
      
      // Analytics
      "analytics_dashboard": "Analytics Dashboard",
      "learning_progress": "Learning Progress",
      "study_time": "Study Time",
      "focus_score": "Focus Score",
      "achievements": "Achievements",
      "performance_insights": "Performance Insights",
      
      // Life Skills
      "life_skills_education": "Life Skills Education",
      "emotional_intelligence": "Emotional Intelligence",
      "social_skills": "Social Skills",
      "personal_safety": "Personal Safety",
      "career_readiness": "Career Readiness",
      "financial_literacy": "Financial Literacy",
      "digital_citizenship": "Digital Citizenship",
      
      // Accessibility
      "accessibility_settings": "Accessibility Settings",
      "high_contrast": "High Contrast Mode",
      "large_text": "Large Text",
      "reduced_motion": "Reduced Motion",
      "auto_read": "Auto Read Aloud",
      "focus_mode": "Focus Mode",
      "colorblind_friendly": "Colorblind Friendly",
      
      // Common
      "loading": "Loading...",
      "error": "Error",
      "success": "Success",
      "save": "Save",
      "cancel": "Cancel",
      "confirm": "Confirm",
      "yes": "Yes",
      "no": "No",
      "back": "Back",
      "next": "Next",
      "finish": "Finish",
      "start": "Start",
      "stop": "Stop",
      "play": "Play",
      "pause": "Pause",
      "settings": "Settings",
      "help": "Help",
      "about": "About",
      "privacy": "Privacy",
      "terms": "Terms of Service"
    }
  },
  sw: {
    translation: {
      // Navigation
      "dashboard": "Dashibodi",
      "lessons": "Masomo",
      "science": "Maabara ya Sayansi",
      "shop": "Duka",
      "family": "Nyumba ya Familia",
      "vr_experience": "Uchumba wa VR",
      "ar_overlay": "Kujifunza kwa AR",
      "analytics": "Takwimu",
      "life_skills": "U Skills wa Maisha",
      
      // Authentication
      "welcome": "Karibu NIKOlearn",
      "sign_in": "Ingia",
      "sign_up": "Jisajili",
      "email": "Barua pepe",
      "password": "Nenosiri",
      "full_name": "Jina kamili",
      "role": "Jukumu",
      "student": "Mwanafunzi",
      "parent": "Mzazi",
      "teacher": "Mwalimu",
      "admin": "Msimamizi",
      "sign_out": "Toka",
      
      // Learning
      "start_lesson": "Anza Somo",
      "continue_learning": "Endelea Kujifunza",
      "lesson_progress": "Maendeleo ya Somo",
      "complete": "Kamilisha",
      "completed": "Imekamilika",
      "in_progress": "Inaendelea",
      "locked": "Imefungwa",
      "next_lesson": "Somo Lijalo",
      "previous_lesson": "Somo la Awali",
      
      // VR/AR Features
      "enter_vr": "Ingia Uchumboni wa VR",
      "vr_not_supported": "VR haisaidiziwa. Jaribu kwenye kivinjari cha VR.",
      "start_ar": "Anza Uchumba wa AR",
      "ar_learning_mode": "Hali ya Kujifunza kwa AR",
      "scan_objects": "Chunguza vitu ili kuona maelezo ya kielimu",
      
      // Analytics
      "analytics_dashboard": "Dashibodi ya Takwimu",
      "learning_progress": "Maendeleo ya Kujifunza",
      "study_time": "Muda wa Kujifunza",
      "focus_score": "Alama ya Kujifocus",
      "achievements": "Mafanikio",
      "performance_insights": "Ujumbe wa Utendaji",
      
      // Life Skills
      "life_skills_education": "Elimu ya U Skills wa Maisha",
      "emotional_intelligence": "Akili ya Emosioni",
      "social_skills": "U Skills wa Kijamii",
      "personal_safety": "Usalama Binafsi",
      "career_readiness": "Kuwa Tayari kwa Ajira",
      "financial_literacy": "Alfajeti ya Kifedha",
      "digital_citizenship": "Uraia wa Kidijitali",
      
      // Accessibility
      "accessibility_settings": "Mipangilio ya Ufikivu",
      "high_contrast": "Mlingano Mkuu",
      "large_text": "Neno Kubwa",
      "reduced_motion": "Harakati Imepunguzwa",
      "auto_read": "Soma kiotomatiki",
      "focus_mode": "Hali ya Kujifocus",
      "colorblind_friendly": "Rafiki wa Rangi",
      
      // Common
      "loading": "Inapakia...",
      "error": "Hitilafu",
      "success": "Mfanikio",
      "save": "Hifadhi",
      "cancel": "Ghairi",
      "confirm": "Thibitisha",
      "yes": "Ndiyo",
      "no": "Hapana",
      "back": "Rudi",
      "next": "Ifuatayo",
      "finish": "Kamilisha",
      "start": "Anza",
      "stop": "Simama",
      "play": "Cheza",
      "pause": "Simama",
      "settings": "Mipangilio",
      "help": "Msaada",
      "about": "Kuhusu",
      "privacy": "Faragha",
      "terms": "Masharti ya Huduma"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
