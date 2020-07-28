import * as React from 'react';
import ReactDOM from 'react-dom';

import {Hello} from './src/components/hello';

const main = () => {
  const div = document.createElement('div');
  document.querySelector('body')?.appendChild(div);
  ReactDOM.render(<Hello />, div);
};

main();
