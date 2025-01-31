import { useDropzone } from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import { Card, CardBody, CircularProgress } from "@heroui/react";

export default function CSVUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "text/csv": [".csv"] },
    onDrop: (files) => {
      setSelectedFile(files[0]);
      handleSubmit(files[0]);
    },
  });

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("File uploaded successfully", response.data);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card isPressable as="button" className="w-1/3">
        <input {...getInputProps()} />
        <CardBody as="form" {...getRootProps()}>
          {loading && selectedFile ? (
            <div className="flex gap-2 items-center justify-center p-4">
              <CircularProgress
                aria-label="Loading..."
                size="lg"
                color="primary"
              />
              <div className="space-y-2">
                {acceptedFiles.map((file) => (
                  <p key={file.path} className="text-gray-500 text-sm">
                    {file.path} - {file.size} bytes
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-100 p-8 text-center text-sm text-slate-400">
              Drag and drop, or click to attach CSV file
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
