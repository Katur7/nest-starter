import { Controller, Get, HttpStatus } from 'nest.js';
import { Request, Response } from 'express';

@Controller()
export class LoginController {
  @Get('test')
  public test(req: Request, res: Response) {
    res.status(HttpStatus.OK).json([{
        id: 1, name: 'Test2'
    }]);
  }
}
