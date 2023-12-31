import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as Entities from '../../../db/entities'

export default {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: Object.values(Entities),
    synchronize: true,
    ssl: {
      ca: process.env.SSL_CERT,
    },
  } as TypeOrmModuleOptions),
}