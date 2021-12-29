import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsDefined()
  @IsNumber()
  id: number;

  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  age: number;

  @IsDefined()
  @IsString()
  breed: string;
}

export class AdditionalCatInfo {
  color: string;
}
