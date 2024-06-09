import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { databaseConnection } from "./db.connection";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' }),
  TypeOrmModule.forRoot({
    ...databaseConnection.options,
    logging: process.env.NODE_ENV === "development",
    autoLoadEntities: true
  }),UsersModule],
})
export class AppModule { }

