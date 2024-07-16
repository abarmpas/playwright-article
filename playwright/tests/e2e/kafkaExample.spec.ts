import { test } from '../../src/fixtures/base.fixture';
import { createUserMessage } from '../../src/utils/kafkaClient';

test.describe('Create User with Kafka Journey - E2E', () => {

  test.beforeEach(async ({ basePage }) => {
    await test.step('GIVEN: I navigate to base page', async () => {
      await basePage.open();
    });
  });

  test.afterEach(async () => {
    await test.step('CLEANUP: Newly created users should be delete', async () => {
      // delete users via API for example
    });
  });

  test('Should be able to create a User via kafka', async ({ kafkaClient }) => {
    // Generate the User Message for kafka
    const create_user_message = createUserMessage();

    await test.step('AND: A new User is created', async () => {
      // Send Messages to kafka client
      await kafkaClient.sendMessages('kafka-topic', [
        JSON.stringify(create_user_message),
      ]);

      // According to the backend, here a waiting functionality can be implemented until the user is visible
    });
  });
});
