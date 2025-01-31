import React, { useState, useEffect } from "react";
import { Button, Input, Card, CardBody, CardFooter, Chip } from "@heroui/react";
import axios from "axios";

const UserInput: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [data, setData] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDisabled(query.trim() === "" || loading);
  }, [query, loading]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const fetchData = async (query: string): Promise<void> => {
    setError(null);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/string",
        { value: query },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (response.data.data && response.data.data.length > 0) {
          setData(response.data.data);
        } else {
          setData(`No data returned from the API. ${response.data.data}`);
        }
      } else {
        setError(`Unexpected status: ${response.status}`);
        setData(undefined);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setError("An error occurred while fetching data. Please try again.");
      setData(undefined);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData(query);
  };

  return (
    <Card as="form" onSubmit={onSubmit} className="w-1/3">
      <CardBody className="space-y-4 flex">
        <h1 className="text-center">MA-Hackathon-Genuinely-Inept</h1>
        <Input
          placeholder="Enter ITEM_NAME"
          type="search"
          size="lg"
          value={query}
          onChange={onInputChange}
          errorMessage={error}
        />
        <div className="flex justify-center">
        {data ? (
          <Chip size="lg" color="primary">
            {data}
          </Chip>
        ) : (
          <div className="border-3 border-dashed border-gray-100 p-4 rounded-lg text-gray-400 text-sm">
            Please, type in ITEM_NAME in the input field and click the "Get
            Brand" button to get the brand.
          </div>
        )}
        </div>

      </CardBody>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          disabled={disabled}
          isLoading={loading}
          color="primary"
          variant="solid"
        >
          Get brand
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserInput;
