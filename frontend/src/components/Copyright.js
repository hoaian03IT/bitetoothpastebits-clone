import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

import "~/styles/Footer.scss";

function Copyright() {
    return (
        <div className="copyright mt-3">
            <Container fluid className="container-no-gutter">
                <Row>
                    <Col lg={6} className="mb-3">
                        <span className="copyright-text">© 2023 Bite. All Rights Reserved.</span>
                    </Col>
                    <Col lg={6} className="mb-3">
                        <Row className="d-flex justify-content-end text-center">
                            <Col xs={12} sm={12} md={12} lg={5} className="fw-semibold word-break-all">
                                <Link>hello@bitetoothpastebits.com</Link>
                            </Col>
                            <Col xs={12} sm={4} lg={3} className="fw-semibold">
                                <Link>Terms of Service</Link>
                            </Col>
                            <Col xs={12} sm={4} lg={2} className="fw-semibold">
                                <Link>Privacy Policy</Link>
                            </Col>
                            <Col xs={12} sm={4} lg={2} className="fw-semibold">
                                <Link>Accessibility</Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export { Copyright };
