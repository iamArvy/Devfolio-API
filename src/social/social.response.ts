import { ApiProperty } from '@nestjs/swagger';

export class SocialResponse {
  @ApiProperty({ description: 'Unique identifier for the social profile' })
  id: string;

  @ApiProperty({
    description: 'Name of the social platform (e.g., Twitter, GitHub)',
  })
  name: string;

  @ApiProperty({ description: 'Value or handle for the social account' })
  value: string;

  @ApiProperty({
    description: 'Link to the user’s social profile',
    required: false,
    nullable: true,
    example: 'https://example.com',
  })
  link: string | null;

  @ApiProperty({
    description: 'Icon representing the social platform',
    required: false,
    nullable: true,
    example: 'logos:icon',
  })
  icon: string | null;

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
