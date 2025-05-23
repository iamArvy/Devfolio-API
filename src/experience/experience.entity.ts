import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ExperienceEntity {
  @Field(() => String, {
    description: 'Unique identifier for the experience',
  })
  id: string;

  @Field(() => String, {
    description: 'Location where the experience took place',
  })
  location: string;

  @Field(() => String, { description: 'ID of the associated user' })
  user_id: string;

  @Field(() => String, { description: 'Role or position held' })
  role: string;

  @Field(() => [String], {
    nullable: true,
    description: 'Highlights or responsibilities during the experience',
  })
  highlights: string[];

  @Field(() => String, {
    description: 'Start date of the experience (ISO string)',
  })
  start_date: string;

  @Field(() => String, {
    description: 'End date of the experience (ISO string)',
  })
  end_date: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Whether the experience is currently active',
  })
  active: boolean | null;

  @Field(() => Date, {
    nullable: true,
    description: 'Date the record was created',
  })
  created_at: Date | null;

  @Field(() => Date, {
    nullable: true,
    description: 'Date the record was last updated',
  })
  updated_at: Date | null;
}
