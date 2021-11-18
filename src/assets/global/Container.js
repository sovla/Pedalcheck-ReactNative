import styled, {css} from 'styled-components/native';
import React from 'react';
import Theme from './Theme';
import pixelChange, {pixelHeightChange} from '@/Util/pixelChange';

export const Container = styled.View`
  flex: 1;
  display: flex;
  justify-content: ${p => p.justifyContent ?? 'flex-start'};
  align-items: ${p => p.alignItems ?? 'flex-start'};
  padding: ${p => pixelChange(p.pd) ?? '0px'};
  margin: ${p => pixelChange(p.mg) ?? '0px'};
  width: ${p => pixelChange(p.width) ?? 'auto'};
  height: ${p => p.height ?? 'auto'};

  background-color: ${p => p.backgroundColor ?? Theme.color.white};
  z-index: ${p => p.zIndex ?? 0};
  border-radius: ${p => p.borderRadius ?? 0};
  ${p =>
    p.minWidth &&
    css`
      min-width: ${pixelChange(p.minWidth)};
    `};
  ${p =>
    p.minHeight &&
    css`
      min-height: ${p.minHeight};
    `};
  ${p =>
    p.flex &&
    css`
      flex: ${p.flex};
    `};

  ${p =>
    p.flexWrap &&
    css`
      flex-wrap: ${p.flexWrap};
    `};
`;
export const Box = styled.View`
  display: flex;
  justify-content: ${p => p.justifyContent ?? 'flex-start'};
  align-items: ${p => p.alignItems ?? 'flex-start'};
  padding: ${p => pixelChange(p.pd) ?? '0px'};
  margin: ${p => pixelChange(p.mg) ?? '0px'};

  background-color: ${p => p.backgroundColor ?? Theme.color.white};
  z-index: ${p => p.zIndex ?? 0};
  border-radius: ${p => p.borderRadius ?? 0};

  ${p =>
    p.width &&
    css`
      width: ${pixelChange(p.width)};
    `};
  ${p =>
    p.height &&
    css`
      height: ${p.height};
    `};
  ${p =>
    p.minWidth &&
    css`
      min-width: ${pixelChange(p.minWidth)};
    `};
  ${p =>
    p.minHeight &&
    css`
      min-height: ${pixelChange(p.minHeight)};
    `};
  ${p =>
    p.flexWrap &&
    css`
      flex-wrap: ${p.flexWrap};
    `};
`;

export const ScrollBox = styled.ScrollView`
  display: flex;
  padding: ${p => pixelChange(p.pd) ?? '0px'};
  margin: ${p => pixelChange(p.mg) ?? '0px'};

  background-color: ${p => p.backgroundColor ?? Theme.color.white};
  z-index: ${p => p.zIndex ?? 0};
  border-radius: ${p => p.borderRadius ?? 0};

  ${p =>
    p.width &&
    css`
      width: ${pixelChange(p.width)};
    `};
  ${p =>
    p.height &&
    css`
      height: ${p.height};
    `};
  ${p =>
    p.minWidth &&
    css`
      min-width: ${pixelChange(p.minWidth)};
    `};
  ${p =>
    p.minHeight &&
    css`
      min-height: ${pixelChange(p.minHeight)};
    `};
  ${p =>
    p.flexWrap &&
    css`
      flex-wrap: ${p.flexWrap};
    `};
`;

export const RowBox = styled(Box)`
  flex-direction: row;
`;

export const PositionBox = styled(Box)`
  ${p =>
    (p.top || p.left || p.right || p.bottom) &&
    css`
      position: absolute;
    `}
  ${p =>
    p.top &&
    css`
      top: ${pixelChange(p.top)};
    `}
  ${p =>
    p.left &&
    css`
      left: ${pixelChange(p.left)};
    `}
    ${p =>
    p.right &&
    css`
      right: ${pixelChange(p.right)};
    `}
    ${p =>
    p.bottom &&
    css`
      bottom: ${pixelChange(p.bottom)};
    `}
`;
