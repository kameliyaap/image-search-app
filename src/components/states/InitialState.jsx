import { useLanguage } from '../../i18n/LanguageContext';
import SearchBar from '../SearchBar';

function InitialState({ query, setQuery, onSubmit, onCategoryClick }) {
  const { t } = useLanguage();

  return (
    <div className="hero">
      <h1 className="hero__title">{t.initialTitle}</h1>
      <p className="hero__subtitle">{t.initialText}</p>

      <div className="hero__search">
        <SearchBar query={query} setQuery={setQuery} onSubmit={onSubmit} />
      </div>

      <div className="category-chips">
        {t.categories.map((cat) => (
          <button className="category-chip" key={cat} onClick={() => onCategoryClick(cat)}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default InitialState;