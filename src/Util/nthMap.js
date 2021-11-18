import React from 'react';

const withNthMap = WrappedComponent => {
  return props => {
    const isBetween = (props.index + 1) % props.rowNum !== 0;
    return <WrappedComponent {...props} mg={isBetween && props.betweenMargin} />;
  };
};
export const isNthBoolean = (rowNum, index) => {
  return (index + 1) % rowNum !== 0;
};

export const nthNumber = (rowNum, index) => {
  return (index + 1) % rowNum;
};

export const isLastChild = (arrayLength, index) => {
  return arrayLength - 1 === index;
};

export default withNthMap;
