import useTranslation from 'next-translate/useTranslation';
import styles from '../styles/countTiles.module.scss';

const CountTile = (props) => {
  const { t } = useTranslation();
  const { count, label, url, handleClick, selected } = props;

  const countStyle = selected
    ? ` ${styles.requestCountCircleSelected} ${styles.requestCountTiles}`
    : ` ${styles.requestCountCircle} ${styles.requestCountTiles}`;
  const countLabel = selected ? styles.requestCountlabelSelected : styles.requestCountlabel;
  return (
    <div onClick={() => handleClick(label)} className={styles.requestCountTiles}>
      <div className={countStyle}>
        <a className={styles.requestCountLink}>
          <div className={styles.requestTileCount}> {count} </div>
        </a>
      </div>
      <div className={countLabel}>{t(`common:${label}`)}</div>
    </div>
  );
};
export default CountTile;
