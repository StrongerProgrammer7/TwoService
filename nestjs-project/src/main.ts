import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';

async function bootstrap() 
{
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Service users with problem")
    .setDescription("Server:NestJS and PG and typeORM for migration")
    .setVersion("1.0.0")
    .addTag("NEST")
    .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("/",app,document);

  await app.listen(PORT,() => console.log(`Server has been started on the PORT=${PORT} with protocol=HTTP http://localhost:${PORT}`));
}
bootstrap();
