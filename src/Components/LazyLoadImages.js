

import React, { memo, useCallback, useEffect, useState } from 'react'

const LazyLoadImages = ({ src, placeholderImg, ...props }) => {
    const [imgSrc, setSrc] = useState(placeholderImg || src);

    const onLoad = useCallback(() => {
        document.getElementById(`image${imgSrc}`)
        setSrc(src);
    }, [src]);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.addEventListener("load", onLoad);
        return () => {
            img.removeEventListener("load", onLoad);
        };
    }, [src, onLoad]);
    return <img id={`image${src}`} {...props} alt={imgSrc} src={imgSrc} />;
}

export default memo(LazyLoadImages);