import React from 'react';
import styled from 'styled-components';

const ShardInput = ({
  type,
  value,
  onChange,
  minLength,
  maxLength,
  placeholder,
  inputType,
}) => {
  return (
    <StInput
      type={type}
      value={value}
      onChange={(e) => onChange(e, inputType)}
      minLength={minLength}
      maxLength={maxLength}
      placeholder={placeholder}
    />
  );
};

const StInput = styled.input`
  width: 100%;
  height: 5rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

export default ShardInput;
