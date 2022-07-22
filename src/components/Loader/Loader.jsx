import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Loader.module.css';

import { Rings } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Rings color="#00BFFF" height={40} width={40} />
    </div>
  );
};

export default Loader;
