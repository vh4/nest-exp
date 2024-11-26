import { Injectable } from '@nestjs/common';

@Injectable()
export class MidService {
	MessageIdentifier(): string {

		const t = Date.now();
		const micro = Math.floor((t % 1000) * 10);  // 3 digit
		const rand = Math.floor(Math.random() * 10000);  // 4 digit
		const time = new Date(t).getTime();  // 13 digit
		
		const microStr = micro.toString().padStart(3, '0');
		const randStr = rand.toString().padStart(4, '0');
		
		return `${time}${microStr}${randStr}`;

	}
}
