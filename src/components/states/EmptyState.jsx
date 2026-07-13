import { useLanguage } from '../../i18n/LanguageContext';

function EmptyState({ query, onClearFilters }) {
  const { t } = useLanguage();

  return (
    <div className="empty-state">
      <h2 className="state__title">{t.emptyTitle}</h2>
      <p className="state__text">{t.emptyText} "{query}".</p>
      <button className="state__action" onClick={onClearFilters}>{t.clearFilters}</button>
    </div>
  );
}

export default EmptyState;