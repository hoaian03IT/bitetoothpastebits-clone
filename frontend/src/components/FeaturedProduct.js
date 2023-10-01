import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { publicRoutes } from "~/config/routePath";

import "~/styles/FeaturedProduct.scss";

function FeaturedProduct(props) {
    const navigate = useNavigate();

    return (
        <Card className="card-featured-product my-5 px-2">
            <div className="card-featured-product-image-wrapper">
                <Card.Img
                    onClick={() => navigate(publicRoutes.shop)}
                    variant="top"
                    src={props.image}
                    alt={props.name}
                />
            </div>
            <Card.Title
                className="card-featured-product-name ff-2 fw-bold fs-5 mt-3"
                onClick={() => navigate(publicRoutes.shop)}>
                {props.name}
            </Card.Title>
            <Card.Text className="fs-small">
                Only ${props.salePrice > 0 ? props.salePrice : props.originalPrice}
            </Card.Text>
            <Button className="btn-short btn-small" variant="light" as={Link} to={publicRoutes.shop}>
                Shop now
            </Button>
        </Card>
    );
}

export { FeaturedProduct };
