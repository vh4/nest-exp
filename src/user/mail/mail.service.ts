export class MailService {
  send(): void {
    console.info('sending mail....');
  }
}

export const mailServiceInject = new MailService();
