# Claude Code

**所要時間**: 15分  
**レベル**: 初級  
**前提知識**: なし

## 学習目標

この講座を修了すると、以下ができるようになります：
- Claude Codeの基本的な使い方を理解できる
- コマンドライン操作でClaude AIを活用できる
- 効率的なプログラミング支援を受けられる

---

## Claude Codeとは

**Claude Code**は、AnthropicのClaude AIをコマンドライン（ターミナル）から直接利用できるツールです。プログラミングやファイル操作を効率的に支援します。

### 主な特徴

- **コマンドライン統合**: ターミナルから直接Claude AIとやり取り
- **ファイル操作**: ローカルファイルの読み書きが可能
- **コード生成**: プログラムコードの自動生成
- **リアルタイム支援**: 即座にAIからの回答を取得

---

## 基本的な使い方

### インストール

```bash
# npmを使用してインストール
npm install -g claude-code

# または pipを使用
pip install claude-code
```

### 基本コマンド

```bash
# Claude Codeを起動
claude-code

# ファイルを指定して相談
claude-code myfile.py

# 質問を直接実行
claude-code "Pythonでファイルを読み込む方法を教えて"
```

---

## 実用例

### コード生成
```bash
claude-code "JavaScriptで配列をソートする関数を作成して"
```

### ファイル分析
```bash
claude-code analyze.py "このコードを最適化して"
```

### エラー解決
```bash
claude-code error.log "このエラーの原因と解決方法を教えて"
```

---

## まとめ

Claude Codeを使うことで、プログラミング作業を大幅に効率化できます。コマンドラインから直接AIの支援を受けられる便利なツールです。