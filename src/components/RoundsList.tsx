import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  CircularProgress,
  styled,
  IconButton,
  Tooltip,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';
import { fetchRoundsRequest, createRoundRequest } from '../store/slices/roundsSlice';
import { formatLocalDateTime } from '../utils/dateFormat';
import {useTypedSelector} from "../store/hooks";
import {logout, logoutActionSaga} from "../store/slices/authSlice";

const RoundCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const StatusText = styled(Typography)<{ status: 'active' | 'cooldown' | 'finished' }>(
  ({ theme, status }) => ({
    color:
      status === 'active'
        ? theme.palette.success.main
        : status === 'cooldown'
        ? theme.palette.warning.main
        : theme.palette.text.secondary,
  })
);

const RoundsList: React.FC = () => {
  const dispatch = useDispatch();
  const { rounds = [], loading, error } = useTypedSelector((state) => state.rounds);
  const { user } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchRoundsRequest());
  }, [dispatch]);

  const handleCreateRound = () => {
    dispatch(createRoundRequest());
  };

  const handleRefresh = () => {
    dispatch(fetchRoundsRequest());
  };

  const handleLogout = () => {
    dispatch(logoutActionSaga());
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexShrink: 0
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" component="h1">
              Список РАУНДОВ
            </Typography>
            <Tooltip title="Обновить список">
              <IconButton
                onClick={handleRefresh}
                disabled={loading}
                sx={{
                  animation: loading ? 'spin 1s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': {
                      transform: 'rotate(0deg)',
                    },
                    '100%': {
                      transform: 'rotate(360deg)',
                    },
                  },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" component="div">
              {user?.username}
            </Typography>
            <Tooltip title="Выйти">
              <IconButton onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {user?.role === 'admin' && !loading && (
          <Box sx={{ mb: 3, flexShrink: 0 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateRound}
            >
              Создать раунд
            </Button>
          </Box>
        )}

        <Box sx={{ flex: 1 }}>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px'
              }}
            >
              <CircularProgress size={60} />
            </Box>
          ) : error ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px'
              }}
            >
              <Typography color="error">{error}</Typography>
            </Box>
          ) : rounds.length === 0 ? (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
              No rounds available
            </Typography>
          ) : (
            rounds.map((round) => (
              <RoundCard key={round.id}>
                <CardContent>
                  <Box component={Link} to={`/rounds/${round.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      ● Round ID: {round.id}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Start: {formatLocalDateTime(round.startAt)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      End: {formatLocalDateTime(round.endAt)}
                    </Typography>
                    <Box sx={{ mt: 2, borderTop: 1, borderColor: 'divider', pt: 2 }}>
                      <StatusText variant="body1" status={round.status || 'finished'}>
                        Статус: {round.status === 'active' ? 'Активен' : round.status === 'cooldown' ? 'Cooldown' : 'Завершен'}
                      </StatusText>
                    </Box>
                  </Box>
                </CardContent>
              </RoundCard>
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default RoundsList;
