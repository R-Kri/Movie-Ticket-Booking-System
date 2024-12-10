import React, { useEffect, useState } from "react";
import { 
  Typography, 
  Box, 
  Container, 
  CircularProgress, 
  Alert, 
  Grid 
} from "@mui/material";
import { getAllMovies } from "../../api-helpers/api-helpers.js";
import CardLayout from "../HomePage/CradLayout.js";  // Note: Consider fixing typo in filename
import { LocalMovies } from "@mui/icons-material";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getAllMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert 
          severity="error" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 2,
            mb: 4 
          }}
        >
          <LocalMovies sx={{ fontSize: 35, color: 'primary.main' }} />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{
              fontWeight: 600,
              textAlign: "center",
              color: 'text.primary'
            }}
          >
            All Movies
          </Typography>
        </Box>

        {/* Movies Grid */}
        {movies.length === 0 ? (
          <Typography 
            variant="h6" 
            textAlign="center" 
            color="text.secondary"
            sx={{ mt: 4 }}
          >
            No movies available at the moment.
          </Typography>
        ) : (
          <Grid 
            container 
            spacing={4} 
            justifyContent="center"
            sx={{ px: { xs: 2, md: 0 } }}
          >
            {movies.map((movie) => (
              <Grid item key={movie._id}>
                <CardLayout
                  id={movie._id}
                  title={movie.title}
                  releaseDate={movie.releaseDate}
                  posterUrl={movie.posterUrl}
                  description={movie.description}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default AllMovies;