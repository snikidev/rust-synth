type ResponseProps = {
    data: string[];
}

const Response: React.FC<ResponseProps> = ({data}) => {

return (
    <div className="response-container">
        {data.map((value, index) => (
            <div key={index} className="response">
                {value}
            </div>
        ))}
    </div>
)
}

export default Response;