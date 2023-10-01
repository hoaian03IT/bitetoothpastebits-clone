import { Image } from "react-bootstrap";
import { images } from "~/assets/images";

import "~/styles/Sticker.scss";

function Sticker({ price = "" }) {
    return (
        <div className="sticker relative-absolute">
            <Image className="sticker-image" src={images.sticker} />
            <span className="sticker-text">${price}</span>
        </div>
    );
}

export { Sticker };
