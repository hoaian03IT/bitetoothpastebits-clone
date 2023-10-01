import { faClock, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faLockOpen, faMinus, faPlus, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { images } from "~/assets/images";

import "~/styles/Cart.scss";

const data1 = [
    {
        id: 1,
        name: "Toothpaste Bits",
        description: "Fresh Mint",
        collaboration: "with fluoride",
        currentPrice: 32,
        oldPrice: 48,
        quantity: 1,
        reviews: 20081,
        monthDelivery: 4,
        image: images.product1,
    },
    {
        id: 2,
        name: "Toothpaste Bits",
        description: "Fresh Mint",
        collaboration: "with fluoride",
        currentPrice: 32,
        oldPrice: 48,
        quantity: 1,
        reviews: 20081,
        image: images.product2,
    },
    {
        id: 3,
        name: "Toothpaste Bits",
        description: "Fresh Mint",
        collaboration: "with fluoride",
        currentPrice: 28,
        oldPrice: null,
        quantity: 1,
        reviews: 20081,
        image: images.product1,
    },
    {
        id: 4,
        name: "Toothpaste Bits",
        description: "Fresh Mint",
        collaboration: "with fluoride",
        currentPrice: 32,
        oldPrice: 48,
        quantity: 1,
        reviews: 20081,
        image: images.product2,
    },
];

function Cart() {
    return (
        <>
            <Container className="cart">
                <div className="cart-show mt-3">
                    {data1.map((item) => (
                        <Row key={item.id} className="cart-item">
                            <Col xs={3}>
                                <Image src={item.image} className="cursor-pointer" />
                            </Col>
                            <Col xs={6}>
                                <p className="ff-2 fs-4 fw-semibold mb-0 cursor-pointer">{item.description}</p>
                                <h4 className="ff-1 fst-italic fw-bold mb-0 cursor-pointer">{item.name}</h4>
                                <span className="ff-3 fst-italic fs-small cursor-pointer">{item.collaboration}</span>
                                {item.monthDelivery && (
                                    <div className="mt-3">
                                        <FontAwesomeIcon icon={faRotate} />
                                        &ensp;{item.monthDelivery} Months supply
                                    </div>
                                )}
                                <div className="fs-6 text-secondary">
                                    <FontAwesomeIcon icon={faClock} />
                                    &ensp;Ships in 1-2 weeks
                                </div>
                                <div className="cart-item-quantity px-1 mt-4">
                                    <FontAwesomeIcon icon={faMinus} className="cart-item-quantity-icon p-1 cursor-pointer" />
                                    <span className="mx-3">{item.quantity}</span>
                                    <FontAwesomeIcon icon={faPlus} className="cart-item-quantity-icon p-1 cursor-pointer" />
                                </div>
                            </Col>
                            <Col xs={3} className="d-flex flex-column justify-content-between">
                                <FontAwesomeIcon icon={faTrashCan} className="text-secondary cursor-pointer" />
                                <div className="fw-semibold fs-4">${Number(item.currentPrice).toFixed(2)}</div>
                            </Col>
                        </Row>
                    ))}
                </div>
            </Container>

            <div className="d-flex align-items-center justify-content-around mt-5">
                <div className="text-center">
                    <p className="mb-0 fs-small fw-semibold">SUBTOTAL</p>
                    <p className="ff-3 mb-0 fs-5 fw-bold">${data1.reduce((acc, cur) => acc + cur.currentPrice, 0).toFixed(2)}</p>
                </div>
                <Button className="fw-semibold fs-6 ff-3 ms-3">
                    <FontAwesomeIcon icon={faLockOpen} />
                    &ensp; Continue To Checkout
                </Button>
            </div>
        </>
    );
}

export { Cart };
