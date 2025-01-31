import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@heroui/react';

export default function CSVUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); 
  
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
    
    setLoading(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("File uploaded successfully", response.data);
      setLoading(false);
    } catch (error) {
      console.error("Upload failed", error);
    } 
  };

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form 
        {...getRootProps({ className: 'flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer' })}
      >
        <input {...getInputProps()} />
        <button 
          type="button" 
          className="mt-4 text-white bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition"
        >
          Drag and drop, or click to attach CSV file
        </button>
      </form>
      
      {selectedFile && (
        <aside className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-300">
          <h4 className="text-lg font-semibold">Files to upload</h4>
          {acceptedFiles.map(file => (
            <p key={file.path} className="text-gray-700">{file.path} - {file.size} bytes</p>
          ))}
        </aside>
      )}
      
      {loading ? (
        <div className="mt-4 flex justify-center">
          <CircularProgress aria-label="Loading..." size="lg" />
        </div>
      ) : (
        <button 
          onClick={handleSubmit} 
          disabled={!selectedFile} 
          className={`mt-6 w-full text-white ${selectedFile ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'} px-6 py-2 rounded-lg transition`}
        >
          Generate CSV file
        </button>
      )}
    </section>
  );
}