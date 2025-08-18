# TTS Converter

## 🎯 概要

CLAUDE.mdルール準拠のTTS（Text-to-Speech）変換システム。
Gemini APIを使用した高品質な日本語音声生成。

## 🚀 セットアップ

### 1. 依存関係インストール
```bash
pip install -r requirements.txt
```

### 2. API KEY設定
```bash
# .envファイル作成
cp .env.example .env

# .envファイルを編集してAPIキーを設定
# GOOGLE_API_KEY=your_gemini_api_key
```

## 📖 使用方法

### 基本的な変換
```bash
# デフォルト音声（Kore）で変換
python main.py input_TTS.md output.wav

# 音声を指定して変換
python main.py input_TTS.md output.wav --voice Leda

# 利用可能な音声一覧
python main.py --list-voices
```

### 推奨音声（日本語）
1. **Kore** - しっかりした声（デフォルト）
2. **Leda** - 若々しい声
3. **Puck** - 明るい声
4. **Aoede** - さわやかな声

## 📝 台本ファイル準備

TTS変換用の台本ファイル（`*_TTS.md`）では以下を実施：
- Markdown記号削除（#, **, *, `, ```など）
- XMLタグの音声化（`<商品>` → `商品タグ開始`）
- 句読点調整（自然なポーズのため）

## 🧪 テスト

```bash
# テスト実行
pytest

# サンプルファイルでテスト
python main.py tests/samples/sample_tts.md test_output.wav
```

## 📁 ファイル構成

```
tts_converter/
├── main.py                    # メインCLI
├── gemini_tts_converter.py    # Gemini TTS機能
├── requirements.txt           # 依存関係
├── .env.example              # 環境変数テンプレート
├── tests/                    # テストファイル
├── audio_output/             # 生成音声ファイル
└── archive/                  # 旧システムファイル
```

## 🔧 トラブルシューティング

### API KEYエラー
```bash
# 環境変数での設定
export GOOGLE_API_KEY="your_api_key"
```

### 長文処理
- 長いファイルは自動的に分割処理
- 6,000文字程度まで対応

## 📄 ライセンス

このプロジェクトはCLAUDE.mdルールに従って開発されています。