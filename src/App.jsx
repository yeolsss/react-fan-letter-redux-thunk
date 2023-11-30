import { Router } from './shared/Router';
import { StContainer, StSpinnersWrapper } from './styles/Container.js';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectError } from './redux/config/module/error.slice.js';
import { useEffect } from 'react';
import { selectSuccess } from './redux/config/module/success.slice.js';
import 'react-toastify/ReactToastify.min.css';
import { SyncLoader } from 'react-spinners';
import { selectorLoading } from './redux/config/module/loading.slice.js';

function App() {
  const errorData = useSelector(selectError);
  const successData = useSelector(selectSuccess);
  const { isLoadingModal } = useSelector(selectorLoading);
  console.log(isLoadingModal);

  useEffect(() => {
    if (successData.isSuccess) {
      toast.success(`${successData.successMessage}`, {
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
  }, [successData]);

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

      <StSpinnersWrapper $isVisible={isLoadingModal}>
        <SyncLoader />
      </StSpinnersWrapper>
    </StContainer>
  );
}

export default App;
