import Scrypt from 'scrypt-kdf';
import nacl from 'tweetnacl';

import * as Time from '@/backend/lib/time';

interface KeyPair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

interface Message {
  id: string;
  exp: number;
}

function bytesOfUTF8(s: string) {
  return Uint8Array.from(Buffer.from(s, 'utf8'));
}

function utf8OfBytes(bytes: Uint8Array) {
  return Buffer.from(bytes).toString('utf8');
}

function hexOfBytes(bytes: Uint8Array) {
  return Buffer.from(bytes).toString('hex');
}

function bytesOfHex(hex: string) {
  return Uint8Array.from(Buffer.from(hex, 'hex'));
}

export class CryptoService {
  private keyPair: KeyPair;

  constructor(private expirationInDays: number) {
    this.keyPair = nacl.sign.keyPair();
  }

  verifySessionToken(token: string): boolean {
    const opened: Uint8Array | null = nacl.sign.open(bytesOfHex(token), this.keyPair.publicKey);
    if (opened && (JSON.parse(utf8OfBytes(opened)) as Message).exp > +Time.now()) {
      return true;
    } else {
      return false;
    }
  }

  mintSessionToken(id: string): string {
    if (typeof id !== 'string') throw new Error('id not string');
    if (!id.length) throw new Error('id empty');
    const message: Message = {id, exp: +Time.addDays(Time.now(), this.expirationInDays)};
    return hexOfBytes(nacl.sign(bytesOfUTF8(JSON.stringify(message)), this.keyPair.secretKey));
  }

  async passwordKeyDerive(password: string): Promise<string> {
    // {logN: 15} comes from https://blog.filippo.io/the-scrypt-parameters/
    const key = await Scrypt.kdf(password, {logN: 15, r: 8, p: 1});
    return key.toString('hex');
  }

  async verifyPassword(pair: {plaintext: string; digest: string}): Promise<boolean> {
    try {
      return Scrypt.verify(Buffer.from(pair.digest, 'hex'), pair.plaintext);
    } catch (e) {
      return false;
    }
  }
}
