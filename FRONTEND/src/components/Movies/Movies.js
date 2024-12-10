import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Container, 
  CircularProgress, 
  Alert,
  useTheme,
  useMediaQuery,
  Fade
} from "@mui/material";
import { LocalMovies } from "@mui/icons-material";
import { getAllMovies } from "../../api-helpers/api-helpers.js";
import MovieItem from "./MovieItem.js";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
      setError(null);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Unable to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      {/* Header Section */}
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            mb: 5
          }}
        >
          <Box
            sx={{
              width: isMobile ? '90%' : '40%',
              bgcolor: '#900C3F',
              borderRadius: 2,
              boxShadow: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              py: 2,
              px: 3,
            }}
          >
            <LocalMovies sx={{ color: 'white', fontSize: 32 }} />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 600,
                textAlign: 'center',
                fontSize: isMobile ? '1.75rem' : '2.125rem'
              }}
            >
              All Movies
            </Typography>
          </Box>
        </Box>
      </Fade>

      {/* Content Section */}
      <Box sx={{ minHeight: '60vh' }}>
        {loading ? (
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="400px"
          >
            <CircularProgress size={40} sx={{ color: '#900C3F' }} />
          </Box>
        ) : error ? (
          <Alert 
            severity="error" 
            sx={{ 
              maxWidth: 500, 
              mx: 'auto', 
              mt: 4 
            }}
          >
            {error}
          </Alert>
        ) : movies.length === 0 ? (
          <Typography 
            variant="h6" 
            textAlign="center" 
            color="text.secondary"
            sx={{ mt: 4 }}
          >
            No movies available at the moment.
          </Typography>
        ) : (
          <Fade in={true} timeout={1000}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(auto-fill, minmax(250px, 1fr))',
                  sm: 'repeat(auto-fill, minmax(280px, 1fr))',
                },
                gap: 4,
                justifyItems: 'center',
                alignItems: 'start',
                px: { xs: 2, md: 0 }
              }}
            >
              {movies.map((movie) => (
                <MovieItem
                  key={movie._id}
                  id={movie._id}
                  posterUrl={movie.posterUrl}
                  releaseDate={movie.releaseDate}
                  title={movie.title}
                />
              ))}
            </Box>
          </Fade>
        )}
      </Box>
    </Container>
  );
};

export default Movies;