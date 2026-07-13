import { useLanguage } from '../i18n/LanguageContext';

function Filters({ orientation, setOrientation, color, setColor, orderBy, setOrderBy }) {
  const { t } = useLanguage();

  return (
    <div className="filters">
      <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
        <option value="">{t.anyOrientation}</option>
        <option value="landscape">{t.landscape}</option>
        <option value="portrait">{t.portrait}</option>
        <option value="squarish">{t.squarish}</option>
      </select>

      <select value={color} onChange={(e) => setColor(e.target.value)}>
        <option value="">{t.anyColor}</option>
        <option value="black_and_white">{t.blackAndWhite}</option>
        <option value="red">{t.red}</option>
        <option value="blue">{t.blue}</option>
        <option value="green">{t.green}</option>
        <option value="yellow">{t.yellow}</option>
      </select>

      <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
        <option value="relevant">{t.relevant}</option>
        <option value="latest">{t.latest}</option>
      </select>
    </div>
  );
}

export default Filters;