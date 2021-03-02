import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product, className }) => {
  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : `https://dummyimage.com/721x401`;
  return <img className={className} src={imageUrl} alt="product" />;
};

export default ImageHelper;
