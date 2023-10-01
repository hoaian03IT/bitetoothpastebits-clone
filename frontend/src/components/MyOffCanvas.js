const { Offcanvas } = require("react-bootstrap");

function MyOffCanvas({ children, title, show, onHide, placement = "start", fluid = false }) {
    return (
        <Offcanvas className={`${fluid ? "offcanvas-fluid" : ""}`} show={show} onHide={onHide} placement={placement}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="text-black fs-5">{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{children}</Offcanvas.Body>
        </Offcanvas>
    );
}

export { MyOffCanvas };
