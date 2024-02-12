import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrEmptyRecord } from '../error/error';
import { User } from '../users/entity/user.entity';
import { ReqCreateReportDTO, ReqGetEstimateDTO } from './dtos/req.report.dto';
import { Report } from './entity/report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createEstimate(input: ReqGetEstimateDTO) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('company = :company', { company: input.company })
      .andWhere('model = :model', { model: input.model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: input.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: input.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: input.year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: input.mileage })
      .limit(3)
      .getRawOne<{ price: number }>();
  }

  create(input: ReqCreateReportDTO, user: User) {
    const report = this.repo.create(input);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!report) {
      throw new ErrEmptyRecord();
    }

    report.approved = approved;
    return this.repo.save(report);
  }
}
