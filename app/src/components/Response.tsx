type ResponseProps = {
    data: string;
}

const Response: React.FC<ResponseProps> = ({data}) => {

return (
    <div className="response-container">
       <p>{data}</p>
    </div>
)
}

export default Response;