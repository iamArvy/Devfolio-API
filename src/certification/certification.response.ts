import { ApiProperty } from '@nestjs/swagger';
import { certifications } from '@prisma/client';

export class CertificationResponse implements certifications {
  @ApiProperty({ description: 'Unique identifier for the certification' })
  id: string;

  @ApiProperty({ description: 'Name of the certification' })
  name: string;

  @ApiProperty({ description: 'Location where the certification was obtained' })
  location: string;

  @ApiProperty({
    description: 'Details or accomplishments from the certification',
    type: [String],
    required: false,
  })
  highlights: string[];

  @ApiProperty({
    description: 'Date the certification was acquired',
    example: 'January-2020',
  })
  date_acquired: string | null;

  @ApiProperty({ description: 'ID of the associated user', type: Number })
  user_id: number;

  @ApiProperty({
    description: 'Media related to the certification (e.g., certificate file)',
    required: false,
    nullable: true,
  })
  media: string;

  @ApiProperty({
    description: 'Optional link to verify or reference the certification',
    required: false,
    nullable: true,
  })
  link: string;

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
