'use client';
import { Image } from "antd";
import Masonry from "react-responsive-masonry";

const ImageGrid = () => {
    return (
        <section>
            <Image.PreviewGroup>
                <Masonry sequential columnsCount={3} gutter="10px">
                    <Image src="/assets/dham-images/dham0.jpg" alt="dham-0" />
                    <Image src="/assets/dham-images/dham1.jpg" alt="dham-1" />
                    <Image src="/assets/dham-images/dham2.png" alt="dham-2" />
                    <Image src="/assets/dham-images/dham3.jpg" alt="dham-3" />
                    <Image src="/assets/dham-images/dham4.jpg" alt="dham-4" />
                    <Image src="/assets/dham-images/dham5.jpg" alt="dham-5" />
                    <Image src="/assets/dham-images/dham6.jpg" alt="dham-6" />
                    <Image src="/assets/dham-images/dham7.png" alt="dham-7" />
                    <Image src="/assets/dham-images/dham8.png" alt="dham-8" />
                    <Image src="/assets/dham-images/dham9.png" alt="dham-9" />
                    <Image src="/assets/dham-images/dham10.png" alt="dham-10" />
                </Masonry>
            </Image.PreviewGroup>
        </section>
    )
}

export default ImageGrid;
