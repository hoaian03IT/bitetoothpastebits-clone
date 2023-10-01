import { Button, Container, Image } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { images } from "~/assets/images";
import { publicRoutes } from "~/config/routePath";

import "~/styles/Banner.scss";

function Banner() {
    const matchMobile = useMediaQuery({ query: "(max-width: 767px)" });

    const navigate = useNavigate();

    return (
        <div className="banner">
            <Image className="banner-image" src={matchMobile ? images.bannerMobile : images.bannerPc} alt="Bito" loading="lazy" />

            <Container fluid="xxl" className="banner-content">
                <h1 className="banner-slogan ff-1 fw-semibold">
                    Keeping it <span className="fst-italic ff-1">clean</span>
                </h1>
                <h3 className="fw-semibold">Your daily routine, plastic-free and refillable forever.</h3>
                <Button onClick={() => navigate(publicRoutes.shop)} variant="primary" className="mt-4 fs-5 fw-semibold btn-short">
                    Shop now
                </Button>
            </Container>
        </div>
    );
}

export { Banner };
