import { DateFromStringPipe } from './date-from-string.pipe';

describe('DateFromStringPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFromStringPipe();
    expect(pipe).toBeTruthy();
  });
});
