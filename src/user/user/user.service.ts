import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
	Healthy():Record<string, string>{
		return {
			response_code:'00',
			response_message:'Success',
			status:'/api/user/_healthy'
		};	
	}
}
