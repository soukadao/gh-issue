# gh-issue

GitHub Issue管理ライブラリ

## インストール

```bash
npm install gh-issue
```

## 使い方

### 環境変数の設定

以下の環境変数を設定してください：

```bash
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=repository_owner
GITHUB_REPO=repository_name
```

### 基本的な使い方

```typescript
import { createIssue, createBugIssue, isDuplicateIssue } from '@soukadao/gh-issue';

// 通常のIssueを作成
await createIssue({
  title: 'タスクのタイトル',
  body: 'Issueの詳細内容',
  assignee: 'username',
  labels: ['enhancement', 'documentation']
});

// バグ報告用のIssueを作成（自動で[Bug]プレフィックスとbugラベルが付与）
await createBugIssue('バグのタイトル', 'バグの詳細説明');

// Issueの重複チェック
const isDuplicate = await isDuplicateIssue('確認したいタイトル');
if (!isDuplicate) {
  // 重複していない場合の処理
}
```

## API

### `createIssue(issue: Issue): Promise<void>`

新しいIssueを作成します。

#### パラメータ

- `issue.title` (string): Issueのタイトル
- `issue.body` (string): Issueの本文
- `issue.assignee` (string | null | undefined): アサインするユーザー名（オプション）
- `issue.milestone` (string | number | null | undefined): マイルストーン（オプション）
- `issue.labels` (string[] | undefined): ラベルの配列（オプション）

### `createBugIssue(title: string, body: string): Promise<void>`

バグ報告用のIssueを作成します。タイトルに`[Bug]:`プレフィックスが自動で付与され、`bug`ラベルが追加されます。重複チェックも自動で行われます。

#### パラメータ

- `title` (string): バグのタイトル
- `body` (string): バグの詳細説明

### `isDuplicateIssue(title: string): Promise<boolean>`

指定したタイトルのオープンなIssueが既に存在するか確認します。

#### パラメータ

- `title` (string): 確認したいIssueのタイトル

#### 戻り値

- `boolean`: 重複している場合は`true`、そうでない場合は`false`