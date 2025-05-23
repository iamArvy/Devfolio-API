import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { ExperienceModule } from './experience/experience.module';
import { CertificationModule } from './certification/certification.module';
import { SocialModule } from './social/social.module';
import { StackModule } from './stack/stack.module';
import { ClientAuthStrategy } from './strategies/custom.strategy';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      sortSchema: true,
    }),
    ProfileModule,
    ProjectModule,
    ExperienceModule,
    CertificationModule,
    SocialModule,
    StackModule,
  ],
  providers: [AppService, ClientAuthStrategy],
})
export class AppModule {}
