import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailsService } from './emails.service';
import { CreateEmailDto } from './dto/create-email.dto';

@Controller()
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @MessagePattern('createEmail')
  create(@Payload() createEmailDto: CreateEmailDto) {
    return this.emailsService.create(createEmailDto);
  }

  @MessagePattern('findAllEmails')
  findAll() {
    return this.emailsService.findAll();
  }

  @MessagePattern('removeEmail')
  remove(@Payload() id: number) {
    return this.emailsService.remove(id);
  }
}
