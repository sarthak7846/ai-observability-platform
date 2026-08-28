import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Prisma } from 'generated/prisma/client';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafka: ClientKafka,
  ) {}

  async publishTrace(trace: any): Promise<void> {
    console.log('Publishing:', new Date().toISOString());

    await lastValueFrom(this.kafka.emit('trace.created', trace));

    console.log('Kafka acknowledged:', new Date().toISOString());
  }
}

// export class KafkaService implements OnModuleInit, OnModuleDestroy {
//   private readonly kafka = new Kafka({
//     clientId: 'observe-api',
//     brokers: ['localhost:9092'],
//   });

//   private readonly producer: Producer = this.kafka.producer();

//   async onModuleInit() {
//     await this.producer.connect();
//   }

//   async publishTrace(trace: any) {
//     await this.producer.send({
//       topic: 'trace.created',
//       messages: [
//         {
//           value: JSON.stringify(trace),
//         },
//       ],
//     });
//   }

//   async onModuleDestroy() {
//     await this.producer.disconnect();
//   }
// }
