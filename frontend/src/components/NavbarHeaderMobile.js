import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import "~/styles/NavbarHeader.scss";
import { MyOffCanvas } from "./MyOffCanvas";
import { Divider } from "./Divider";
import { publicRoutes } from "~/config/routePath";
import { Cart } from "./Cart";
import { StoreContext } from "~/data/Auth";
import { USER_LOGOUT } from "~/data/actions/userActions";
import { typeProducts } from "~/constants";
import { convertTypeToText } from "~/utils";

const learnContent = [
    { title: "- Ingredients", link: "/ingredients" },
    { title: "- Sustainability", link: "/sustainability" },
    { title: "- About", link: "/aboutus" },
    { title: "- Press", link: "/press" },
    { title: "- FAQ", link: "/faq" },
    { title: "- Blog", link: "/blog" },
    { title: "- Refer", link: "/refer" },
];

function NavbarHeaderMobile({ className }) {
    const { isLogged, dispatch } = useContext(StoreContext);

    const [showBars, setShowBars] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [bgColor, setBgColor] = useState("transparent");
    const [showLearnContent, setShowLearnContent] = useState(false);

    useEffect(() => {
        const listener = () => {
            if (window.scrollY !== 0) {
                setBgColor("white");
            } else {
                setBgColor("transparent");
            }
        };

        window.addEventListener("scroll", listener);

        return () => window.removeEventListener("scroll", listener);
    }, []);
    return (
        <Navbar className={`navbar-mobile px-3 ${className} z-3`} variant={bgColor}>
            <Container fluid className="align-items-center justify-content-between">
                <Nav className="align-items-center">
                    <Nav.Item>
                        <FontAwesomeIcon icon={faBars} className="fs-2" onClick={() => setShowBars(true)} />
                    </Nav.Item>
                    <MyOffCanvas fluid show={showBars} onHide={() => setShowBars(false)}>
                        <div className="px-4 d-flex flex-column">
                            <div>
                                <h1 className="fs-1 fw-bold">Shop</h1>
                                <ul className="ps-3">
                                    {typeProducts.map((type) => (
                                        <li key={type}>
                                            <Link
                                                onClick={() => setShowBars(false)}
                                                to={`${publicRoutes.shop}?t=${type}`}
                                                className="fs-3 fw-semibold">
                                                - {convertTypeToText(type)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Divider className="my-3" position="right" />
                            <div>
                                <div
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() => setShowLearnContent(!showLearnContent)}>
                                    <h1 className="fs-1 fw-bold">Learn</h1>
                                    <FontAwesomeIcon
                                        icon={faAngleRight}
                                        style={showLearnContent && { transform: "rotate(90deg)" }}
                                    />
                                </div>
                                {showLearnContent && (
                                    <ul className="ps-3">
                                        {learnContent.map((item) => (
                                            <li key={item.title}>
                                                <NavLink
                                                    onClick={() => setShowBars(false)}
                                                    as={Link}
                                                    to={item.link}
                                                    className={({ isActive }) =>
                                                        `${isActive ? "active" : ""} fs-3 fw-semibold`
                                                    }>
                                                    {item.title}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <Divider className="my-3" position="right" />
                            {isLogged ? (
                                <Link
                                    onClick={() => {
                                        setShowBars(false);
                                        dispatch({ type: USER_LOGOUT });
                                    }}
                                    className="fs-4 fw-semibold">
                                    SIGN OUT
                                </Link>
                            ) : (
                                <Link
                                    onClick={() => setShowBars(false)}
                                    to={publicRoutes.signIn}
                                    className="fs-4 fw-semibold">
                                    SIGN IN
                                </Link>
                            )}
                            <Link to="/help" className="fs-4 fw-semibold">
                                HELP
                            </Link>
                        </div>
                    </MyOffCanvas>
                </Nav>

                <Navbar.Brand className="brand-logo">
                    <Nav.Link as={Link} to={publicRoutes.home} className="fs-1">
                        Bito
                    </Nav.Link>
                </Navbar.Brand>

                <Nav className="align-items-center">
                    <Nav.Item className="position-relative">
                        <FontAwesomeIcon icon={faOpencart} className="fs-2" onClick={() => setShowCart(true)} />
                        <span className="cart-notify" />
                    </Nav.Item>
                    <MyOffCanvas fluid show={showCart} onHide={() => setShowCart(false)} title="Cart" placement="end">
                        <Cart />
                    </MyOffCanvas>
                </Nav>
            </Container>
        </Navbar>
    );
}

export { NavbarHeaderMobile };
