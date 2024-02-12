import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { ErrEmptyRecord } from '../error/error';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { User } from '../users/entity/user.entity';
import {
  ReqApproveReportDTO,
  ReqCreateReportDTO,
  ReqGetEstimateDTO,
} from './dtos/req.report.dto';
import {
  ResApproveReportDTO,
  ResCreateReportDTO,
  ResGetEstimateDTO,
} from './dtos/res.report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private service: ReportsService) {}

  @Post()
  @Serialize(ResCreateReportDTO)
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async createReport(
    @Body() body: ReqCreateReportDTO,
    @CurrentUser() user: User,
  ) {
    const report = await this.service.create(body, user);
    return { report, message: 'success' };
  }

  @Patch('/:id')
  @Serialize(ResApproveReportDTO)
  @UseGuards(AdminGuard)
  @HttpCode(200)
  async approveReport(
    @Param('id') id: string,
    @Body() body: ReqApproveReportDTO,
  ) {
    try {
      const report = await this.service.changeApproval(id, body.approved);
      return { report, message: 'success' };
    } catch (error) {
      if (error instanceof ErrEmptyRecord) {
        return new NotFoundException(`report with #id ${id} is not found`);
      }
    }
  }

  @Get()
  @Serialize(ResGetEstimateDTO)
  @HttpCode(200)
  async getEstimate(@Query() query: ReqGetEstimateDTO) {
    const estimate = await this.service.createEstimate(query);
    if (!estimate.price) {
      return {
        message:
          'sorry, we have not enough data for calculating your current request',
        price: estimate.price,
      };
    }

    return { message: 'success', price: estimate.price };
  }
}
