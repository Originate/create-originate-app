import * as React from 'react';
import ReactDOM from 'react-dom';

import {parseEnv} from './src/env';
import {Hello} from './src/components/hello';
import {Error} from './src/components/error';

const main = () => {
  const div = document.createElement('div');
  document.querySelector('body')?.appendChild(div);

  const env = parseEnv();
  if (typeof env == 'string') {
    ReactDOM.render(
      <Error
        header="unable to parse webpack env"
        message={env}
        footer="unsolicited advice: check your packages/frontend/.env file"
      />,
      div,
    );
  } else {
    ReactDOM.render(<Hello env={env} />, div);
  }
};

main();
