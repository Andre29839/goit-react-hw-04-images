import css from './Loader.module.css';
import { RingLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <div className={css.loader}>
      <RingLoader color="#ff00a6" />
    </div>
  );
};
