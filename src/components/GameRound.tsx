import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Button, CircularProgress } from '@mui/material';
import type { RootState } from '../store';
import { GooseArt } from './GooseArt';
import { tapRequest, setCurrentRound, clearCurrentRound } from '../store/slices/roundsSlice';
import { apiClient, API_ENDPOINTS } from '../config/api';
import type { Round } from '../store/slices/roundsSlice';

export const GameRound = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { currentRound, loading } = useSelector((state: RootState) => state.rounds);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const fetchRound = async () => {
      try {
        const response = await apiClient.get<Round>(API_ENDPOINTS.rounds.get(id!));
        dispatch(setCurrentRound(response.data));
      } catch (error) {
        console.error('Failed to fetch round:', error);
        navigate('/game');
      }
    };

    if (id) {
      fetchRound();
    }

    return () => {
      dispatch(clearCurrentRound());
    };
  }, [id, dispatch, navigate]);

  useEffect(() => {
    if (!currentRound) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const end = new Date(currentRound.endTime).getTime();
      const start = new Date(currentRound.startTime).getTime();
      
      let targetTime: number;
      if (currentRound.status === 'cooldown') {
        targetTime = start;
      } else if (currentRound.status === 'active') {
        targetTime = end;
      } else {
        return;
      }

      const diff = Math.max(0, targetTime - now);
      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [currentRound]);

  const handleTap = () => {
    if (currentRound && currentRound.status === 'active') {
      dispatch(tapRequest(currentRound.id));
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!currentRound) return null;

  return (
    <Card sx={{ maxWidth: 400, margin: '0 auto' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {currentRound.status === 'cooldown' ? 'Cooldown' : 
             currentRound.status === 'active' ? 'Round Active' : 
             'Round Finished'}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate('/game')}
          >
            Back to Rounds
          </Button>
        </Box>

        <Box 
          onClick={currentRound.status === 'active' ? handleTap : undefined}
          sx={{ 
            cursor: currentRound.status === 'active' ? 'pointer' : 'default',
            '&:active': currentRound.status === 'active' ? {
              transform: 'scale(0.98)'
            } : {}
          }}
        >
          <GooseArt />
        </Box>

        {currentRound.status !== 'finished' && (
          <Typography variant="h6" align="center" gutterBottom>
            {currentRound.status === 'cooldown' ? 'Round starts in: ' : 'Time left: '}
            {timeLeft}
          </Typography>
        )}

        <Typography variant="h6" align="center">
          My Score: {currentRound.myScore || 0}
        </Typography>

        {currentRound.status === 'finished' && currentRound.winner && (
          <>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>
              Total Score: {currentRound.totalScore}
            </Typography>
            <Typography variant="h6" align="center">
              Winner: {currentRound.winner.username} - {currentRound.winner.score}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}; 