import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SocialEntity {
  @Field(() => Int, {
    description: 'Unique identifier for the social profile',
  })
  id: number;

  @Field(() => String, {
    description: 'Name of the social platform (e.g., Twitter, GitHub)',
  })
  name: string;

  @Field(() => String, {
    description: 'Value or handle for the social account',
  })
  value: string;

  @Field(() => String, {
    nullable: true,
    description: 'Link to the user’s social profile',
  })
  link: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Icon representing the social platform',
  })
  icon: string | null;

  @Field(() => Int, { description: 'ID of the associated user' })
  user_id: number;

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
