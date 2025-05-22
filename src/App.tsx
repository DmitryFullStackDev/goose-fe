import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import { store } from './store';
import { LoginForm } from './components/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import RoundsList from './components/RoundsList';
import RoundDetails from './components/RoundDetails';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreSession } from './store/slices/authSlice';
import ServerWakeUpLoader from './components/ServerWakeUpLoader';

const AppContent = () => {
  const dispatch = useDispatch();
  const serverStatus = useSelector((state: any) => state.server?.status || 'unknown');

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (serverStatus === 'waking' || serverStatus === 'unknown') {
    return <ServerWakeUpLoader />;
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <Box
        display="flex"
        minHeight="100vh"
        alignItems="center"
        justifyContent="center"
        width='100%'
        sx={{ py: 4 }}
      >
        <Container style={{display: "flex", justifyContent: 'center'}}>
            <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/rounds" element={<RoundsList />} />
              <Route path="/rounds/:roundId" element={<RoundDetails />} />
            </Route>
            <Route path="/" element={<Navigate to="/rounds" replace />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
