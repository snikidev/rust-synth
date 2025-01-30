import React, { useState, useEffect } from 'react';
import { Input, Button, Form } from "@heroui/react";
import Response from './Response';
import Loading from './Loading';
import axios from 'axios';


const UserInput: React.FC = () => {
  const [query, setQuery] = useState<string>(''); 
  const [disabled, setDisabled] = useState<boolean>(true);
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setDisabled(query.trim() === '');
  }, [query]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const fetchData = async (query: string): Promise<void> => { 
    try {
      setIsLoading(true);
      const response = await axios.post('/api/string', { value: query }, {
        headers: { "Content-Type": "application/json" },
      });
      setData((prev) => [response.data.data, ...prev]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(query);
  };

  return (
    <div className='user-input-container'>
      <h1>App Name</h1>
      <Form className='input-container' onSubmit={onSubmit}>
        <Input 
          className="input" 
          placeholder="Enter your query" 
          type="search" 
          value={query}
          onChange={onInputChange}
        />
        <Button disabled={disabled}>Search</Button>
      </Form>

      {isLoading ? <Loading/> :  <Response data={data} /> }
    </div>
  );
};

export default UserInput;

