import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Detail from '../components/Detail';
import Layout from '../pages/Layout';
import { DETAIL_PATH } from '../common/util';
import SignUp from '../pages/SignUp.jsx';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route exact path="/" element={<Home />} />
        <Route exact path={DETAIL_PATH} element={<Detail />} />
      </Route>
      <Route exact path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);
