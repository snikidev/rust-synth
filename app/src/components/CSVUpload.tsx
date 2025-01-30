import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import axios from 'axios';

export default function CsvUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "text/csv": [".csv"] },
    onDrop: (files) => {
      setSelectedFile(files[0]);
    }
  });

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a CSV file first.");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("File uploaded successfully", response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed, please try again.");
    }
  };

  return (
    <section className="container">
      <form {...getRootProps({ className: 'dropzone' })} style={{ display: 'flex', flexDirection: 'column' }}>
        <input {...getInputProps()} />
        <button type="button">Drag and drop, or click to attach CSV file</button>
      </form>
      {selectedFile && (
      <aside>
      <h4>Files to upload</h4>
        {acceptedFiles.map(file => (
          <p key={file.path}>{file.path} - {file.size} bytes</p>
        ))}
    </aside>
      )}
      <button onClick={handleSubmit} disabled={!selectedFile}>Generate Table</button>
    </section>
  );
}