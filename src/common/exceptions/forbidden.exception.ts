import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomForbiddenException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: 'it is forbidden to change a cat.',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
