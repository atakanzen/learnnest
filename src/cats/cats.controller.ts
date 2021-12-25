import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto): string {
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
    res.status(HttpStatus.OK);

    return 'This action returns all cats';
  }

  // @Get()
  // async findAllAsyncVersionOne(): Promise<any[]> {
  //   return [];
  // }

  // @Get()
  // findAllAsyncVersionTwo(): Observable<any[]> {
  //   return of([]);
  // }

  @Get(':id')
  findOne(
    // Explicit parameter type conversion by using Pipes.
    // Only works while auto-transformation is disabled on global pipes.
    @Param('id', ParseIntPipe) id: number,
    @Query('sort', ParseBoolPipe) sort: boolean,
  ): string {
    console.log(typeof id === 'number'); // true
    console.log(typeof sort === 'boolean'); // true
    return `This action returns the cat with id ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `This action removes a #${id} cat`;
  }
}
