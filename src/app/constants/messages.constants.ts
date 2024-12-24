export type LanguageTypes = 'ar' | 'en';
export type MessageKey = keyof typeof messages;

interface Language {
  ar: string;
  en: string;
}

interface Message {
  [x: string]: Language;
}

export const messages: Message = {
  NO_MOVIES_IN_DB: {
    ar: 'لا توجد أفلام في قاعدة البيانات',
    en: 'No Movies Found In Database',
  },
  NO_MOVIES: {
    ar: 'لا توجد أفلام',
    en: 'No Movies Found',
  },
  FILMS_DELETED: {
    ar: 'تم حذف الأفلام من قاعدة البيانات',
    en: 'Films Deleted From Database',
  },
  CONFIREM_DELETE_MOVIE: {
    ar: 'هل أنت متأكد أنك تريد حذف الأفلام المحددة؟',
    en: 'Are you sure you want to delete the selected films?',
  },
  CONFIREM: {
    ar: 'تأكيد',
    en: 'Confirm',
  },
  CONFIREM_ADD_MOVIE: {
    ar: 'هل أنت متأكد أنك تريد إضافة الأفلام المحددة؟',
    en: 'Are you sure you want to add the selected films?',
  },
  FILMS_SAVED: {
    ar: 'تم حفظ الأفلام في قاعدة البيانات',
    en: 'Films Saved In DB',
  },
  ACCESS_RESTRICTED: {
    ar: 'الوصول إلى هذه الصفحة مقيد',
    en: 'Access to this page is restricted',
  },
  CONTACT_ADMIN: {
    ar: 'يرجى التحقق مع المسؤول إذا كنت تعتقد أن هذا خطأ.',
    en: 'Please check with the admin if you believe this is a mistake.',
  },
  TYPE_OPTIONS: {
    ar: 'النوع (فيلم، مسلسل، حلقة)',
    en: 'Type (movie, series, episode)',
  },
  TYPE: {
    ar: 'النوع',
    en: 'Type',
  },
  SEARCH: {
    ar: 'بحث',
    en: 'Search',
  },
  TYPE_KEYWORD: {
    ar: 'اكتب كلمات للبحث',
    en: 'Type Keywords',
  },
  SELECT_YEAR: {
    ar: 'اختر سنة',
    en: 'Select Year',
  },
  ENTER_AT_LEAST_ONE_FIELD: {
    ar: 'يرجى إدخال حقل واحد على الأقل',
    en: 'Please Enter At Least One Field',
  },
  CLOSE: {
    ar: 'إغلاق',
    en: 'Close',
  },
  RATE_FILM: {
    ar: 'قيم الفيلم',
    en: 'Rate Film',
  },
  CANCEL: {
    ar: 'إلغاء',
    en: 'Cancel',
  },
  RATE_IT: {
    ar: 'قيمه',
    en: 'Rate It',
  },
  USERNAME: {
    ar: 'اسم المستخدم',
    en: 'Username',
  },
  PASSWORD: {
    ar: 'كلمة المرور',
    en: 'Password',
  },
  LOGIN: {
    ar: 'تسجيل الدخول',
    en: 'Login',
  },
  REGISTER: {
    ar: 'تسجيل',
    en: 'Register',
  },
  CONFIRM_PASSWORD: {
    ar: 'تأكيد كلمة المرور',
    en: 'Confirm Password',
  },
  ROLE: {
    ar: 'الدور',
    en: 'Role',
  },
  FILL_ALL_FIELDS: {
    ar: 'يرجى ملء جميع الحقول.',
    en: 'Please fill out all fields.',
  },
  PASSWORD_MISMATCH: {
    ar: 'كلمة المرور وتأكيد كلمة المرور غير متطابقين.',
    en: "Password and confirm password don't match.",
  },
  YEAR: {
    ar: 'السنة',
    en: 'Year',
  },
  RATED: {
    ar: 'التصنيف',
    en: 'Rated',
  },
  RELEASED: {
    ar: 'تاريخ الإصدار',
    en: 'Released',
  },
  RUNTIME: {
    ar: 'مدة العرض',
    en: 'Runtime',
  },
  GENRE: {
    ar: 'النوع',
    en: 'Genre',
  },
  DIRECTOR: {
    ar: 'المخرج',
    en: 'Director',
  },
  WRITER: {
    ar: 'الكاتب',
    en: 'Writer',
  },
  ACTORS: {
    ar: 'الممثلون',
    en: 'Actors',
  },
  PLOT: {
    ar: 'القصة',
    en: 'Plot',
  },
  LANGUAGE: {
    ar: 'اللغة',
    en: 'Language',
  },
  COUNTRY: {
    ar: 'البلد',
    en: 'Country',
  },
  AWARDS: {
    ar: 'الجوائز',
    en: 'Awards',
  },
  IMDB_RATING: {
    ar: 'IMDB تقييم',
    en: 'IMDB Rating',
  },
  BOX_OFFICE: {
    ar: 'شباك التذاكر',
    en: 'Box Office',
  },
  DEFAULT_USERNAME: {
    ar: 'اسم مستخدم افتراضي',
    en: 'Default User Name',
  },
  PAGE: {
    ar: 'الصفحة',
    en: 'Page',
  },
  PREVIOUS: {
    ar: 'السابق',
    en: 'Previous',
  },
  NEXT: {
    ar: 'التالي',
    en: 'Next',
  },
  CODE: {
    ar: 'الكود',
    en: 'Code',
  },
  TITLE: {
    ar: 'الاسم',
    en: 'Title',
  },
  POSTER: {
    ar: 'الإعلان',
    en: 'Poster',
  },
  LOGOUT: {
    ar: 'تسجيل الخروج',
    en: 'Logout',
  },
  AVG_RATING: {
    ar: 'متوسط التقييمات',
    en: 'Avg. Rating',
  },
  SETTING: {
    ar: 'أخرى',
    en: 'Setting',
  },
  YOU_RATE_THIS_FILM: {
    ar: 'أنت قيمت هذا الفيلم ',
    en: 'You rated this film ',
  },
  STARTS: {
    ar: 'نجوم',
    en: 'starts.',
  },
  SELECT_YOUR_RATING: {
    ar: 'نجوم',
    en: 'Select your rating.',
  },
  ENTER: {
    ar: 'ادخل',
    en: 'Enter',
  },
  ROLES: {
    ar: 'الادوار (مستخدم، إداري)',
    en: 'Roles (User, Admin)',
  },
  addToDb:{
    ar:'أضف إلى قاعدة البيانات',
    en:'Add To Database'
  },
  DELETE:{
    ar:'مسح',
    en:'Delete'
  },
  AddReview:{
    ar:'قيم الفيلم',
    en:'AddReview'
  },
  ShowDetails:{
    ar:'رؤية التفاصيل',
    en:'Show Details'
  },
  MUST_ENTER_KEYWORD:{
    ar:'برجاء إدخال كلمة للبحث',
    en:'Please Enter Keyword'
  },
};

