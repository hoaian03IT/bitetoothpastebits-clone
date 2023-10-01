import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { BCorpCertifiedLogo, CFPartnerLogo, CrueltyFreeLogo, WomenOwnedBusinessLogo } from "~/icons";

import "~/styles/Footer.scss";
function SitesLink() {
    return (
        <div className="site-links mt-5">
            <Container fluid className="container-no-gutter">
                <Row>
                    <Col md={6} className="mb-3">
                        <Row>
                            <Col xs={6} sm={6} md={6} lg={3}>
                                <div>
                                    <h6>SHOP</h6>
                                    <ul>
                                        <li>
                                            <Link>All Products</Link>
                                        </li>
                                        <li>
                                            <Link>Oral Care</Link>
                                        </li>
                                        <li>
                                            <Link>Personal Care</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={3}>
                                <div>
                                    <h6>ABOUT</h6>
                                    <ul>
                                        <li>
                                            <Link>Ingredients</Link>
                                        </li>
                                        <li>
                                            <Link>Sustainability</Link>
                                        </li>
                                        <li>
                                            <Link>About Us</Link>
                                        </li>
                                        <li>
                                            <Link>Blog</Link>
                                        </li>
                                        <li>
                                            <Link>FAQ</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={3}>
                                <div>
                                    <h6>MORE</h6>
                                    <ul>
                                        <li>
                                            <Link>Wholesale</Link>
                                        </li>
                                        <li>
                                            <Link>Store Locator</Link>
                                        </li>
                                        <li>
                                            <Link>Gift Cards</Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <div>
                            <ul className="d-flex align-items-center justify-content-end">
                                <li className="ms-4">
                                    <BCorpCertifiedLogo className="brand-logo" />
                                </li>
                                <li className="ms-4">
                                    <WomenOwnedBusinessLogo className="brand-logo" />
                                </li>
                                <li className="ms-4">
                                    <CrueltyFreeLogo className="brand-logo" />
                                </li>
                                <li className="ms-4">
                                    <CFPartnerLogo className="brand-logo" />
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export { SitesLink };
