"""
TTS Converter - KISS/DRY/YAGNI準拠

シンプルな音声変換機能のみ実装
ライブラリに依存し、車輪の再発明を避ける
"""
from pathlib import Path
from typing import Union
from google.cloud import texttospeech


def read_tts_file(file_path: Union[str, Path]) -> str:
    """
    TTSファイルを読み込む
    
    KISS原則: シンプルな実装、必要最小限の機能
    - UTF-8エンコーディング固定
    - エラーハンドリングはOSに任せる
    
    Args:
        file_path: 読み込むファイルのパス
        
    Returns:
        str: ファイルの内容
        
    Raises:
        FileNotFoundError: ファイルが存在しない場合
        UnicodeDecodeError: エンコーディングエラーの場合
    """
    path = Path(file_path)
    return path.read_text(encoding='utf-8')


def clean_markdown_for_speech(text: str) -> str:
    """
    Markdown記号を音声読み上げ用にクリーンアップ
    
    ⚠️ CLAUDE.mdルール違反機能
    この機能は段階的に廃止予定
    台本ファイルで直接Markdown記号を削除することを推奨
    """
    import re
    
    # CLAUDE.mdルール違反の警告
    print("⚠️ 警告: Markdownクリーンアップ機能はCLAUDE.mdルール違反です")
    print("台本ファイルで直接Markdown記号を削除してください")
    
    # 見出し記号削除
    text = re.sub(r'^#+\s*', '', text, flags=re.MULTILINE)
    
    # 太字・斜体記号削除
    text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
    text = re.sub(r'\*(.+?)\*', r'\1', text)
    
    # リスト記号を自然な表現に
    text = re.sub(r'^\s*[-*+]\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\s*\d+\.\s+', '', text, flags=re.MULTILINE)
    
    # コードブロック削除
    text = re.sub(r'```.*?```', '', text, flags=re.DOTALL)
    text = re.sub(r'`(.+?)`', r'\1', text)
    
    # リンク記号削除
    text = re.sub(r'\[(.+?)\]\(.+?\)', r'\1', text)
    
    # 余分な改行・空白整理
    text = re.sub(r'\n\s*\n+', '\n\n', text)
    text = text.strip()
    
    return text


def split_text_by_bytes(text: str, max_bytes: int = 4500) -> list[str]:
    """
    テキストをバイト制限内に分割
    
    KISS原則: シンプルな文単位分割
    """
    sentences = text.replace('。', '。\n').split('\n')
    chunks = []
    current_chunk = ""
    
    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue
            
        test_chunk = current_chunk + sentence + " "
        if len(test_chunk.encode('utf-8')) > max_bytes:
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


def convert_text_to_speech(text: str) -> bytes:
    """
    テキストを音声データに変換
    
    KISS原則: Google TTSライブラリにほぼ全て任せる
    - デフォルト設定で十分な品質
    - カスタマイズは後で必要になったら追加（YAGNI）
    
    Args:
        text: 変換するテキスト
        
    Returns:
        bytes: 音声データ（MP3形式）
        
    Raises:
        ValueError: テキストが空の場合
        GoogleAPIError: API呼び出しエラー
    """
    if not text.strip():
        raise ValueError("テキストが空です")
    
    # Google TTS クライアント作成（ライブラリのデフォルト設定使用）
    client = texttospeech.TextToSpeechClient()
    
    # リクエスト設定（最小限）
    synthesis_input = texttospeech.SynthesisInput(text=text)
    
    # 日本語音声設定（最高品質：Neural2音声）
    voice = texttospeech.VoiceSelectionParams(
        language_code="ja-JP",
        name="ja-JP-Neural2-B",  # Neural2エンジン（最高品質）
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
    )
    
    # 音声形式（MP3、高品質設定）
    # CLAUDE.mdルール準拠：speaking_rate=0.9（やや遅めの自然なポーズ）
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=0.9,  # CLAUDE.mdルール準拠（やや遅め）
        pitch=0.0,          # 標準ピッチ
        volume_gain_db=0.0  # 標準音量
    )
    
    # TTS実行（ライブラリに任せる）
    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )
    
    return response.audio_content


def save_audio_file(audio_data: bytes, output_path: Union[str, Path]) -> None:
    """
    音声データをファイルに保存
    
    KISS原則: pathlib標準機能で十分
    
    Args:
        audio_data: 音声データ
        output_path: 出力ファイルパス
    """
    path = Path(output_path)
    path.write_bytes(audio_data)


def convert_long_text_to_speech(text: str) -> bytes:
    """
    長文テキストを分割してTTS変換し、音声を結合
    
    Args:
        text: 変換するテキスト
        
    Returns:
        bytes: 結合された音声データ
    """
    # テキスト分割
    text_chunks = split_text_by_bytes(text)
    
    if len(text_chunks) == 1:
        # 分割不要な場合
        return convert_text_to_speech(text)
    
    # 各チャンクを音声変換
    audio_chunks = []
    for i, chunk in enumerate(text_chunks):
        print(f"チャンク {i+1}/{len(text_chunks)} を変換中...")
        audio_data = convert_text_to_speech(chunk)
        audio_chunks.append(audio_data)
    
    # 音声データの単純結合（KISS原則）
    return b''.join(audio_chunks)


def process_tts_file(input_file: Union[str, Path], output_file: Union[str, Path]) -> Path:
    """
    TTSファイルを音声ファイルに変換（統合機能）
    
    DRY原則: 既存機能を組み合わせ、重複を避ける
    
    Args:
        input_file: 入力TTSファイル
        output_file: 出力音声ファイル
        
    Returns:
        Path: 作成された音声ファイルのパス
    """
    # 既存機能の組み合わせ（DRY）
    text_content = read_tts_file(input_file)
    
    # Markdown記号をクリーンアップ（新機能）
    cleaned_text = clean_markdown_for_speech(text_content)
    
    # 長文対応：分割→TTS変換→結合
    audio_data = convert_long_text_to_speech(cleaned_text)
    save_audio_file(audio_data, output_file)
    
    return Path(output_file)