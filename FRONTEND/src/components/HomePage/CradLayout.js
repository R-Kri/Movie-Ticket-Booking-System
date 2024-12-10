import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Fade,
  CardMedia,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CalendarMonth, LocalMovies } from '@mui/icons-material';

const MovieCard = ({ title, description, releaseDate, posterUrl, id }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(releaseDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Fade in={true} timeout={500}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: 280,
          height: 400,
          borderRadius: 3,
          position: 'relative',
          transition: 'all 0.3s ease-in-out',
          transform: isHovered ? 'translateY(-8px)' : 'none',
          boxShadow: isHovered 
            ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
            : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
          bgcolor: 'background.paper',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', height: 320 }}>
          {!imageLoaded && (
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
              animation="wave" 
            />
          )}
          <CardMedia
            component="img"
            height="320"
            image={posterUrl}
            alt={title}
            sx={{
              objectFit: 'cover',
              display: imageLoaded ? 'block' : 'none',
              transition: 'transform 0.3s ease-in-out',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
            onLoad={() => setImageLoaded(true)}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isHovered 
                ? 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)'
                : 'linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.9) 100%)',
              transition: 'all 0.3s ease-in-out',
            }}
          />
          <Chip
            icon={<CalendarMonth sx={{ color: '#2b2d42 !important' }} />}
            label={formattedDate}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: 'rgba(255,255,255,0.9)',
              color: '#2b2d42',
              fontWeight: 'medium',
              '& .MuiChip-icon': {
                color: '#2b2d42',
              },
            }}
          />
        </Box>

        <CardContent 
          sx={{ 
            position: 'absolute',
            bottom: 0,
            width: '100%',
            p: 2,
            transform: isHovered ? 'translateY(-40px)' : 'translateY(0)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </Typography>
          <Button
            component={Link}
            to={`/booking/${id}`}
            variant="contained"
            fullWidth
            startIcon={<LocalMovies />}
            sx={{
              mt: 1,
              bgcolor: '#2b2d42',
              color: 'white',
              textTransform: 'none',
              fontWeight: 'bold',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                bgcolor: '#1a1b2b',
              },
              borderRadius: 2,
              py: 1,
            }}
          >
            Book Now
          </Button>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default MovieCard;