import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        vendors: 'Vendors',
        inspiration: 'Inspiration',
        planning: 'Planning',
        concierge: 'Concierge',
        about: 'About',
        community: 'Community',
        signIn: 'Sign In',
        createAccount: 'Create Account',
        dashboard: 'Dashboard',
        signOut: 'Sign Out',
        partnerWithUs: 'Partner with Us',
      },
      hero: {
        badge: "Kenya's Premier Wedding Platform",
        title1: 'Your Dream',
        title2: 'Coastal Wedding',
        title3: 'Starts Here',
        subtitle: 'Curated vendors, intelligent planning tools, and dedicated local expertise for your perfect Diani celebration.',
        exploreVendors: 'Explore Vendors',
        concierge: 'Amari Concierge',
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        tryAgain: 'Try Again',
        goHome: 'Go Home',
        learnMore: 'Learn More',
      },
    },
  },
  sw: {
    translation: {
      nav: {
        home: 'Nyumbani',
        vendors: 'Wachuuzi',
        inspiration: 'Msukumo',
        planning: 'Kupanga',
        concierge: 'Msaidizi',
        about: 'Kuhusu',
        community: 'Jumuiya',
        signIn: 'Ingia',
        createAccount: 'Tengeneza Akaunti',
        dashboard: 'Dashibodi',
        signOut: 'Ondoka',
        partnerWithUs: 'Shiriki Nasi',
      },
      hero: {
        badge: 'Jukwaa Kuu la Harusi nchini Kenya',
        title1: 'Harusi Yako',
        title2: 'Ya Pwani',
        title3: 'Inaanza Hapa',
        subtitle: 'Wachuuzi waliochaguliwa, zana za kupanga na utaalamu wa ndani kwa sherehe yako kamili ya Diani.',
        exploreVendors: 'Tazama Wachuuzi',
        concierge: 'Msaidizi wa Amari',
      },
      common: {
        loading: 'Inapakia...',
        error: 'Kitu kimeenda vibaya',
        tryAgain: 'Jaribu Tena',
        goHome: 'Rudi Nyumbani',
        learnMore: 'Jifunze Zaidi',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
