import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const MovieItem = ({ 
  title, 
  releaseDate, 
  posterUrl, 
  id,
  className 
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    // Increased margin here for spacing between cards
    <Card
      className={`transition-all duration-300 ${className}`}
      sx={{
        width: 250,
        height: 'auto',
        borderRadius: 3,
        backgroundColor: 'background.paper',
        margin: 4, // Increased from 2 to 4 for more space between cards
        ':hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <CardMedia
        component="img"
        height="340"
        image={posterUrl}
        alt={title}
        sx={{
          objectFit: 'cover',
        }}
      />
      
      <CardContent className="space-y-2">
        <Typography 
          variant="h6" 
          component="h2"
          sx={{
            fontWeight: 600,
            minHeight: '3.6em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
          <CalendarTodayIcon sx={{ fontSize: 16 }} />
          {/* Increased fontWeight here for the date */}
          <Typography 
            variant="body2" 
            sx={{
              fontWeight: 600  // Increased from default to 600
            }}
          >
            {formatDate(releaseDate)}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ padding: 2 }}>
        <Button
          component={Link}
          to={`/booking/${id}`}
          variant="contained"
          fullWidth
          size="large"
          sx={{
            backgroundColor: 'primary.main',
            textTransform: 'capitalize',
            ':hover': {
              backgroundColor: 'primary.dark',
            },
            borderRadius: 2,
            py: 1.5,
          }}
        >
          Book Tickets
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;