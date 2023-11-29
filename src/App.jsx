import { Router } from './shared/Router';
import { StContainer } from './styles/Container';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectError } from './redux/config/module/error.slice.js';
import { useEffect } from 'react';

function App() {
  const errorData = useSelector(selectError);
  console.log(errorData);

  useEffect(() => {
    if (errorData.isError) {
      toast.error(`${errorData.errorMessage}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [errorData]);

  return (
    <StContainer>
      <Router />
      <ToastContainer />
    </StContainer>
  );
}

export default App;
