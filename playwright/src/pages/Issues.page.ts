import { ArticleBasePage } from './base/ArticleBase.page';
import { IssueData } from '../models/Issue';

export class IssuesPage extends ArticleBasePage {
    _url = '/issues';
    issuesTable = this.page.locator('#issues-table');
    newIssueButton = this.page.getByRole('link', { name: 'New Issue' });
    newIssueTitle = this.page.getByPlaceholder('Title');
    newIssueDescription = this.page.locator('.CodeMirror');
    descriptionLocator = this.page.locator('.CodeMirror-line > span');
    submitNewIssue = this.page.getByRole('button', { name: 'Submit New Issue' });

  async createNewIssue(issue: IssueData) {
    await this.newIssueButton.click();
    await this.newIssueTitle.fill(issue.title);
    await this.newIssueDescription.click();
    await this.descriptionLocator.pressSequentially(issue.description);
    await this.submitNewIssue.click();
  }
}