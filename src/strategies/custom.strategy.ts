import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { AppService } from 'src/app.service';

@Injectable()
export class ClientAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private service: AppService) {
    super();
  }

  async validate(req: Request) {
    const clientId = req.header('x-client-id');
    const clientSecret = req.header('x-client-secret');

    if (!clientId || !clientSecret) {
      throw new Error('Missing client credentials');
    }

    const user = await this.service.validateClient(clientId, clientSecret);
    return user;
  }
}
