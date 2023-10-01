import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import { videos } from "~/assets/videos";
import { Banner } from "~/components/Banner";
import { Divider } from "~/components/Divider";
import { FeaturedProduct } from "~/components/FeaturedProduct";
import { ShopProduct } from "~/components/ShopProduct";
import { publicRoutes } from "~/config/routePath";
import { Store } from "~/data/Store";
import {
    FETCH_FEATURED_PRODUCTS_FAIL,
    FETCH_FEATURED_PRODUCTS_REQUEST,
    FETCH_FEATURED_PRODUCTS_SUCCESS,
} from "~/data/actions/productActions";
import { fetchFeaturedProductsApi } from "~/api";

import "~/styles/HomeScreen.scss";
import { getError } from "~/utils";

function HomeScreen() {
    const { state, dispatch } = useContext(Store);

    const { featuredProducts } = state.product;

    const matchMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const matchPortable = useMediaQuery({ query: "(max-width: 991px)" });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            if (Object.keys(state.product.featuredProducts).length === 0) {
                dispatch({ type: FETCH_FEATURED_PRODUCTS_REQUEST });
                try {
                    const res = await fetchFeaturedProductsApi();
                    dispatch({ type: FETCH_FEATURED_PRODUCTS_SUCCESS, payload: res.data });
                } catch (error) {
                    dispatch({ type: FETCH_FEATURED_PRODUCTS_FAIL, payload: getError(error) });
                }
            }
        };

        fetchFeaturedProducts();
    }, [dispatch, state.product.featuredProducts]);

    return (
        <div>
            <Banner />
            <div className="home-carousel">
                <div className="scroll-container-x">
                    <div className="d-flex justify-content-center align-items-center">
                        {featuredProducts.popular?.map((item) => (
                            <FeaturedProduct key={item._id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
            <Container fluid>
                <Divider>
                    <Button
                        onClick={() => navigate(publicRoutes.shop)}
                        className={`fw-bold ${matchMobile ? "btn-small" : ""}`}
                        variant="primary">
                        Shop All Products
                    </Button>
                </Divider>
            </Container>
            <Container fluid="xxl">
                <div className="mt-5 pt-5 text-center background-linear-gradient1">
                    <h1 className="fs-huge fw-bold ff-1">Meet Bite</h1>
                    <p className="fs-3 mt-5">
                        We’re here to make daily routines better for your body <br /> and better for our planet —
                        because small change can
                        <br />
                        make a big impact.
                    </p>
                    <Button className="my-5 fw-bold btn-short" variant="primary">
                        About us
                    </Button>
                </div>
                <div className="text-center">
                    <Carousel
                        className="my-5 py-5 home-text-carousel"
                        variant="dark"
                        nextIcon={
                            matchMobile ? null : <span aria-hidden="true" className="carousel-control-next-icon" />
                        }
                        prevIcon={
                            matchMobile ? null : <span aria-hidden="true" className="carousel-control-prev-icon" />
                        }>
                        <Carousel.Item>
                            <h3 className="ff-1 fst-italic">"The Most Creative People in Business 2020"</h3>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h3 className="ff-1 fst-italic">
                                "Bite Is Revolutionizing Toothpaste And The Oral Care Industry"
                            </h3>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h3 className="ff-1 fst-italic">
                                "Stories People Cared About Most in 2019 🏆 -Number 1 - Bite Toothpaste Bits"
                            </h3>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <Divider position="left">
                    <h2 className="fw-bold" style={{ width: "200px" }}>
                        Oral Care
                    </h2>
                </Divider>
                <div>
                    <Row>
                        {!matchPortable && (
                            <Col md={6}>
                                <video className="video-product" autoPlay="autoplay" loop muted>
                                    <source src={videos.video1} type="video/mp4" />
                                </video>
                            </Col>
                        )}

                        <Col md={matchPortable ? 12 : 6} className="flex-row">
                            <Row>
                                {featuredProducts.oralCare?.map((item) => (
                                    <Col xs={6} key={item._id}>
                                        <ShopProduct {...item} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Divider position="left" className="mt-5 pt-5">
                    <h2 className="fw-bold" style={{ width: "200px" }}>
                        Personal Care
                    </h2>
                </Divider>
                <div>
                    <Row>
                        <Col md={matchPortable ? 12 : 6} className="flex-row">
                            <Row>
                                {featuredProducts.personalCare?.map((item) => (
                                    <Col xs={6} key={item._id}>
                                        <ShopProduct {...item} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                        {!matchPortable && (
                            <Col md={6}>
                                <video className="video-product" autoPlay="autoplay" loop muted>
                                    <source src={videos.video2} type="video/mp4" />
                                </video>
                            </Col>
                        )}
                    </Row>
                </div>
            </Container>
            <div
                className="text-center mt-large background-linear-gradient2 d-flex justify-content-center align-items-center flex-column"
                style={{ height: "500px" }}>
                <h1 className={`${matchPortable ? "fs-1" : "fs-huge"} fw-bold ff-1`}>
                    One{" "}
                    <span className="fst-italic ff-1" style={{ textDecoration: "underline", color: "red" }}>
                        billion
                    </span>{" "}
                    toothpaste tubes are <br /> thrown out each year
                </h1>
                <p className={`${matchMobile ? "fs-5" : "fs-3"}`}>
                    We want to end this plastic waste, give you a healthier smile,
                    <br /> and build the world's most sustainable oral care company.
                </p>
                <Link className={`${matchMobile ? "fs-5" : "fs-4 "} text-black`}>
                    Sustainability at Bite <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </div>
        </div>
    );
}

export { HomeScreen };
