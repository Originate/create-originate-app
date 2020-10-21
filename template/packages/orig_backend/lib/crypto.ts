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

  constructor() {
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

  mintSessionToken(id: string, expiration: {days: number}): string {
    if (typeof id !== 'string') throw new Error('id not string');
    if (!id.length) throw new Error('id empty');
    const message: Message = {id, exp: +Time.addDays(Time.now(), expiration.days)};
    return hexOfBytes(nacl.sign(bytesOfUTF8(JSON.stringify(message)), this.keyPair.secretKey));
  }

  async passwordKeyDerive(password: string): Promise<Buffer> {
    // {logN: 15} comes from https://blog.filippo.io/the-scrypt-parameters/
    return await Scrypt.kdf(password, {logN: 15, r: 8, p: 1});
  }

  async verifyPassword(pair: {plaintext: string; digest: Buffer}): Promise<boolean> {
    try {
      return Scrypt.verify(pair.digest, pair.plaintext);
    } catch (e) {
      return false;
    }
  }
}
