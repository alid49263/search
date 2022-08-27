import React, { memo, useState } from 'react'
import Images from './Images';
import ImageViewer from './ImageViewer';
import './SearchPage.css';

const SearchPage = ({ sidebar }) => {
    
    const [active, setActive] = useState();

    return (
        <>
            <div className='main-container'>
                <div className={`search-result-container ${sidebar&&'block'}` }>
                    <Images setActive={setActive} active={active} />
                </div>
                {active && <ImageViewer active={active} setActive={setActive} />}
            </div>
        </>
    )
}

export default memo(SearchPage)