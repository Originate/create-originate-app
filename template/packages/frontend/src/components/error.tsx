import * as React from 'react';

export const Error: React.FC<{header: string; message: string; footer: string}> = ({header, message, footer}) => {
  return (
    <pre>
      <strong>{header}</strong>
      <br />
      <br />
      {message}
      <br />
      <br />
      {footer}
    </pre>
  );
};
