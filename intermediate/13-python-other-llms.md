# その他LLMでのPython実行

**所要時間**: 1時間  
**レベル**: 中級  
**前提知識**: [ChatGPTでのPython実行](11-python-chatgpt.md), [ClaudeでのPython実行](12-python-claude.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- GitHub Copilot、Google Gemini、Microsoft Copilotでのコード実行を理解できる
- 各LLMの特徴を活かした使い分けができる
- 複数のLLMを組み合わせた開発ワークフローを構築できる
- コスト効率と性能のバランスを考慮した選択ができる

## 📋 目次

1. [各LLMのPython実行環境比較](#各llmのpython実行環境比較)
2. [GitHub Copilot活用](#github-copilot活用)
3. [Google Gemini実行環境](#google-gemini実行環境)
4. [Microsoft Copilot活用](#microsoft-copilot活用)
5. [LLM組み合わせ戦略](#llm組み合わせ戦略)

---

## 各LLMのPython実行環境比較

### 🔄 主要LLMの特徴比較

| 特徴 | ChatGPT | Claude | GitHub Copilot | Google Gemini | MS Copilot |
|------|---------|--------|---------------|--------------|------------|
| **Python実行** | ✅ 内蔵 | ✅ Artifacts | ❌ IDE連携 | ✅ 制限あり | ✅ 制限あり |
| **ファイル処理** | ✅ 強力 | 制限あり | ✅ ローカル | 制限あり | 制限あり |
| **コード品質** | 90.2% | 93.7% | 95%+ | 71.9% | 90%+ |
| **コスト** | 高 | 高 | 低〜中 | 最安 | 中 |
| **リアルタイム情報** | ❌ | ❌ | ❌ | ✅ | ✅ |
| **統合開発環境** | ❌ | ❌ | ✅ 最強 | ❌ | ✅ Office |

### 🎯 用途別推奨LLM

#### データ分析・可視化
```
1位: ChatGPT Code Interpreter - ファイル処理と可視化が強力
2位: Claude - 統計的厳密性と詳細解説
3位: Gemini - コスト効率重視なら最適
4位: MS Copilot - Office連携が必要な場合
```

#### コード開発・デバッグ
```
1位: GitHub Copilot - IDE統合で最高の開発体験
2位: Claude - 高品質なコード生成と解説
3位: ChatGPT - プロトタイピングと実験
4位: Gemini - 基本的な開発サポート
```

#### 学習・教育
```
1位: Claude - 詳細な解説と理論的背景
2位: ChatGPT - インタラクティブな学習
3位: GitHub Copilot - 実践的なコーディング
4位: Gemini - 基礎学習
```

---

## GitHub Copilot活用

### 💻 統合開発環境での活用

#### VS Code での基本設定
```python
# GitHub Copilot を活用したPython開発

# 1. インラインサジェスト活用
def calculate_sales_metrics(sales_data):
    """
    売上データから各種メトリクスを計算
    Copilot が自動的にコードを提案
    """
    # Copilot提案: 基本統計の計算
    total_sales = sum(sales_data)
    average_sales = total_sales / len(sales_data)
    max_sales = max(sales_data)
    min_sales = min(sales_data)
    
    # Copilot提案: 標準偏差の計算
    import statistics
    std_dev = statistics.stdev(sales_data)
    
    return {
        'total': total_sales,
        'average': average_sales,
        'max': max_sales,
        'min': min_sales,
        'std_dev': std_dev
    }

# 2. チャット機能での詳細説明要求
# Ctrl+I で Copilot Chat を開き、以下のように質問:
# "この関数のエラーハンドリングを追加して"
# "パフォーマンスを最適化して"
# "単体テストを作成して"
```

#### Copilot Chat での高度な活用
```python
# プロンプト例（Copilot Chat内）
"""
以下の要件でデータ分析クラスを作成してください：

1. CSV、Excel、JSON ファイルの読み込み対応
2. 基本統計量の計算
3. 可視化機能（matplotlib使用）
4. エクスポート機能
5. エラーハンドリング
6. ログ機能
7. 型ヒント対応
8. docstring完備

クラス名: DataAnalyzer
主要メソッド: load_data, analyze, visualize, export
"""

# Copilot が生成するコード例
from typing import Dict, List, Optional, Union
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import logging
from pathlib import Path

class DataAnalyzer:
    """
    データ分析を行うためのクラス
    """
    
    def __init__(self, log_level: str = "INFO"):
        """
        DataAnalyzer の初期化
        
        Args:
            log_level: ログレベル
        """
        self.data: Optional[pd.DataFrame] = None
        self.analysis_results: Dict = {}
        
        # ログ設定
        logging.basicConfig(
            level=getattr(logging, log_level.upper()),
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
    
    def load_data(self, file_path: Union[str, Path], **kwargs) -> bool:
        """
        データファイルを読み込む
        
        Args:
            file_path: ファイルパス
            **kwargs: pandas読み込み関数への追加引数
            
        Returns:
            読み込み成功の可否
        """
        try:
            file_path = Path(file_path)
            
            if not file_path.exists():
                raise FileNotFoundError(f"File not found: {file_path}")
            
            # ファイル形式に応じた読み込み
            suffix = file_path.suffix.lower()
            
            if suffix == '.csv':
                self.data = pd.read_csv(file_path, **kwargs)
            elif suffix in ['.xlsx', '.xls']:
                self.data = pd.read_excel(file_path, **kwargs)
            elif suffix == '.json':
                self.data = pd.read_json(file_path, **kwargs)
            else:
                raise ValueError(f"Unsupported file format: {suffix}")
            
            self.logger.info(f"Data loaded successfully. Shape: {self.data.shape}")
            return True
            
        except Exception as e:
            self.logger.error(f"Error loading data: {e}")
            return False
    
    def analyze(self) -> Dict:
        """
        データ分析を実行
        
        Returns:
            分析結果の辞書
        """
        if self.data is None:
            raise ValueError("No data loaded. Call load_data() first.")
        
        try:
            # 基本統計
            basic_stats = self.data.describe()
            
            # 欠損値情報
            missing_info = self.data.isnull().sum()
            
            # データ型情報
            dtype_info = self.data.dtypes
            
            # 相関分析（数値列のみ）
            numeric_cols = self.data.select_dtypes(include=[np.number]).columns
            correlation_matrix = self.data[numeric_cols].corr() if len(numeric_cols) > 1 else None
            
            self.analysis_results = {
                'basic_stats': basic_stats,
                'missing_values': missing_info,
                'data_types': dtype_info,
                'correlation_matrix': correlation_matrix,
                'shape': self.data.shape
            }
            
            self.logger.info("Analysis completed successfully")
            return self.analysis_results
            
        except Exception as e:
            self.logger.error(f"Error during analysis: {e}")
            raise
    
    def visualize(self, plot_type: str = "histogram", 
                  columns: Optional[List[str]] = None) -> None:
        """
        データを可視化
        
        Args:
            plot_type: プロット種類
            columns: 対象列（Noneの場合は数値列全て）
        """
        if self.data is None:
            raise ValueError("No data loaded")
        
        if columns is None:
            columns = self.data.select_dtypes(include=[np.number]).columns.tolist()
        
        if not columns:
            raise ValueError("No numeric columns found")
        
        try:
            fig, axes = plt.subplots(
                nrows=(len(columns) + 1) // 2, 
                ncols=2, 
                figsize=(12, 6 * ((len(columns) + 1) // 2))
            )
            
            if len(columns) == 1:
                axes = [axes]
            elif len(columns) > 2:
                axes = axes.flatten()
            
            for i, col in enumerate(columns):
                ax = axes[i] if len(columns) > 1 else axes
                
                if plot_type == "histogram":
                    self.data[col].hist(bins=30, ax=ax, alpha=0.7)
                elif plot_type == "boxplot":
                    self.data.boxplot(column=col, ax=ax)
                elif plot_type == "scatter" and len(columns) >= 2:
                    if i < len(columns) - 1:
                        ax.scatter(self.data[columns[i]], self.data[columns[i+1]])
                        ax.set_xlabel(columns[i])
                        ax.set_ylabel(columns[i+1])
                
                ax.set_title(f'{plot_type.title()} of {col}')
            
            # 使用しないサブプロットを非表示
            if len(columns) % 2 == 1 and len(columns) > 1:
                axes[-1].set_visible(False)
            
            plt.tight_layout()
            plt.show()
            
            self.logger.info(f"Visualization created: {plot_type}")
            
        except Exception as e:
            self.logger.error(f"Error creating visualization: {e}")
            raise
    
    def export_results(self, output_path: Union[str, Path], 
                      format: str = "xlsx") -> bool:
        """
        分析結果をエクスポート
        
        Args:
            output_path: 出力パス
            format: 出力形式
            
        Returns:
            出力成功の可否
        """
        if not self.analysis_results:
            raise ValueError("No analysis results. Call analyze() first.")
        
        try:
            output_path = Path(output_path)
            
            if format.lower() == "xlsx":
                with pd.ExcelWriter(output_path, engine='openpyxl') as writer:
                    # 基本統計
                    self.analysis_results['basic_stats'].to_excel(
                        writer, sheet_name='Basic_Stats'
                    )
                    
                    # 欠損値情報
                    pd.DataFrame(self.analysis_results['missing_values']).to_excel(
                        writer, sheet_name='Missing_Values'
                    )
                    
                    # 相関行列
                    if self.analysis_results['correlation_matrix'] is not None:
                        self.analysis_results['correlation_matrix'].to_excel(
                            writer, sheet_name='Correlation'
                        )
            
            elif format.lower() == "json":
                # JSON形式での出力（DataFrameを辞書に変換）
                export_data = {}
                for key, value in self.analysis_results.items():
                    if isinstance(value, pd.DataFrame):
                        export_data[key] = value.to_dict()
                    elif isinstance(value, pd.Series):
                        export_data[key] = value.to_dict()
                    else:
                        export_data[key] = str(value)
                
                import json
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(export_data, f, ensure_ascii=False, indent=2)
            
            self.logger.info(f"Results exported to {output_path}")
            return True
            
        except Exception as e:
            self.logger.error(f"Error exporting results: {e}")
            return False

# 使用例
if __name__ == "__main__":
    analyzer = DataAnalyzer()
    
    # データ読み込み
    if analyzer.load_data("sample_data.csv"):
        # 分析実行
        results = analyzer.analyze()
        
        # 可視化
        analyzer.visualize("histogram")
        
        # 結果エクスポート
        analyzer.export_results("analysis_results.xlsx")
```

### 🛠️ Copilot Workspace活用

#### プロジェクト全体の生成
```python
# Copilot Workspace でのプロンプト例
"""
データ分析Webアプリケーションを作成してください：

技術スタック:
- Backend: FastAPI + Python
- Frontend: Streamlit
- Database: SQLite
- 可視化: Plotly

機能要件:
1. ファイルアップロード機能
2. データ前処理・クリーニング
3. 統計分析・可視化
4. レポート生成・ダウンロード
5. データベース保存・履歴管理

プロジェクト構造:
- app/ (メインアプリケーション)
- models/ (データモデル)
- utils/ (ユーティリティ)
- tests/ (テストコード)
- requirements.txt
- README.md
"""

# Copilot が生成するプロジェクト構造
```

---

## Google Gemini実行環境

### 🔍 Gemini の特徴と活用法

#### コスト効率重視の分析
```python
# プロンプト例（Gemini使用）
"""
コスト効率を重視した大量データ処理システムを作成してください。
以下の要件を満たすPythonコードを生成してください：

要件:
1. メモリ効率的なデータ処理
2. バッチ処理対応
3. 進捗表示
4. エラー回復機能
5. ログ出力
6. 設定ファイル対応

対象データ: 数百万行のCSVファイル
処理内容: 統計分析、集計、レポート生成
制約: メモリ使用量を最小限に抑制
"""

# Gemini 生成コード例
import pandas as pd
import numpy as np
import logging
from pathlib import Path
import yaml
from tqdm import tqdm
import gc

class EfficientDataProcessor:
    """
    メモリ効率を重視した大量データ処理クラス
    """
    
    def __init__(self, config_path: str = "config.yaml"):
        """初期化"""
        self.config = self.load_config(config_path)
        self.setup_logging()
        
    def load_config(self, config_path: str) -> dict:
        """設定ファイル読み込み"""
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            # デフォルト設定
            return {
                'chunk_size': 10000,
                'memory_limit_mb': 1000,
                'output_format': 'csv'
            }
    
    def setup_logging(self):
        """ログ設定"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('processing.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def process_large_file(self, input_path: str, output_path: str):
        """
        大きなファイルをチャンク単位で処理
        """
        self.logger.info(f"Processing started: {input_path}")
        
        chunk_size = self.config['chunk_size']
        results = []
        
        try:
            # ファイルサイズ確認
            file_size = Path(input_path).stat().st_size / (1024 * 1024)  # MB
            self.logger.info(f"File size: {file_size:.1f} MB")
            
            # チャンク処理
            chunk_iter = pd.read_csv(input_path, chunksize=chunk_size)
            
            for i, chunk in enumerate(tqdm(chunk_iter, desc="Processing chunks")):
                try:
                    # チャンクごとの処理
                    processed_chunk = self.process_chunk(chunk)
                    results.append(processed_chunk)
                    
                    # メモリクリーンアップ
                    del chunk
                    if i % 10 == 0:  # 10チャンクごとにGC
                        gc.collect()
                        
                except Exception as e:
                    self.logger.error(f"Error processing chunk {i}: {e}")
                    continue
            
            # 結果統合
            final_result = self.combine_results(results)
            
            # 出力
            self.save_results(final_result, output_path)
            
            self.logger.info("Processing completed successfully")
            
        except Exception as e:
            self.logger.error(f"Processing failed: {e}")
            raise
    
    def process_chunk(self, chunk: pd.DataFrame) -> dict:
        """
        チャンク単位の処理
        """
        return {
            'count': len(chunk),
            'sum_values': chunk.select_dtypes(include=[np.number]).sum().to_dict(),
            'mean_values': chunk.select_dtypes(include=[np.number]).mean().to_dict(),
            'null_counts': chunk.isnull().sum().to_dict()
        }
    
    def combine_results(self, results: list) -> dict:
        """
        結果の統合
        """
        combined = {
            'total_count': sum(r['count'] for r in results),
            'sum_values': {},
            'mean_values': {},
            'null_counts': {}
        }
        
        # 数値列の合計値を統合
        for result in results:
            for col, val in result['sum_values'].items():
                combined['sum_values'][col] = combined['sum_values'].get(col, 0) + val
        
        # 平均値の計算（加重平均）
        for col in combined['sum_values'].keys():
            combined['mean_values'][col] = combined['sum_values'][col] / combined['total_count']
        
        # NULL値カウントの統合
        for result in results:
            for col, val in result['null_counts'].items():
                combined['null_counts'][col] = combined['null_counts'].get(col, 0) + val
        
        return combined
    
    def save_results(self, results: dict, output_path: str):
        """結果保存"""
        # 結果をDataFrameに変換して保存
        df_results = pd.DataFrame([results])
        df_results.to_csv(output_path, index=False)
        self.logger.info(f"Results saved to: {output_path}")

# 設定ファイル例（config.yaml）
config_content = """
chunk_size: 50000
memory_limit_mb: 2000
output_format: csv
processing:
  remove_duplicates: true
  handle_missing: true
  normalize_data: false
logging:
  level: INFO
  file: processing.log
"""

# 使用例
processor = EfficientDataProcessor()
processor.process_large_file("large_dataset.csv", "processed_results.csv")
```

#### Gemini の多言語・多モーダル対応
```python
# プロンプト例
"""
多言語対応のデータ分析システムを作成してください：

機能:
1. 複数言語のテキストデータ処理
2. 画像データの解析
3. 音声データの処理
4. 統合レポート生成

対応言語: 日本語、英語、中国語、韓国語
出力: 多言語対応レポート
"""

class MultiModalAnalyzer:
    """
    多言語・多モーダル分析システム
    """
    
    def __init__(self):
        self.supported_languages = ['ja', 'en', 'zh', 'ko']
        self.results = {}
    
    def analyze_text(self, text_data: dict, language: str = 'ja'):
        """
        テキストデータ分析
        """
        import re
        from collections import Counter
        
        if language not in self.supported_languages:
            raise ValueError(f"Unsupported language: {language}")
        
        # 言語別の処理
        if language == 'ja':
            # 日本語処理
            words = re.findall(r'[ひらがなカタカナ漢字]+', text_data.get('content', ''))
        elif language == 'en':
            # 英語処理
            words = re.findall(r'\b[a-zA-Z]+\b', text_data.get('content', ''))
        
        # 頻度分析
        word_freq = Counter(words)
        
        return {
            'language': language,
            'word_count': len(words),
            'unique_words': len(word_freq),
            'top_words': word_freq.most_common(10)
        }
    
    def analyze_image(self, image_path: str):
        """
        画像データ分析
        """
        try:
            from PIL import Image
            import numpy as np
            
            img = Image.open(image_path)
            img_array = np.array(img)
            
            return {
                'dimensions': img.size,
                'channels': len(img_array.shape),
                'file_size': Path(image_path).stat().st_size,
                'average_brightness': np.mean(img_array)
            }
        except ImportError:
            return {'error': 'PIL not available'}
    
    def generate_multilingual_report(self, data: dict, target_language: str = 'ja'):
        """
        多言語レポート生成
        """
        templates = {
            'ja': {
                'title': 'データ分析レポート',
                'summary': '分析概要',
                'details': '詳細結果'
            },
            'en': {
                'title': 'Data Analysis Report',
                'summary': 'Analysis Summary',
                'details': 'Detailed Results'
            }
        }
        
        template = templates.get(target_language, templates['ja'])
        
        report = f"""
# {template['title']}

## {template['summary']}
- 処理データ数: {data.get('record_count', 0)}
- 分析対象期間: {data.get('period', 'N/A')}
- 主要指標: {data.get('key_metrics', {})}

## {template['details']}
{data.get('detailed_results', 'データがありません')}
        """
        
        return report

# 使用例
analyzer = MultiModalAnalyzer()

# テキスト分析
text_result = analyzer.analyze_text({
    'content': 'これはサンプルテキストです。データ分析を実行します。'
}, 'ja')

# レポート生成
report = analyzer.generate_multilingual_report({
    'record_count': 1000,
    'period': '2024年1月-6月',
    'key_metrics': {'売上': '1億円', '利益率': '15%'}
}, 'ja')

print(report)
```

---

## Microsoft Copilot活用

### 💼 Office統合での活用

#### Excel連携分析
```python
# プロンプト例（Microsoft Copilot使用）
"""
ExcelデータをPythonで分析し、結果をPowerPointレポートとして自動生成するシステムを作成してください：

要件:
1. Excel ファイルの読み込み
2. データクリーニング・前処理
3. 統計分析・可視化
4. PowerPoint レポート自動生成
5. Outlook でのメール送信

技術スタック:
- pandas, openpyxl (Excel処理)
- matplotlib, seaborn (可視化)
- python-pptx (PowerPoint生成)
- win32com.client (Office連携)
"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pptx import Presentation
from pptx.util import Inches
import win32com.client as win32
from datetime import datetime
import os
import tempfile

class OfficeIntegratedAnalyzer:
    """
    Office統合データ分析システム
    """
    
    def __init__(self):
        self.data = None
        self.analysis_results = {}
        self.charts = []
    
    def load_excel_data(self, excel_path: str, sheet_name: str = None):
        """
        Excelファイルからデータ読み込み
        """
        try:
            if sheet_name:
                self.data = pd.read_excel(excel_path, sheet_name=sheet_name)
            else:
                # 全シートを読み込み
                excel_file = pd.ExcelFile(excel_path)
                if len(excel_file.sheet_names) == 1:
                    self.data = pd.read_excel(excel_path)
                else:
                    # 複数シートの場合は最初のシートを使用
                    self.data = pd.read_excel(excel_path, sheet_name=0)
            
            print(f"データ読み込み完了: {self.data.shape}")
            return True
            
        except Exception as e:
            print(f"Excel読み込みエラー: {e}")
            return False
    
    def perform_analysis(self):
        """
        データ分析実行
        """
        if self.data is None:
            raise ValueError("データが読み込まれていません")
        
        # 基本統計
        numeric_cols = self.data.select_dtypes(include=['number']).columns
        
        self.analysis_results = {
            'basic_stats': self.data[numeric_cols].describe(),
            'correlation': self.data[numeric_cols].corr(),
            'missing_values': self.data.isnull().sum(),
            'data_types': self.data.dtypes,
            'record_count': len(self.data)
        }
        
        print("分析完了")
        return self.analysis_results
    
    def create_charts(self):
        """
        グラフ作成
        """
        numeric_cols = self.data.select_dtypes(include=['number']).columns
        
        # 1. 基本統計のヒストグラム
        fig, axes = plt.subplots(2, 2, figsize=(12, 10))
        axes = axes.flatten()
        
        for i, col in enumerate(numeric_cols[:4]):
            if i < len(axes):
                self.data[col].hist(bins=20, ax=axes[i], alpha=0.7)
                axes[i].set_title(f'{col} の分布')
                axes[i].set_xlabel(col)
                axes[i].set_ylabel('頻度')
        
        # 未使用のサブプロットを非表示
        for i in range(len(numeric_cols), len(axes)):
            axes[i].set_visible(False)
        
        plt.tight_layout()
        
        # 一時ファイルに保存
        chart1_path = os.path.join(tempfile.gettempdir(), 'chart1.png')
        plt.savefig(chart1_path, dpi=300, bbox_inches='tight')
        self.charts.append(chart1_path)
        plt.close()
        
        # 2. 相関ヒートマップ
        if len(numeric_cols) > 1:
            fig, ax = plt.subplots(figsize=(10, 8))
            sns.heatmap(self.analysis_results['correlation'], 
                       annot=True, cmap='coolwarm', center=0, ax=ax)
            ax.set_title('変数間相関')
            
            chart2_path = os.path.join(tempfile.gettempdir(), 'chart2.png')
            plt.savefig(chart2_path, dpi=300, bbox_inches='tight')
            self.charts.append(chart2_path)
            plt.close()
        
        print(f"グラフ作成完了: {len(self.charts)}個")
    
    def create_powerpoint_report(self, output_path: str):
        """
        PowerPoint レポート作成
        """
        # 新しいプレゼンテーション作成
        prs = Presentation()
        
        # タイトルスライド
        title_slide_layout = prs.slide_layouts[0]
        slide = prs.slides.add_slide(title_slide_layout)
        
        title = slide.shapes.title
        subtitle = slide.placeholders[1]
        
        title.text = "データ分析レポート"
        subtitle.text = f"作成日: {datetime.now().strftime('%Y年%m月%d日')}"
        
        # サマリースライド
        bullet_slide_layout = prs.slide_layouts[1]
        slide = prs.slides.add_slide(bullet_slide_layout)
        
        title = slide.shapes.title
        content = slide.placeholders[1]
        
        title.text = "分析サマリー"
        
        tf = content.text_frame
        tf.text = f"データ概要"
        
        p = tf.add_paragraph()
        p.text = f"• レコード数: {self.analysis_results['record_count']:,}件"
        p.level = 1
        
        p = tf.add_paragraph()
        p.text = f"• 数値列数: {len(self.data.select_dtypes(include=['number']).columns)}列"
        p.level = 1
        
        p = tf.add_paragraph()
        p.text = f"• 欠損値: {self.analysis_results['missing_values'].sum()}個"
        p.level = 1
        
        # グラフスライド
        for i, chart_path in enumerate(self.charts):
            slide = prs.slides.add_slide(prs.slide_layouts[5])  # blank layout
            
            title_shape = slide.shapes.add_textbox(
                Inches(0.5), Inches(0.5), Inches(9), Inches(1)
            )
            title_frame = title_shape.text_frame
            title_frame.text = f"分析結果 {i+1}"
            
            slide.shapes.add_picture(
                chart_path, Inches(1), Inches(1.5), 
                width=Inches(8), height=Inches(6)
            )
        
        # 保存
        prs.save(output_path)
        print(f"PowerPoint レポート作成完了: {output_path}")
    
    def send_email_report(self, recipients: list, ppt_path: str):
        """
        Outlook でレポートをメール送信
        """
        try:
            # Outlook アプリケーション起動
            outlook = win32.Dispatch('outlook.application')
            
            # メール作成
            mail = outlook.CreateItem(0)  # 0 = olMailItem
            
            # 宛先設定
            mail.To = '; '.join(recipients)
            
            # メール内容
            mail.Subject = f"データ分析レポート - {datetime.now().strftime('%Y/%m/%d')}"
            
            mail.Body = f"""
データ分析レポートを送付いたします。

【分析概要】
・レコード数: {self.analysis_results['record_count']:,}件
・分析実行日: {datetime.now().strftime('%Y年%m月%d日')}
・欠損値: {self.analysis_results['missing_values'].sum()}個

詳細は添付のPowerPointファイルをご確認ください。

よろしくお願いいたします。
            """
            
            # ファイル添付
            mail.Attachments.Add(ppt_path)
            
            # 送信
            mail.Send()
            
            print("メール送信完了")
            
        except Exception as e:
            print(f"メール送信エラー: {e}")
    
    def run_full_analysis(self, excel_path: str, output_dir: str, 
                         recipients: list = None):
        """
        完全な分析フローの実行
        """
        # 1. データ読み込み
        if not self.load_excel_data(excel_path):
            return False
        
        # 2. 分析実行
        self.perform_analysis()
        
        # 3. グラフ作成
        self.create_charts()
        
        # 4. PowerPoint レポート作成
        ppt_path = os.path.join(output_dir, 
                               f"analysis_report_{datetime.now().strftime('%Y%m%d')}.pptx")
        self.create_powerpoint_report(ppt_path)
        
        # 5. メール送信（オプション）
        if recipients:
            self.send_email_report(recipients, ppt_path)
        
        # 6. 一時ファイルクリーンアップ
        for chart_path in self.charts:
            try:
                os.remove(chart_path)
            except:
                pass
        
        print("全処理完了")
        return True

# 使用例
analyzer = OfficeIntegratedAnalyzer()

# 完全分析の実行
analyzer.run_full_analysis(
    excel_path="sales_data.xlsx",
    output_dir="./reports",
    recipients=["manager@company.com", "analyst@company.com"]
)
```

---

## LLM組み合わせ戦略

### 🔄 効果的な組み合わせパターン

#### 開発フェーズ別使い分け
```python
class LLMWorkflowManager:
    """
    複数LLMを効果的に組み合わせるワークフロー管理
    """
    
    def __init__(self):
        self.workflow_stages = {
            'planning': 'Claude',      # 詳細な設計・計画
            'coding': 'Copilot',       # 高品質なコード生成
            'testing': 'ChatGPT',      # テストケース生成
            'analysis': 'ChatGPT',     # データ分析・可視化
            'optimization': 'Claude',  # パフォーマンス最適化
            'documentation': 'Claude'  # 詳細なドキュメント
        }
    
    def get_recommended_llm(self, task_type: str, requirements: dict = None):
        """
        タスクに応じた推奨LLM選択
        """
        cost_priority = requirements.get('cost_priority', False) if requirements else False
        performance_priority = requirements.get('performance_priority', False) if requirements else False
        
        base_recommendation = self.workflow_stages.get(task_type, 'ChatGPT')
        
        # コスト重視の場合
        if cost_priority:
            cost_alternatives = {
                'Claude': 'Gemini',
                'ChatGPT': 'Gemini',
                'Copilot': 'Gemini'
            }
            return cost_alternatives.get(base_recommendation, base_recommendation)
        
        # パフォーマンス重視の場合
        if performance_priority and task_type == 'coding':
            return 'Copilot'  # 開発環境統合で最高性能
        
        return base_recommendation
    
    def create_hybrid_solution(self, project_requirements: dict):
        """
        プロジェクト要件に基づくハイブリッドソリューション提案
        """
        solution = {
            'primary_llm': None,
            'secondary_llm': None,
            'workflow': [],
            'estimated_cost': 0,
            'expected_performance': 0
        }
        
        # 要件分析
        is_cost_sensitive = project_requirements.get('budget_constraint', False)
        needs_high_accuracy = project_requirements.get('accuracy_critical', False)
        has_office_integration = project_requirements.get('office_integration', False)
        
        # LLM選択ロジック
        if has_office_integration:
            solution['primary_llm'] = 'MS Copilot'
            solution['secondary_llm'] = 'ChatGPT'
        elif needs_high_accuracy:
            solution['primary_llm'] = 'Claude'
            solution['secondary_llm'] = 'ChatGPT'
        elif is_cost_sensitive:
            solution['primary_llm'] = 'Gemini'
            solution['secondary_llm'] = 'Copilot'
        else:
            solution['primary_llm'] = 'ChatGPT'
            solution['secondary_llm'] = 'Claude'
        
        # ワークフロー構築
        workflow_steps = [
            {'stage': 'requirements_analysis', 'llm': solution['secondary_llm']},
            {'stage': 'system_design', 'llm': solution['secondary_llm']},
            {'stage': 'implementation', 'llm': solution['primary_llm']},
            {'stage': 'testing', 'llm': solution['primary_llm']},
            {'stage': 'optimization', 'llm': solution['secondary_llm']},
            {'stage': 'documentation', 'llm': solution['secondary_llm']}
        ]
        
        solution['workflow'] = workflow_steps
        
        return solution

# 使用例
workflow_manager = LLMWorkflowManager()

# プロジェクト要件定義
project_req = {
    'budget_constraint': True,
    'accuracy_critical': False,
    'office_integration': False,
    'timeline': 'short',
    'team_size': 'small'
}

# ハイブリッドソリューション提案
solution = workflow_manager.create_hybrid_solution(project_req)

print("推奨ソリューション:")
print(f"主要LLM: {solution['primary_llm']}")
print(f"補助LLM: {solution['secondary_llm']}")
print("\nワークフロー:")
for step in solution['workflow']:
    print(f"  {step['stage']}: {step['llm']}")
```

### 📊 コスト・パフォーマンス最適化

#### 使用量とコストの追跡システム
```python
import time
from datetime import datetime, timedelta
from dataclasses import dataclass
from typing import Dict, List

@dataclass
class LLMUsage:
    llm_name: str
    task_type: str
    tokens_used: int
    cost: float
    execution_time: float
    success: bool
    timestamp: datetime

class LLMCostOptimizer:
    """
    LLM使用コスト最適化システム
    """
    
    def __init__(self):
        # 料金表（概算、2024年3月時点）
        self.pricing = {
            'ChatGPT': {'input': 0.03, 'output': 0.06},  # GPT-4 per 1K tokens
            'Claude': {'input': 0.003, 'output': 0.015},  # Claude-3-Sonnet
            'Copilot': {'monthly': 10.0, 'per_use': 0.0},  # 月額制
            'Gemini': {'input': 0.000125, 'output': 0.000375},  # Gemini Pro
            'MS Copilot': {'monthly': 30.0, 'per_use': 0.0}  # Office 365 Copilot
        }
        
        self.usage_history: List[LLMUsage] = []
        self.monthly_budgets = {}
    
    def estimate_cost(self, llm_name: str, estimated_tokens: int, 
                     task_complexity: str = 'medium') -> float:
        """
        コスト見積もり
        """
        if llm_name not in self.pricing:
            return 0.0
        
        pricing = self.pricing[llm_name]
        
        # 月額制の場合
        if 'monthly' in pricing:
            return 0.0  # 月額料金に含まれる
        
        # トークンベースの場合
        complexity_multiplier = {
            'simple': 0.7,
            'medium': 1.0,
            'complex': 1.5
        }
        
        multiplier = complexity_multiplier.get(task_complexity, 1.0)
        adjusted_tokens = estimated_tokens * multiplier
        
        # 入力・出力トークンの概算比率（入力:出力 = 3:1）
        input_tokens = adjusted_tokens * 0.75
        output_tokens = adjusted_tokens * 0.25
        
        total_cost = (
            (input_tokens / 1000) * pricing['input'] +
            (output_tokens / 1000) * pricing['output']
        )
        
        return total_cost
    
    def recommend_llm_for_budget(self, task_requirements: dict, 
                                budget_limit: float) -> str:
        """
        予算制約下での最適LLM推奨
        """
        task_type = task_requirements.get('type', 'general')
        estimated_tokens = task_requirements.get('tokens', 1000)
        quality_requirement = task_requirements.get('quality', 'medium')
        
        # 各LLMのコスト見積もり
        llm_options = []
        
        for llm_name in self.pricing.keys():
            cost = self.estimate_cost(llm_name, estimated_tokens)
            
            if cost <= budget_limit or cost == 0.0:  # 月額制は予算内とみなす
                # 品質スコア（主観的評価）
                quality_scores = {
                    'ChatGPT': {'coding': 90, 'analysis': 95, 'general': 85},
                    'Claude': {'coding': 93, 'analysis': 88, 'general': 90},
                    'Copilot': {'coding': 95, 'analysis': 70, 'general': 75},
                    'Gemini': {'coding': 72, 'analysis': 80, 'general': 78},
                    'MS Copilot': {'coding': 85, 'analysis': 85, 'general': 80}
                }
                
                quality_score = quality_scores.get(llm_name, {}).get(task_type, 70)
                
                # コストパフォーマンス計算
                if cost > 0:
                    cost_performance = quality_score / cost
                else:
                    cost_performance = quality_score * 100  # 月額制の場合は高めに評価
                
                llm_options.append({
                    'llm': llm_name,
                    'cost': cost,
                    'quality': quality_score,
                    'cost_performance': cost_performance
                })
        
        # コストパフォーマンス順にソート
        llm_options.sort(key=lambda x: x['cost_performance'], reverse=True)
        
        if llm_options:
            return llm_options[0]['llm']
        else:
            return 'Gemini'  # 最安オプション
    
    def track_usage(self, llm_name: str, task_type: str, 
                   tokens_used: int, execution_time: float, 
                   success: bool = True):
        """
        使用量追跡
        """
        cost = self.estimate_cost(llm_name, tokens_used)
        
        usage = LLMUsage(
            llm_name=llm_name,
            task_type=task_type,
            tokens_used=tokens_used,
            cost=cost,
            execution_time=execution_time,
            success=success,
            timestamp=datetime.now()
        )
        
        self.usage_history.append(usage)
    
    def generate_cost_report(self, days: int = 30) -> Dict:
        """
        コストレポート生成
        """
        cutoff_date = datetime.now() - timedelta(days=days)
        recent_usage = [u for u in self.usage_history if u.timestamp >= cutoff_date]
        
        # LLM別集計
        llm_summary = {}
        for usage in recent_usage:
            if usage.llm_name not in llm_summary:
                llm_summary[usage.llm_name] = {
                    'total_cost': 0.0,
                    'total_tokens': 0,
                    'success_rate': 0.0,
                    'avg_execution_time': 0.0,
                    'usage_count': 0
                }
            
            summary = llm_summary[usage.llm_name]
            summary['total_cost'] += usage.cost
            summary['total_tokens'] += usage.tokens_used
            summary['avg_execution_time'] += usage.execution_time
            summary['usage_count'] += 1
            
            if usage.success:
                summary['success_rate'] += 1
        
        # 平均値計算
        for llm_name, summary in llm_summary.items():
            if summary['usage_count'] > 0:
                summary['success_rate'] = (summary['success_rate'] / summary['usage_count']) * 100
                summary['avg_execution_time'] /= summary['usage_count']
        
        # 総コスト
        total_cost = sum(s['total_cost'] for s in llm_summary.values())
        
        return {
            'period_days': days,
            'total_cost': total_cost,
            'llm_breakdown': llm_summary,
            'total_requests': len(recent_usage)
        }

# 使用例
optimizer = LLMCostOptimizer()

# タスク要件
task_req = {
    'type': 'coding',
    'tokens': 2000,
    'quality': 'high',
    'deadline': 'urgent'
}

# 予算制約下でのLLM推奨
recommended_llm = optimizer.recommend_llm_for_budget(task_req, budget_limit=0.50)
print(f"推奨LLM: {recommended_llm}")

# 使用量追跡（シミュレーション）
optimizer.track_usage('ChatGPT', 'coding', 1500, 45.0, True)
optimizer.track_usage('Claude', 'analysis', 2000, 60.0, True)
optimizer.track_usage('Gemini', 'general', 1000, 30.0, True)

# コストレポート生成
report = optimizer.generate_cost_report(30)
print(f"\n30日間のコストサマリー:")
print(f"総コスト: ${report['total_cost']:.2f}")
print(f"総リクエスト数: {report['total_requests']}")

for llm, stats in report['llm_breakdown'].items():
    print(f"\n{llm}:")
    print(f"  コスト: ${stats['total_cost']:.2f}")
    print(f"  成功率: {stats['success_rate']:.1f}%")
    print(f"  平均実行時間: {stats['avg_execution_time']:.1f}秒")
```

---

## 💡 実践演習

### 演習1: LLM比較分析

```
タスク: 同一タスクでの性能比較

内容:
1. 同じデータ分析タスクを各LLMで実行
2. 実行時間、コード品質、解説詳細度を比較
3. コストパフォーマンス分析
4. 使い分けガイドライン作成

評価指標:
- コード実行成功率
- 解説の詳細度
- エラーハンドリング
- 実行速度
- コスト効率
```

### 演習2: ハイブリッドワークフロー構築

```
タスク: 複数LLMを組み合わせた開発フロー

段階:
1. 設計フェーズ: Claude
2. 実装フェーズ: GitHub Copilot
3. テストフェーズ: ChatGPT
4. 最適化フェーズ: Claude
5. ドキュメント: Claude

目的:
- 各LLMの強みを活かした効率的な開発
- コスト最適化
- 品質向上
```

### 演習3: コスト最適化システム

```
タスク: LLM使用量監視・最適化システム

機能:
1. 使用量・コスト追跡
2. 予算アラート
3. 自動LLM選択
4. パフォーマンス監視
5. レポート生成

技術要件:
- リアルタイム監視
- 予算制約対応
- パフォーマンス指標
- コスト予測
```

---

## 📚 参考資料

### LLMプラットフォーム
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Google Gemini API](https://ai.google.dev/)
- [Microsoft Copilot](https://copilot.microsoft.com/)

### 比較・評価
- [LLM Benchmarks](https://paperswithcode.com/sota/code-generation-on-humaneval)
- [Coding Capabilities Comparison](https://huggingface.co/spaces/bigcode/bigcode-leaderboard)

---

## ✅ 理解度確認

1. 各LLMの特徴と適用場面を理解していますか？
2. GitHub Copilotの統合開発環境での活用ができますか？
3. Google Geminiのコスト効率を活かした活用ができますか？
4. Microsoft CopilotのOffice統合機能を活用できますか？
5. 複数LLMを組み合わせた最適なワークフローを設計できますか？

---

**次の講座**: [CSV読み込み活用](14-csv-integration.md)