import { Injectable } from '@nestjs/common';

@Injectable()
export class MidService {
  MessageIdentifier(): string {
    const t = Date.now(); // Current timestamp in milliseconds (13 digits)
    const micro = Math.floor((t % 1000) * 10); // 2-digit microsecond-like value
    const rand = Math.floor(Math.random() * 1000); // 3-digit random number

    const microStr = micro.toString().padStart(2, '0');
    const randStr = rand.toString().padStart(3, '0');

    // Combine parts to form a 19-character MID
    return `${t}${microStr}${randStr}`.slice(0, 19);
  }
}
