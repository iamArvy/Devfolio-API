import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CertificationEntity {
  @Field(() => String, {
    description: 'Unique identifier for the certification',
  })
  id: string;

  @Field(() => String, { description: 'Name of the certification' })
  name: string;

  @Field(() => String, {
    description: 'Location where the certification was obtained',
  })
  location: string;

  @Field(() => [String], {
    nullable: true,
    description: 'Details or accomplishments from the certification',
  })
  highlights: string[];

  @Field(() => String, {
    description: 'Date the certification was acquired (ISO string)',
  })
  date_acquired: string;

  @Field(() => String, { description: 'ID of the associated user' })
  user_id: string;

  @Field(() => String, {
    nullable: true,
    description: 'Media related to the certification (e.g., certificate file)',
  })
  media: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Optional link to verify or reference the certification',
  })
  link: string | null;

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
