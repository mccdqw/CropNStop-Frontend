import React from 'react'
import Link from 'next/Link'
import { fromImagetoUrl } from '../utils/urls';

const FooterBanner = ({ footerBanner }) => {
  console.log(footerBanner)
  return (
    <div className="footer-banner-container"> 
      <div className="banner-desc">
        <div className="left">
          {/* <p>{footerBanner.attributes.content}</p> */}
          <img src={fromImagetoUrl(footerBanner.attributes.image.data.attributes)} alt='crop'
          width={200}
          height={200}
          className="product-image" />
        </div>
        {/* <div className="middle-col">
          <h4>Explore</h4>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Instagram</a>
        </div> */}
        <div className="right">
          <p>{footerBanner.attributes.meta_title}</p>
          <h3>{footerBanner.attributes.meta_description}</h3>
          <Link href={`/products?filters[slug]=${footerBanner.id}`}>
            <button type="button">Shop Now</button>
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default FooterBanner