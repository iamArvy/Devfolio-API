import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponse {
  @ApiProperty({ description: 'Unique identifier for the project' })
  id: string;

  @ApiProperty({ description: 'Name of the project' })
  name: string;

  @ApiProperty({
    description: 'Image associated with the project',
    nullable: true,
    required: false,
  })
  image: string;

  @ApiProperty({
    description: 'Brief description of the project',
    nullable: true,
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'Link to the project’s code repository',
    nullable: true,
    required: false,
  })
  repository: string;

  @ApiProperty({
    description: 'Link to the live version or demo of the project',
    nullable: true,
    required: false,
  })
  link: string;

  @ApiProperty({
    description: 'Tags or technologies used in the project',
    type: [String],
    nullable: true,
  })
  tags: string[];

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
