import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { createConnection, ConnectionOptions } from "typeorm";

const dbSettings: ConnectionOptions = {
  type: "postgres",
  host: "lermex.site",
  port: 18874,
  username: "postgres",
  password: "212a418416367de527745b4731f94336",
  database: "parking_api_database",
  entities: ["src/**/**.entity{.ts,.js}"],
  synchronize: true
};

async function bootstrap() {
  createConnection(dbSettings)
  .catch(error => console.log(error));

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.NODE_ENV === 'production' ? 5000 : 3000);
}

bootstrap();