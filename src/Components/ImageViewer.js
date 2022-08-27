import React, { lazy, memo, Suspense } from 'react'
import SearchPage from './SearchPage';
import PlaceHolder from '../Assets/Placeholder.png'
import './ImageViewer.css'

const LazyLoadImages = lazy(() => import('./LazyLoadImages'));

const ImageViewer = ({ active, setActive }) => {
    return (
        <div className='image-preview-container'>
            <button onClick={() => setActive(null)} className='close'>X</button>
            <div className='preview-image'>
                <Suspense fallback={<img src={PlaceHolder} alt='placeholder'></img>}>
                    <LazyLoadImages placeholderImg={PlaceHolder} width={600} height={400} src={active.download_url} alt="searcg_results" />
                </Suspense>
                <div className='text-label'>{active.author}</div>
                <div className='text-link'>{active.url}</div>
            </div>
            <SearchPage sidebar={true} />
        </div>
    )
}

export default memo(ImageViewer)