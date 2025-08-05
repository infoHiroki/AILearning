# Clasp + Google Apps Script開発

**所要時間**: 1.5時間  
**レベル**: プログラミング基礎〜中級  
**前提知識**: [ターミナル・CLI基礎](TerminalCLI.md), [テキストエディターの活用](テキストエディターの活用.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- ClaspとGoogle Apps Scriptの連携開発ができる
- ローカル環境でのGAS開発フローを理解できる
- AI支援を活用したGAS開発ができる
- TypeScriptでのGAS開発ができる
- 実用的な自動化スクリプトが作成できる

## 📋 目次

1. [Claspとは](#claspとは)
2. [環境構築](#環境構築)
3. [基本的な開発フロー](#基本的な開発フロー)
4. [AI支援GAS開発](#ai支援gas開発)
5. [実用的な開発例](#実用的な開発例)
6. [高度な開発パターン](#高度な開発パターン)
7. [テスト・デバッグ](#テスト・デバッグ)
8. [デプロイ・公開](#デプロイ・公開)

---

## Claspとは

### 🔧 Claspの概要

**Clasp**（Command Line Apps Script Projects）は、Google Apps Scriptをローカル環境で開発するためのコマンドラインツール。VS CodeやCursorでGASを開発できる。

#### 従来のGAS開発 vs Clasp開発

| 項目 | Web Editor | Clasp + エディター |
|------|------------|-------------------|
| **開発環境** | ブラウザのみ | ローカルエディター |
| **AI支援** | 限定的 | フル活用可能 |
| **バージョン管理** | 限定的 | Git完全対応 |
| **デバッグ** | 基本的 | 高度なデバッグ |
| **チーム開発** | 困難 | 標準的な開発フロー |

### 🎯 Claspの利点

1. **ローカル開発環境**
   - 使い慣れたエディターで開発
   - AI支援機能の活用
   - 高度なデバッグ機能

2. **バージョン管理**
   - Gitでの完全な履歴管理
   - ブランチ戦略の適用
   - チーム開発の標準化

3. **効率性**
   - TypeScript対応
   - ライブラリ・フレームワーク活用
   - CI/CD パイプライン構築

---

## 環境構築

### 📥 必要なツールのインストール

#### 1. Node.js のインストール
```bash
# Node.js公式サイトからインストール
# または Homebrew (Mac) の場合
brew install node

# バージョン確認
node --version
npm --version
```

#### 2. Clasp のインストール
```bash
npm install -g @google/clasp

# インストール確認
clasp --version
```

#### 3. Googleアカウント認証
```bash
clasp login
# ブラウザが開くのでGoogleアカウントでログイン
```

#### 4. VS Code拡張機能
```
必須拡張機能:
- Google Apps Script
- TypeScript and JavaScript Language Features
- JavaScript (ES6) code snippets

推奨拡張機能:
- Prettier - Code formatter
- ESLint
- GitHub Copilot
```

### ⚙️ Google Apps Script API有効化

1. Google Cloud Consoleにアクセス
2. 新しいプロジェクト作成（または既存を選択）
3. Google Apps Script APIを有効化
4. 必要に応じてOAuth同意画面を設定

---

## 基本的な開発フロー

### 🚀 新規プロジェクト作成

#### プロジェクトの初期化
```bash
# 1. ローカルディレクトリ作成
mkdir my-gas-project
cd my-gas-project

# 2. 新規GASプロジェクト作成
clasp create "My First GAS Project"
# プロジェクトタイプを選択: standalone/sheets/docs/slides/forms

# 3. VS Codeで開く
code .
```

#### 既存プロジェクトのクローン
```bash
# GASプロジェクトIDを取得してクローン
clasp clone [SCRIPT_ID]
```

### 🔄 開発サイクル

#### 基本的なワークフロー
```bash
# 1. コード編集（VS Code/Cursorで）
# 2. GASにアップロード
clasp push

# 3. GASから最新版をダウンロード
clasp pull

# 4. ブラウザでGASエディターを開く
clasp open
```

#### プロジェクト構造例
```
my-gas-project/
├── .clasp.json          # Clasp設定
├── appsscript.json      # GAS設定
├── src/
│   ├── main.ts         # メイン関数
│   ├── utils.ts        # ユーティリティ
│   └── types.ts        # 型定義
├── tests/
│   └── main.test.ts    # テストファイル
└── README.md
```

---

## AI支援GAS開発

### 💡 開発環境の設定

#### TypeScript活用
```typescript
// appsscript.json でTypeScriptを有効化
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8"
}

// tsconfig.json 設定例
{
  "compilerOptions": {
    "lib": ["ES6"],
    "target": "ES6"
  },
  "include": ["**/*.ts"]
}
```

### 🤖 AI支援コード生成例

#### 基本的な関数生成
```typescript
// コメントでAIに指示
// スプレッドシートから顧客データを取得し、メール送信する関数

function sendCustomerEmails() {
  // GitHub CopilotやCursorが以下のようなコードを生成
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // ヘッダー行をスキップして各行を処理
  for (let i = 1; i < data.length; i++) {
    const [name, email, message] = data[i];
    
    if (email && message) {
      MailApp.sendEmail({
        to: email,
        subject: `${name}様へのご連絡`,
        body: message
      });
    }
  }
}
```

### 📝 効果的なAIプロンプト例

```typescript
// ❌ 悪い例
// メール送信

// ✅ 良い例
// スプレッドシートA列の名前、B列のメールアドレス、C列のメッセージを使って
// 各行の人に個別メールを送信する関数を作成
// エラーハンドリングとログ出力も含める
```

---

## 実用的な開発例

### 📊 1. スプレッドシート→Slack通知

```typescript
// AIプロンプト: "スプレッドシートの新規データをSlackに通知する関数を作成"

function notifySlackOnNewData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const newData = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  const slackWebhookUrl = 'YOUR_SLACK_WEBHOOK_URL';
  const message = {
    'text': `新しいデータが追加されました: ${newData.join(', ')}`
  };
  
  UrlFetchApp.fetch(slackWebhookUrl, {
    'method': 'POST',
    'contentType': 'application/json',
    'payload': JSON.stringify(message)
  });
}
```

### 📧 2. Gmail自動整理

```typescript
// AIプロンプト: "特定の条件のGmailを自動でラベル分けする関数"

function organizeEmails() {
  const threads = GmailApp.search('is:unread', 0, 50);
  
  threads.forEach(thread => {
    const messages = thread.getMessages();
    const firstMessage = messages[0];
    const subject = firstMessage.getSubject();
    const sender = firstMessage.getFrom();
    
    // AIが条件分岐ロジックを生成
    if (subject.includes('請求書')) {
      thread.addLabel(GmailApp.getUserLabelByName('請求書'));
    } else if (sender.includes('noreply@')) {
      thread.addLabel(GmailApp.getUserLabelByName('自動送信'));
    }
    
    thread.markAsRead();
  });
}
```

### 📅 3. カレンダー自動化

```typescript
// AIプロンプト: "スプレッドシートのスケジュールデータからGoogleカレンダーにイベント作成"

function createCalendarEvents() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const calendar = CalendarApp.getDefaultCalendar();
  
  for (let i = 1; i < data.length; i++) {
    const [title, startDate, endDate, description] = data[i];
    
    if (title && startDate) {
      calendar.createEvent(title, new Date(startDate), new Date(endDate), {
        description: description || ''
      });
    }
  }
}
```

---

## 高度な開発パターン

### 🏗️ クラスベース設計

```typescript
// AIプロンプト: "再利用可能なGASライブラリをクラス設計で実装"

class SpreadsheetManager {
  private sheet: GoogleAppsScript.Spreadsheet.Sheet;
  
  constructor(sheetId: string, sheetName: string = 'Sheet1') {
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    this.sheet = spreadsheet.getSheetByName(sheetName);
  }
  
  getData(range?: string): any[][] {
    return range ? 
      this.sheet.getRange(range).getValues() : 
      this.sheet.getDataRange().getValues();
  }
  
  appendData(data: any[]): void {
    this.sheet.appendRow(data);
  }
  
  findRow(searchColumn: number, searchValue: any): number {
    const data = this.getData();
    return data.findIndex(row => row[searchColumn - 1] === searchValue) + 1;
  }
}
```

### 🔧 ユーティリティライブラリ

```typescript
// AIプロンプト: "汎用的なユーティリティ関数群を作成"

class DateHelper {
  static formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  }
  
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}

class ValidationHelper {
  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static isEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
  }
}
```

### 🛡️ エラーハンドリング・ログ

```typescript
// AIプロンプト: "堅牢なエラーハンドリングとログ機能を追加"

class Logger {
  private static LOG_SHEET_ID = 'YOUR_LOG_SHEET_ID';
  
  static log(level: 'INFO' | 'WARN' | 'ERROR', message: string, data?: any) {
    console.log(`[${level}] ${new Date().toISOString()}: ${message}`);
    
    try {
      const logSheet = SpreadsheetApp.openById(this.LOG_SHEET_ID).getActiveSheet();
      logSheet.appendRow([
        new Date(),
        level,
        message,
        data ? JSON.stringify(data) : ''
      ]);
    } catch (error) {
      console.error('ログ記録に失敗:', error);
    }
  }
  
  static info(message: string, data?: any) {
    this.log('INFO', message, data);
  }
  
  static warn(message: string, data?: any) {
    this.log('WARN', message, data);
  }
  
  static error(message: string, data?: any) {
    this.log('ERROR', message, data);
  }
}

function robustFunction() {
  try {
    Logger.info('処理開始');
    
    // メイン処理...
    
    Logger.info('処理完了');
  } catch (error) {
    Logger.error('処理中にエラーが発生', { error: error.toString() });
    
    // 管理者にメール通知
    MailApp.sendEmail(
      'admin@example.com',
      'GASエラー通知',
      `エラーが発生しました: ${error.toString()}`
    );
    
    throw error;
  }
}
```

---

## テスト・デバッグ

### 🧪 テスト戦略

#### モックデータでのテスト
```typescript
// テスト用関数（AIで生成）
function testCustomerEmailFunction() {
  // モックデータでテスト
  const mockSheet = SpreadsheetApp.create('Test Sheet');
  mockSheet.getActiveSheet().getRange('A1:C3').setValues([
    ['名前', 'メール', 'メッセージ'],
    ['田中太郎', 'tanaka@example.com', 'テストメッセージ1'],
    ['佐藤花子', 'sato@example.com', 'テストメッセージ2']
  ]);
  
  // 実際の関数をテスト実行
  console.log('テスト開始');
  sendCustomerEmails();
  console.log('テスト完了');
}
```

#### デバッグ用のログ関数
```typescript
function debugLog(message: string, data?: any) {
  console.log(`[DEBUG] ${new Date().toISOString()}: ${message}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

// 使用例
function processData() {
  debugLog('データ処理開始');
  const data = getSpreadsheetData();
  debugLog('取得したデータ', data);
  
  // 処理...
  
  debugLog('処理完了');
}
```

### 🔍 デバッグ手法

#### ローカルでのデバッグ
```bash
# ログ確認
clasp logs

# 特定の実行ログを表示
clasp logs --json --num 10
```

#### ブラウザでのデバッグ
```typescript
// ブレークポイント設定
function debugFunction() {
  debugger; // この行で実行が停止
  
  // デバッグしたい処理...
}
```

---

## デプロイ・公開

### 📦 バージョン管理

```bash
# 新しいバージョンを作成
clasp version "v1.0.0 初回リリース"

# デプロイ
clasp deploy --versionNumber 1 --description "本番環境デプロイ"

# デプロイ一覧確認
clasp deployments
```

### ⚙️ 設定ファイル管理

#### .clasp.json - プロジェクト設定
```json
{
  "scriptId": "your-script-id",
  "rootDir": "./src"
}
```

#### appsscript.json - GAS設定
```json
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {
    "libraries": []
  },
  "webapp": {
    "access": "ANYONE_ANONYMOUS",
    "executeAs": "USER_DEPLOYING"
  },
  "executionApi": {
    "access": "ANYONE"
  }
}
```

### 🚀 CI/CD パイプライン

#### GitHub Actions例
```yaml
name: Deploy to GAS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - run: npm install -g @google/clasp
      - run: clasp login --creds "${{ secrets.GOOGLE_CREDENTIALS }}"
      - run: clasp push
      - run: clasp deploy
```

---

## 実践演習

### 演習1: 環境構築
**目標**: Clasp開発環境の構築

**手順**:
1. Node.js、Claspのインストール
2. Googleアカウント認証
3. 新規GASプロジェクト作成
4. Hello World関数の作成・実行

### 演習2: スプレッドシート連携
**目標**: 実用的な自動化スクリプトの作成

**課題**:
1. 社員名簿スプレッドシートから誕生日リストを抽出
2. 今月誕生日の人にお祝いメールを自動送信
3. 送信履歴をログとして記録

### 演習3: 高度な機能実装
**目標**: エラーハンドリング・ログ機能の実装

**課題**:
1. 複数のAPIを連携した処理の実装
2. 包括的なエラーハンドリング
3. ログ機能とアラート機能の実装
4. テスト関数の作成

---

## まとめ

Clasp + GAS開発により、従来のブラウザ制約を超えた本格的な開発が可能になります。

### 🎯 重要なポイント
- **ローカル開発**: 使い慣れたエディターでの効率的な開発
- **AI協働**: AIを活用した高速開発
- **バージョン管理**: Gitによる適切な履歴管理
- **テスト・デバッグ**: 堅牢なアプリケーション開発

### 🚀 次のステップ
1. 実際の業務自動化プロジェクトでの活用
2. ライブラリ・フレームワークの活用
3. 他のGoogle Workspace APIとの連携

---

**関連講座**: 
- [テキストエディターの活用](テキストエディターの活用.md)
- [APIとは](APIとは.md)
- [Git・GitHub](Git・GitHub.md)