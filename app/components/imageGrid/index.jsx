'use client';
import { Image } from "antd";

const ImageGrid = () => {
    return (
        <Image.PreviewGroup>
            <div className="grid grid-cols-6 grid-rows-7 gap-[10px] max-sm:grid-cols-2 max-sm:grid-rows-9">
                <div className="col-start-1 col-end-3 row-start-1 row-end-4 max-sm:col-start-1 max-sm:col-end-3 max-sm:row-start-1 max-sm:row-end-2">
                    <Image src="/assets/dham-images/dham0.jpg" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-0" />
                </div>

                <div className="col-start-3 col-end-5 row-start-1 row-end-3 max-sm:col-start-1 max-sm:col-end-3 max-sm:row-start-2 max-sm:row-end-3">
                    <Image src="/assets/dham-images/dham1.jpg" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-1" />
                </div>

                <div className="col-start-5 col-end-7 row-start-1 row-end-4 max-sm:col-start-1 max-sm:col-end-3 max-sm:row-start-3 max-sm:row-end-4">
                    <Image src="/assets/dham-images/dham2.png" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-2" />
                </div>

                <div className="col-start-1 col-end-3 row-start-4 row-end-6 max-sm:col-start-1 max-sm:col-end-3 max-sm:row-start-4 max-sm:row-end-5">
                    <Image src="/assets/dham-images/dham3.jpg" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-3" />
                </div>

                <div className="col-start-3 col-end-4 row-start-3 row-end-6 max-sm:col-start-1 max-sm:col-end-2 max-sm:row-start-5 max-sm:row-end-7">
                    <Image src="/assets/dham-images/dham4.jpg" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-4" />
                </div>

                <div className="col-start-4 col-end-5 row-start-3 row-end-5 max-sm:col-start-2 max-sm:col-end-4 max-sm:row-start-5 max-sm:row-end-6">
                    <Image src="/assets/dham-images/dham5.jpg" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-5" />
                </div>

                <div className="col-start-4 col-end-5 row-start-5 row-end-6 max-sm:col-start-2 max-sm:col-end-4 max-sm:row-start-6 max-sm:row-end-7">
                    <Image src="/assets/dham-images/dham6.jpg" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-6" />
                </div>

                <div className="col-start-5 col-end-7 row-start-4 row-end-6 max-sm:col-start-1 max-sm:col-end-3 max-sm:row-start-7 max-sm:row-end-8">
                    <Image src="/assets/dham-images/dham7.png" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-7" />
                </div>

                <div className="col-span-2 row-span-2 max-sm:col-span-2 max-sm:row-span-1">
                    <Image src="/assets/dham-images/dham8.png" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-8" />
                </div>

                <div className="col-span-2 row-span-2 max-sm:col-span-2 max-sm:row-span-1">
                    <Image src="/assets/dham-images/dham9.png" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-9" />
                </div>

                <div className="col-span-2 row-span-2 max-sm:col-span-2 max-sm:row-span-1">
                    <Image src="/assets/dham-images/dham10.png" height={'100%'} className="[&>.ant-image-img]:object-cover" alt="dham-10" />
                </div>
            </div>
            {/* <ResponsiveMasonry columnsCountBreakPoints={{ 576: 1, 577: 3 }}>
                <Masonry sequential columnsCount={3} gutter="10px">
                    <Image src="/assets/dham-images/dham0.jpg" className="!border-2 !border-transparent hover:!border-2 hover:!border-[#D2B14A]" alt="dham-0" />
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
            </ResponsiveMasonry> */}
        </Image.PreviewGroup>
    )
}

export default ImageGrid;
