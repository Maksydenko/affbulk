interface IGetResponsiveFontSize {
  fontFamily: string;
  fontWeight: number | string;
  maxFont: number;
  maxWidth: number;
  text: string;
}

export const getResponsiveFontSize = ({
  fontFamily,
  fontWeight,
  maxFont,
  maxWidth,
  text
}: IGetResponsiveFontSize) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  let fontSize = maxFont;

  while (fontSize > 5) {
    const font = [fontWeight, `${fontSize}px`, fontFamily].join(' ');
    ctx.font = font;

    const textWidth = ctx.measureText(text).width;

    if (textWidth <= maxWidth) {
      break;
    }

    --fontSize;
  }

  return fontSize;
};
