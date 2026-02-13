import { PartialType } from '@nestjs/mapped-types';
import { CreateNewArrivalDto } from './create-new-arrival.dto';

export class UpdateNewArrivalDto extends PartialType(CreateNewArrivalDto) {}
