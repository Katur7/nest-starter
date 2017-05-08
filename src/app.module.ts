import { Module } from 'nest.js';

import { LoginController } from './controllers/login';

@Module({
    controllers: [ LoginController ]
})
export class ApplicationModule {}
