import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Detail from '../components/Detail';
import Layout from '../pages/Layout';
import { DETAIL_PATH } from '../common/util';
import { Auth } from '../pages/Auth.jsx';

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path={DETAIL_PATH} element={<Detail />} />
      </Route>

      <Route path="/signup" element={<Auth />} />
      <Route path="/login" element={<Auth />} />
    </Routes>
  </BrowserRouter>
);
