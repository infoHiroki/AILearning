# Gemini TTS Converter - CLAUDE.mdルール準拠版

## 🎯 概要

CLAUDE.mdルールに準拠した新しいTTSシステム：
- Gemini API使用でコスト削減（現在無料プレビュー）
- Markdown記号は台本ファイルで事前削除
- 高品質な音声生成（30種類の音声選択可能）

## 🚀 改善ポイント

### ✅ CLAUDE.mdルール準拠
- ❌ プログラムでのMarkdown自動クリーンアップを廃止
- ✅ 台本ファイルでの直接修正方式に変更
- ✅ 技術的負債の解消

### 💰 コスト改善
- **旧システム**: Google Cloud TTS（従量課金）
- **新システム**: Gemini TTS（現在無料プレビュー）

### 🎵 音声品質向上
- 30種類の音声から選択可能
- より自然な音声生成
- 24言語サポート

## 📦 セットアップ

### 1. 依存関係インストール
```bash
pip install -r requirements.txt
```

### 2. API KEY設定
```bash
export GOOGLE_API_KEY="your_gemini_api_key"
```

## 🔧 使い方

### 基本的な使用例
```bash
# 基本変換（Kore音声）
python main.py プロンプト基礎_TTS.md プロンプト基礎.wav

# 音声指定
python main.py プロンプト基礎_TTS.md プロンプト基礎.wav --voice Leda

# 利用可能音声一覧
python main.py --list-voices
```

### 🎙️ 推奨音声（日本語）

1. **Kore** - Firm（デフォルト、しっかりした声）
2. **Leda** - Youthful（若々しい声）
3. **Puck** - Upbeat（明るい声）
4. **Aoede** - Breezy（さわやかな声）
5. **Charon** - Informative（情報伝達に適している）

## 📝 台本ファイル準備（重要）

### CLAUDE.mdルール準拠の台本作成
台本ファイル（`*_TTS.md`）では以下を事前に実施：

1. **見出し記号削除**: `# はじめに` → `はじめに。`
2. **句読点追加**: 見出し部分に句点「。」追加
3. **項目説明調整**: `1つ目は役割。` → `1つ目は役割、`
4. **接続詞調整**: `そこで次は` → `そこで、次は`
5. **Markdown記号削除**: `**太字**` → `太字`

### ❌ 避けるべき（旧方式）
```python
# プログラムでの自動クリーンアップ（CLAUDE.mdルール違反）
cleaned_text = clean_markdown_for_speech(text)
```

### ✅ 推奨（新方式）
```markdown
<!-- 台本ファイルで直接編集 -->
はじめに。

今回は、プロンプト基礎について学んでいきましょう。

まず最初に、基本的な考え方から説明します。
```

## 🧪 テスト

### 単体テスト実行
```bash
# Gemini TTS機能のテスト
pytest tests/test_gemini_tts_converter.py -v

# 既存システムとの比較テスト
INTEGRATION_TEST=1 pytest tests/test_gemini_tts_converter.py::test_gemini_vs_google_cloud_tts_comparison -v
```

### 手動テスト
```bash
# サンプルファイルでテスト
python main.py tests/samples/sample_tts.md test_output.wav

# 複数音声でテスト
python main.py tests/samples/sample_tts.md test_kore.wav --voice Kore
python main.py tests/samples/sample_tts.md test_leda.wav --voice Leda
```

## 📊 既存システムとの比較

| 項目 | Google Cloud TTS | Gemini TTS |
|------|------------------|------------|
| **コスト** | 従量課金 | 現在無料（プレビュー） |
| **音声品質** | Neural2-B（高品質） | より自然な音声 |
| **音声選択** | 限定的 | 30種類から選択 |
| **言語サポート** | 日本語 | 24言語 |
| **Markdownクリーンアップ** | プログラム内（ルール違反） | 台本ファイル（ルール準拠） |
| **出力形式** | MP3 | WAV（PCM 24kHz） |

## 🔄 移行手順

### Phase 1: 並行運用
```bash
# 旧システム（現在はarchive/に移動）
python archive/main_google_cloud.py input_TTS.md output.mp3

# 現在のシステム（Gemini TTS）
python main.py input_TTS.md output.wav
```

### Phase 2: 段階的移行
1. 台本ファイルでMarkdown記号を手動削除
2. Gemini TTSで音声生成
3. 品質確認

### Phase 3: 完全移行
1. 旧システム廃止
2. Gemini TTSを標準採用

## ⚠️ 注意事項

### API制限
- Gemini TTSはプレビュー機能
- レート制限あり
- 将来の価格変更可能性

### 品質チェック
- 生成音声の品質確認必須
- 長文での分割処理に注意
- WAVファイル形式での出力

### CLAUDE.mdルール準拠
- プログラムでのMarkdown自動処理禁止
- 台本ファイルでの直接編集必須
- 技術的負債の回避

## 🛠️ トラブルシューティング

### API KEYエラー
```bash
export GOOGLE_API_KEY="your_api_key"
# または
GOOGLE_API_KEY="your_api_key" python main_gemini.py input.md output.wav
```

### 音声品質問題
- 異なる音声名を試す
- 台本の句読点を調整
- テキスト分割を最適化

### ファイル形式問題
- WAV形式での出力確認
- PCM 24kHz 16bit モノラル仕様
- 再生ソフトの対応確認

## 📈 将来の拡張予定

1. **複数話者対応**: マルチスピーカー音声
2. **音声スタイル制御**: 感情・トーン調整
3. **バッチ処理**: 複数ファイル一括変換
4. **品質最適化**: 音声結合の改善