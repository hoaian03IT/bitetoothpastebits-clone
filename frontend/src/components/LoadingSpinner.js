import "~/styles/LoadingSpinner.scss";

function LoadingSpinner() {
    return (
        <div className="wrapper">
            <div className="loading-spinner"></div>
            <div className="loading-spinner-reverse"></div>
        </div>
    );
}

export { LoadingSpinner };
