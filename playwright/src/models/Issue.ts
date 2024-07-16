import { faker } from '@faker-js/faker'

export class Issue {
    title: string = faker.lorem.word();
    description: string = faker.lorem.paragraph();
}

export type IssueData = {
    title: string;
    description: string;
}