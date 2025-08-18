# Archive フォルダ

## 📦 アーカイブされたファイル

### Google Cloud TTS関連（旧システム）
- `gen-lang-client-0550271901-dbdeebba686b.json` - Google Cloud認証情報
  - 移動日: 2025-01-18
  - 理由: Gemini TTSへの移行により不要
  - 注意: Google Cloud TTSを使用する場合は元の場所に戻す必要あり

### 旧システムファイル（2025-01-18移動）
- `main_google_cloud.py` - 旧Google Cloud TTS CLI
- `tts_converter_google_cloud.py` - 旧TTS変換システム
- `test_tts_converter_google_cloud.py` - 旧システム用テスト
- `test_file_reader_legacy.py` - 重複機能テスト（削除済み機能）

## ⚠️ 注意事項
- Gemini TTSへの完全移行後は削除可能
- 並行運用する場合は保持推奨
- 認証情報は機密情報のため適切に管理
- 旧システム復旧時は元のファイル名に戻す必要あり