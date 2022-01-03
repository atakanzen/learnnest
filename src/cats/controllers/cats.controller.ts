import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  ImATeapotException,
  // HttpStatus,
  Param,
  // ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  // Query,
  Redirect,
  // Req,
  // Res,
} from '@nestjs/common';
import { CustomForbiddenException } from 'src/common/exceptions/forbidden.exception';
// import { Response, Request } from 'express';
// import { Observable, of } from 'rxjs';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { Cat } from '../interfaces/cat.interface';
import { CatsService } from '../providers/cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get('old')
  @HttpCode(301)
  @Redirect('http://localhost:3000/cats')
  goNewUrl() {
    return null;
  }

  // @Get()
  // findAll(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ): string {
  //   console.log(req.query);
  //   res.cookie('foo', 'bar');
  //   res.cookie('cat-type', 'cute');
  //   res.status(HttpStatus.OK);

  //   return 'This action returns all cats';
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // @Get()
  // findAllAsyncVersionTwo(): Observable<any[]> {
  //   return of([]);
  // }

  @Get(':id')
  findOne(
    // Explicit parameter type conversion by using Pipes.
    // Only works while auto-transformation is disabled on global pipes.
    @Param('id', ParseIntPipe) id: number,
    // @Query('sort', ParseBoolPipe) sort: boolean,
  ): Cat {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    // Only for demonstration purposes.
    throw new CustomForbiddenException();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    throw new ImATeapotException('How dare you?');
  }
}
