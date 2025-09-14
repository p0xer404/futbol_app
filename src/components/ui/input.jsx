import React from 'react';

export const Input = ({ value, onChange, placeholder, ...props }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input"
      {...props}
    />
  );
};