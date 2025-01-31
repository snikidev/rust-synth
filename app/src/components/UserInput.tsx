import React, { useState, useEffect } from 'react';
import { Form, Button, Input, CircularProgress } from '@heroui/react';
import Response from './Response';
import axios from 'axios';

const UserInput: React.FC = () => {
  const [query, setQuery] = useState<string>(''); 
  const [disabled, setDisabled] = useState<boolean>(true);
  const [data, setData] = useState<string | string[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    setDisabled(query.trim() === '' || loading);
  }, [query, loading]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };


  const fetchData = async (query: string): Promise<void> => { 
    setError(null); 
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/api/string', { value: query }, {
        headers: { 
          "Content-Type": "application/json",   
          "Accept": "application/json",
        },
      });

      if (response.status === 200) {
        if (response.data.data && response.data.data.length > 0) {
          setData(response.data.data);
        } else {
          setData([`No data returned from the API. ${response.data.data}`]);
        }
      } else {
        setError(`Unexpected status: ${response.status}`);
        setData([]);
      }

    } catch (error) {
      console.error("Error fetching data", error);
      setError('An error occurred while fetching data. Please try again.');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(query);
  };

  return (
    <div className="user-input-container">
      <h1 className="app-title">App Name</h1>
      <Form className="input-form" onSubmit={onSubmit}>
        <Input 
          className="input-field" 
          placeholder="Enter your query" 
          type="search" 
          value={query}
          onChange={onInputChange}
        />
        <Button 
          type="submit"
          className="submit-button"
          disabled={disabled}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Form>

      {loading && (
        <div className="loading-indicator">
          <CircularProgress aria-label="Loading..." size="lg" />
        </div>
      )}

      {error && !loading && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && <Response data={data} />}
    </div>
  );
};

export default UserInput;
