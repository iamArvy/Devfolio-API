import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProfileEntity {
  @Field(() => String, {
    description: 'Unique identifier for the profile',
  })
  id: string;

  @Field(() => String, { description: 'Full name of the user' })
  fullname: string;

  @Field(() => String, { description: 'Job title or role of the user' })
  job_description: string;

  @Field(() => String, { description: 'Short biography of the user' })
  bio: string;

  @Field(() => String, { description: 'Phone string of the user' })
  phone: string;

  @Field(() => String, { description: 'Email address of the user' })
  email: string;

  @Field(() => String, { description: 'Geographic location of the user' })
  location: string;

  @Field(() => Int, { description: 'ID of the associated user' })
  user_id: number;

  @Field(() => Date, {
    nullable: true,
    description: 'Date the profile was created',
  })
  created_at: Date | null;

  @Field(() => Date, {
    nullable: true,
    description: 'Date the profile was last updated',
  })
  updated_at: Date | null;
}
