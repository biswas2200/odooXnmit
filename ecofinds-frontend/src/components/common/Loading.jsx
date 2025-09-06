import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Loading...', size = 40 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        py: 4
      }}
    >
      <CircularProgress size={size} sx={{ color: '#2e7d32', mb: 2 }} />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
