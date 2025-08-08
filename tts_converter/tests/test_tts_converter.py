"""
TDD: TTS変換機能のテスト

KISS原則: 最小限の機能テスト
- テキスト→音声変換
- Google TTS API統合
- エラーハンドリング
"""
import pytest
from unittest.mock import Mock, patch
from pathlib import Path


def test_convert_text_to_speech_success():
    """正常なTTS変換テスト（モック使用）"""
    from tts_converter import convert_text_to_speech
    
    # テストデータ
    test_text = "こんにちは。これはテストです。"
    
    # モックレスポンス
    mock_audio_content = b"fake_audio_data"
    
    # Google TTS APIをモック
    with patch('tts_converter.texttospeech.TextToSpeechClient') as mock_client:
        mock_instance = Mock()
        mock_client.return_value = mock_instance
        
        # synthesize_speechのモック設定
        mock_response = Mock()
        mock_response.audio_content = mock_audio_content
        mock_instance.synthesize_speech.return_value = mock_response
        
        # 実行
        result = convert_text_to_speech(test_text)
        
        # 検証
        assert result == mock_audio_content
        assert isinstance(result, bytes)
        mock_instance.synthesize_speech.assert_called_once()


def test_convert_text_to_speech_empty():
    """空テキストのテスト"""
    from tts_converter import convert_text_to_speech
    
    # 空テキスト
    empty_text = ""
    
    # 空テキストの場合はValueErrorを発生させる
    with pytest.raises(ValueError, match="テキストが空です"):
        convert_text_to_speech(empty_text)


def test_convert_text_to_speech_api_error():
    """Google TTS APIエラーのテスト"""
    from tts_converter import convert_text_to_speech
    from google.api_core.exceptions import GoogleAPIError
    
    test_text = "テストテキスト"
    
    # APIエラーをモック
    with patch('tts_converter.texttospeech.TextToSpeechClient') as mock_client:
        mock_instance = Mock()
        mock_client.return_value = mock_instance
        mock_instance.synthesize_speech.side_effect = GoogleAPIError("API Error")
        
        # APIエラーが再発生することを確認
        with pytest.raises(GoogleAPIError):
            convert_text_to_speech(test_text)


def test_save_audio_file():
    """音声ファイル保存テスト"""
    from tts_converter import save_audio_file
    import tempfile
    
    # テストデータ
    test_audio_data = b"fake_audio_content"
    
    # 一時ファイル作成
    with tempfile.NamedTemporaryFile(suffix='.mp3', delete=False) as temp_file:
        temp_path = Path(temp_file.name)
    
    try:
        # 実行
        save_audio_file(test_audio_data, temp_path)
        
        # 検証
        assert temp_path.exists()
        assert temp_path.read_bytes() == test_audio_data
        
    finally:
        # クリーンアップ
        temp_path.unlink()


def test_process_tts_file_integration():
    """ファイル→音声変換の統合テスト（モック使用）"""
    from tts_converter import process_tts_file
    
    # テストファイル
    test_file = Path(__file__).parent / "samples" / "sample_tts.md"
    output_file = Path("test_output.mp3")
    
    # モック設定
    mock_audio_content = b"fake_integrated_audio"
    
    with patch('tts_converter.texttospeech.TextToSpeechClient') as mock_client:
        mock_instance = Mock()
        mock_client.return_value = mock_instance
        mock_response = Mock()
        mock_response.audio_content = mock_audio_content
        mock_instance.synthesize_speech.return_value = mock_response
        
        try:
            # 実行
            result_path = process_tts_file(test_file, output_file)
            
            # 検証
            assert result_path == output_file
            assert output_file.exists()
            assert output_file.read_bytes() == mock_audio_content
            
        finally:
            # クリーンアップ
            if output_file.exists():
                output_file.unlink()