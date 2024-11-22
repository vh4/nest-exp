import { Controller, Get, HttpCode, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { UserRepository } from '../user-repository/user-repository';
import { MailService } from '../mail/mail.service';

@Controller('/api/user')
export class UserController {
	
	// @Inject()
	// private UserService:UserService;
	// @Inject(Connection)
	// private readonly connection: Connection;

	constructor(
		private UserService:UserService,
		private connection:Connection,
		private userRepository:UserRepository,
		private mailserviceinject:MailService
	){}

	// private userRepository:UserRepository

	@Get('/_healthy')
	@HttpCode(200)
	UserHealthy(): Record<string, string>{ //
		return this.UserService.Healthy();
	}

	@Get('/connection')
	ConnectionController():string{
		this.userRepository.save();
		this.mailserviceinject.send();
		return this.connection.getName();
	}
	
}
