import { SafeUrlPipe } from './safe-url.pipe';

describe('SafeUrlPipe', () => {
  const mockSanitizer = null;

  it('create an instance', () => {
    const pipe = new SafeUrlPipe(mockSanitizer);
    expect(pipe).toBeTruthy();
  });
});
