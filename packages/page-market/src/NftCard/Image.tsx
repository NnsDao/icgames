import React from 'react';
import styled from 'styled-components';

interface ImageProps {
  src: string;
  alt: string;
  originalLink?: string;
}

const Container = styled.div`
  background-color: #272270;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100%;
`;

const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transition: opacity 1s linear;
  height: 100%;
  object-fit: cover;
  border-radius: 32px 32px 0 0;
`;

const Image: React.FC<ImageProps> = ({ alt, originalLink, src }) => {
  const previewImage = <StyledImage alt={alt} src={src} />;

  return (
    <Container>
      {originalLink ? (
        <a href={originalLink} rel="noreferrer noopener" target="_blank">
          {previewImage}
        </a>
      ) : (
        previewImage
      )}
    </Container>
  );
};

export default Image;
