import { Global, Module } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { MidService } from './mid/mid.service';

@Global()
@Module({
  providers: [MessageService, MidService],
  exports: [MessageService, MidService],
})
export class HelpersModule {}
