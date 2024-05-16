import { RootModule } from '@application/di/RootModule';
import { ServerApplicationConfig } from '@infrastructure/config/ServerApplicationConfig';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class ServerApplication {
  private readonly host: string = ServerApplicationConfig.HOST;

  private readonly port: number = ServerApplicationConfig.PORT;

  public async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(RootModule);

    const logEnabled: boolean = ServerApplicationConfig.LOG_ENABLE;
    app.useLogger(logEnabled ? ServerApplicationConfig.LOG_LEVEL : logEnabled);

    this.buildAPIDocumentation(app);
    this.log();

    await app.listen(this.port, this.host);
  }

  private buildAPIDocumentation(app: NestExpressApplication): void {
    const title: string = 'MKS Systems and Enterprise Development Ltda.';
    const description: string = 'MKS Backend Challenge';
    const version: string = '1.0.0';

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('documentation', app, document);
  }

  private log(): void {
    Logger.log(`Server started on host: ${this.host}; port: ${this.port};`, ServerApplication.name);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
