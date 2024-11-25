import { MessageService } from 'src/helpers/message/message.service';
import { ErrorFilter } from './error.filter';

describe('ErrorFilter', () => {
  it('should be defined', () => {
    expect(new ErrorFilter(new MessageService())).toBeDefined();
  });
});
