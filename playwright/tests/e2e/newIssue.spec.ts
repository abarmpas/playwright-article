import { UserTable } from '@/app/types/userTable';
import { test } from '../../src/fixtures/base.fixture';
import { loginAsAdmin } from '@/playwright/src/utils/loginUtils';
import { verifyIsVisible } from '@/playwright/src/utils/verifications';

test.describe('New Issue', () => {
  loginAsAdmin();

  test.beforeEach(async ({ issuesPage }) => {
    await test.step('GIVEN: I navigate to Issues page', async () => {
      await issuesPage.open();
    });
  });

  test('Should be able to create new Issue', async ({
    issuesPage,
    issue
  }) => {
    await test.step('WHEN: I create a new Issues', async () => {
      await issuesPage.createNewIssue(issue);
    });

    await test.step('THEN: The issue should be visible', async () => {
      await verifyIsVisible(issuesPage.newIssueButton);
      await verifyIsVisible(issuesPage.issuesTable.getByText(issue.title));
    });

  });
});