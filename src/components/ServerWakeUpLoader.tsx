import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import {useDispatch} from "react-redux";
import {wakeUpServerRequest} from "../store/slices/serverSlice";

const RETRY_INTERVAL = 60; // seconds

const ServerWakeUpLoader: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(RETRY_INTERVAL);
  const dispatch = useDispatch()

  useEffect(() => {
    setSecondsLeft(RETRY_INTERVAL);
    dispatch(wakeUpServerRequest())
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : RETRY_INTERVAL));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <CircularProgress />
      <Typography mt={2} variant="h6">Waking up server, please wait...</Typography>
      <Typography mt={1} color="text.secondary">
        Retrying in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...
      </Typography>
    </Box>
  );
};

export default ServerWakeUpLoader;
