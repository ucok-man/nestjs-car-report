import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class ReqCreateReportDTO {
  @Transform(({ value }) => (value as string).toLowerCase())
  @IsString()
  company: string;

  @Transform(({ value }) => (value as string).toLowerCase())
  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number; // age of kilometer car in use

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}

export class ReqApproveReportDTO {
  @IsBoolean()
  approved: boolean;
}

export class ReqGetEstimateDTO {
  @Transform(({ value }) => (value as string).toLowerCase())
  @IsString()
  company: string;

  @Transform(({ value }) => (value as string).toLowerCase())
  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number; // age of kilometer car in use
}
