import { Expose, Transform, Type } from 'class-transformer';
import { ReportDTO } from './report.dto';

export class ResCreateReportDTO {
  @Type(() => ReportDTO)
  @Expose()
  report: ReportDTO;

  @Transform(({ obj }) => obj.report.user.id)
  @Expose()
  user_id: number;

  @Expose()
  message: string;
}

export class ResApproveReportDTO {
  @Type(() => ReportDTO)
  @Expose()
  report: ReportDTO;

  @Expose()
  message: string;
}

export class ResGetEstimateDTO {
  @Expose()
  price: number;

  @Expose()
  message: string;
}
