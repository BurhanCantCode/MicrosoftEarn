"use client";

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, List, ListItem, ListItemText, AppBar, Toolbar, Container, CircularProgress, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { debounce } from 'lodash';

const CONTRIBUTOR_ID = "studentamb_325123";

const Search = ({ initialQuery = '' }) => {
    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const predefinedSuggestions = ["Azure", "Power BI", "Microsoft 365", "Dynamics 365", "Visual Studio Code"];

    useEffect(() => {
        if (initialQuery) {
            fetchSearchResults(initialQuery);
        }
    }, [initialQuery]);

    const fetchSearchResults = async (query) => {
        setLoading(true);
        const searchUrl = `https://learn.microsoft.com/api/search`;
        const params = {
            search: query,
            locale: "en-us"
        };
        try {
            const response = await axios.get(searchUrl, { params });
            if (response.status === 200) {
                setResults(response.data.results || []);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error("Error fetching search results", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchSuggestions = debounce(async (query) => {
        const searchUrl = `https://learn.microsoft.com/api/suggestions`;
        const params = {
            search: query,
            locale: "en-us"
        };
        try {
            const response = await axios.get(searchUrl, { params });
            if (response.status === 200) {
                setSuggestions(response.data.suggestions || []);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error("Error fetching suggestions", error);
            setSuggestions([]);
        }
    }, 300);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            fetchSearchResults(query);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value) {
            fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]);
        fetchSearchResults(suggestion);
    };

    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" sx={{ bgcolor: '#000000' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'var(--font-secondary)', color: '#ffffff' }}>
                        Microsoft Resource Teacher
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 4 }}>
                <Paper elevation={3} sx={{ width: '100%', maxWidth: '600px', p: 3, borderRadius: '20px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}>
                    <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', fontFamily: 'var(--font-secondary)', color: '#000000' }}>
                        Search Microsoft Learn
                    </Typography>
                    <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search for Microsoft Learn resources"
                            value={query}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        {suggestions.length > 0 && (
                            <Paper sx={{ width: '100%', maxWidth: '600px', position: 'absolute', zIndex: 10 }}>
                                {suggestions.map((suggestion, index) => (
                                    <MenuItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </MenuItem>
                                ))}
                            </Paper>
                        )}
                        <Button 
                            variant="contained" 
                            type="submit"
                            sx={{ 
                                bgcolor: '#000000', 
                                '&:hover': { bgcolor: '#333333' },
                                fontFamily: 'var(--font-secondary)',
                                color: '#ffffff'
                            }}
                        >
                            Search
                        </Button>
                    </form>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'var(--font-secondary)', color: '#000000' }}>
                            Try searching for:
                        </Typography>
                        <List>
                            {predefinedSuggestions.map((suggestion, index) => (
                                <ListItem button key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                    <ListItemText primary={suggestion} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {results.length > 0 && (
                        <Box sx={{ mt: 3, maxHeight: '400px', overflowY: 'auto' }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontFamily: 'var(--font-secondary)', color: '#000000' }}>
                                Search Results:
                            </Typography>
                            <List>
                                {results.map((result, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <ListItem 
                                            component="a" 
                                            href={`${result.url}?wt.mc_id=${CONTRIBUTOR_ID}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            sx={{ 
                                                mb: 1, 
                                                bgcolor: '#ffffff', 
                                                borderRadius: '10px', 
                                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
                                                '&:hover': { bgcolor: '#f0f0f0' },
                                                fontFamily: 'var(--font-primary)',
                                                color: '#000000'
                                            }}
                                        >
                                            <ListItemText primary={result.title} />
                                        </ListItem>
                                    </motion.div>
                                ))}
                            </List>
                        </Box>
                    )}
                    {results.length === 0 && query && !loading && (
                        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', fontFamily: 'var(--font-primary)', color: '#000000' }}>
                            No results found.
                        </Typography>
                    )}
                </Paper>
            </Container>
            <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: '#000000', color: '#ffffff', fontFamily: 'var(--font-primary)' }}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Microsoft Resource Teacher
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    Made with ❤️ by Burhan
                </Typography>
            </Box>
        </Box>
    );
};

export default Search;