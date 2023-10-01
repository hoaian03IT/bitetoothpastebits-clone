import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FacebookIcon, InstagramIcon, TiktokIcon, TwitterIcon } from "~/icons";

import "~/styles/Footer.scss";

function RefreshInbox() {
    return (
        <div className="refresh-inbox">
            <Container fluid className="container-no-gutter ">
                <Row className="align-items-center">
                    <Col md={6}>
                        <div className="refresh-inbox-content">
                            <h2>
                                <strong className="ff-2">
                                    Give your ininbox a <span className="ff-1 fst-italic fw-normal fs-1">refresh</span>.
                                </strong>
                                <p className="fs-5 fw-semibold">
                                    10% off your first order when you sign up <br /> for our plastic-free and spam-free emails.
                                </p>
                            </h2>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="refresh-inbox-form-social">
                            <Form>
                                <Form.Group className="d-flex">
                                    <Form.Control type="text" required placeholder="Enter email address" />
                                    <Button variant="inbox-social" type="submit" className="ms-2">
                                        Subscribe
                                    </Button>
                                </Form.Group>
                            </Form>
                            <div className="float-end my-4">
                                <a href="https://www.instagram.com" target="blank">
                                    <InstagramIcon className="ms-3  network-social" />
                                </a>
                                <a href="https://www.tiktok.com" target="blank">
                                    <TiktokIcon className="ms-3  network-social" />
                                </a>
                                <a href="https://www.twitter.com" target="blank">
                                    <TwitterIcon className="ms-3  network-social" />
                                </a>
                                <a href="https://www.facebook.com" target="blank">
                                    <FacebookIcon className="ms-3  network-social" />
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export { RefreshInbox };
