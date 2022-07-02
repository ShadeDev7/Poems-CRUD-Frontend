const ErrorMessage = ({ children }) => {
    return (
        <div className="p-2 bg-red-700">
            <p className="font-bold text-center">{children}</p>
        </div>
    );
};

export default ErrorMessage;
