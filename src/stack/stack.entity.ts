import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StackEntity {
  @Field(() => Int, {
    description: 'Unique identifier for the tech stack',
  })
  id: number;

  @Field(() => String, { description: 'Name of the technology' })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Link to the technology documentation or homepage',
  })
  link: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Icon representing the technology',
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
