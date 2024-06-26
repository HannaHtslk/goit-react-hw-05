import { TbFaceIdError } from 'react-icons/tb';
import s from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <TbFaceIdError className={s.icon} size="100" />
        <h1 className={s.title}>Oops, such page does not exist</h1>
        <Link className={s.link} to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
