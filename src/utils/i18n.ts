export const LANGUAGES = {
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  it: { name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  pt: { name: 'Português', flag: '🇧🇷', dir: 'ltr' },
  nl: { name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
  pl: { name: 'Polski', flag: '🇵🇱', dir: 'ltr' },
  ru: { name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  zh: { name: '中文', flag: '🇨🇳', dir: 'ltr' },
  ja: { name: '日本語', flag: '🇯🇵', dir: 'ltr' },
  ko: { name: '한국어', flag: '🇰🇷', dir: 'ltr' },
  hi: { name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  tr: { name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳', dir: 'ltr' },
  th: { name: 'ไทย', flag: '🇹🇭', dir: 'ltr' },
  sv: { name: 'Svenska', flag: '🇸🇪', dir: 'ltr' },
  no: { name: 'Norsk', flag: '🇳🇴', dir: 'ltr' },
  da: { name: 'Dansk', flag: '🇩🇰', dir: 'ltr' },
  fi: { name: 'Suomi', flag: '🇫🇮', dir: 'ltr' },
  el: { name: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr' },
  he: { name: 'עברית', flag: '🇮🇱', dir: 'rtl' },
  id: { name: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  ms: { name: 'Bahasa Melayu', flag: '🇲🇾', dir: 'ltr' },
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

export const defaultLanguage: LanguageCode = 'en';

export function getLanguageFromURL(pathname: string): LanguageCode {
  const langMatch = pathname.match(/^\/([a-z]{2})\//);
  const lang = langMatch ? langMatch[1] : defaultLanguage;
  return (lang in LANGUAGES ? lang : defaultLanguage) as LanguageCode;
}

export function getLocalizedPath(path: string, lang: string): string {
  const cleanPath = path.replace(/^\/[a-z]{2}\//, '/');
  if (lang === defaultLanguage) return cleanPath;
  return `/${lang}${cleanPath}`;
}

export function getAllLanguageVariants(
  path: string,
  baseUrl: string,
  enabledLanguages: LanguageCode[] = Object.keys(LANGUAGES) as LanguageCode[]
): Record<string, string> {
  const variants: Record<string, string> = {};
  const cleanPath = path.replace(/^\/[a-z]{2}\//, '/');
  
  enabledLanguages.forEach(lang => {
    const localizedPath = lang === defaultLanguage ? cleanPath : `/${lang}${cleanPath}`;
    variants[lang] = `${baseUrl}${localizedPath}`;
  });
  
  return variants;
}

export function getLanguageInfo(lang: LanguageCode) {
  return LANGUAGES[lang] || LANGUAGES[defaultLanguage];
}

export function isRTL(lang: LanguageCode): boolean {
  return LANGUAGES[lang]?.dir === 'rtl';
}

export const UI_TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    home: 'Home',
    pricing: 'Pricing',
    features: 'Features',
    faq: 'FAQ',
    blog: 'Blog',
    contact: 'Contact',
    about: 'About',
    getStarted: 'Get Started',
    subscribe: 'Subscribe Now',
    learnMore: 'Learn More',
    readMore: 'Read More',
    viewAll: 'View All',
    liveChannels: 'Live Channels',
    moviesAndSeries: 'Movies & Series',
    uptime: 'Uptime',
    support: 'Support',
    mostPopular: 'Most Popular',
    perMonth: '/month',
    perYear: '/year',
  },
  es: {
    home: 'Inicio',
    pricing: 'Precios',
    features: 'Características',
    faq: 'Preguntas Frecuentes',
    blog: 'Blog',
    contact: 'Contacto',
    about: 'Nosotros',
    getStarted: 'Comenzar',
    subscribe: 'Suscribirse Ahora',
    learnMore: 'Saber Más',
    readMore: 'Leer Más',
    viewAll: 'Ver Todo',
    liveChannels: 'Canales en Vivo',
    moviesAndSeries: 'Películas y Series',
    uptime: 'Disponibilidad',
    support: 'Soporte',
    mostPopular: 'Más Popular',
    perMonth: '/mes',
    perYear: '/año',
  },
  fr: {
    home: 'Accueil',
    pricing: 'Tarifs',
    features: 'Fonctionnalités',
    faq: 'FAQ',
    blog: 'Blog',
    contact: 'Contact',
    about: 'À Propos',
    getStarted: 'Commencer',
    subscribe: 'S\'abonner',
    learnMore: 'En Savoir Plus',
    readMore: 'Lire Plus',
    viewAll: 'Voir Tout',
    liveChannels: 'Chaînes en Direct',
    moviesAndSeries: 'Films et Séries',
    uptime: 'Disponibilité',
    support: 'Support',
    mostPopular: 'Le Plus Populaire',
    perMonth: '/mois',
    perYear: '/an',
  },
  de: {
    home: 'Startseite',
    pricing: 'Preise',
    features: 'Funktionen',
    faq: 'FAQ',
    blog: 'Blog',
    contact: 'Kontakt',
    about: 'Über Uns',
    getStarted: 'Loslegen',
    subscribe: 'Jetzt Abonnieren',
    learnMore: 'Mehr Erfahren',
    readMore: 'Weiterlesen',
    viewAll: 'Alle Anzeigen',
    liveChannels: 'Live-Kanäle',
    moviesAndSeries: 'Filme und Serien',
    uptime: 'Verfügbarkeit',
    support: 'Support',
    mostPopular: 'Am Beliebtesten',
    perMonth: '/Monat',
    perYear: '/Jahr',
  },
  it: { home: 'Home', pricing: 'Prezzi', features: 'Funzionalità', faq: 'FAQ', blog: 'Blog', contact: 'Contatti', about: 'Chi Siamo', getStarted: 'Inizia', subscribe: 'Abbonati Ora', learnMore: 'Scopri di Più', readMore: 'Leggi di Più', viewAll: 'Vedi Tutto', liveChannels: 'Canali Live', moviesAndSeries: 'Film e Serie', uptime: 'Uptime', support: 'Supporto', mostPopular: 'Più Popolare', perMonth: '/mese', perYear: '/anno' },
  pt: { home: 'Início', pricing: 'Preços', features: 'Recursos', faq: 'FAQ', blog: 'Blog', contact: 'Contato', about: 'Sobre', getStarted: 'Começar', subscribe: 'Assinar Agora', learnMore: 'Saiba Mais', readMore: 'Leia Mais', viewAll: 'Ver Tudo', liveChannels: 'Canais ao Vivo', moviesAndSeries: 'Filmes e Séries', uptime: 'Uptime', support: 'Suporte', mostPopular: 'Mais Popular', perMonth: '/mês', perYear: '/ano' },
  nl: { home: 'Home', pricing: 'Prijzen', features: 'Functies', faq: 'FAQ', blog: 'Blog', contact: 'Contact', about: 'Over Ons', getStarted: 'Aan de Slag', subscribe: 'Nu Abonneren', learnMore: 'Meer Info', readMore: 'Lees Meer', viewAll: 'Bekijk Alles', liveChannels: 'Live Kanalen', moviesAndSeries: 'Films en Series', uptime: 'Uptime', support: 'Ondersteuning', mostPopular: 'Meest Populair', perMonth: '/maand', perYear: '/jaar' },
  pl: { home: 'Strona Główna', pricing: 'Cennik', features: 'Funkcje', faq: 'FAQ', blog: 'Blog', contact: 'Kontakt', about: 'O Nas', getStarted: 'Rozpocznij', subscribe: 'Subskrybuj', learnMore: 'Dowiedz się Więcej', readMore: 'Czytaj Więcej', viewAll: 'Zobacz Wszystko', liveChannels: 'Kanały na Żywo', moviesAndSeries: 'Filmy i Seriale', uptime: 'Uptime', support: 'Wsparcie', mostPopular: 'Najpopularniejszy', perMonth: '/miesiąc', perYear: '/rok' },
  ru: { home: 'Главная', pricing: 'Цены', features: 'Функции', faq: 'FAQ', blog: 'Блог', contact: 'Контакты', about: 'О Нас', getStarted: 'Начать', subscribe: 'Подписаться', learnMore: 'Узнать Больше', readMore: 'Читать Далее', viewAll: 'Смотреть Все', liveChannels: 'Прямые Каналы', moviesAndSeries: 'Фильмы и Сериалы', uptime: 'Доступность', support: 'Поддержка', mostPopular: 'Самый Популярный', perMonth: '/месяц', perYear: '/год' },
  ar: { home: 'الرئيسية', pricing: 'الأسعار', features: 'المميزات', faq: 'الأسئلة الشائعة', blog: 'المدونة', contact: 'اتصل بنا', about: 'من نحن', getStarted: 'ابدأ الآن', subscribe: 'اشترك الآن', learnMore: 'اعرف المزيد', readMore: 'اقرأ المزيد', viewAll: 'عرض الكل', liveChannels: 'قنوات مباشرة', moviesAndSeries: 'أفلام ومسلسلات', uptime: 'وقت التشغيل', support: 'الدعم', mostPopular: 'الأكثر شعبية', perMonth: '/شهر', perYear: '/سنة' },
  zh: { home: '首页', pricing: '价格', features: '功能', faq: '常见问题', blog: '博客', contact: '联系我们', about: '关于我们', getStarted: '开始使用', subscribe: '立即订阅', learnMore: '了解更多', readMore: '阅读更多', viewAll: '查看全部', liveChannels: '直播频道', moviesAndSeries: '电影和剧集', uptime: '在线时间', support: '支持', mostPopular: '最受欢迎', perMonth: '/月', perYear: '/年' },
  ja: { home: 'ホーム', pricing: '料金', features: '機能', faq: 'よくある質問', blog: 'ブログ', contact: 'お問い合わせ', about: '会社概要', getStarted: '始める', subscribe: '今すぐ購読', learnMore: '詳しく見る', readMore: '続きを読む', viewAll: 'すべて見る', liveChannels: 'ライブチャンネル', moviesAndSeries: '映画とシリーズ', uptime: '稼働時間', support: 'サポート', mostPopular: '一番人気', perMonth: '/月', perYear: '/年' },
  ko: { home: '홈', pricing: '가격', features: '기능', faq: 'FAQ', blog: '블로그', contact: '연락처', about: '소개', getStarted: '시작하기', subscribe: '지금 구독', learnMore: '더 알아보기', readMore: '더 읽기', viewAll: '모두 보기', liveChannels: '라이브 채널', moviesAndSeries: '영화와 시리즈', uptime: '가동시간', support: '지원', mostPopular: '가장 인기', perMonth: '/월', perYear: '/년' },
  hi: { home: 'होम', pricing: 'मूल्य', features: 'विशेषताएं', faq: 'FAQ', blog: 'ब्लॉग', contact: 'संपर्क', about: 'हमारे बारे में', getStarted: 'शुरू करें', subscribe: 'अभी सदस्यता लें', learnMore: 'और जानें', readMore: 'और पढ़ें', viewAll: 'सभी देखें', liveChannels: 'लाइव चैनल', moviesAndSeries: 'फिल्में और सीरीज', uptime: 'अपटाइम', support: 'सहायता', mostPopular: 'सबसे लोकप्रिय', perMonth: '/माह', perYear: '/वर्ष' },
  tr: { home: 'Ana Sayfa', pricing: 'Fiyatlar', features: 'Özellikler', faq: 'SSS', blog: 'Blog', contact: 'İletişim', about: 'Hakkımızda', getStarted: 'Başla', subscribe: 'Şimdi Abone Ol', learnMore: 'Daha Fazla', readMore: 'Devamını Oku', viewAll: 'Tümünü Gör', liveChannels: 'Canlı Kanallar', moviesAndSeries: 'Film ve Diziler', uptime: 'Çalışma Süresi', support: 'Destek', mostPopular: 'En Popüler', perMonth: '/ay', perYear: '/yıl' },
  vi: { home: 'Trang Chủ', pricing: 'Bảng Giá', features: 'Tính Năng', faq: 'FAQ', blog: 'Blog', contact: 'Liên Hệ', about: 'Về Chúng Tôi', getStarted: 'Bắt Đầu', subscribe: 'Đăng Ký Ngay', learnMore: 'Tìm Hiểu Thêm', readMore: 'Đọc Thêm', viewAll: 'Xem Tất Cả', liveChannels: 'Kênh Trực Tiếp', moviesAndSeries: 'Phim và Series', uptime: 'Uptime', support: 'Hỗ Trợ', mostPopular: 'Phổ Biến Nhất', perMonth: '/tháng', perYear: '/năm' },
  th: { home: 'หน้าแรก', pricing: 'ราคา', features: 'คุณสมบัติ', faq: 'คำถามที่พบบ่อย', blog: 'บล็อก', contact: 'ติดต่อ', about: 'เกี่ยวกับเรา', getStarted: 'เริ่มต้น', subscribe: 'สมัครสมาชิก', learnMore: 'เรียนรู้เพิ่มเติม', readMore: 'อ่านเพิ่มเติม', viewAll: 'ดูทั้งหมด', liveChannels: 'ช่องถ่ายทอดสด', moviesAndSeries: 'หนังและซีรีส์', uptime: 'เวลาทำงาน', support: 'ฝ่ายสนับสนุน', mostPopular: 'ยอดนิยม', perMonth: '/เดือน', perYear: '/ปี' },
  sv: { home: 'Hem', pricing: 'Priser', features: 'Funktioner', faq: 'FAQ', blog: 'Blogg', contact: 'Kontakt', about: 'Om Oss', getStarted: 'Kom Igång', subscribe: 'Prenumerera Nu', learnMore: 'Läs Mer', readMore: 'Läs Mer', viewAll: 'Visa Alla', liveChannels: 'Livekanaler', moviesAndSeries: 'Filmer och Serier', uptime: 'Drifttid', support: 'Support', mostPopular: 'Mest Populär', perMonth: '/månad', perYear: '/år' },
  no: { home: 'Hjem', pricing: 'Priser', features: 'Funksjoner', faq: 'FAQ', blog: 'Blogg', contact: 'Kontakt', about: 'Om Oss', getStarted: 'Kom i Gang', subscribe: 'Abonner Nå', learnMore: 'Les Mer', readMore: 'Les Mer', viewAll: 'Se Alle', liveChannels: 'Livekanaler', moviesAndSeries: 'Filmer og Serier', uptime: 'Oppetid', support: 'Støtte', mostPopular: 'Mest Populær', perMonth: '/måned', perYear: '/år' },
  da: { home: 'Hjem', pricing: 'Priser', features: 'Funktioner', faq: 'FAQ', blog: 'Blog', contact: 'Kontakt', about: 'Om Os', getStarted: 'Kom i Gang', subscribe: 'Tilmeld Dig Nu', learnMore: 'Læs Mere', readMore: 'Læs Mere', viewAll: 'Se Alle', liveChannels: 'Live Kanaler', moviesAndSeries: 'Film og Serier', uptime: 'Oppetid', support: 'Support', mostPopular: 'Mest Populær', perMonth: '/måned', perYear: '/år' },
  fi: { home: 'Etusivu', pricing: 'Hinnat', features: 'Ominaisuudet', faq: 'UKK', blog: 'Blogi', contact: 'Yhteystiedot', about: 'Tietoa Meistä', getStarted: 'Aloita', subscribe: 'Tilaa Nyt', learnMore: 'Lue Lisää', readMore: 'Lue Lisää', viewAll: 'Näytä Kaikki', liveChannels: 'Live-kanavat', moviesAndSeries: 'Elokuvat ja Sarjat', uptime: 'Käytettävyys', support: 'Tuki', mostPopular: 'Suosituin', perMonth: '/kk', perYear: '/vuosi' },
  el: { home: 'Αρχική', pricing: 'Τιμές', features: 'Χαρακτηριστικά', faq: 'FAQ', blog: 'Blog', contact: 'Επικοινωνία', about: 'Σχετικά', getStarted: 'Ξεκινήστε', subscribe: 'Εγγραφή', learnMore: 'Μάθετε Περισσότερα', readMore: 'Διαβάστε Περισσότερα', viewAll: 'Δείτε Όλα', liveChannels: 'Ζωντανά Κανάλια', moviesAndSeries: 'Ταινίες και Σειρές', uptime: 'Διαθεσιμότητα', support: 'Υποστήριξη', mostPopular: 'Πιο Δημοφιλές', perMonth: '/μήνα', perYear: '/έτος' },
  he: { home: 'בית', pricing: 'מחירים', features: 'תכונות', faq: 'שאלות נפוצות', blog: 'בלוג', contact: 'צור קשר', about: 'אודות', getStarted: 'התחל', subscribe: 'הרשם עכשיו', learnMore: 'למד עוד', readMore: 'קרא עוד', viewAll: 'הצג הכל', liveChannels: 'ערוצים חיים', moviesAndSeries: 'סרטים וסדרות', uptime: 'זמן פעילות', support: 'תמיכה', mostPopular: 'הכי פופולרי', perMonth: '/חודש', perYear: '/שנה' },
  id: { home: 'Beranda', pricing: 'Harga', features: 'Fitur', faq: 'FAQ', blog: 'Blog', contact: 'Kontak', about: 'Tentang Kami', getStarted: 'Mulai', subscribe: 'Langganan Sekarang', learnMore: 'Pelajari Lebih Lanjut', readMore: 'Baca Selengkapnya', viewAll: 'Lihat Semua', liveChannels: 'Saluran Langsung', moviesAndSeries: 'Film dan Serial', uptime: 'Uptime', support: 'Dukungan', mostPopular: 'Paling Populer', perMonth: '/bulan', perYear: '/tahun' },
  ms: { home: 'Laman Utama', pricing: 'Harga', features: 'Ciri-ciri', faq: 'FAQ', blog: 'Blog', contact: 'Hubungi', about: 'Tentang Kami', getStarted: 'Mula', subscribe: 'Langgan Sekarang', learnMore: 'Ketahui Lebih Lanjut', readMore: 'Baca Lagi', viewAll: 'Lihat Semua', liveChannels: 'Saluran Langsung', moviesAndSeries: 'Filem dan Siri', uptime: 'Uptime', support: 'Sokongan', mostPopular: 'Paling Popular', perMonth: '/bulan', perYear: '/tahun' },
};

export function t(key: string, lang: LanguageCode = 'en'): string {
  return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS.en[key] || key;
}
