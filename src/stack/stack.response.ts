import { ApiProperty } from '@nestjs/swagger';

export class StackResponse {
  @ApiProperty({ description: 'Unique identifier for the tech stack' })
  id: string;

  @ApiProperty({ description: 'Name of the technology' })
  name: string;

  @ApiProperty({
    description: 'Link to the technology documentation or homepage',
    required: false,
    nullable: true,
  })
  link: string;

  @ApiProperty({
    description: 'Icon representing the technology',
    required: false,
    nullable: true,
  })
  icon: string;

  @ApiProperty({ description: 'ID of the associated user', type: Number })
  user_id: number;

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
