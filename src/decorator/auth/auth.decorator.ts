import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Request } from 'express';
import { AuthMiddleware } from 'src/middleware/auth/auth.middleware';

export const Auth = createParamDecorator(
	(data:unknown, ctx:ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>();
		return request.user;
	})
