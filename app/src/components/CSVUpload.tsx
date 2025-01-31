import { useDropzone } from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import { CircularProgress } from "@heroui/react";

export default function CSVUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "text/csv": [".csv"] },
    onDrop: (files) => {
      setSelectedFile(files[0]);
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
        "http://localhost:8000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("File uploaded successfully", response.data);
      setLoading(false);
      const blobFile = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blobFile);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container">
      <form
        {...getRootProps({ className: "dropzone" })}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input {...getInputProps()} />
        <button type="button">
          Drag and drop, or click to attach CSV file
        </button>
      </form>

      {selectedFile && (
        <aside>
          <h4>Files to upload</h4>
          {acceptedFiles.map((file) => (
            <p key={file.path}>
              {file.path} - {file.size} bytes
            </p>
          ))}
        </aside>
      )}

      {loading ? (
        <CircularProgress aria-label="Loading..." size="lg" />
      ) : (
        <button onClick={handleSubmit} disabled={!selectedFile}>
          Generate Table
        </button>
      )}
    </section>
  );
}
