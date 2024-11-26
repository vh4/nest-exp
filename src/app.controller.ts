import { Controller, Get, Header, HttpCode, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res() res: Response) {
    return res.render('index.hbs', {
      name: 'Nest.js',
    });
  }

  @Get('/api/_healthy/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  healthy(@Param('id') id: string): Record<string, any> {
    return this.appService.healthy(id);
  }
}
