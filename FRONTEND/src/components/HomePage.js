import React, { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Fade,
  Skeleton,
  Paper
} from "@mui/material";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers.js";
import MovieItem from "./Movies/MovieItem.js";
import { LocalMovies, ArrowForward } from '@mui/icons-material';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getAllMovies();
      setMovies(data.movies || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Unable to load latest releases. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Fade in={true} timeout={1000}>
        <Paper 
          elevation={3}
          sx={{ 
            width: "100%",
            height: { xs: '40vh', sm: '50vh', md: '60vh' },
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            mb: 6
          }}
        >
          {!imageLoaded && (
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
              animation="wave" 
            />
          )}
          <img
            src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/02/new-deadpool-3-poster-from-marvel-studios-accused-of-using-ai.jpg"
            alt="Deadpool 3: Coming Soon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: imageLoaded ? 'block' : 'none'
            }}
            onLoad={() => setImageLoaded(true)}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              p: { xs: 2, sm: 3, md: 4 }
            }}
          >
            <Typography 
              variant={isMobile ? 'h5' : 'h4'} 
              color="white"
              fontWeight="bold"
            >
              Deadpool 3
            </Typography>
            <Typography 
              variant={isMobile ? 'body2' : 'body1'} 
              color="white"
              sx={{ mt: 1, opacity: 0.9 }}
            >
              Coming Soon to Theaters
            </Typography>
          </Box>
        </Paper>
      </Fade>

      {/* Latest Releases Section */}
      <Box sx={{ mb: 6 }}>
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 4
          }}
        >
          <LocalMovies sx={{ fontSize: 32, color: '#2b2d42' }} />
          <Typography 
            variant={isMobile ? 'h5' : 'h4'} 
            fontWeight="bold"
            color="#2b2d42"
          >
            Latest Releases
          </Typography>
        </Box>

        {loading ? (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="300px"
          >
            <CircularProgress sx={{ color: '#2b2d42' }} />
          </Box>
        ) : error ? (
          <Alert 
            severity="error" 
            sx={{ maxWidth: 500, mx: 'auto' }}
          >
            {error}
          </Alert>
        ) : (
          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
                gap: 4,
                justifyItems: 'center',
                mb: 4
              }}
            >
              {movies.slice(0, 4).map((movie) => (
                <MovieItem
                  key={movie._id}
                  id={movie._id}
                  title={movie.title}
                  posterUrl={movie.posterUrl}
                  releaseDate={movie.releaseDate}
                />
              ))}
            </Box>
          </Fade>
        )}

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 4 
          }}
        >
          <Button
            component={Link}
            to="/movies"
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              bgcolor: '#2b2d42',
              color: 'white',
              px: 4,
              py: 1.5,
              '&:hover': {
                bgcolor: '#1a1b2b',
              },
            }}
          >
            View All Movies
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;