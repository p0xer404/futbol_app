import React from 'react';

export const Card = ({ children, ...props }) => {
  return <div className="card" {...props}>{children}</div>;
};

export const CardContent = ({ children, ...props }) => {
  return <div className="card-content" {...props}>{children}</div>;
};