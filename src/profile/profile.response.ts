import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponse {
  @ApiProperty({ description: 'Unique identifier for the profile' })
  id: string;

  @ApiProperty({ description: 'Full name of the user' })
  fullname: string;

  @ApiProperty({ description: 'Job title or role of the user' })
  job_description: string;

  @ApiProperty({ description: 'Short biography of the user' })
  bio: string;

  @ApiProperty({ description: 'Phone number of the user' })
  phone: string;

  @ApiProperty({ description: 'Email address of the user' })
  email: string;

  @ApiProperty({ description: 'Geographic location of the user' })
  location: string;

  @ApiProperty({ description: 'ID of the associated user', type: Number })
  user_id: number;

  @ApiProperty({
    description: 'Date the profile was created',
    type: String,
    format: 'date-time',
    required: false,
    nullable: true,
  })
  created_at: Date | null;

  @ApiProperty({
    description: 'Date the profile was last updated',
    type: String,
    format: 'date-time',
    required: false,
    nullable: true,
  })
  updated_at: Date | null;
}
