import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Observable, of } from 'rxjs';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('old')
  @Redirect('http://localhost:3000/cats', 301)
  goNewUrl() {
    return null;
  }

  @Get()
  findAll(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): string {
    console.log(req.query);
    res.cookie('foo', 'bar');
    res.cookie('cat-type', 'cute');

    return 'This action returns all cats';
  }

  @Get()
  async findAllAsyncVersionOne(): Promise<any[]> {
    return [];
  }

  @Get()
  findAllAsyncVersionTwo(): Observable<any[]> {
    return of([]);
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action returns the cat with id ${id}`;
  }
}
