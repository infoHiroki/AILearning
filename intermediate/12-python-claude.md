# ClaudeでのPython実行活用

**所要時間**: 1時間  
**レベル**: 中級  
**前提知識**: [ChatGPTでのPython実行](11-python-chatgpt.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- ClaudeのArtifacts機能でPythonコードを実行できる
- Claude独自の強みを活かしたコード生成・分析ができる
- 長文処理とコード生成を組み合わせた高度な分析ができる
- ChatGPTとClaudeの使い分けができる

## 📋 目次

1. [Claude Python実行環境の特徴](#claude-python実行環境の特徴)
2. [Artifactsを使った基本実行](#artifactsを使った基本実行)
3. [Claudeの強みを活かした分析](#claudeの強みを活かした分析)
4. [ChatGPTとの比較・使い分け](#chatgptとの比較使い分け)
5. [実践的な活用例](#実践的な活用例)

---

## Claude Python実行環境の特徴

### 🤖 Claudeの独自性

**Claude**は、コーディング能力に特に優れたAIで、Python実行においても独自の強みを持っています。

#### 主な特徴
```
✅ 高精度なコード生成（93.7%の成功率）
✅ 詳細なコード解説・コメント
✅ エラー分析・デバッグ支援
✅ 長文コンテキストでの処理
✅ Artifacts機能による実行環境
✅ セキュリティを重視した実装
```

#### 利用可能な主要ライブラリ
```python
# データ処理・分析
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 機械学習
from sklearn import datasets, model_selection
import scipy.stats as stats

# ファイル処理
import json
import csv
import re
import datetime

# その他
import requests
import sqlite3
import hashlib
```

### 🔄 ChatGPT Code Interpreter vs Claude

| 特徴 | ChatGPT Code Interpreter | Claude |
|------|-------------------------|--------|
| **コード品質** | 高い | 非常に高い |
| **解説詳細度** | 標準 | 非常に詳細 |
| **ファイル処理** | ✅ | 制限あり |
| **長文処理** | 標準 | 優秀 |
| **デバッグ支援** | 良い | 優秀 |
| **実行速度** | 高速 | 標準 |

---

## Artifactsを使った基本実行

### 🚀 基本的なPython実行

#### Artifacts機能の活用
```python
# プロンプト例
「以下のデータ分析をPythonで実行し、Artifactsで表示してください：

売上データの分析と可視化を行い、以下を含むコードを作成してください：

1. サンプルデータの生成
2. 基本統計の算出
3. グラフィカルな可視化
4. 詳細な分析コメント

要件：
- コードは実行可能な形で提供
- 各処理に詳細なコメントを追加
- エラーハンドリングを含める
- 結果の解釈も含める
」
```

#### データ分析の基本パターン
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

# 日本語フォント設定
plt.rcParams['font.family'] = ['DejaVu Sans']

def create_sales_data():
    """
    サンプル売上データを生成する関数
    
    Returns:
        pandas.DataFrame: 売上データ
    """
    np.random.seed(42)
    
    # 期間設定
    start_date = datetime(2024, 1, 1)
    end_date = datetime(2024, 6, 30)
    dates = pd.date_range(start_date, end_date, freq='D')
    
    # 商品・地域データ
    products = ['商品A', '商品B', '商品C', '商品D', '商品E']
    regions = ['東京', '大阪', '名古屋', '福岡']
    
    # データ生成
    data = []
    for date in dates:
        for product in products:
            for region in regions:
                # 80%の確率でデータが存在
                if np.random.random() > 0.2:
                    # 季節性を考慮した売上生成
                    base_sales = np.random.gamma(2, 1000)
                    seasonal_factor = 1 + 0.3 * np.sin(2 * np.pi * date.dayofyear / 365)
                    
                    data.append({
                        'date': date,
                        'product': product,
                        'region': region,
                        'sales': base_sales * seasonal_factor,
                        'quantity': np.random.poisson(20) + 1,
                        'profit_margin': np.random.uniform(0.15, 0.35)
                    })
    
    df = pd.DataFrame(data)
    df['profit'] = df['sales'] * df['profit_margin']
    
    return df

def analyze_sales_data(df):
    """
    売上データの包括的な分析を実行
    
    Args:
        df (pandas.DataFrame): 売上データ
    
    Returns:
        dict: 分析結果
    """
    analysis_results = {}
    
    # 基本統計
    analysis_results['basic_stats'] = {
        'total_sales': df['sales'].sum(),
        'total_profit': df['profit'].sum(),
        'avg_profit_margin': df['profit_margin'].mean(),
        'total_records': len(df),
        'date_range': f"{df['date'].min().strftime('%Y-%m-%d')} to {df['date'].max().strftime('%Y-%m-%d')}"
    }
    
    # 商品別分析
    product_analysis = df.groupby('product').agg({
        'sales': ['sum', 'mean', 'count'],
        'profit': 'sum',
        'quantity': 'sum'
    }).round(2)
    analysis_results['product_analysis'] = product_analysis
    
    # 地域別分析
    region_analysis = df.groupby('region').agg({
        'sales': ['sum', 'mean'],
        'profit': 'sum'
    }).round(2)
    analysis_results['region_analysis'] = region_analysis
    
    # 月次トレンド
    monthly_trend = df.groupby(df['date'].dt.to_period('M')).agg({
        'sales': 'sum',
        'profit': 'sum',
        'quantity': 'sum'
    }).round(2)
    analysis_results['monthly_trend'] = monthly_trend
    
    return analysis_results

def create_visualizations(df):
    """
    データの可視化を作成
    
    Args:
        df (pandas.DataFrame): 売上データ
    """
    # 図のサイズとスタイル設定
    plt.style.use('seaborn-v0_8')
    fig = plt.figure(figsize=(16, 12))
    
    # 1. 月次売上推移
    ax1 = plt.subplot(2, 3, 1)
    monthly_sales = df.groupby(df['date'].dt.to_period('M'))['sales'].sum()
    ax1.plot(range(len(monthly_sales)), monthly_sales.values, 
             marker='o', linewidth=2.5, markersize=8)
    ax1.set_title('月次売上推移', fontsize=14, fontweight='bold')
    ax1.set_xlabel('月')
    ax1.set_ylabel('売上金額')
    ax1.grid(True, alpha=0.3)
    
    # 2. 商品別売上（円グラフ）
    ax2 = plt.subplot(2, 3, 2)
    product_sales = df.groupby('product')['sales'].sum()
    colors = plt.cm.Set3(np.linspace(0, 1, len(product_sales)))
    wedges, texts, autotexts = ax2.pie(product_sales.values, 
                                       labels=product_sales.index,
                                       autopct='%1.1f%%',
                                       colors=colors,
                                       startangle=90)
    ax2.set_title('商品別売上シェア', fontsize=14, fontweight='bold')
    
    # 3. 地域別売上比較
    ax3 = plt.subplot(2, 3, 3)
    region_sales = df.groupby('region')['sales'].sum().sort_values(ascending=False)
    bars = ax3.bar(region_sales.index, region_sales.values, 
                   color=plt.cm.viridis(np.linspace(0, 1, len(region_sales))))
    ax3.set_title('地域別売上比較', fontsize=14, fontweight='bold')
    ax3.set_xlabel('地域')
    ax3.set_ylabel('売上金額')
    
    # バーに数値ラベル追加
    for bar in bars:
        height = bar.get_height()
        ax3.text(bar.get_x() + bar.get_width()/2., height,
                f'{height:,.0f}', ha='center', va='bottom')
    
    # 4. 利益率分布
    ax4 = plt.subplot(2, 3, 4)
    ax4.hist(df['profit_margin'], bins=30, alpha=0.7, color='skyblue', edgecolor='black')
    ax4.axvline(df['profit_margin'].mean(), color='red', linestyle='--', 
                label=f'平均: {df["profit_margin"].mean():.2%}')
    ax4.set_title('利益率分布', fontsize=14, fontweight='bold')
    ax4.set_xlabel('利益率')
    ax4.set_ylabel('頻度')
    ax4.legend()
    
    # 5. 売上と利益の関係
    ax5 = plt.subplot(2, 3, 5)
    scatter = ax5.scatter(df['sales'], df['profit'], 
                         c=df['profit_margin'], cmap='viridis', 
                         alpha=0.6, s=30)
    ax5.set_title('売上 vs 利益', fontsize=14, fontweight='bold')
    ax5.set_xlabel('売上金額')
    ax5.set_ylabel('利益金額')
    plt.colorbar(scatter, ax=ax5, label='利益率')
    
    # 6. 日次売上の時系列
    ax6 = plt.subplot(2, 3, 6)
    daily_sales = df.groupby('date')['sales'].sum()
    ax6.plot(daily_sales.index, daily_sales.values, alpha=0.7, linewidth=1)
    ax6.set_title('日次売上推移', fontsize=14, fontweight='bold')
    ax6.set_xlabel('日付')
    ax6.set_ylabel('売上金額')
    
    plt.tight_layout()
    plt.show()

def main():
    """
    メイン実行関数
    """
    print("📊 売上データ分析システム")
    print("=" * 50)
    
    # データ生成
    print("1. データ生成中...")
    df = create_sales_data()
    print(f"   生成されたレコード数: {len(df):,}")
    
    # データ分析
    print("\n2. データ分析実行中...")
    results = analyze_sales_data(df)
    
    # 結果表示
    print("\n3. 分析結果:")
    print(f"   総売上: ¥{results['basic_stats']['total_sales']:,.0f}")
    print(f"   総利益: ¥{results['basic_stats']['total_profit']:,.0f}")
    print(f"   平均利益率: {results['basic_stats']['avg_profit_margin']:.2%}")
    print(f"   分析期間: {results['basic_stats']['date_range']}")
    
    # 商品別TOP3
    print("\n   商品別売上TOP3:")
    top_products = results['product_analysis']['sales']['sum'].sort_values(ascending=False).head(3)
    for i, (product, sales) in enumerate(top_products.items(), 1):
        print(f"   {i}. {product}: ¥{sales:,.0f}")
    
    # 可視化
    print("\n4. グラフ生成中...")
    create_visualizations(df)
    
    print("\n✅ 分析完了!")
    
    return df, results

# 実行
if __name__ == "__main__":
    df, analysis_results = main()
```

---

## Claudeの強みを活かした分析

### 📊 高度なデータ分析パターン

#### 統計的分析の実装
```python
# プロンプト例
「統計的に厳密な分析を実装してください。以下の内容を含む包括的な分析システムを作成してください：

1. 仮説検定の実装
2. 信頼区間の計算
3. 効果量の測定
4. 多重比較補正
5. 詳細な統計解釈

各統計手法について、理論的背景と実装理由も詳しく説明してください。」
```

#### 機械学習パイプライン
```python
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
import scipy.stats as stats

class AdvancedSalesAnalyzer:
    """
    高度な売上分析クラス
    統計的手法と機械学習を組み合わせた包括的分析
    """
    
    def __init__(self, data):
        self.data = data.copy()
        self.prepared_data = None
        self.models = {}
        self.results = {}
    
    def statistical_analysis(self):
        """
        統計的分析の実行
        """
        print("📈 統計分析実行中...")
        
        # 1. 基本統計量と分布の検定
        numeric_cols = ['sales', 'profit', 'quantity', 'profit_margin']
        
        for col in numeric_cols:
            # 正規性検定
            statistic, p_value = stats.shapiro(self.data[col].sample(min(5000, len(self.data))))
            is_normal = p_value > 0.05
            
            print(f"\n{col}の分析:")
            print(f"  正規性検定 (Shapiro-Wilk): p={p_value:.4f}, 正規分布: {'Yes' if is_normal else 'No'}")
            
            # 記述統計
            desc_stats = self.data[col].describe()
            print(f"  平均: {desc_stats['mean']:.2f}")
            print(f"  標準偏差: {desc_stats['std']:.2f}")
            print(f"  歪度: {stats.skew(self.data[col]):.3f}")
            print(f"  尖度: {stats.kurtosis(self.data[col]):.3f}")
    
    def hypothesis_testing(self):
        """
        仮説検定の実行
        """
        print("\n🔬 仮説検定実行中...")
        
        # 地域間の売上差の検定（ANOVA）
        regions = self.data['region'].unique()
        region_sales = [self.data[self.data['region'] == region]['sales'] for region in regions]
        
        f_stat, p_value = stats.f_oneway(*region_sales)
        print(f"\n地域間売上差の検定 (ANOVA):")
        print(f"  F統計量: {f_stat:.3f}")
        print(f"  p値: {p_value:.4f}")
        print(f"  結論: {'有意差あり' if p_value < 0.05 else '有意差なし'} (α=0.05)")
        
        # 商品間の利益率差の検定
        products = self.data['product'].unique()
        product_margins = [self.data[self.data['product'] == product]['profit_margin'] for product in products]
        
        f_stat_product, p_value_product = stats.f_oneway(*product_margins)
        print(f"\n商品間利益率差の検定 (ANOVA):")
        print(f"  F統計量: {f_stat_product:.3f}")
        print(f"  p値: {p_value_product:.4f}")
        print(f"  結論: {'有意差あり' if p_value_product < 0.05 else '有意差なし'} (α=0.05)")
    
    def prepare_ml_data(self):
        """
        機械学習用データの準備
        """
        print("\n🛠️ 機械学習用データ準備中...")
        
        df_ml = self.data.copy()
        
        # カテゴリ変数のエンコーディング
        le_product = LabelEncoder()
        le_region = LabelEncoder()
        
        df_ml['product_encoded'] = le_product.fit_transform(df_ml['product'])
        df_ml['region_encoded'] = le_region.fit_transform(df_ml['region'])
        
        # 日付特徴量の作成
        df_ml['day_of_year'] = df_ml['date'].dt.dayofyear
        df_ml['month'] = df_ml['date'].dt.month
        df_ml['weekday'] = df_ml['date'].dt.weekday
        
        # 特徴量選択
        feature_cols = ['product_encoded', 'region_encoded', 'day_of_year', 
                       'month', 'weekday', 'quantity', 'profit_margin']
        
        X = df_ml[feature_cols]
        y = df_ml['sales']
        
        self.prepared_data = {
            'X': X,
            'y': y,
            'feature_names': feature_cols,
            'encoders': {'product': le_product, 'region': le_region}
        }
        
        print(f"  特徴量数: {X.shape[1]}")
        print(f"  サンプル数: {X.shape[0]}")
    
    def build_models(self):
        """
        機械学習モデルの構築と評価
        """
        if self.prepared_data is None:
            self.prepare_ml_data()
        
        print("\n🤖 機械学習モデル構築中...")
        
        X = self.prepared_data['X']
        y = self.prepared_data['y']
        
        # データ分割
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # モデル定義
        models = {
            'Linear Regression': LinearRegression(),
            'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42)
        }
        
        # モデル訓練と評価
        for name, model in models.items():
            print(f"\n{name}:")
            
            # 訓練
            model.fit(X_train, y_train)
            
            # 予測
            y_pred = model.predict(X_test)
            
            # 評価
            mse = mean_squared_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)
            
            # クロスバリデーション
            cv_scores = cross_val_score(model, X, y, cv=5, scoring='r2')
            
            print(f"  MSE: {mse:.2f}")
            print(f"  R²: {r2:.3f}")
            print(f"  CV R² (平均±標準偏差): {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")
            
            self.models[name] = {
                'model': model,
                'mse': mse,
                'r2': r2,
                'cv_scores': cv_scores
            }
            
            # 特徴量重要度（Random Forestの場合）
            if hasattr(model, 'feature_importances_'):
                importance = pd.DataFrame({
                    'feature': self.prepared_data['feature_names'],
                    'importance': model.feature_importances_
                }).sort_values('importance', ascending=False)
                
                print("  特徴量重要度:")
                for _, row in importance.head().iterrows():
                    print(f"    {row['feature']}: {row['importance']:.3f}")

# 使用例
def run_advanced_analysis(df):
    """
    高度な分析の実行
    """
    analyzer = AdvancedSalesAnalyzer(df)
    
    # 統計分析
    analyzer.statistical_analysis()
    
    # 仮説検定
    analyzer.hypothesis_testing()
    
    # 機械学習
    analyzer.build_models()
    
    return analyzer

# 実行
analyzer = run_advanced_analysis(df)
```

---

## ChatGPTとの比較・使い分け

### ⚖️ 使い分けガイドライン

#### Claude を選ぶべき場面
```
✅ 複雑なアルゴリズムの実装
✅ 詳細なコード解説が必要
✅ 統計的に厳密な分析
✅ 長文データの処理
✅ セキュリティを重視する処理
✅ 教育・学習目的
```

#### ChatGPT Code Interpreter を選ぶべき場面
```
✅ ファイルのアップロード・ダウンロード
✅ 大量データの高速処理
✅ インタラクティブな可視化
✅ プロトタイピング・実験
✅ 画像処理・生成
✅ リアルタイム分析
```

#### 併用パターン
```
1. 設計・理論 → Claude
2. 実装・検証 → ChatGPT
3. 最適化・改善 → Claude
4. 運用・監視 → ChatGPT
```

---

## 実践的な活用例

### 📊 ビジネス分析レポート

#### 包括的な分析レポート生成
```python
# プロンプト例
「以下の要件で包括的なビジネス分析レポートを生成するPythonシステムを作成してください：

要件：
1. データの自動読み込み・検証
2. 統計的分析（記述統計、推定、検定）
3. 機械学習による予測分析
4. 異常値検出・外れ値分析
5. トレンド分析・季節性分析
6. リスク分析・感度分析
7. 詳細な解釈と提言
8. エグゼクティブサマリー生成

技術要件：
- オブジェクト指向設計
- エラーハンドリング
- ログ機能
- 設定ファイル対応
- テスト可能な構造
」
```

#### 予測モデルの構築
```python
class SalesForecastingSystem:
    """
    売上予測システム
    複数の手法を組み合わせた堅牢な予測システム
    """
    
    def __init__(self, data):
        self.data = data
        self.models = {}
        self.forecasts = {}
        self.evaluation_metrics = {}
    
    def seasonal_decomposition(self):
        """
        季節分解分析
        """
        from statsmodels.tsa.seasonal import seasonal_decompose
        
        # 日次データを月次に集約
        monthly_sales = self.data.groupby(
            self.data['date'].dt.to_period('M')
        )['sales'].sum()
        
        # 季節分解
        decomposition = seasonal_decompose(
            monthly_sales.values, 
            model='additive', 
            period=12
        )
        
        return {
            'trend': decomposition.trend,
            'seasonal': decomposition.seasonal,
            'residual': decomposition.resid,
            'original': monthly_sales.values
        }
    
    def build_arima_model(self):
        """
        ARIMA モデルの構築
        """
        from statsmodels.tsa.arima.model import ARIMA
        from statsmodels.tsa.stattools import adfuller
        
        # 月次売上データ準備
        monthly_sales = self.data.groupby(
            self.data['date'].dt.to_period('M')
        )['sales'].sum()
        
        # 定常性検定
        adf_result = adfuller(monthly_sales)
        is_stationary = adf_result[1] < 0.05
        
        print(f"ADF検定結果: p値={adf_result[1]:.4f}, 定常性: {'Yes' if is_stationary else 'No'}")
        
        # ARIMA モデル構築
        model = ARIMA(monthly_sales, order=(1, 1, 1))
        fitted_model = model.fit()
        
        # 予測
        forecast = fitted_model.forecast(steps=6)  # 6ヶ月予測
        
        self.models['ARIMA'] = fitted_model
        self.forecasts['ARIMA'] = forecast
        
        return fitted_model, forecast
    
    def ensemble_forecast(self):
        """
        アンサンブル予測
        """
        # 複数手法の予測結果を組み合わせ
        forecasts = []
        weights = []
        
        for name, forecast in self.forecasts.items():
            forecasts.append(forecast)
            # 過去のパフォーマンスに基づく重み
            weights.append(1.0)  # 簡略化
        
        # 重み付き平均
        ensemble_forecast = np.average(forecasts, axis=0, weights=weights)
        
        return ensemble_forecast

# 実行例
forecasting_system = SalesForecastingSystem(df)
seasonal_components = forecasting_system.seasonal_decomposition()
arima_model, arima_forecast = forecasting_system.build_arima_model()
ensemble_result = forecasting_system.ensemble_forecast()
```

---

## 💡 実践演習

### 演習1: Claude独自機能の活用

```
タスク: 統計的に厳密な分析システム

要件:
1. 仮説検定の実装
2. 信頼区間の計算
3. 効果量の測定
4. 詳細な統計解釈
5. エラーハンドリング

技術要件:
- オブジェクト指向設計
- 包括的なコメント
- 理論的背景の説明
```

### 演習2: 高度な機械学習パイプライン

```
タスク: 予測分析システム

機能:
1. 特徴量エンジニアリング
2. モデル選択・評価
3. ハイパーパラメータ調整
4. クロスバリデーション
5. 予測の不確実性定量化

要件:
- 複数アルゴリズムの比較
- 統計的に有意な評価
- 実用的な解釈
```

### 演習3: Claudeの解説能力活用

```
タスク: 教育的なデータ分析

内容:
1. 各処理の理論的説明
2. ステップバイステップ解説
3. 代替手法の比較
4. ベストプラクティス
5. よくある間違いと対策

形式:
- コメント豊富なコード
- 解説付きの分析
- 学習者向けの配慮
```

---

## 📚 参考資料

### Claude利用ガイド
- [Anthropic Claude Documentation](https://docs.anthropic.com/)
- [Claude API Reference](https://docs.anthropic.com/claude/reference/)

### Python統計・機械学習
- [Scikit-learn Documentation](https://scikit-learn.org/stable/)
- [Statsmodels Documentation](https://www.statsmodels.org/)
- [SciPy Stats](https://docs.scipy.org/doc/scipy/reference/stats.html)

---

## ✅ 理解度確認

1. Claudeの独自の強みを理解し活用できますか？
2. Artifactsを使った効果的なコード実行ができますか？
3. 統計的に厳密な分析を実装できますか？
4. ChatGPTとClaudeの適切な使い分けができますか？
5. 教育的な観点でのコード解説ができますか？

---

**次の講座**: [その他LLMでのPython実行](13-python-other-llms.md)