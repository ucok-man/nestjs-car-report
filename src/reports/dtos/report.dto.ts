import { Expose } from 'class-transformer';

export class ReportDTO {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  company: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  mileage: number; // age of kilometer car in use

  @Expose()
  price: number;
}
