import { useDropzone } from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import { Card, CardBody, CircularProgress } from "@heroui/react";
import cn from "classnames";

export default function CSVUpload() {
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "text/csv": [".csv"] },
    onDrop: (files) => {
      setSelectedFile(files[0]);
      handleSubmit(files[0]);
    },
  });

  const handleSubmit = async (file: File) => {
    setError("");
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

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
      const blobFile = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blobFile);
      window.open(url, "_top");
    } catch (error) {
      setError("Upload failed. Try again!");
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        isPressable
        as="button"
        className={cn("w-full md:w-1/3", { "bg-danger-50 hover:bg-danger-100 animate-shake": error })}
      >
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
            <div
              className={cn("border-2 border-dashed  p-8 text-center ", {
                "text-danger border-red-500": error,
                "border-slate-200 text-slate-400": !error,
              })}
            >
              {error || "Drag and drop, or click to attach CSV file"}
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}
