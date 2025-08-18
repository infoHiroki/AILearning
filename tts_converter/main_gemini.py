#!/usr/bin/env python3
"""
Gemini TTS Converter CLI - CLAUDE.mdルール準拠

CLAUDE.mdルールに従った新しいCLI：
- Markdown記号は台本ファイルで事前削除済み前提
- Gemini API使用でコスト削減
- 高品質な音声生成
"""
import sys
import argparse
from pathlib import Path
from gemini_tts_converter import process_tts_file_gemini, list_available_voices


def main():
    """メイン実行関数（Gemini TTS版）"""
    parser = argparse.ArgumentParser(
        description="Gemini TTSでTTSファイルを音声ファイルに変換",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
使用例:
  python main_gemini.py プロンプト基礎_TTS.md プロンプト基礎.wav
  python main_gemini.py samples/sample_tts.md output.wav --voice Leda
  python main_gemini.py --list-voices  # 利用可能な音声一覧
        """
    )
    
    parser.add_argument(
        "input_file",
        nargs="?",
        help="入力TTSファイル（.md）※Markdown記号削除済み前提"
    )
    
    parser.add_argument(
        "output_file", 
        nargs="?",
        help="出力音声ファイル（.wav）。省略時は入力ファイル名.wav"
    )
    
    parser.add_argument(
        "--voice", "-v",
        default="Kore",
        help="音声名（デフォルト：Kore）"
    )
    
    parser.add_argument(
        "--list-voices", "-l",
        action="store_true",
        help="利用可能な音声一覧を表示"
    )
    
    args = parser.parse_args()
    
    # 音声一覧表示
    if args.list_voices:
        print("利用可能な音声一覧（日本語に適した順）:")
        for i, voice in enumerate(list_available_voices(), 1):
            print(f"  {i:2d}. {voice}")
        return
    
    # 入力ファイルが必要
    if not args.input_file:
        parser.print_help()
        print("\nエラー: 入力ファイルを指定してください", file=sys.stderr)
        sys.exit(1)
    
    # 入力ファイルチェック
    input_path = Path(args.input_file)
    if not input_path.exists():
        print(f"エラー: ファイルが見つかりません: {input_path}", file=sys.stderr)
        sys.exit(1)
    
    # 出力ファイル名決定
    if args.output_file:
        output_path = Path(args.output_file)
    else:
        output_path = input_path.with_suffix('.wav')
    
    # 音声名検証
    available_voices = list_available_voices()
    if args.voice not in available_voices:
        print(f"エラー: 音声 '{args.voice}' は利用できません", file=sys.stderr)
        print(f"利用可能な音声: {', '.join(available_voices)}", file=sys.stderr)
        sys.exit(1)
    
    # 処理実行
    try:
        print(f"Gemini TTS変換開始:")
        print(f"  入力: {input_path}")
        print(f"  出力: {output_path}")
        print(f"  音声: {args.voice}")
        print()
        
        result_path = process_tts_file_gemini(input_path, output_path, args.voice)
        
        print(f"✅ 変換完了: {result_path}")
        if result_path.exists():
            print(f"ファイルサイズ: {result_path.stat().st_size / 1024:.1f} KB")
        
    except ValueError as e:
        print(f"設定エラー: {e}", file=sys.stderr)
        print("GOOGLE_API_KEYが設定されているか確認してください", file=sys.stderr)
        sys.exit(1)
        
    except Exception as e:
        print(f"変換エラー: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()