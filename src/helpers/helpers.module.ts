import { Global, Module } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { MidService } from './mid/mid.service';
import { ErrorHandlerCustomService } from './error-handler-custom/error-handler-custom.service';

@Global()
@Module({
  providers: [MessageService, MidService, ErrorHandlerCustomService],
  exports: [MessageService, MidService, ErrorHandlerCustomService],
})
export class HelpersModule {}
