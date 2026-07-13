import { useLanguage } from '../i18n/LanguageContext';

function LanguageSwitch() {
  const { lang, changeLang } = useLanguage();

  return (
    <div className="lang-toggle">
      <button
        className={`lang-toggle__btn ${lang === 'bg' ? 'lang-toggle__btn--active' : ''}`}
        onClick={() => changeLang('bg')}
      >
        BG
      </button>
      <button
        className={`lang-toggle__btn ${lang === 'en' ? 'lang-toggle__btn--active' : ''}`}
        onClick={() => changeLang('en')}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitch;