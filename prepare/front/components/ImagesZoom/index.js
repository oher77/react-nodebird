import React, { useState } from 'react';
import Slick from 'react-slick';
import PropTypes from 'prop-types';

import { Overlay, Header, CloseButton, SlickWrapper, Indicator, ImageWrapper, Global } from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currnetSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseButton onClick={onClose} />
      </Header>
      <SlickWrapper>
        <Slick
          initialSlide={0}
          afterChange={(slide) => setCurrentSlide(slide)}
          infinite
          arrows={false}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {images.map((v) => (
            <ImageWrapper key={v.src}>
              <img src={v.src} alt={v.src} />
            </ImageWrapper>
          ))}
        </Slick>
        <Indicator>
          <div>
            {currnetSlide + 1}
            {''}
            /
            {images.length}
          </div>
        </Indicator>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
