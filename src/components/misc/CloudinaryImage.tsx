import { useState } from 'react';

interface CloudinaryImageProps {
    src: string;
    alt: string;
    className?: string;
}

export const CloudinaryImage = ({ src, alt, className }: CloudinaryImageProps) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [hasRetried, setHasRetried] = useState(false);

    return (
        <img
            src={currentSrc}
            alt={alt}
            className={className}
            onError={() => {
                if (!hasRetried) {
                    const uniqueId = Date.now();
                    setCurrentSrc(`${src}?retry=${uniqueId}`);
                    setHasRetried(true);
                }
            }}
        />
    );
};