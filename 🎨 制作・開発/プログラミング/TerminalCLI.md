# ターミナル・CLI基礎 + AIツール活用


## 学習目標

この講座を修了すると、以下ができるようになります：
- ターミナル・コマンドラインの基本操作ができる
- AI時代のCLIツール（Claude Code、Gemini CLI等）を活用できる
- TUI（Terminal User Interface）ツールを効果的に使える
- ライブコーディング・AI協働開発に対応できる

## 📋 目次

1. [ターミナル・CLIの基本](#ターミナルcliの基本)
2. [AI時代のCLIツール](#ai時代のcliツール)
3. [TUIツールの活用](#tuiツールの活用)
4. [ライブコーディング環境](#ライブコーディング環境)
5. [実践的なワークフロー](#実践的なワークフロー)

---

## ターミナル・CLIの基本

### 🤔 なぜターミナルが重要か

#### AI時代におけるターミナルの役割
1. **効率性**: キーボードのみでの高速操作
2. **自動化**: スクリプト・バッチ処理による作業効率化
3. **AI連携**: CLIベースのAIツールとの直接対話
4. **開発環境**: 現代的な開発ツールチェインへのアクセス

#### GUI vs CLI の使い分け
```
GUI適用場面:
- 視覚的な操作が必要（画像編集、デザイン）
- 初心者向けの直感的操作
- 複雑なデータの可視化

CLI適用場面:
- 繰り返し作業の自動化
- リモートサーバーでの作業
- AI・開発ツールとの効率的な連携
- バッチ処理・スクリプト実行
```

### 💻 基本的なコマンド操作

#### ファイル・ディレクトリ操作
```bash
# 現在位置確認
pwd

# ディレクトリ内容表示
ls           # 基本表示
ls -la       # 詳細表示（隠しファイル含む）
ls -lh       # 人間が読みやすい形式

# ディレクトリ移動
cd Documents              # Documents フォルダに移動
cd ..                    # 親ディレクトリに移動
cd ~                     # ホームディレクトリに移動
cd -                     # 直前のディレクトリに戻る

# ディレクトリ作成・削除
mkdir new-project        # ディレクトリ作成
mkdir -p path/to/deep    # 深い階層を一度に作成
rmdir empty-folder       # 空のディレクトリ削除
rm -rf folder           # ディレクトリとその中身を削除（注意）
```

#### ファイル操作
```bash
# ファイル作成・編集
touch README.md          # 空ファイル作成
echo "Hello" > file.txt  # ファイルに書き込み
echo "World" >> file.txt # ファイルに追記

# ファイル内容表示
cat file.txt            # 全内容表示
head -10 file.txt       # 最初の10行表示
tail -10 file.txt       # 最後の10行表示
less file.txt           # ページ単位で表示（q で終了）

# ファイル操作
cp file.txt backup.txt  # ファイルコピー
mv file.txt newname.txt # ファイル移動・リネーム
rm file.txt             # ファイル削除
```

#### 検索・フィルタリング
```bash
# ファイル検索
find . -name "*.js"     # JavaScript ファイルを検索
find . -type f -size +1M # 1MB以上のファイルを検索

# 文字列検索
grep "function" *.js     # JavaScript ファイル内の "function" を検索
grep -r "TODO" .        # 再帰的に "TODO" を検索
grep -n "error" log.txt # 行番号付きで検索

# パイプとフィルタリング
ls -la | grep ".txt"    # txt ファイルのみ表示
cat file.txt | wc -l    # 行数をカウント
history | grep "git"    # git コマンドの履歴を検索
```

### ⚙️ 環境設定・カスタマイズ

#### シェル設定
```bash
# 使用中のシェル確認
echo $SHELL

# bash 設定ファイル (.bashrc または .bash_profile)
# zsh 設定ファイル (.zshrc)

# エイリアス設定例（.bashrc/.zshrc に追加）
alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'

# 環境変数設定
export EDITOR='code'     # VS Code をデフォルトエディターに
export PATH="$HOME/bin:$PATH"  # PATHに追加
```

#### 便利な機能
```bash
# タブ補完
cd Doc[Tab]             # Documents に自動補完

# 履歴検索
Ctrl + R                # コマンド履歴を検索
history                 # コマンド履歴表示

# 画面制御
Ctrl + C                # 実行中のコマンド中断
Ctrl + Z                # プロセス一時停止
Ctrl + L                # 画面クリア（clear と同じ）
```

---

## AI時代のCLIツール

### 🤖 主要なAI CLIツール

#### Claude Code
```bash
# インストール (Node.js が必要)
npm install -g claude-code

# 基本的な使用方法
claude "Python でファイルを読み込む方法を教えて"
claude --file script.py "このコードを最適化して"

# インタラクティブモード
claude --interactive
# → 対話形式でコードレビュー・相談が可能

# ファイル分析
claude --analyze ./src/
# → プロジェクト全体を分析して改善提案
```

#### Gemini CLI (Google)
```bash
# インストール
pip install google-generativeai

# 設定（API キーが必要）
export GEMINI_API_KEY="your-api-key"

# 基本使用
gemini "React コンポーネントを作成して"
gemini --code-review ./components/

# 画像分析（Gemini の強み）
gemini --image screenshot.png "この UI の改善点は？"
```

#### GitHub CLI + Copilot
```bash
# GitHub CLI インストール
# Windows: winget install GitHub.cli
# Mac: brew install gh

# 認証
gh auth login

# Copilot 機能
gh copilot suggest "git command to undo last commit"
gh copilot explain "grep -r 'TODO' ."
```

#### その他の注目CLIツール
```bash
# Cursor CLI
npx cursor .            # 現在のディレクトリで Cursor を開く

# AI コードレビュー
npx ai-code-review      # AI による自動コードレビュー

# AI commit メッセージ生成
npx gptcommit           # AI が適切なコミットメッセージを生成
```

### 🚀 実践的なAI CLI活用例

#### 開発時の典型的なワークフロー
```bash
# 1. プロジェクト開始
mkdir ai-todo-app
cd ai-todo-app
git init

# 2. AI に相談しながら初期設定
claude "React + TypeScript + Tailwind のプロジェクト構成を教えて"

# 3. AI の提案に基づいてセットアップ
npm create react-app . --template typescript
npm install tailwindcss

# 4. 開発中の相談
claude --file src/App.tsx "このコンポーネントにダークモード機能を追加して"

# 5. コード生成と確認
cursor .                # AI 支援エディターで開発

# 6. AI 支援でコミット
gh copilot suggest "git commit message for adding dark mode"
git commit -m "🌙 ダークモード機能を追加"
```

#### デバッグ・問題解決
```bash
# エラーログの分析
cat error.log | claude "このエラーの原因と解決策を教えて"

# パフォーマンス問題の相談
claude --file slow-function.js "この関数のパフォーマンスを改善して"

# セキュリティチェック
claude --analyze ./src/ --security "セキュリティ上の問題をチェック"
```

---

## TUIツールの活用

### 🎯 TUI（Terminal User Interface）とは

**TUI** は、ターミナル内でグラフィカルなインターフェースを提供するツール群。マウスに頼らず、キーボードのみで効率的な操作が可能。

#### 主要なTUIツール

#### 1. ファイル管理
```bash
# ranger - 高機能ファイルマネージャー
brew install ranger     # Mac
sudo apt install ranger # Ubuntu

# 基本操作
ranger
# j/k: 上下移動
# h/l: ディレクトリ移動
# Space: ファイル選択
# yy: コピー, dd: 切り取り, pp: 貼り付け
```

#### 2. Git管理
```bash
# lazygit - Git操作のTUI
brew install lazygit

# 使用方法
lazygit
# Tab: パネル切り替え
# Enter: 操作実行
# c: コミット, P: プッシュ, p: プル
# AI コミットメッセージ機能も内蔵
```

#### 3. システム監視
```bash
# htop - プロセス監視
brew install htop
htop

# bottom (btm) - 現代的なシステム監視
brew install bottom
btm
```

#### 4. テキスト編集
```bash
# micro - 現代的なターミナルエディター
brew install micro
micro README.md

# helix - Rust製の高性能エディター
brew install helix
hx main.rs
```

### 🔧 AI統合TUIの活用

#### AI支援ファイル管理
```bash
# ranger + AI プラグイン設定例
# ~/.config/ranger/rc.conf

# AI でファイル内容を説明
map ai_explain shell claude --file %s "このファイルの内容を説明して"

# AI でディレクトリ構造を分析
map ai_analyze shell claude --analyze %d "このディレクトリ構造を分析して"
```

#### lazygit + AI コミット
```bash
# lazygit設定 (~/.config/lazygit/config.yml)
ai:
  autoGenerateCommitMessage: true
  openAIApiKey: "your-openai-key"
  
# AI生成コミットメッセージの例
# "✨ feat: Add user authentication with JWT tokens
# 
# - Implement login/logout functionality
# - Add password hashing with bcrypt
# - Create JWT middleware for route protection
# - Add user session management
# 
# Generated with AI assistance"
```

### ⚡ 効率化Tips

#### キーボードショートカット活用
```bash
# ターミナル内での効率的な移動
Ctrl + A    # 行の先頭に移動
Ctrl + E    # 行の末尾に移動
Ctrl + W    # 前の単語を削除
Ctrl + K    # カーソル位置から行末まで削除
Ctrl + U    # 行全体を削除

# Alt + . または Esc + .    # 前のコマンドの最後の引数を挿入
```

#### スクリプト化・自動化
```bash
# AI支援の開発環境起動スクリプト
#!/bin/bash
# dev-setup.sh

echo "🚀 AI開発環境を起動中..."

# 必要なサービス起動
docker-compose up -d

# AI ツール確認
if command -v claude >/dev/null 2>&1; then
    echo "✅ Claude CLI ready"
else
    echo "❌ Claude CLI not found"
fi

# 開発ディレクトリに移動して IDE 起動
cd ~/projects/current-project
cursor .

echo "✨ 開発環境の準備完了！"
```

---

## ライブコーディング環境

### 🎥 ライブコーディングとAI活用

#### ライブコーディングでのターミナル活用
```bash
# 画面分割でのライブコーディング
# tmux または screen を使用

# tmux セッション作成
tmux new-session -d -s live-coding

# ペイン分割
tmux split-window -h    # 水平分割
tmux split-window -v    # 垂直分割

# ペイン間移動
Ctrl + B, Arrow keys    # tmux のデフォルト設定
```

#### AI支援ライブコーディングの準備
```bash
# ライブコーディング用スクリプト
#!/bin/bash
# live-coding-setup.sh

echo "🎥 ライブコーディング環境を準備中..."

# tmux セッション作成
tmux new-session -d -s coding

# 左側: エディター
tmux send-keys -t coding:0 'cursor .' Enter

# 右上: AI アシスタント
tmux split-window -h
tmux send-keys -t coding:1 'claude --interactive' Enter

# 右下: ターミナル操作
tmux split-window -v
tmux send-keys -t coding:2 'clear' Enter

# セッションにアタッチ
tmux attach-session -t coding
```

### 🎯 効果的なデモンストレーション

#### AI協働開発のデモフロー
```bash
# 1. 問題提起
echo "今日は AI と一緒に Todo アプリを作ります"

# 2. AI に相談
claude "React でシンプルな Todo アプリを作りたい。構成を教えて"

# 3. AI の提案を実装
# （ライブで AI が提案したコードを入力）

# 4. リアルタイムテスト
npm start

# 5. 問題発生時の AI 活用
claude --file src/TodoApp.js "このコンポーネントでエラーが発生している。原因は？"

# 6. 改善・最適化
claude "このコードをより良くするには？"
```

#### 視聴者とのインタラクション
```bash
# チャット連携スクリプト（配信用）
#!/bin/bash
# chat-integration.sh

# チャットからの質問を AI に転送
while read -r line; do
    if [[ $line == *"質問:"* ]]; then
        question=$(echo $line | sed 's/.*質問: //')
        echo "視聴者からの質問: $question"
        claude "$question について説明して"
    fi
done < chat.log
```

---

## 実践的なワークフロー

### 🔄 日常的な開発ワークフロー

#### 朝の開発開始ルーチン
```bash
# morning-dev.sh
#!/bin/bash

echo "☀️ おはようございます！今日の開発を開始します"

# システム状況確認
echo "📊 システム状況:"
df -h | head -2        # ディスク使用量
free -h               # メモリ使用量

# Git 状況確認
echo "📝 Git 状況:"
git status --short

# AI ツール確認
echo "🤖 AI ツール確認:"
claude --version
gh --version

# 今日のタスクを AI に相談
echo "📋 今日のタスク相談:"
claude "昨日は認証機能を実装した。今日は何から始めるべき？"

# 開発環境起動
cursor .
```

#### プロジェクト切り替えフロー
```bash
# project-switch.sh
#!/bin/bash

PROJECTS_DIR="$HOME/projects"

echo "🔄 プロジェクト一覧:"
ls -1 $PROJECTS_DIR

read -p "どのプロジェクトに切り替えますか？: " project_name

if [ -d "$PROJECTS_DIR/$project_name" ]; then
    cd "$PROJECTS_DIR/$project_name"
    
    # プロジェクト概要を AI に確認
    claude --analyze . "このプロジェクトの現在の状況を教えて"
    
    # 開発環境起動
    cursor .
else
    echo "❌ プロジェクトが見つかりません"
fi
```

### 🧪 テスト・デバッグワークフロー

#### AI支援デバッグ
```bash
# debug-workflow.sh
#!/bin/bash

echo "🐛 AI支援デバッグを開始"

# エラーログ確認
if [ -f "error.log" ]; then
    echo "📋 エラーログ分析中..."
    claude --file error.log "このエラーログを分析して解決策を提案"
fi

# コードの問題箇所特定
echo "🔍 問題箇所の特定..."
claude --analyze ./src/ "バグの可能性が高い箇所を特定"

# テスト実行
echo "🧪 テスト実行..."
npm test 2>&1 | tee test-output.log

# テスト結果分析
claude --file test-output.log "テスト結果を分析して改善点を提案"
```

### 📦 デプロイ・公開ワークフロー

#### AI支援デプロイチェック
```bash
# deploy-check.sh
#!/bin/bash

echo "🚀 デプロイ前チェックを開始"

# セキュリティチェック
echo "🔒 セキュリティチェック..."
claude --analyze . --security "デプロイ前のセキュリティチェック"

# パフォーマンス確認
echo "⚡ パフォーマンス確認..."
npm run build 2>&1 | claude "ビルド結果を分析してパフォーマンス問題を指摘"

# 設定ファイル確認
echo "⚙️ 設定確認..."
claude --file package.json "本番環境向けの設定を確認"

# 最終確認
read -p "デプロイを実行しますか？ (y/N): " confirm
if [[ $confirm == [yY] ]]; then
    echo "🚀 デプロイ実行中..."
    npm run deploy
else
    echo "❌ デプロイを中止しました"
fi
```

---

## トラブルシューティング

### ❌ よくある問題と解決法

#### 1. コマンドが見つからない
**症状**: `command not found` エラー

**解決方法**:
```bash
# PATH の確認
echo $PATH

# コマンドの場所を検索
which node
whereis python

# PATH に追加（.bashrc/.zshrc に追記）
export PATH="$HOME/.local/bin:$PATH"

# 設定を再読み込み
source ~/.bashrc  # または source ~/.zshrc
```

#### 2. 権限エラー
**症状**: `Permission denied` エラー

**解決方法**:
```bash
# ファイル権限確認
ls -la file.txt

# 実行権限付与
chmod +x script.sh

# 所有者変更（必要な場合のみ）
sudo chown $USER:$USER file.txt
```

#### 3. AI CLIツールの認証問題
**症状**: API認証エラー

**解決方法**:
```bash
# 環境変数確認
echo $OPENAI_API_KEY
echo $CLAUDE_API_KEY

# 環境変数設定（.bashrc/.zshrc に追記）
export OPENAI_API_KEY="your-api-key"
export CLAUDE_API_KEY="your-claude-key"

# 認証状況確認
claude --auth-status
gh auth status
```

---

## 実践演習

### 演習1: 基本ターミナル操作
**目標**: ターミナルの基本操作を習得

**手順**:
1. ディレクトリ作成・移動・削除
2. ファイル作成・編集・検索
3. パイプとフィルタリング
4. エイリアス設定

### 演習2: AI CLIツール活用
**目標**: AI CLIツールを実際の開発で活用

**課題**:
1. Claude Code または Gemini CLI のセットアップ
2. 簡単なプロジェクトでのAI相談
3. コードレビュー・改善提案の体験
4. デバッグ支援の活用

### 演習3: 自動化スクリプト作成
**目標**: 日常業務の自動化

**課題**:
1. 開発環境起動スクリプト作成
2. AI支援でのスクリプト最適化
3. エラーハンドリング追加
4. チーム共有用のドキュメント作成

---

## まとめ

ターミナル・CLIは、AI時代の開発において**人間とAIの効率的な対話インターフェース**として重要な役割を果たします。

### 🎯 重要なポイント
- **効率性**: キーボード中心の高速操作
- **自動化**: 繰り返し作業のスクリプト化
- **AI連携**: CLIベースAIツールとの直接対話
- **柔軟性**: 様々なツールとの組み合わせ

### 🚀 次のステップ
1. 日常的なターミナル使用による慣れ
2. AI CLIツールの継続的な活用
3. 自動化スクリプトの作成・改善
4. チーム開発でのCLI活用パターン共有

---

**次の講座**: 
- [API活用基礎](api-basics.md)
- [MCP (Model Context Protocol)](mcp-basics.md)