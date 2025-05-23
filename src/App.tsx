import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {CssBaseline, Container, Box, CircularProgress, Typography} from '@mui/material';
import { store } from './store';
import { LoginForm } from './components/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import RoundsList from './components/RoundsList';
import RoundDetails from './components/RoundDetails';
import { useDispatch, useSelector } from 'react-redux';
import ServerWakeUpLoader from './components/ServerWakeUpLoader';
import React, { useEffect } from 'react';
import { restoreSessionRequest } from './store/slices/authSlice';
import {useTypedSelector} from "./store/hooks";

const AppContent = () => {
  const serverStatus = useTypedSelector((state) => state.server?.status || 'unknown');
  const loadingRestoreSession = useTypedSelector((state) => state.auth.loadingRestoreSession);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreSessionRequest());
  }, [dispatch]);

  if (serverStatus === 'waking' || serverStatus === 'unknown') {
    return <ServerWakeUpLoader />;
  }

  if (loadingRestoreSession) {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <CircularProgress />
            <Typography mt={2} variant="h6">Waking up server, please wait...</Typography>
            <Typography mt={1} color="text.secondary">
               Restoring session...
            </Typography>
        </Box>
    );
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
