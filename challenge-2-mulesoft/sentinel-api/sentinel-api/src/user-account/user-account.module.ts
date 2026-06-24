import { Module } from '@nestjs/common';
import { UserAccountController } from './user-account.controller';
import { UserAccountService } from './user-account.service';
import { UserAccountRepository } from './user-account.repository';

@Module({
  controllers: [UserAccountController],
  providers: [UserAccountService, UserAccountRepository],
  exports: [UserAccountService],
})
export class UserAccountModule {}
