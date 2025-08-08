"""
TDD: ファイル読み込み機能のテスト

KISS原則: シンプルな機能のみテスト
- ファイル読み込み
- エンコーディング処理
- エラーハンドリング
"""
import pytest
from pathlib import Path
import tempfile
import os


def test_read_tts_file_success():
    """正常なファイル読み込みテスト"""
    # まだ実装していない関数をテスト（RED段階）
    from tts_converter import read_tts_file
    
    # テストファイルパス
    test_file = Path(__file__).parent / "samples" / "sample_tts.md"
    
    # 実行
    content = read_tts_file(test_file)
    
    # 検証
    assert isinstance(content, str)
    assert len(content) > 0
    assert "サンプル音声台本" in content
    assert "エーアイによる音声変換" in content


def test_read_tts_file_not_exists():
    """存在しないファイルのエラーハンドリングテスト"""
    from tts_converter import read_tts_file
    
    # 存在しないファイル
    non_existent_file = Path("does_not_exist.md")
    
    # エラーが発生することを確認
    with pytest.raises(FileNotFoundError):
        read_tts_file(non_existent_file)


def test_read_tts_file_empty():
    """空ファイルの処理テスト"""
    from tts_converter import read_tts_file
    
    # 一時的な空ファイル作成
    with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as f:
        temp_path = Path(f.name)
    
    try:
        # 実行
        content = read_tts_file(temp_path)
        
        # 検証
        assert content == ""
    
    finally:
        # クリーンアップ
        temp_path.unlink()


def test_read_tts_file_encoding():
    """日本語エンコーディングテスト"""
    from tts_converter import read_tts_file
    
    # 一時的な日本語ファイル作成
    test_content = "これは日本語のテストファイルです。\nエーアイ音声変換テスト。"
    
    with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', suffix='.md', delete=False) as f:
        f.write(test_content)
        temp_path = Path(f.name)
    
    try:
        # 実行
        content = read_tts_file(temp_path)
        
        # 検証
        assert content == test_content
        assert "日本語" in content
        assert "エーアイ" in content
    
    finally:
        # クリーンアップ
        temp_path.unlink()