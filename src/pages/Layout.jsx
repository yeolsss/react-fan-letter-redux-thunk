import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../shared/Header';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../redux/config/module/login.slice';
import { selectError } from '../redux/config/module/error.slice';
import { useEffect } from 'react';

function Layout() {
  const { isHome } = useSelector(selectError);
  const navigate = useNavigate();
  useEffect(() => {
    if (isHome) {
      navigate('/login');
    }
  }, [isHome]);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
