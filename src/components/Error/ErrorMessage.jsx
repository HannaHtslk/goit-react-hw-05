import s from './ErrorMessage.module.css';
import { GrHostMaintenance } from 'react-icons/gr';

const ErrorMessage = () => {
  return (
    <div className={s.wrapper}>
      <GrHostMaintenance className={s.icon} size="100" />
      <p className={s.text}>Oops, something went wrong</p>
    </div>
  );
};

export default ErrorMessage;
