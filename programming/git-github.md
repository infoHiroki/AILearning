# Git・GitHub基礎 + AI活用

**所要時間**: 1時間  
**レベル**: プログラミング基礎  
**前提知識**: [AI時代のエディター活用](editors-ai.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- Git・GitHubの基本概念と操作を理解できる
- AI支援でのコード管理・協働開発ができる
- GitHub CopilotやAIツールとの連携ができる
- 現代的な開発ワークフローを体験できる

## 📋 目次

1. [Git・GitHubの基本概念](#gitgithubの基本概念)
2. [Git基本操作](#git基本操作)
3. [GitHubとAI連携](#githubとai連携)
4. [AI時代の協働開発](#ai時代の協働開発)
5. [実践的なワークフロー](#実践的なワークフロー)

---

## Git・GitHubの基本概念

### 🤔 なぜGit・GitHubが重要か

#### AI時代の開発における役割
1. **コード履歴管理**: AIが生成したコードの変更追跡
2. **協働開発**: 人間とAIの協働作業の記録
3. **品質管理**: AIコードのレビュー・承認プロセス
4. **知識共有**: AI活用パターンの蓄積・共有

#### 従来の開発 vs AI時代の開発

```
従来:
人間 → コード作成 → テスト → レビュー → デプロイ

AI時代:
人間 ← → AI → コード生成 → 人間レビュー → 改善 → デプロイ
```

### 📚 基本用語・概念

#### Git用語集
- **リポジトリ（Repository）**: プロジェクトのコードと履歴を保存する場所
- **コミット（Commit）**: 変更内容を記録するスナップショット
- **ブランチ（Branch）**: 並行して開発を進めるための分岐
- **マージ（Merge）**: ブランチの変更を統合する操作
- **プル（Pull）**: リモートの変更をローカルに取得
- **プッシュ（Push）**: ローカルの変更をリモートに送信

#### GitHub特有の概念
- **フォーク（Fork）**: 他人のリポジトリを自分のアカウントにコピー
- **プルリクエスト（PR）**: 変更提案・レビュー依頼
- **イシュー（Issue）**: バグ報告・機能要望の管理
- **アクション（Actions）**: 自動化・CI/CDの仕組み

---

## Git基本操作

### 📥 Git環境構築

#### Gitインストール
```bash
# Windows (Git for Windows)
# https://git-scm.com からダウンロード・インストール

# Mac (Homebrew)
brew install git

# 設定確認
git --version
```

#### 初期設定
```bash
# ユーザー情報設定（必須）
git config --global user.name "あなたの名前"
git config --global user.email "your-email@example.com"

# エディター設定（VS Code使用時）
git config --global core.editor "code --wait"

# 設定確認
git config --list
```

### 🚀 基本的なGitワークフロー

#### 1. リポジトリの初期化・クローン
```bash
# 新規リポジトリ作成
mkdir my-project
cd my-project
git init

# 既存リポジトリのクローン
git clone https://github.com/username/repository.git
```

#### 2. ファイルの追加・コミット
```bash
# ファイル作成・編集後
echo "# My Project" > README.md

# ステージング（追加）
git add README.md
# または全ファイル
git add .

# コミット
git commit -m "🎉 初回コミット: READMEを追加"

# ステータス確認
git status
```

#### 3. 変更履歴の確認
```bash
# コミット履歴表示
git log

# 簡潔な表示
git log --oneline

# グラフィカル表示
git log --graph --oneline
```

#### 4. リモートリポジトリとの連携
```bash
# リモートリポジトリ追加
git remote add origin https://github.com/username/repository.git

# プッシュ（アップロード）
git push -u origin main

# プル（ダウンロード）
git pull origin main
```

### 🌿 ブランチ操作

#### ブランチの基本操作
```bash
# 現在のブランチ確認
git branch

# 新しいブランチ作成
git branch feature/new-function

# ブランチ切り替え
git checkout feature/new-function

# 作成と切り替えを同時に
git checkout -b feature/ai-integration

# ブランチ一覧（リモート含む）
git branch -a
```

#### マージ操作
```bash
# mainブランチに戻る
git checkout main

# feature ブランチをマージ
git merge feature/new-function

# ブランチ削除
git branch -d feature/new-function
```

---

## GitHubとAI連携

### 🤖 GitHub CopilotとGitの連携

#### GitHub Copilotの設定
```bash
# GitHub CLIインストール（推奨）
# Windows: winget install GitHub.cli
# Mac: brew install gh

# GitHub認証
gh auth login

# Copilot状況確認
gh copilot --help
```

#### AI支援コミットメッセージ
```bash
# 変更内容をAIに分析してもらう（GitHub CLI）
gh copilot suggest "git commit message for adding user authentication"

# 実際のコミット例
git commit -m "✨ ユーザー認証機能を追加

- JWT トークンベースの認証実装
- ログイン・ログアウト機能
- パスワードハッシュ化対応
- セッション管理の追加

Co-authored-by: GitHub Copilot <noreply@github.com>"
```

### 📝 AI支援でのコードレビュー

#### プルリクエストでのAI活用
```markdown
## プルリクエストテンプレート（AI支援対応版）

### 変更概要
- [ ] AIペアプログラミングで実装
- [ ] AI生成コードの人間レビュー完了
- [ ] セキュリティチェック実施

### AI活用状況
- 使用AIツール: GitHub Copilot / Cursor / ChatGPT
- AI生成率: 約70% （要レビュー部分は明記）
- 人間による検証: 完了 / 未完了

### チェックリスト
- [ ] AIが生成したコードの動作確認
- [ ] セキュリティ問題の確認
- [ ] パフォーマンステスト
- [ ] ドキュメント更新
```

#### AI支援コードレビューのコメント例
```markdown
## レビューコメント例

### 🤖 AI生成コードについて
このコードはGitHub Copілotが生成しました。以下の点を確認してください：
- エラーハンドリングの妥当性
- セキュリティ上の問題の有無
- パフォーマンスへの影響

### ✅ 人間による検証
- [ ] ロジックの正確性を確認
- [ ] テストケースでの動作確認
- [ ] エッジケースの考慮

### 💡 改善提案
AIが提案したコードをベースに、以下の改善を検討：
```

### 🔧 GitHub Actionsとの統合

#### AI支援テスト自動化
```yaml
# .github/workflows/ai-code-review.yml
name: AI Code Review

on:
  pull_request:
    branches: [ main ]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: AI Code Analysis
      uses: github/super-linter@v4
      env:
        DEFAULT_BRANCH: main
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Security Scan
      run: |
        # AI生成コードのセキュリティチェック
        npm audit
        
    - name: Performance Test
      run: |
        # パフォーマンステスト実行
        npm run test:performance
```

---

## AI時代の協働開発

### 👥 チーム開発でのAI活用

#### ペアプログラミング（人間 + AI）
```
開発フロー:
1. 人間が要件を整理
2. AIがコード生成
3. 人間がレビュー・修正
4. AIが改善提案
5. 最終確認・コミット
```

#### AI活用の記録・共有
```bash
# コミットメッセージでAI使用を明記
git commit -m "🤖 AI支援: ユーザー登録機能を実装

AIツール: GitHub Copilot
生成箇所: バリデーション処理、エラーハンドリング
人間検証: セキュリティ、ビジネスロジック

- 入力値バリデーション強化
- パスワード強度チェック追加
- 重複チェック機能実装"
```

### 📊 AI活用状況の可視化

#### GitHub Insights活用
```markdown
## 月次AI活用レポート

### 📈 AI生成コード統計
- 総コミット数: 150
- AI支援コミット: 105 (70%)
- 人間のみコミット: 45 (30%)

### 🎯 AI活用効果
- 開発速度: 40%向上
- バグ率: 15%減少
- コードレビュー時間: 25%短縮

### 📝 学習ポイント
- AIが得意: CRUD操作、基本的なアルゴリズム
- 人間が重要: ビジネスロジック、セキュリティ設計
```

### 🔄 知識共有・ベストプラクティス

#### AI活用パターンの蓄積
```markdown
# AI-Patterns.md (チーム共有ドキュメント)

## 効果的なAI活用パターン

### 1. API開発
```javascript
// プロンプト例: "REST API for user management with validation"
// 生成される高品質なコード例を記録
```

### 2. データベース操作
```sql
-- プロンプト例: "Complex query with joins and aggregations"
-- 最適化されたクエリ例を蓄積
```

### 3. フロントエンド開発
```react
// プロンプト例: "Responsive component with accessibility"
// ベストプラクティスに従ったコンポーネント例
```
```

---

## 実践的なワークフロー

### 🎯 プロジェクト種別のワークフロー

#### 個人プロジェクト
```bash
# 1. リポジトリ作成
gh repo create my-ai-project --public

# 2. ローカル開発環境
git clone https://github.com/username/my-ai-project.git
cd my-ai-project

# 3. AI支援開発
# VS Code/Cursor で開発
# Copilot でコード生成

# 4. 定期的なコミット
git add .
git commit -m "🚀 機能追加: AIを活用してXX機能を実装"
git push origin main
```

#### チーム開発
```bash
# 1. フォーク・クローン
gh repo fork original-repo/project
git clone https://github.com/your-username/project.git

# 2. feature ブランチで開発
git checkout -b feature/ai-enhanced-search

# 3. AI支援開発＋人間レビュー
# 開発作業...

# 4. プルリクエスト作成
git push origin feature/ai-enhanced-search
gh pr create --title "🤖 AI支援: 検索機能を強化" --body "AIを活用して検索精度を向上させました"
```

### 🛡️ セキュリティ・品質管理

#### 機密情報の管理
```bash
# .gitignore に機密情報を記載
echo "*.env" >> .gitignore
echo "config/secrets.yml" >> .gitignore
echo ".env.local" >> .gitignore

# 既にコミットしてしまった場合
git rm --cached .env
git commit -m "🔒 機密情報をリポジトリから削除"
```

#### AI生成コードの品質チェック
```yaml
# .github/workflows/quality-check.yml
name: Code Quality Check

on: [push, pull_request]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Lint Check
      run: npm run lint
      
    - name: Security Scan
      run: npm audit
      
    - name: Test Coverage
      run: npm run test:coverage
```

### 📚 学習・成長記録

#### 個人的な学習記録
```markdown
# 学習ログ (LEARNING.md)

## 2025年1月

### Week 1: Git基礎 + AI連携
- GitHub Copilot でのコミット支援
- プルリクエストテンプレート作成
- AI活用状況の記録方法確立

#### 学んだこと
- AIコードでも丁寧なレビューが重要
- コミットメッセージでAI使用を明記する価値
- セキュリティチェックは人間の役割

#### 次週の目標
- ブランチ戦略の改善
- AI活用パターンの文書化
```

---

## トラブルシューティング

### ❌ よくある問題と解決法

#### 1. AI生成コードの品質問題
**症状**: AIが生成したコードにバグがある

**解決方法**:
```bash
# 1. 段階的なコミット
git add -p  # 部分的にステージング
git commit -m "🧪 AI生成コード: 動作確認前のコミット"

# 2. テスト実行・修正
# テスト・デバッグ...

# 3. 修正をコミット
git commit -m "🔧 AI生成コードの修正: バグ修正とテスト追加"
```

#### 2. 大量のAI生成コードの管理
**症状**: 変更が多すぎてレビューが困難

**解決方法**:
```bash
# 機能単位での細切れコミット
git add src/auth/
git commit -m "🤖 AI生成: 認証機能の基本実装"

git add src/auth/tests/
git commit -m "✅ テスト追加: 認証機能のテストケース"

git add src/auth/validation.js
git commit -m "🔧 人間による修正: バリデーション強化"
```

#### 3. AI活用の透明性問題
**症状**: どこがAI生成かわからない

**解決方法**:
```javascript
// コメントでAI生成部分を明記
/**
 * AI Generated Code (GitHub Copilot)
 * Generated on: 2025-01-15
 * Prompt: "Create user authentication middleware with JWT"
 * Human Review: Completed ✓
 */
function authenticateUser(req, res, next) {
  // AI生成コード...
}

/**
 * Human Written Code
 * Custom business logic for our specific requirements
 */
function customBusinessLogic() {
  // 人間が書いたコード...
}
```

---

## 実践演習

### 演習1: 基本Git操作
**目標**: Git・GitHubの基本操作を習得

**手順**:
1. GitHubアカウント作成
2. 新規リポジトリ作成
3. ローカルクローン・開発
4. コミット・プッシュ練習

### 演習2: AI支援開発プロジェクト
**目標**: AIとの協働開発体験

**課題**:
1. 簡単なWebアプリケーション企画
2. AI支援でのコード生成
3. 適切なコミットメッセージ作成
4. プルリクエスト・レビュー実践

### 演習3: チーム開発シミュレーション
**目標**: チーム開発でのAI活用パターン習得

**課題**:
1. フォーク・ブランチ戦略の実践
2. AI活用状況の記録・共有
3. コードレビュー・品質管理
4. 知識共有ドキュメント作成

---

## まとめ

Git・GitHubはAI時代の開発において、**人間とAIの協働を記録・管理する重要なインフラ**です。

### 🎯 重要なポイント
- **透明性**: AI活用状況の明確な記録
- **品質管理**: AI生成コードの適切なレビュー
- **知識共有**: 効果的なAI活用パターンの蓄積
- **セキュリティ**: 機密情報の適切な管理

### 🚀 次のステップ
1. 継続的な開発プロジェクトでの実践
2. AI活用パターンの体系化・文書化
3. チーム開発での協働スキル向上

---

**次の講座**: 
- [ターミナル・CLI基礎](terminal-cli.md)
- [API活用基礎](api-basics.md)
- [MCP (Model Context Protocol)](mcp-basics.md)