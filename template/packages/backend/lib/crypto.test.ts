import {CryptoService} from './crypto';
import * as RawTime from '@/backend/lib/time';

const crypto = new CryptoService(3);
const Time = RawTime as jest.Mocked<typeof RawTime>;

jest.mock('@/backend/lib/time', () => ({now: jest.fn(), addDays: jest.fn()}));

beforeEach(() => jest.resetAllMocks());

describe('session tokens', () => {
  it('round-trips', async () => {
    Time.now.mockImplementation(() => new Date());
    Time.addDays.mockImplementation(() => new Date(+new Date() + 999));
    const token = crypto.mintSessionToken('user@example.com');
    const verification = crypto.verifySessionToken(token);
    expect(verification).toBe(true);
  });

  it('expires', async () => {
    Time.now.mockImplementation(() => new Date());
    Time.addDays.mockImplementation(() => new Date());
    const token = crypto.mintSessionToken('user@example.com');
    const verification = crypto.verifySessionToken(token);
    expect(verification).toBe(false);
  });
});

describe('password digests', () => {
  it('round-trips', async () => {
    const key = await crypto.passwordKeyDerive('password');
    expect(await crypto.verifyPassword({plaintext: 'password', digest: key})).toBe(true);
  });
});
