import { ApiProperty } from '@nestjs/swagger';

export class ExperienceResponse {
  @ApiProperty({ description: 'Unique identifier for the experience' })
  id: string;

  @ApiProperty({ description: 'Location where the experience took place' })
  location: string;

  @ApiProperty({ description: 'ID of the associated user', type: Number })
  user_id: number;

  @ApiProperty({ description: 'Role or position held' })
  role: string;

  @ApiProperty({
    description: 'Highlights or responsibilities during the experience',
    type: [String],
    required: false,
  })
  highlights: string[];

  @ApiProperty({
    description: 'Start date of the experience (ISO string)',
    example: 'January-2020',
  })
  start_date: string;

  @ApiProperty({
    description: 'End date of the experience (ISO string)',
    example: 'January-2020',
  })
  end_date: string;

  @ApiProperty({
    description: 'Whether the experience is currently active',
    type: Boolean,
    required: false,
    nullable: true,
  })
  active: boolean | null;

  @ApiProperty({
    description: 'Date the record was created',
    type: String,
    format: 'date-time',
    required: false,
    nullable: true,
  })
  created_at: Date | null;

  @ApiProperty({
    description: 'Date the record was last updated',
    type: String,
    format: 'date-time',
    required: false,
    nullable: true,
  })
  updated_at: Date | null;
}
