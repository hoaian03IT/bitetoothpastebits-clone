import "~/styles/Divider.scss";

function Divider({ children, position = "mid", className }) {
    return (
        <div className={`d-flex align-items-center justify-content-center ${className}`}>
            {(position === "right" || position === "mid") && <div className="divider me-4"></div>}
            <div>{children}</div>
            {(position === "left" || position === "mid") && <div className="divider ms-4"></div>}
        </div>
    );
}

export { Divider };
