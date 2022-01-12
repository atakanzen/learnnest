import { /* Global, */ Module } from '@nestjs/common';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './providers/cats.service';

// @Global() makes the module global-scoped. Exported providers will be ubiquitous and the module that exports them will not be required to
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  // Sharing the same instance of the service throughout the modules that imports the CatsModule
  exports: [CatsService],
})
export class CatsModule {}
