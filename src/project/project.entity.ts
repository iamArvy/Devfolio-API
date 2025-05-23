import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProjectEntity {
  @Field(() => Int, {
    description: 'Unique identifier for the project',
  })
  id: number;

  @Field(() => String, { description: 'Name of the project' })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'Image associated with the project',
  })
  image: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Brief description of the project',
  })
  description: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Link to the project’s code repository',
  })
  repository: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Link to the live version or demo of the project',
  })
  link: string | null;

  @Field(() => [String], {
    nullable: true,
    description: 'Tags or technologies used in the project',
  })
  tags: string[];

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
