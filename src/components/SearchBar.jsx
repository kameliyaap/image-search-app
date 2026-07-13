import { useLanguage } from '../i18n/LanguageContext';

function SearchBar({ query, setQuery, onSubmit }) {
  const { t } = useLanguage();

  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder={t.searchPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-bar__submit" type="submit">{t.searchBtn}</button>
    </form>
  );
}

export default SearchBar;