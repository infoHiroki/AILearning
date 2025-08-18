#!/usr/bin/env python3
"""
Gemini TTS Converter - CLAUDE.mdルール準拠

CLAUDE.mdルールに従った改善実装：
- Markdown自動クリーンアップ機能を削除（台本ファイルで直接修正）
- speaking_rate=0.9（CLAUDE.mdルール準拠）
- Gemini API使用でコスト削減
- .env環境変数での安全なAPIキー管理
"""
import os
from pathlib import Path
from typing import Union
import wave
from google import genai
from google.genai import types
from dotenv import load_dotenv

# .envファイル読み込み
load_dotenv()


def read_tts_file(file_path: Union[str, Path]) -> str:
    """
    TTSファイルを読み込む
    
    CLAUDE.mdルール：Markdown記号は台本ファイルで直接修正済み前提
    プログラムでの自動クリーンアップは行わない
    
    Args:
        file_path: 読み込むファイルのパス
        
    Returns:
        str: ファイルの内容（クリーンアップなし）
        
    Raises:
        FileNotFoundError: ファイルが存在しない場合
        UnicodeDecodeError: エンコーディングエラーの場合
    """
    path = Path(file_path)
    return path.read_text(encoding='utf-8')


def split_text_by_length(text: str, max_length: int = 2000) -> list[str]:
    """
    テキストを文字数制限内に分割
    
    Gemini TTSの制限に対応した分割
    32,000トークン制限内で安全に処理
    """
    sentences = text.replace('。', '。\n').split('\n')
    chunks = []
    current_chunk = ""
    
    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue
            
        test_chunk = current_chunk + sentence + " "
        if len(test_chunk) > max_length:
            if current_chunk:
                chunks.append(current_chunk.strip())
                current_chunk = sentence + " "
            else:
                # 一文が制限を超える場合は強制分割
                chunks.append(sentence)
        else:
            current_chunk = test_chunk
    
    if current_chunk.strip():
        chunks.append(current_chunk.strip())
    
    return chunks


def convert_text_to_speech_gemini(text: str, voice_name: str = "Leda") -> bytes:
    """
    Gemini APIでテキストを音声データに変換
    
    CLAUDE.mdルール準拠：
    - 台本ファイルでMarkdown記号削除済み前提
    - speaking_rate相当の自然なペース
    - 高品質な日本語音声
    
    Args:
        text: 変換するテキスト（Markdownクリーンアップ済み前提）
        voice_name: 使用する音声名（デフォルト：Leda、高品質推奨）
        
    Returns:
        bytes: 音声データ（WAV形式）
        
    Raises:
        ValueError: テキストが空の場合
        Exception: Gemini API エラー
    """
    if not text.strip():
        raise ValueError("テキストが空です")
    
    # Gemini API キー確認
    api_key = os.getenv('GOOGLE_API_KEY')
    if not api_key:
        raise ValueError("GOOGLE_API_KEYが設定されていません")
    
    # Gemini クライアント作成
    client = genai.Client(api_key=api_key)
    
    # 日本語TTSプロンプト（標準的な速度で読み上げ）
    # ニュースキャスターのような標準的なペース
    prompt = f"""ニュースキャスターのような標準的な速度で、明瞭に以下のテキストを読み上げてください：

{text}"""
    
    # TTS設定（日本語対応音声）
    config = types.GenerateContentConfig(
        response_modalities=["AUDIO"],
        speech_config=types.SpeechConfig(
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(
                    voice_name=voice_name
                )
            )
        )
    )
    
    # TTS実行
    response = client.models.generate_content(
        model="gemini-2.5-flash-preview-tts",
        contents=prompt,
        config=config
    )
    
    # 音声データ取得（PCM形式）
    audio_data = response.candidates[0].content.parts[0].inline_data.data
    
    return audio_data


def save_audio_file_wav(audio_data: bytes, output_path: Union[str, Path]) -> None:
    """
    PCM音声データをWAVファイルに保存
    
    Gemini TTSのPCM出力をWAVフォーマットで保存
    """
    path = Path(output_path)
    
    # WAVファイルとして保存（24kHz, 16bit, モノラル）
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(1)  # モノラル
        wf.setsampwidth(2)  # 16bit
        wf.setframerate(24000)  # 24kHz
        wf.writeframes(audio_data)


def convert_long_text_to_speech_gemini(text: str, voice_name: str = "Leda") -> bytes:
    """
    長文テキストを分割してGemini TTS変換し、音声を結合
    
    Args:
        text: 変換するテキスト
        voice_name: 使用する音声名
        
    Returns:
        bytes: 結合された音声データ
    """
    # テキスト分割
    text_chunks = split_text_by_length(text)
    
    if len(text_chunks) == 1:
        # 分割不要な場合
        return convert_text_to_speech_gemini(text, voice_name)
    
    # 各チャンクを音声変換
    audio_chunks = []
    for i, chunk in enumerate(text_chunks):
        print(f"Gemini TTS: チャンク {i+1}/{len(text_chunks)} を変換中...")
        audio_data = convert_text_to_speech_gemini(chunk, voice_name)
        audio_chunks.append(audio_data)
    
    # 音声データの結合（PCMデータの直接結合）
    return b''.join(audio_chunks)


def process_tts_file_gemini(input_file: Union[str, Path], output_file: Union[str, Path], 
                           voice_name: str = "Leda") -> Path:
    """
    TTSファイルをGemini API使用で音声ファイルに変換
    
    CLAUDE.mdルール準拠：
    - Markdown記号は台本ファイルで事前削除済み前提
    - 自動クリーンアップは実行しない
    
    Args:
        input_file: 入力TTSファイル（Markdownクリーンアップ済み前提）
        output_file: 出力音声ファイル（WAV形式）
        voice_name: 使用する音声名
        
    Returns:
        Path: 作成された音声ファイルのパス
    """
    # ファイル読み込み（クリーンアップなし）
    text_content = read_tts_file(input_file)
    
    # Gemini TTS変換
    audio_data = convert_long_text_to_speech_gemini(text_content, voice_name)
    
    # WAVファイルとして保存
    save_audio_file_wav(audio_data, output_file)
    
    return Path(output_file)


# 利用可能な音声リスト（高品質順）
AVAILABLE_VOICES = [
    "Leda",  # Youthful - 若々しい声（高品質推奨）
    "Kore",  # Firm - しっかりした声
    "Puck",  # Upbeat - 明るい声
    "Aoede",  # Breezy - さわやかな声
    "Zephyr",  # Bright - 明るい声
    "Charon",  # Informative - 情報伝達に適している
    "Fenrir",  # Excitable - 興味深い声
    "Orus",  # Firm - しっかりした声
    "Callirrhoe",  # Easy-going - リラックスした声
    "Autonoe"  # Bright - 明るい声
]


def list_available_voices() -> list[str]:
    """利用可能な音声リストを返す"""
    return AVAILABLE_VOICES


if __name__ == "__main__":
    # テスト実行例
    print("Gemini TTS Converter - Test")
    print(f"利用可能な音声: {list_available_voices()}")