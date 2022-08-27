import React, { lazy, memo, Suspense, useEffect, useRef, useState } from 'react'
import PlaceHolder from '../Assets/Placeholder.png'
import './Images.css'

const LazyLoadImages = lazy(() => import('./LazyLoadImages'));
const Images = ({ setActive, active }) => {

    let options = {
        rootMargin: '0px',
        threshold: 1
    };

    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [lastElement, setLastElement] = useState(null);

    useEffect(() => {
        fetchImages();
    }, [page]);

    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    setPage((no) => no + 1);
                }
            }, options)
    );

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    const fetchImages = () => {
        setLoading(true);
        const url = `https://picsum.photos/v2/list?page=${page}&limit=30`;
        fetch(url).then((resp) => {
            return resp.json()
        }).then((data) => {
            setImages((images) => [...images, ...data])
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }
    return (
        <>
            {images.map((ele, id) => {
                if (id !== images.length - 1) {
                    return (
                        <div key={ele.id} className={`image-container ${active && active.id === ele.id && 'selected'}`} onClick={() => setActive(ele)}>
                            <Suspense fallback={<img src={PlaceHolder} alt='placeholder'></img>}>
                                <LazyLoadImages placeholderImg={PlaceHolder} key={ele.id} width={600} height={400} src={ele.download_url} alt="searcg_results" />
                            </Suspense>
                            <div className='text-label'>{ele.author}</div>
                            <a href={ele.url} className='text-link'>{ele.url}</a>
                        </div>
                    )
                } else {
                    return (
                        <div ref={setLastElement} key={ele.id} className={`image-container ${active && active.id === ele.id && 'selected'}`} onClick={() => setActive(ele)}>
                            <Suspense fallback={<img src={PlaceHolder} alt='placeholder'></img>}>
                                <LazyLoadImages placeholderImg={PlaceHolder} key={ele.id} width={600} height={400} src={ele.download_url} alt="searcg_results" />
                            </Suspense>
                            <div className='text-label'>{ele.author}</div>
                            <a href={ele.url} className='text-link'>{ele.url}</a>
                        </div>
                    )
                }
            })}
            {loading && <div className='loader-container'><div className='loader'></div></div>}
        </>
    )
}

export default memo(Images)