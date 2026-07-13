import { useLanguage } from '../../i18n/LanguageContext';

function ErrorState({ message, onRetry }) {
  const { t } = useLanguage();

  return (
    <div className="error-state">
      <h2 className="state__title">{t.errorTitle}</h2>
      <p className="state__text">{message}</p>
      <button className="state__action" onClick={onRetry}>{t.tryAgain}</button>
    </div>
  );
}

export default ErrorState;