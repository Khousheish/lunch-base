import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsDate({ each: true })
  @Type(() => Date)
  readonly validDates: Date[];
}
