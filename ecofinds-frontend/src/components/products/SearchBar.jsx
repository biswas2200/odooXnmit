import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { categoryService } from '../../services/productService';

const SearchBar = ({ onSearch, onCategoryChange, initialSearch = '', initialCategory = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSearch = () => {
    onSearch(searchQuery, selectedCategory);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedCategory('');
    onSearch('', '');
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    onSearch(searchQuery, categoryId);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search for sustainable products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear} size="small">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              label="Category"
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={1}>
          <IconButton
            onClick={handleSearch}
            sx={{
              backgroundColor: '#2e7d32',
              color: 'white',
              '&:hover': { backgroundColor: '#1b5e20' },
              width: '100%',
              height: 56
            }}
          >
            <Search />
          </IconButton>
        </Grid>
      </Grid>

      {/* Active Filters */}
      {(searchQuery || selectedCategory) && (
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {searchQuery && (
            <Chip
              label={`Search: "${searchQuery}"`}
              onDelete={() => {
                setSearchQuery('');
                onSearch('', selectedCategory);
              }}
              color="primary"
              variant="outlined"
            />
          )}
          {selectedCategory && (
            <Chip
              label={`Category: ${categories.find(c => c.id === selectedCategory)?.name || selectedCategory}`}
              onDelete={() => {
                setSelectedCategory('');
                onSearch(searchQuery, '');
              }}
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
