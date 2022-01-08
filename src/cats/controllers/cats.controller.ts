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
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  // Req,
  // Res,
} from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { CustomForbiddenException } from '../../common/exceptions/forbidden.exception';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { RolesGuard } from '../../common/guards/roles.guard';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { ClassValidationPipe } from '../../common/pipes/class.validation.pipe';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { createCatSchema } from '../../common/schemas/joi.create-cat.schema';
// import { Response, Request } from 'express';
// import { Observable, of } from 'rxjs';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { Cat } from '../interfaces/cat.interface';
import { CatsService } from '../providers/cats.service';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
export class CatsController {
  // Injecting `CatsService` provider.
  constructor(private catsService: CatsService) {}

  @Post()
  @Header('Cache-Control', 'none')
  // Joi Schema Validation
  @UsePipes(new JoiValidationPipe(createCatSchema))
  // Class-Validator Validation (Only Typescript)
  create(@Body(new ClassValidationPipe()) createCatDto: CreateCatDto) {
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
  @Roles('admin')
  @UseFilters(new HttpExceptionFilter())
  update(
    // Binding Parse Pipe on method level. Nest will throw an exception if the parameter is not numeric.
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    throw new CustomForbiddenException();
  }

  // We can let the initiation of the filter to the framework via DI, like here.
  @UseFilters(HttpExceptionFilter)
  @Delete(':id')
  remove(@Param('id') id: number) {
    throw new ImATeapotException('How dare you?');
  }
}
