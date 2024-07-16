import { test as base } from '@playwright/test';
import { KafkaClient } from '../utils/kafkaClient';

 type ClientsFixtures = {
   kafkaClient: KafkaClient;
 };

 export const test = base.extend<ClientsFixtures>({
   kafkaClient: async ({ page }, use) => {
     await use(new KafkaClient());
   },
 });