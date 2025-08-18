#!/bin/bash
# TTS Converter 環境設定スクリプト
# API KEYの永続化設定

set -e

echo "🔧 TTS Converter 環境設定"
echo "========================="

# .envファイルの存在確認
if [ ! -f ".env" ]; then
    echo "📝 .envファイルを作成中..."
    cp .env.example .env
    echo "✅ .envファイルが作成されました"
else
    echo "✅ .envファイルが既に存在します"
fi

# API KEYの設定確認
if grep -q "GOOGLE_API_KEY=your_gemini_api_key_here" .env; then
    echo ""
    echo "⚠️  API KEYが未設定です"
    echo "以下の手順でAPI KEYを設定してください："
    echo ""
    echo "1. .envファイルを開く:"
    echo "   nano .env"
    echo ""
    echo "2. 以下の行を編集:"
    echo "   GOOGLE_API_KEY=your_gemini_api_key_here"
    echo "   ↓"
    echo "   GOOGLE_API_KEY=AIzaSyBRIQomu8Oj4EcRjICZuSsObJmEE5yHjWw"
    echo ""
    echo "3. ファイルを保存して終了"
    echo ""
elif grep -q "GOOGLE_API_KEY=" .env && ! grep -q "GOOGLE_API_KEY=$" .env; then
    echo "✅ API KEYが設定済みです"
else
    echo "⚠️  .envファイルの形式を確認してください"
fi

# シェル設定ファイルへの追加
SHELL_RC=""
if [ -f "$HOME/.zshrc" ]; then
    SHELL_RC="$HOME/.zshrc"
elif [ -f "$HOME/.bashrc" ]; then
    SHELL_RC="$HOME/.bashrc"
elif [ -f "$HOME/.bash_profile" ]; then
    SHELL_RC="$HOME/.bash_profile"
fi

if [ -n "$SHELL_RC" ]; then
    EXPORT_LINE="export GOOGLE_API_KEY=\"AIzaSyBRIQomu8Oj4EcRjICZuSsObJmEE5yHjWw\""
    
    if ! grep -q "GOOGLE_API_KEY.*AIzaSyBRIQomu8Oj4EcRjICZuSsObJmEE5yHjWw" "$SHELL_RC"; then
        echo ""
        echo "🔄 シェル設定ファイルに環境変数を追加中..."
        echo "# TTS Converter API KEY" >> "$SHELL_RC"
        echo "$EXPORT_LINE" >> "$SHELL_RC"
        echo "✅ $SHELL_RC に環境変数を追加しました"
        echo ""
        echo "📌 設定を有効にするには以下を実行："
        echo "   source $SHELL_RC"
        echo "   または新しいターミナルを開く"
    else
        echo "✅ シェル設定ファイルに環境変数が既に設定済みです"
    fi
fi

echo ""
echo "🧪 設定テスト"
echo "============="

# 現在の環境変数確認
if [ -n "$GOOGLE_API_KEY" ]; then
    echo "✅ 現在のセッションで環境変数が設定されています"
    echo "   GOOGLE_API_KEY=${GOOGLE_API_KEY:0:20}..."
else
    echo "⚠️  現在のセッションでは環境変数が未設定です"
    echo "以下のコマンドで設定してください："
    echo "   export GOOGLE_API_KEY=\"AIzaSyBRIQomu8Oj4EcRjICZuSsObJmEE5yHjWw\""
fi

echo ""
echo "🎵 使用例"
echo "========="
echo "python main.py input_TTS.md output.wav"
echo "python main.py --list-voices"
echo ""
echo "🎯 設定完了！"