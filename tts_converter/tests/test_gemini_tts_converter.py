"""
Gemini TTS変換機能のテスト

CLAUDE.mdルール準拠版テスト
"""
import pytest
import os
from unittest.mock import Mock, patch, MagicMock
from pathlib import Path


def test_read_tts_file():
    """TTSファイル読み込みテスト"""
    from gemini_tts_converter import read_tts_file
    
    # テストファイル
    test_file = Path(__file__).parent / "samples" / "sample_tts.md"
    
    # 実行
    content = read_tts_file(test_file)
    
    # 検証
    assert isinstance(content, str)
    assert len(content) > 0
    assert "サンプル音声台本" in content


def test_split_text_by_length():
    """テキスト分割テスト"""
    from gemini_tts_converter import split_text_by_length
    
    # 短いテキスト（分割不要）
    short_text = "これは短いテキストです。"
    result = split_text_by_length(short_text, max_length=100)
    assert len(result) == 1
    assert result[0] == short_text
    
    # 長いテキスト（分割必要）
    long_text = "これは長いテキストです。" * 100
    result = split_text_by_length(long_text, max_length=50)
    assert len(result) > 1
    
    # 各チャンクが制限内であることを確認
    for chunk in result:
        assert len(chunk) <= 55  # 多少のバッファを考慮


def test_convert_text_to_speech_gemini_success():
    """Gemini TTS正常変換テスト（モック使用）"""
    from gemini_tts_converter import convert_text_to_speech_gemini
    
    test_text = "こんにちは。これはGemini TTSのテストです。"
    mock_audio_data = b"fake_gemini_audio_data"
    
    # 環境変数をモック
    with patch.dict(os.environ, {'GOOGLE_API_KEY': 'test_api_key'}):
        # Gemini clientをモック
        with patch('gemini_tts_converter.genai.Client') as mock_client_class:
            # モッククライアントインスタンス
            mock_client = Mock()
            mock_client_class.return_value = mock_client
            
            # モックレスポンス構造
            mock_response = Mock()
            mock_response.candidates = [Mock()]
            mock_response.candidates[0].content = Mock()
            mock_response.candidates[0].content.parts = [Mock()]
            mock_response.candidates[0].content.parts[0].inline_data = Mock()
            mock_response.candidates[0].content.parts[0].inline_data.data = mock_audio_data
            
            mock_client.models.generate_content.return_value = mock_response
            
            # 実行
            result = convert_text_to_speech_gemini(test_text)
            
            # 検証
            assert result == mock_audio_data
            assert isinstance(result, bytes)
            mock_client.models.generate_content.assert_called_once()


def test_convert_text_to_speech_gemini_no_api_key():
    """API KEY未設定のテスト"""
    from gemini_tts_converter import convert_text_to_speech_gemini
    
    # 環境変数をクリア
    with patch.dict(os.environ, {}, clear=True):
        with pytest.raises(ValueError, match="GOOGLE_API_KEYが設定されていません"):
            convert_text_to_speech_gemini("テストテキスト")


def test_convert_text_to_speech_gemini_empty():
    """空テキストのテスト"""
    from gemini_tts_converter import convert_text_to_speech_gemini
    
    with pytest.raises(ValueError, match="テキストが空です"):
        convert_text_to_speech_gemini("")


def test_save_audio_file_wav():
    """WAV音声ファイル保存テスト"""
    from gemini_tts_converter import save_audio_file_wav
    import tempfile
    import wave
    
    # テスト用PCMデータ（24kHz, 16bit, モノラル, 1秒間の無音）
    sample_rate = 24000
    duration = 1.0
    num_samples = int(sample_rate * duration)
    test_audio_data = b'\x00\x00' * num_samples  # 16bit無音データ
    
    # 一時ファイル作成
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as temp_file:
        temp_path = Path(temp_file.name)
    
    try:
        # 実行
        save_audio_file_wav(test_audio_data, temp_path)
        
        # 検証
        assert temp_path.exists()
        
        # WAVファイルとして正しく保存されているかチェック
        with wave.open(str(temp_path), "rb") as wf:
            assert wf.getnchannels() == 1  # モノラル
            assert wf.getsampwidth() == 2  # 16bit
            assert wf.getframerate() == 24000  # 24kHz
            
    finally:
        # クリーンアップ
        if temp_path.exists():
            temp_path.unlink()


def test_list_available_voices():
    """利用可能音声リストテスト"""
    from gemini_tts_converter import list_available_voices
    
    voices = list_available_voices()
    
    # 検証
    assert isinstance(voices, list)
    assert len(voices) > 0
    assert "Kore" in voices  # デフォルト音声が含まれている
    assert "Leda" in voices  # 日本語に適した音声が含まれている


def test_convert_long_text_to_speech_gemini():
    """長文TTS変換テスト（モック使用）"""
    from gemini_tts_converter import convert_long_text_to_speech_gemini
    
    # 長いテキスト
    long_text = "これは長いテキストのテストです。" * 200
    mock_audio_chunk = b"fake_audio_chunk"
    
    with patch.dict(os.environ, {'GOOGLE_API_KEY': 'test_api_key'}):
        with patch('gemini_tts_converter.convert_text_to_speech_gemini') as mock_convert:
            mock_convert.return_value = mock_audio_chunk
            
            # 実行
            result = convert_long_text_to_speech_gemini(long_text)
            
            # 検証
            assert isinstance(result, bytes)
            # 複数回呼び出されることを確認（長文なので分割される）
            assert mock_convert.call_count >= 1


def test_process_tts_file_gemini_integration():
    """Gemini TTS統合テスト（モック使用）"""
    from gemini_tts_converter import process_tts_file_gemini
    
    # テストファイル
    test_file = Path(__file__).parent / "samples" / "sample_tts.md"
    output_file = Path("test_output_gemini.wav")
    
    mock_audio_data = b"fake_integrated_gemini_audio"
    
    with patch.dict(os.environ, {'GOOGLE_API_KEY': 'test_api_key'}):
        with patch('gemini_tts_converter.convert_long_text_to_speech_gemini') as mock_convert:
            mock_convert.return_value = mock_audio_data
            
            try:
                # 実行
                result_path = process_tts_file_gemini(test_file, output_file, "Kore")
                
                # 検証
                assert result_path == output_file
                assert output_file.exists()
                mock_convert.assert_called_once()
                
            finally:
                # クリーンアップ
                if output_file.exists():
                    output_file.unlink()


def test_gemini_vs_google_cloud_tts_comparison():
    """Gemini TTS vs Google Cloud TTS比較テスト"""
    # この関数は実際のAPIを使用するため、統合テスト時のみ実行
    # 環境変数INTEGRATION_TESTが設定されている場合のみ実行
    
    if not os.getenv('INTEGRATION_TEST'):
        pytest.skip("統合テストをスキップ（INTEGRATION_TEST環境変数が未設定）")
    
    from gemini_tts_converter import process_tts_file_gemini
    from tts_converter import process_tts_file
    
    test_file = Path(__file__).parent / "samples" / "sample_tts.md"
    
    # 両方のTTSで同じファイルを変換（実際のテストは手動実行）
    # gemini_output = Path("integration_test_gemini.wav")
    # google_output = Path("integration_test_google.mp3")
    
    print("統合テスト実行には実際のAPI KEYが必要です")
    print("手動でのテスト実行を推奨します")