import { FC } from 'react';

import { getPropertyValue, getResponsiveFontSize } from '../model';

import s from './Containers.module.css';

interface ContainerProps {
  className?: string;
  heading: string;
  label: string;
}

export const Container: FC<ContainerProps> = ({
  className,
  heading,
  label
}) => {
  const fontFamily = getPropertyValue('--containerFontFamily');
  const fontWeight = getPropertyValue('--containerFontWeight');
  const maxFont = parseFloat(getPropertyValue('--containerFontSize'));
  const maxWidth = parseFloat(getPropertyValue('--containerMaxWidth'));

  const fontSize = getResponsiveFontSize({
    fontFamily,
    fontWeight,
    maxFont,
    maxWidth,
    text: heading
  });

  return (
    <>
      <div className={s.label}>{label}</div>
      <div className={s.container}>
        <h1
          className={className}
          style={{
            fontSize
          }}
        >
          {heading}
        </h1>
      </div>
    </>
  );
};
