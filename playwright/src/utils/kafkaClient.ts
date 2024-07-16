import { Kafka, Partitioners, Producer } from "kafkajs";
 import { testConfig } from "../testConfig";
 import { CreateUserPayload } from "./kafkaTypes";

 type KafkaMessage<T> = {
     id: string;
     version: string;
     details: {
         action: string;
         personId: number;
         payload: T;
     }
 }

 export class KafkaClient {
     private readonly kafka: Kafka;
     private readonly producer: Producer;

     constructor() {
         const { KAFKA_HOST, KAFKA_USERNAME, KAFKA_PASSWORD } = {
             ...testConfig.kafka
         };
         this.kafka = new Kafka({
             clientId: 'article-e2e-tests',
             brokers: [KAFKA_HOST],
             ssl: true,
             sasl: 
             {
                 mechanism: 'plain',
                 username: KAFKA_USERNAME,
                 password: KAFKA_PASSWORD
             }
         });
         this.producer = this.kafka.producer({
             allowAutoTopicCreation: KAFKA_HOST.includes('localhost'),
             transactionTimeout: 30000,
             createPartitioner: Partitioners.LegacyPartitioner,
         })
     }

     async sendMessages(topic: string, messagesToSend: string[]) {
         await this.producer.connect();
         const messages = messagesToSend.map((msg) => ({
             key: 'article-e2e-test-id', //this should randomized
             value: msg,
         }));
         const records = await this.producer.send({
             topic,
             messages
         });
         await this.producer.disconnect();

         return records;
     }
     }

     export const createUserMessage: () => KafkaMessage<CreateUserPayload> =
         () => {
             return {
                 id: 'fake-uuid',
                 version: '1.0.0',
                 details: {
                     action: 'CREATE_USER',
                     personId: 0,
                     payload: {
                         profile: {
                             id: 0,
                             name: 'random-name',
                             surname: 'random-surname',
                             dateOfBirth: '1997-28-04',
                         }
                     }
                 }
             };
         };