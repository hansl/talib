import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/configuration.service';

async function bootstrap() {
  const fetch = await import('node-fetch');
  (global as any).fetch = fetch.default;

  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);
  const config = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription('MANY Protocol Explorer API')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.port);
}

bootstrap().catch((err) => console.error(err));
