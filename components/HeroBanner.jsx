import React from 'react'
import Link from 'next/link';
import { fromImagetoUrl } from '../utils/urls';

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner.attributes.meta_title}</p>
        <h3>{heroBanner.attributes.meta_description}</h3>
        <h1>{heroBanner.attributes.slug}</h1>
        <img src={fromImagetoUrl(heroBanner.attributes.image.data.attributes)} alt='crop' className='hero-banner-image' />

        <div>
          <Link href='/product/ID'>
            <button type='button'>BUTTON TEXT</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>DESCRIPTION</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroBanner