import { useContext, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import { images } from "~/assets/images";
import { Divider } from "~/components/Divider";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { ShopProduct } from "~/components/ShopProduct";
import { publicRoutes } from "~/config/routePath";
import { typeProducts } from "~/constants";
import { FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "~/data/actions/productActions";
import { filterProductApi } from "~/api";
import "~/styles/ShopScreen.scss";
import { convertTypeToText, getError } from "~/utils";
import { ProductContext } from "~/data/Product";

function ShopScreen() {
    const { state, dispatch } = useContext(ProductContext);

    const isLowerPCScreen = useMediaQuery({ query: "(max-width: 768px)" });
    const { search } = useLocation();
    const sp = new URLSearchParams(search);

    const queryType = sp.get("t") || "all-products";

    const getTitle = () => convertTypeToText(typeProducts.find((type) => queryType === type));

    useEffect(() => {
        const filterProducts = async () => {
            dispatch({ type: FETCH_PRODUCTS_REQUEST });
            try {
                const res = await filterProductApi(queryType);
                dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data });
            } catch (error) {
                dispatch({ type: FETCH_PRODUCTS_FAIL, payload: getError(error) });
            }
        };

        filterProducts();
    }, [dispatch, queryType]);

    return (
        <div className="shop-screen">
            {isLowerPCScreen && (
                <div className="shop-collections-mobile scroll-container-x">
                    {typeProducts.map((type) => (
                        <Button
                            key={type}
                            as={Link}
                            variant={type === queryType ? "dark" : "light"}
                            className="btn-small"
                            to={`${publicRoutes.shop}?t=${type}`}>
                            {convertTypeToText(type)}
                        </Button>
                    ))}
                </div>
            )}
            <div className="shop-banner">
                <h1>{getTitle()}</h1>
                <p>Build your own plastic–free routine</p>
            </div>
            <Container className="mt-3">
                <Row>
                    {!isLowerPCScreen && (
                        <Col lg={3} className="shop-collections">
                            <h1 className="fw-semibold fs-2 mb-3">Collections</h1>
                            <ul className="shop-collections-list">
                                {typeProducts.map((type) => (
                                    <Link
                                        key={type}
                                        className={`shop-collections-item ${queryType === type ? "active" : ""}`}
                                        to={`${publicRoutes.shop}?t=${type}`}>
                                        {convertTypeToText(type)}
                                    </Link>
                                ))}
                            </ul>
                        </Col>
                    )}
                    <Col lg={9} xs={12}>
                        <Divider position="left" className="fs-2">
                            <span className="fw-semibold">{getTitle()}</span>
                        </Divider>

                        <Row>
                            {state.product.loading ? (
                                <Col md={12} className="d-flex justify-content-center my-5">
                                    <LoadingSpinner />
                                </Col>
                            ) : state.product.filteredProducts ? (
                                state.product.filteredProducts.map((item) => (
                                    <Col xs={6} sm={4} key={item._id}>
                                        <ShopProduct {...item} />
                                    </Col>
                                ))
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <img src={images.maintaining} alt="maintaining" />
                                </div>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export { ShopScreen };
