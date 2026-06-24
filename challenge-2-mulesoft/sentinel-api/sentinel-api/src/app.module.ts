import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AddressModule } from './address/address.module';
import { ApplicationModule } from './application/application.module';
import { ContactModule } from './contact/contact.module';
import { DeviceModule } from './device/device.module';
import { DocumentModule } from './document/document.module';
import { EventModule } from './event/event.module';
import { OrganisationModule } from './organisation/organisation.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { ReferenceModule } from './reference/reference.module';
import { ShotModule } from './shot/shot.module';
import { UserAccountModule } from './user-account/user-account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(__dirname, '..', '.env.local'),
        join(__dirname, '..', '.env'),
      ],
    }),
    DatabaseModule,
    HealthModule,
    AddressModule,
    ApplicationModule,
    ContactModule,
    DeviceModule,
    DocumentModule,
    EventModule,
    OrganisationModule,
    PaymentModule,
    ProductModule,
    ReferenceModule,
    ShotModule,
    UserAccountModule,
  ],
})
export class AppModule {}
