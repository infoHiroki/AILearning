#!/usr/bin/env python3
"""
TTS Converter CLI - KISS原則準拠

シンプルなコマンドライン実装
使いやすさを最優先
"""
import sys
import argparse
from pathlib import Path
from tts_converter import process_tts_file


def main():
    """メイン実行関数（KISS原則）"""
    parser = argparse.ArgumentParser(
        description="TTSファイルを音声ファイルに変換",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
使用例:
  python main.py プロンプト基礎_TTS.md プロンプト基礎.mp3
  python main.py samples/sample_tts.md output.mp3
        """
    )
    
    parser.add_argument(
        "input_file",
        help="入力TTSファイル（.md）"
    )
    
    parser.add_argument(
        "output_file", 
        nargs="?",
        help="出力音声ファイル（.mp3）。省略時は入力ファイル名.mp3"
    )
    
    args = parser.parse_args()
    
    # 入力ファイルチェック（KISS原則：シンプルな検証）
    input_path = Path(args.input_file)
    if not input_path.exists():
        print(f"エラー: ファイルが見つかりません: {input_path}", file=sys.stderr)
        sys.exit(1)
    
    # 出力ファイル名決定（DRY原則：ロジック重複なし）
    if args.output_file:
        output_path = Path(args.output_file)
    else:
        output_path = input_path.with_suffix('.mp3')
    
    # 処理実行
    try:
        print(f"変換開始: {input_path} -> {output_path}")
        result_path = process_tts_file(input_path, output_path)
        print(f"変換完了: {result_path}")
        print(f"ファイルサイズ: {result_path.stat().st_size / 1024:.1f} KB")
        
    except Exception as e:
        print(f"エラー: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()