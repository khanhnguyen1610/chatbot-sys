import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
  @ApiProperty()
  data: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  totalPages: number;

  constructor(data: T[], total: number, page: number, perPage: number) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.perPage = perPage;
    this.totalPages = Math.ceil(total / perPage);
  }
}
