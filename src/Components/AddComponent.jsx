import React from 'react';

const AdComponent = ({ ad }) => {
  return (
    <div>
      <h2>{ad.title}</h2>
      <img src={ad.image} alt={ad.title} />
      <p>{ad.description}</p>
      <a href={ad.link}>Learn More</a>
    </div>
  );
};

export default AdComponent;
