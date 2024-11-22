import { Connection } from '../connection/connection';

export class UserRepository {

	connection:Connection;

	save(){
		console.info(`save users with connection ${this.connection.getName()}`);
	}
}

export function createUserRepository(connection: Connection) : UserRepository{
	const repository = new UserRepository();
	repository.connection = connection;
	return repository;
}

