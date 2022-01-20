import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsDate({ each: true })
  @Type(() => Date)
  readonly validDates: Date[];
}
