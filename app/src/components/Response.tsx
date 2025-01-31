type ResponseProps = {
    data: string | string[];
  };
  
  const Response: React.FC<ResponseProps> = ({ data }) => {
    const renderData = Array.isArray(data) ? (
      data.map((message, index) => (
        <p key={index}>{message}</p> 
      ))
    ) : (
      <p>{data}</p> 
    );
  
    return (
      <div className="response-container">
        {renderData}
      </div>
    );
  };
  
  export default Response;
  