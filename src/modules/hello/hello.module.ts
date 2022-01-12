import { Module } from '@nestjs/common';
import { HelloController } from './controllers/hello.controller';

@Module({
  controllers: [HelloController],
})
export class HelloModule {}
