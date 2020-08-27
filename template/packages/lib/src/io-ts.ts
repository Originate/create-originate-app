import {isLeft} from 'fp-ts/lib/Either';
import * as D from 'io-ts/lib/Decoder';

export function withDefault<T, U>(defaultValue: U, decoder: D.Decoder<T, U>): D.Decoder<T, U> {
  return {
    decode: (u) => {
      const result = decoder.decode(u);
      return isLeft(result) ? D.success(defaultValue) : result;
    },
  };
}
