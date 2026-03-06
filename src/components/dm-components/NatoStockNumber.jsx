// src/components/NatoStockNumber.jsx
import styles from '../../utils/styleMap.json';
function NatoStockNumber(props) {
  const nsn = `${props.natoSupplyClass}-${props.natoCodificationBureau}-${props.natoItemIdentNumberCore}`;
  return <div className={styles['CatalogNsn']}>NSN: {nsn}</div>;
}
NatoStockNumber.componentType = 'NatoStockNumber';
export default NatoStockNumber;