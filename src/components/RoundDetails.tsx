import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  styled,
  Divider,
  Button,
} from '@mui/material';
import { fetchRoundDetailsRequest, clearRoundDetails, tapRequest } from '../store/slices/roundsSlice';
import { useTypedSelector } from '../store/hooks';
import { GooseArt } from './GooseArt';

enum CounterStatusEnum {
  pending,
  cooldown,
  active,
  finished
}

const BorderBox = styled(Box)`
  border: 1px solid ${props => props.theme.palette.divider};
  border-radius: ${props => props.theme.shape.borderRadius}px;
  padding: ${props => props.theme.spacing(3)};
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing(2)};
`;

const StatusText = styled(Typography)<{ status: CounterStatusEnum }>(
  ({ theme, status }) => ({
    textAlign: 'center',
    marginTop: theme.spacing(2),
    color:
      status === CounterStatusEnum.active
        ? theme.palette.success.main
        : status === CounterStatusEnum.cooldown
        ? theme.palette.warning.main
        : theme.palette.text.secondary,
  })
);

const TimeText = styled(Typography)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing(2)};
`;

const StatsBox = styled(Box)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(4)};
  align-items: baseline;
  margin-top: ${props => props.theme.spacing(2)};
`;

const AnimatedGooseBox = styled(Box)<{ isactive: number }>`
  cursor: ${props => props.isactive ? 'pointer' : 'default'};
  transition: all 0.3s ease-in-out;
  transform-origin: center;
  
  ${props => props.isactive && `
    &:hover {
      transform: scale(1.02);
    }
    
    &:active {
      transform: scale(0.98);
      transition: all 0.1s ease-in-out;
    }
  `}

  @keyframes tap {
    0% { transform: scale(1); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); }
  };

  &.tapping {
    animation: tap 0.2s ease-in-out;
  }
`;

const PointsText = styled(Typography)`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: ${props => props.theme.spacing(2)} 0;
  transition: all 0.3s ease-in-out;

  &.points-updated {
    color: ${props => props.theme.palette.success.main};
    transform: scale(1.1);
  }
`;

const RoundDetails: React.FC = () => {
  const { roundId } = useParams<{ roundId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentRoundDetails: details, loading, error } = useTypedSelector((state) => state.rounds);
  const { user } = useTypedSelector((state) => state.auth);
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [counterStatus, setCounterStatus] = useState<CounterStatusEnum>(CounterStatusEnum.pending);
  const [isTapping, setIsTapping] = useState(false);

  useEffect(() => {
    if (roundId) {
      dispatch(fetchRoundDetailsRequest(Number(roundId)));
    }
  }, [dispatch, roundId]);

  useEffect(() => {
    if (details?.round?.endAt) {
      const now = Date.now();
      const endTime = new Date(details.round.endAt).getTime();

      if (now < endTime) {
        const timeUntilEnd = endTime - now;
        const timer = setTimeout(() => {
          dispatch(fetchRoundDetailsRequest(Number(roundId)));
        }, timeUntilEnd);

        return () => {
          clearTimeout(timer);
          dispatch(clearRoundDetails());
        };
      }
    }
  }, [dispatch, roundId, details?.round?.endAt]);

  useEffect(() => {
    if (details) {
      const updateTimer = () => {
        const now = Date.now();
        const start = new Date(details.round.startAt).getTime();
        const end = new Date(details.round.endAt).getTime();

        if (now < start) {
          const timeUntilStart = Math.ceil((start - now) / 1000);
          const hours = Math.floor(timeUntilStart / 3600);
          const minutes = Math.floor((timeUntilStart % 3600) / 60);
          const seconds = timeUntilStart % 60;

          const timeString = hours > 0
            ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
          setTimeLeft(timeString);
          setCounterStatus(CounterStatusEnum.cooldown);
        } else if (now >= start && now < end) {
          const timeUntilEnd = Math.ceil((end - now) / 1000);
          const minutes = Math.floor(timeUntilEnd / 60);
          const seconds = timeUntilEnd % 60;
          setTimeLeft(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
          setCounterStatus(CounterStatusEnum.active);
        } else {
          setTimeLeft('');
          setCounterStatus(CounterStatusEnum.finished);
        }
      };

      updateTimer();
      const timer = setInterval(updateTimer, 1000);
      return () => clearInterval(timer);
    }
  }, [details]);

  const handleBack = () => {
    navigate('/rounds');
  };

  const handleGooseTap = () => {
    if (isActive && roundId) {
      setIsTapping(true);
      dispatch(tapRequest(Number(roundId)));
      setTimeout(() => setIsTapping(false), 200);
    }
  };

  if (loading && !details) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} minHeight="400px" pt={4}>
        <Typography color="error">{error}</Typography>
        <Button variant="outlined" onClick={handleBack}>
          Back to Rounds
        </Button>
      </Box>
    );
  }

  if (!details) {
    return null;
  }

  const { round, winner, userPoints } = details;

  const getStatusText = () => {
    switch (counterStatus) {
      case CounterStatusEnum.active:
        return 'Раунд активен!';
      case CounterStatusEnum.cooldown:
        return 'Cooldown';
      case CounterStatusEnum.finished:
        return 'Раунд завершен';
    }
  };

  const isActive = counterStatus === CounterStatusEnum.active
  const isCooldown = counterStatus === CounterStatusEnum.cooldown
  const isFinished = counterStatus === CounterStatusEnum.finished

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
          ← Назад к списку раундов
        </Button>
      </Box>
      <BorderBox>
        <Header>
          <Typography variant="h5">
            {getStatusText()}
          </Typography>
          <Typography variant="h6">
            {user?.username}
          </Typography>
        </Header>

        <Divider sx={{ mb: 3 }} />

        <AnimatedGooseBox
          isactive={isActive ? 1 : 0}
          onClick={handleGooseTap}
          onTouchStart={handleGooseTap}
          className={isTapping ? 'tapping' : ''}
        >
          <GooseArt />
        </AnimatedGooseBox>

        <StatusText variant="h6" status={counterStatus}>
          {getStatusText()}
        </StatusText>

        {!isFinished && timeLeft && (
          <TimeText variant="h6">
            {isCooldown ? 'До начала раунда: ' : 'До конца осталось: '}
            {timeLeft}
          </TimeText>
        )}

        {!isFinished ? (
          <Typography variant="h6" align="center">
            Мои очки - {userPoints}
          </Typography>
        ) : (
          <>
            <Divider sx={{ my: 2 }} />
            <StatsBox>
              <Typography variant="body1">Всего</Typography>
              <Typography variant="body1" fontWeight="bold">{round.totalPoints}</Typography>

              {winner && (
                <>
                  <Typography variant="body1">Победитель - {winner.username}</Typography>
                  <Typography variant="body1" fontWeight="bold">{winner.score}</Typography>
                </>
              )}

              <Typography variant="body1">Мои очки</Typography>
              <Typography variant="body1" fontWeight="bold">{userPoints}</Typography>
            </StatsBox>
          </>
        )}
      </BorderBox>
    </Container>
  );
};

export default RoundDetails;
