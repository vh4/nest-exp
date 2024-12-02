import { MidService } from 'src/helpers/mid/mid.service';
import { MidMiddleware } from './mid.middleware';

describe('MidMiddleware', () => {
  it('should be defined', () => {
    expect(new MidMiddleware(new MidService())).toBeDefined();
  });
});
