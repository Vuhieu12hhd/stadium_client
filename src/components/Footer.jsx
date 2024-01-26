import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer  className='footer-wrapper footer-wrapper--mod'>
      <section className='container'>
        <div className='col-xs-4 col-md-2 footer-nav'>
          <ul className='nav-link'>
            <li>
              <Link href='#' className='nav-link__item'>
                City
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Match
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Đánh giá 
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Rates
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-xs-4 col-md-2 footer-nav'>
          <ul className='nav-link'>
            <li>
              <Link href='#' className='nav-link__item'>
                Trận đấu sắp tới
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                SVĐ
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Best offers
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                News
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-xs-4 col-md-2 footer-nav'>
          <ul className='nav-link'>
            <li>
              <Link href='#' className='nav-link__item'>
                Terms of use
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Gallery
              </Link>
            </li>
            <li>
              <Link href='#' className='nav-link__item'>
                Contacts
              </Link>
            </li>
            <li>
              <Link to='#' className='nav-link__item'>
                Shortcodes
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-xs-12 col-md-6'>
          <div className='footer-info'>
            <p className='heading-special--small'>
              K+ Sport
              <br />
              <span className='title-edition'>Thế giới thể thao 24h</span>
            </p>

            <div className='social'>
              <Link href='#' className='social__variant fa fa-facebook'></Link>
              <Link href='#' className='social__variant fa fa-twitter'></Link>
              <Link href='#' className='social__variant fa fa-vk'></Link>
              <Link href='#' className='social__variant fa fa-instagram'></Link>
              <Link href='#' className='social__variant fa fa-tumblr'></Link>
              <Link href='#' className='social__variant fa fa-pinterest'></Link>
            </div>

            <div className='clearfix'></div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
