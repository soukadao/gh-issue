import { Octokit } from "octokit";

export interface Issue {
  title: string;
  body: string;
  assignee?: string | null | undefined;
  milestone?: string | number | null | undefined;
  labels?: string[] | undefined;
}

/**
 * Issueを作成する
 * @param issue Issue情報
 */
export async function createIssue(issue: Issue): Promise<void> {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  await octokit.rest.issues.create({
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    title: issue.title,
    body: issue.body,
    assignee: issue.assignee,
    milestone: issue.milestone,
    labels: issue.labels
  });
}

/**
 * バグ報告用のIssueを作成する
 * @param title タイトル
 * @param body 内容
 */
export async function createBugIssue(title: string, body: string): Promise<void> {
  const fullTitle = `[Bug]: ${title}`;

  if (await isDuplicateIssue(fullTitle)) return;

  await createIssue({
    title: fullTitle,
    body: body,
    labels: ["bug"]
  });
}

/**
 * Issueの重複を確認する
 * @param title タイトル
 * @returns 重複しているか
 */
export async function isDuplicateIssue(title: string): Promise<boolean> {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const { data: issues } = await octokit.rest.issues.listForRepo({
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    state: "open"
  });

  return issues.some((issue) => issue.title === title);
}