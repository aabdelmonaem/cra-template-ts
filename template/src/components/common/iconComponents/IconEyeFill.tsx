import React, { forwardRef, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string;
  size?: string | number;
  title?: string;
}
export const IconEyeFill =  forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor', size = '1em', title, ...rest }, ref) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill={color}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path  fillRule="evenodd" d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      <path  fillRule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
    </svg>
  );
});



