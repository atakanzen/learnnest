import { Controller, Get } from '@nestjs/common';
import { User } from '../../../common/decorators/user.decorator';

@Controller('hello')
export class HelloController {
  @Get()
  findOne(@User('firstName') firstName: string) {
    return `Hello ${firstName}`;
  }
}
