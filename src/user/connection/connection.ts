import { Injectable } from '@nestjs/common';

@Injectable()
export class Connection {

	getName():string{
		return null;
	}

}

@Injectable()
export class MysqlConnection extends Connection{
	getName(): string {
		return 'mysql';
	}
}

@Injectable()
export class PostgesConnection extends Connection{
	getName(): string {
		return 'postgresql';
	}
}