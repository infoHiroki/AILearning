# ChatGPTでのPython実行活用

**所要時間**: 1時間  
**レベル**: 中級  
**前提知識**: [基礎講座群](../basic/)完了、Pythonの基本文法

## 学習目標

この講座を修了すると、以下ができるようになります：
- ChatGPTのCode Interpreter（Advanced Data Analysis）を効果的に活用できる
- データ分析・可視化をChatGPT上で実行できる
- ファイル処理・変換作業を自動化できる
- エラーハンドリングとデバッグ技術を習得できる

## 📋 目次

1. [ChatGPT Code Interpreterとは](#chatgpt-code-interpreterとは)
2. [基本的なPython実行](#基本的なpython実行)
3. [データ分析・可視化](#データ分析可視化)
4. [ファイル処理・変換](#ファイル処理変換)
5. [高度な活用テクニック](#高度な活用テクニック)

---

## ChatGPT Code Interpreterとは

### 🤖 Code Interpreterの特徴

**ChatGPT Code Interpreter**（Advanced Data Analysis）は、ChatGPT内でPythonコードを実行できる強力な機能です。

#### 主な特徴
```
✅ リアルタイムPython実行
✅ ファイルアップロード・ダウンロード対応
✅ データ可視化（matplotlib、plotly等）
✅ 豊富なライブラリが利用可能
✅ エラー自動修正・デバッグ支援
✅ インタラクティブな分析環境
```

#### 利用可能なライブラリ（主要なもの）
```python
# データ処理・分析
import pandas as pd
import numpy as np
import scipy
import statsmodels

# 可視化
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.graph_objects as go
import plotly.express as px

# 機械学習
import scikit-learn
from sklearn import datasets, model_selection, metrics

# ファイル処理
import json
import csv
import xml.etree.ElementTree as ET
import openpyxl
import PIL (Pillow)

# その他
import requests
import re
import datetime
import os
import zipfile
```

### 🔄 Code Interpreter vs 通常のPython環境

| 特徴 | Code Interpreter | ローカル環境 | Google Colab |
|------|------------------|-------------|---------------|
| **設定不要** | ✅ | ❌ | ✅ |
| **ファイル処理** | ✅ | ✅ | ✅ |
| **ライブラリ追加** | 制限あり | ✅ | ✅ |
| **データ永続化** | セッション限り | ✅ | 制限あり |
| **AI支援** | ✅ | ❌ | ❌ |
| **インターネットアクセス** | ❌ | ✅ | ✅ |

---

## 基本的なPython実行

### 🚀 初回セットアップと基本操作

#### Code Interpreterの有効化
```
ChatGPT Plus/Team/Enterprise で利用可能

アクセス方法:
1. ChatGPT にログイン
2. 新しいチャットを開始
3. GPT-4 を選択
4. "Advanced Data Analysis" を選択
   または
   "Code Interpreter" オプションを有効化

確認方法:
チャット画面に 📎 （添付ファイル）アイコンが表示される
```

#### 基本的なPython実行
```python
# プロンプト例
「以下のPythonコードを実行してください：

print("Hello, ChatGPT Code Interpreter!")
print("Python version:", import sys; sys.version)

# 現在利用可能なライブラリを確認
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

print("Pandas version:", pd.__version__)
print("NumPy version:", np.__version__)

# 簡単な計算
numbers = [1, 2, 3, 4, 5]
result = sum(numbers)
print(f"Sum of {numbers} = {result}")
」
```

### 📊 基本的なデータ操作

#### リストと辞書の操作
```python
# プロンプト例
「以下のデータ操作を実行してください：

# 売上データの作成
sales_data = [
    {"month": "1月", "sales": 1200000, "target": 1000000},
    {"month": "2月", "sales": 1350000, "target": 1100000},
    {"month": "3月", "sales": 980000, "target": 1200000},
    {"month": "4月", "sales": 1450000, "target": 1300000},
    {"month": "5月", "sales": 1600000, "target": 1400000}
]

# 分析実行
total_sales = sum(item["sales"] for item in sales_data)
total_target = sum(item["target"] for item in sales_data)
achievement_rate = (total_sales / total_target) * 100

print(f"総売上: {total_sales:,}円")
print(f"総目標: {total_target:,}円") 
print(f"達成率: {achievement_rate:.1f}%")

# 月別達成率の計算
for item in sales_data:
    rate = (item["sales"] / item["target"]) * 100
    status = "達成" if rate >= 100 else "未達"
    print(f"{item['month']}: {rate:.1f}% ({status})")
」
```

#### Pandasでのデータフレーム操作
```python
# プロンプト例
「Pandasを使って以下のデータ分析を実行してください：

import pandas as pd
import numpy as np

# サンプルデータの作成
data = {
    'product': ['PC', 'Tablet', 'Phone', 'Watch', 'Earphones'] * 4,
    'region': ['Tokyo', 'Osaka', 'Nagoya', 'Fukuoka'] * 5,
    'sales': np.random.randint(100, 1000, 20),
    'profit': np.random.randint(10, 200, 20),
    'date': pd.date_range('2024-01-01', periods=20, freq='D')
}

df = pd.DataFrame(data)

# 基本統計情報
print("=== データフレーム情報 ===")
print(df.info())
print("\n=== 基本統計 ===")
print(df.describe())

# グループ別集計
print("\n=== 商品別売上合計 ===")
product_sales = df.groupby('product')['sales'].sum().sort_values(ascending=False)
print(product_sales)

print("\n=== 地域別売上合計 ===")
region_sales = df.groupby('region')['sales'].sum().sort_values(ascending=False)
print(region_sales)

# 利益率の計算
df['profit_rate'] = (df['profit'] / df['sales']) * 100
print("\n=== 利益率TOP5 ===")
top_profit = df.nlargest(5, 'profit_rate')[['product', 'region', 'sales', 'profit', 'profit_rate']]
print(top_profit)
」
```

---

## データ分析・可視化

### 📈 基本的なグラフ作成

#### Matplotlibを使った基本グラフ
```python
# プロンプト例
「以下のデータでグラフを作成してください：

import matplotlib.pyplot as plt
import numpy as np

# 日本語フォント設定
plt.rcParams['font.family'] = 'DejaVu Sans'

# データ準備
months = ['1月', '2月', '3月', '4月', '5月', '6月']
sales = [1200, 1350, 980, 1450, 1600, 1380]
target = [1000, 1100, 1200, 1300, 1400, 1500]

# 図のサイズ設定
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

# 1. 折れ線グラフ
ax1.plot(months, sales, marker='o', linewidth=2, label='実績', color='#2E86AB')
ax1.plot(months, target, marker='s', linewidth=2, label='目標', color='#A23B72', linestyle='--')
ax1.set_title('月別売上推移', fontsize=14, fontweight='bold')
ax1.set_ylabel('売上（万円）')
ax1.legend()
ax1.grid(True, alpha=0.3)

# 2. 棒グラフ（比較）
x = np.arange(len(months))
width = 0.35

bars1 = ax2.bar(x - width/2, sales, width, label='実績', color='#2E86AB', alpha=0.8)
bars2 = ax2.bar(x + width/2, target, width, label='目標', color='#A23B72', alpha=0.8)

ax2.set_title('実績 vs 目標', fontsize=14, fontweight='bold')
ax2.set_ylabel('売上（万円）')
ax2.set_xticks(x)
ax2.set_xticklabels(months)
ax2.legend()

# 棒グラフに数値ラベル追加
for bar in bars1:
    height = bar.get_height()
    ax2.text(bar.get_x() + bar.get_width()/2., height,
             f'{height}', ha='center', va='bottom')

for bar in bars2:
    height = bar.get_height()
    ax2.text(bar.get_x() + bar.get_width()/2., height,
             f'{height}', ha='center', va='bottom')

plt.tight_layout()
plt.show()

# 達成率の計算と表示
achievement_rates = [(s/t)*100 for s, t in zip(sales, target)]
print("=== 月別達成率 ===")
for month, rate in zip(months, achievement_rates):
    status = "✅ 達成" if rate >= 100 else "❌ 未達"
    print(f"{month}: {rate:.1f}% {status}")
」
```

#### Seabornを使った高度な可視化
```python
# プロンプト例
「Seabornを使って以下の分析とグラフ作成を実行してください：

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# スタイル設定
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (12, 8)

# サンプルデータ生成
np.random.seed(42)
n_samples = 200

data = pd.DataFrame({
    'product_category': np.random.choice(['Electronics', 'Clothing', 'Books', 'Home'], n_samples),
    'region': np.random.choice(['North', 'South', 'East', 'West'], n_samples),
    'sales_amount': np.random.gamma(2, 500, n_samples),
    'customer_age': np.random.normal(35, 12, n_samples),
    'satisfaction_score': np.random.beta(2, 1, n_samples) * 10,
    'purchase_frequency': np.random.poisson(3, n_samples) + 1
})

# データクリーニング
data['customer_age'] = data['customer_age'].clip(18, 70)
data['satisfaction_score'] = data['satisfaction_score'].clip(1, 10)

print("=== データ基本情報 ===")
print(data.head())
print(f"\\nデータサイズ: {data.shape}")

# 複数グラフの作成
fig, axes = plt.subplots(2, 2, figsize=(16, 12))

# 1. カテゴリ別売上分布
sns.boxplot(data=data, x='product_category', y='sales_amount', ax=axes[0,0])
axes[0,0].set_title('商品カテゴリ別売上分布', fontweight='bold')
axes[0,0].tick_params(axis='x', rotation=45)

# 2. 地域別顧客満足度
sns.violinplot(data=data, x='region', y='satisfaction_score', ax=axes[0,1])
axes[0,1].set_title('地域別顧客満足度分布', fontweight='bold')

# 3. 年齢と売上の関係
sns.scatterplot(data=data, x='customer_age', y='sales_amount', 
                hue='product_category', alpha=0.6, ax=axes[1,0])
axes[1,0].set_title('年齢 vs 売上金額', fontweight='bold')

# 4. 購入頻度と満足度の関係
sns.regplot(data=data, x='purchase_frequency', y='satisfaction_score', ax=axes[1,1])
axes[1,1].set_title('購入頻度 vs 満足度', fontweight='bold')

plt.tight_layout()
plt.show()

# 相関分析
print("\\n=== 数値変数の相関係数 ===")
numeric_cols = ['sales_amount', 'customer_age', 'satisfaction_score', 'purchase_frequency']
correlation_matrix = data[numeric_cols].corr()
print(correlation_matrix.round(3))

# ヒートマップで相関を可視化
plt.figure(figsize=(8, 6))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0,
            square=True, linewidths=0.5)
plt.title('変数間相関ヒートマップ', fontweight='bold')
plt.show()
」
```

### 📊 Plotlyインタラクティブグラフ

#### 動的グラフの作成
```python
# プロンプト例
「Plotlyを使ってインタラクティブなダッシュボードを作成してください：

import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import pandas as pd
import numpy as np

# データ生成
dates = pd.date_range('2024-01-01', '2024-06-30', freq='D')
products = ['Product A', 'Product B', 'Product C', 'Product D']

# 時系列データ
np.random.seed(42)
sales_data = []

for product in products:
    base_trend = np.cumsum(np.random.normal(0, 10, len(dates)))
    seasonal = 50 * np.sin(2 * np.pi * np.arange(len(dates)) / 30)  # 月次サイクル
    noise = np.random.normal(0, 20, len(dates))
    sales = 1000 + base_trend + seasonal + noise
    
    for date, sale in zip(dates, sales):
        sales_data.append({
            'date': date,
            'product': product,
            'sales': max(0, sale),  # 負の売上を防ぐ
            'profit_margin': np.random.uniform(0.1, 0.3)
        })

df = pd.DataFrame(sales_data)
df['profit'] = df['sales'] * df['profit_margin']

# 1. 時系列チャート
fig1 = px.line(df, x='date', y='sales', color='product',
               title='商品別売上推移（インタラクティブ）',
               labels={'sales': '売上金額', 'date': '日付'})

fig1.update_layout(
    xaxis_title="日付",
    yaxis_title="売上金額",
    legend_title="商品",
    hovermode='x unified'
)

fig1.show()

# 2. 複合ダッシュボード
fig2 = make_subplots(
    rows=2, cols=2,
    subplot_titles=('商品別売上合計', '日別売上推移', '利益マージン分布', '売上 vs 利益'),
    specs=[[{'type': 'bar'}, {'type': 'scatter'}],
           [{'type': 'histogram'}, {'type': 'scatter'}]]
)

# 商品別売上合計（棒グラフ）
product_totals = df.groupby('product')['sales'].sum().reset_index()
fig2.add_trace(
    go.Bar(x=product_totals['product'], y=product_totals['sales'], 
           name='売上合計', marker_color='lightblue'),
    row=1, col=1
)

# 日別合計売上推移
daily_sales = df.groupby('date')['sales'].sum().reset_index()
fig2.add_trace(
    go.Scatter(x=daily_sales['date'], y=daily_sales['sales'],
               mode='lines', name='日別売上', line=dict(color='orange')),
    row=1, col=2
)

# 利益マージン分布
fig2.add_trace(
    go.Histogram(x=df['profit_margin'], name='利益マージン', 
                 marker_color='lightgreen'),
    row=2, col=1
)

# 売上 vs 利益
fig2.add_trace(
    go.Scatter(x=df['sales'], y=df['profit'], mode='markers',
               name='売上 vs 利益', marker=dict(color='red', size=4)),
    row=2, col=2
)

fig2.update_layout(height=800, showlegend=True, 
                   title_text="売上分析ダッシュボード")
fig2.show()

# 3. 3Dバブルチャート
monthly_data = df.groupby(['product', pd.Grouper(key='date', freq='M')]).agg({
    'sales': 'sum',
    'profit': 'sum',
    'profit_margin': 'mean'
}).reset_index()

fig3 = px.scatter_3d(monthly_data, x='sales', y='profit', z='profit_margin',
                     color='product', size='sales',
                     title='3D分析: 売上 x 利益 x 利益率',
                     labels={
                         'sales': '売上',
                         'profit': '利益', 
                         'profit_margin': '利益率'
                     })

fig3.show()

# データサマリーの表示
print("=== データサマリー ===")
print(f"期間: {df['date'].min()} ～ {df['date'].max()}")
print(f"総売上: {df['sales'].sum():,.0f}")
print(f"総利益: {df['profit'].sum():,.0f}")
print(f"平均利益率: {df['profit_margin'].mean():.1%}")

print("\\n=== 商品別パフォーマンス ===")
product_summary = df.groupby('product').agg({
    'sales': ['sum', 'mean'],
    'profit': 'sum',
    'profit_margin': 'mean'
}).round(2)
print(product_summary)
」
```

---

## ファイル処理・変換

### 📁 ファイルアップロード・処理

#### CSVファイルの処理
```python
# プロンプト例（ファイルアップロード後）
「アップロードしたCSVファイルを分析してください：

# まずファイルの内容を確認
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# ファイル読み込み（アップロードされたファイル名に合わせて調整）
df = pd.read_csv('uploaded_file.csv')

print("=== ファイル基本情報 ===")
print(f"行数: {len(df)}")
print(f"列数: {len(df.columns)}")
print(f"列名: {list(df.columns)}")

print("\\n=== データ型情報 ===")
print(df.dtypes)

print("\\n=== 欠損値チェック ===")
missing_data = df.isnull().sum()
if missing_data.sum() > 0:
    print("欠損値が見つかりました:")
    print(missing_data[missing_data > 0])
else:
    print("欠損値はありません")

print("\\n=== データプレビュー ===")
print(df.head(10))

print("\\n=== 基本統計 ===")
print(df.describe())

# 数値列の可視化
numeric_columns = df.select_dtypes(include=[np.number]).columns
if len(numeric_columns) > 0:
    fig, axes = plt.subplots(len(numeric_columns), 1, 
                            figsize=(10, 4*len(numeric_columns)))
    if len(numeric_columns) == 1:
        axes = [axes]
    
    for i, col in enumerate(numeric_columns):
        df[col].hist(bins=30, ax=axes[i], alpha=0.7)
        axes[i].set_title(f'{col} の分布')
        axes[i].set_xlabel(col)
        axes[i].set_ylabel('頻度')
    
    plt.tight_layout()
    plt.show()

# カテゴリ列の分析
categorical_columns = df.select_dtypes(include=['object']).columns
if len(categorical_columns) > 0:
    print("\\n=== カテゴリ列の値分布 ===")
    for col in categorical_columns[:5]:  # 最初の5列のみ
        print(f"\\n{col}:")
        print(df[col].value_counts().head(10))
」
```

#### Excelファイルの処理
```python
# プロンプト例
「アップロードしたExcelファイルを処理してください：

import pandas as pd
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment
import matplotlib.pyplot as plt

# Excelファイル読み込み（複数シート対応）
excel_file = 'uploaded_file.xlsx'

# シート名を確認
xl = pd.ExcelFile(excel_file)
print("=== シート一覧 ===")
for i, sheet in enumerate(xl.sheet_names):
    print(f"{i+1}. {sheet}")

# 各シートのデータを読み込み
sheet_data = {}
for sheet_name in xl.sheet_names:
    try:
        df = pd.read_excel(excel_file, sheet_name=sheet_name)
        sheet_data[sheet_name] = df
        print(f"\\n=== {sheet_name} シート情報 ===")
        print(f"行数: {len(df)}, 列数: {len(df.columns)}")
        print(f"列名: {list(df.columns)}")
        
        # データプレビュー
        if len(df) > 0:
            print("データプレビュー:")
            print(df.head(3))
            
    except Exception as e:
        print(f"{sheet_name} の読み込みでエラー: {e}")

# メインシートの分析（最初のシートを仮定）
if sheet_data:
    main_sheet_name = list(sheet_data.keys())[0]
    main_df = sheet_data[main_sheet_name]
    
    print(f"\\n=== {main_sheet_name} 詳細分析 ===")
    
    # 数値データの統計
    numeric_cols = main_df.select_dtypes(include=['number']).columns
    if len(numeric_cols) > 0:
        print("\\n数値列の統計:")
        print(main_df[numeric_cols].describe())
        
        # 相関分析
        if len(numeric_cols) > 1:
            correlation = main_df[numeric_cols].corr()
            print("\\n相関係数:")
            print(correlation.round(3))
    
    # 新しいExcelファイルに分析結果を出力
    with pd.ExcelWriter('analysis_result.xlsx', engine='openpyxl') as writer:
        # 元データ
        main_df.to_excel(writer, sheet_name='原データ', index=False)
        
        # 統計サマリー
        if len(numeric_cols) > 0:
            summary_df = main_df[numeric_cols].describe()
            summary_df.to_excel(writer, sheet_name='統計サマリー')
        
        # データ型情報
        info_df = pd.DataFrame({
            '列名': main_df.columns,
            'データ型': main_df.dtypes.values,
            '欠損値数': [main_df[col].isnull().sum() for col in main_df.columns],
            'ユニーク値数': [main_df[col].nunique() for col in main_df.columns]
        })
        info_df.to_excel(writer, sheet_name='データ情報', index=False)
        
    print("\\n✅ 分析結果を 'analysis_result.xlsx' に保存しました")

# データ可視化
if sheet_data and len(numeric_cols) > 0:
    plt.figure(figsize=(12, 8))
    
    # サブプロット作成
    n_plots = min(len(numeric_cols), 4)  # 最大4つのグラフ
    fig, axes = plt.subplots(2, 2, figsize=(15, 10))
    axes = axes.flatten()
    
    for i, col in enumerate(numeric_cols[:n_plots]):
        main_df[col].hist(bins=20, ax=axes[i], alpha=0.7, color=f'C{i}')
        axes[i].set_title(f'{col} の分布')
        axes[i].set_xlabel(col)
        axes[i].set_ylabel('頻度')
        axes[i].grid(True, alpha=0.3)
    
    # 使用しないサブプロットを非表示
    for i in range(n_plots, 4):
        axes[i].set_visible(False)
    
    plt.tight_layout()
    plt.show()
」
```

### 🔄 データ変換・フォーマット変換

#### JSON ↔ CSV 変換
```python
# プロンプト例
「以下のデータ変換タスクを実行してください：

import json
import pandas as pd
import csv
from datetime import datetime

# 1. JSON to CSV 変換
json_data = {
    "employees": [
        {
            "id": 1,
            "name": "田中太郎",
            "department": "営業部",
            "position": "主任",
            "salary": 450000,
            "skills": ["営業", "プレゼンテーション", "Excel"],
            "joined_date": "2020-04-01",
            "performance": {
                "2023": {"sales": 50000000, "rating": "A"},
                "2024": {"sales": 65000000, "rating": "S"}
            }
        },
        {
            "id": 2,
            "name": "佐藤花子",
            "department": "開発部",
            "position": "シニアエンジニア",
            "salary": 550000,
            "skills": ["Python", "JavaScript", "AWS"],
            "joined_date": "2019-07-15",
            "performance": {
                "2023": {"projects": 8, "rating": "A"},
                "2024": {"projects": 12, "rating": "S"}
            }
        },
        {
            "id": 3,
            "name": "鈴木次郎",
            "department": "マーケティング部",
            "position": "マネージャー",
            "salary": 600000,
            "skills": ["デジタルマーケティング", "分析", "戦略企画"],
            "joined_date": "2018-03-01",
            "performance": {
                "2023": {"campaigns": 15, "rating": "A"},
                "2024": {"campaigns": 20, "rating": "S"}
            }
        }
    ]
}

# ネストしたJSONをフラット化してCSVに変換
flattened_data = []
for emp in json_data["employees"]:
    row = {
        "id": emp["id"],
        "name": emp["name"],
        "department": emp["department"],
        "position": emp["position"],
        "salary": emp["salary"],
        "skills": "; ".join(emp["skills"]),
        "joined_date": emp["joined_date"],
        "performance_2023": str(emp["performance"]["2023"]),
        "performance_2024": str(emp["performance"]["2024"])
    }
    flattened_data.append(row)

df = pd.DataFrame(flattened_data)
df.to_csv('employees.csv', index=False, encoding='utf-8-sig')
print("✅ JSON → CSV 変換完了: employees.csv")
print(df)

# 2. CSV to JSON 変換（より複雑な構造）
# CSVファイルからより構造化されたJSONを作成
df_read = pd.read_csv('employees.csv')

# 部署別にグループ化してJSONを作成
departments_json = {
    "company": "サンプル株式会社",
    "update_date": datetime.now().isoformat(),
    "departments": []
}

for dept in df_read['department'].unique():
    dept_employees = df_read[df_read['department'] == dept]
    
    dept_data = {
        "name": dept,
        "employee_count": len(dept_employees),
        "average_salary": int(dept_employees['salary'].mean()),
        "employees": []
    }
    
    for _, emp in dept_employees.iterrows():
        emp_data = {
            "id": int(emp['id']),
            "name": emp['name'],
            "position": emp['position'],
            "salary": int(emp['salary']),
            "skills": emp['skills'].split('; '),
            "joined_date": emp['joined_date'],
            "years_of_service": (datetime.now() - pd.to_datetime(emp['joined_date'])).days // 365
        }
        dept_data["employees"].append(emp_data)
    
    departments_json["departments"].append(dept_data)

# JSONファイルに保存
with open('departments.json', 'w', encoding='utf-8') as f:
    json.dump(departments_json, f, ensure_ascii=False, indent=2)

print("\\n✅ CSV → JSON 変換完了: departments.json")
print("JSON構造プレビュー:")
print(json.dumps(departments_json, ensure_ascii=False, indent=2)[:500] + "...")

# 3. XML変換も実行
import xml.etree.ElementTree as ET

# XML作成
root = ET.Element("company")
root.set("name", "サンプル株式会社")

for dept_data in departments_json["departments"]:
    dept_elem = ET.SubElement(root, "department")
    dept_elem.set("name", dept_data["name"])
    dept_elem.set("employee_count", str(dept_data["employee_count"]))
    
    for emp_data in dept_data["employees"]:
        emp_elem = ET.SubElement(dept_elem, "employee")
        emp_elem.set("id", str(emp_data["id"]))
        
        for key, value in emp_data.items():
            if key != "id":
                if key == "skills":
                    skills_elem = ET.SubElement(emp_elem, "skills")
                    for skill in value:
                        skill_elem = ET.SubElement(skills_elem, "skill")
                        skill_elem.text = skill
                else:
                    elem = ET.SubElement(emp_elem, key)
                    elem.text = str(value)

# XMLファイルに保存
tree = ET.ElementTree(root)
tree.write('employees.xml', encoding='utf-8', xml_declaration=True)
print("\\n✅ XML変換も完了: employees.xml")

# ファイル一覧表示
import os
print("\\n=== 生成されたファイル ===")
for file in ['employees.csv', 'departments.json', 'employees.xml']:
    if os.path.exists(file):
        size = os.path.getsize(file)
        print(f"{file}: {size} bytes")
」
```

### 📊 レポート生成・自動化

#### HTMLレポートの自動生成
```python
# プロンプト例
「売上データからHTMLレポートを自動生成してください：

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from datetime import datetime
import os

# サンプル売上データ生成
np.random.seed(42)
dates = pd.date_range('2024-01-01', '2024-06-30', freq='D')
products = ['商品A', '商品B', '商品C', '商品D', '商品E']
regions = ['東京', '大阪', '名古屋', '福岡']

sales_data = []
for date in dates:
    for product in products:
        for region in regions:
            if np.random.random() > 0.3:  # 30%の確率でデータなし
                sales_data.append({
                    'date': date,
                    'product': product,
                    'region': region,
                    'sales': np.random.gamma(2, 500),
                    'quantity': np.random.poisson(10) + 1,
                    'profit_margin': np.random.uniform(0.1, 0.4)
                })

df = pd.DataFrame(sales_data)
df['profit'] = df['sales'] * df['profit_margin']

print(f"データサイズ: {len(df)} レコード")

# グラフ作成関数
def create_base64_plot(fig):
    buffer = BytesIO()
    fig.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
    buffer.seek(0)
    plot_data = buffer.getvalue()
    buffer.close()
    plt.close(fig)
    return base64.b64encode(plot_data).decode()

# 1. 月別売上推移グラフ
monthly_sales = df.groupby(df['date'].dt.to_period('M'))['sales'].sum()
fig1, ax1 = plt.subplots(figsize=(12, 6))
monthly_sales.plot(kind='line', ax=ax1, marker='o', linewidth=3, markersize=8)
ax1.set_title('月別売上推移', fontsize=16, fontweight='bold')
ax1.set_xlabel('月')
ax1.set_ylabel('売上金額 (円)')
ax1.grid(True, alpha=0.3)
ax1.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'¥{x:,.0f}'))
plot1_base64 = create_base64_plot(fig1)

# 2. 商品別売上シェア（円グラフ）
product_sales = df.groupby('product')['sales'].sum()
fig2, ax2 = plt.subplots(figsize=(10, 8))
colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
wedges, texts, autotexts = ax2.pie(product_sales.values, labels=product_sales.index, 
                                  autopct='%1.1f%%', colors=colors, startangle=90)
ax2.set_title('商品別売上シェア', fontsize=16, fontweight='bold')
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontweight('bold')
plot2_base64 = create_base64_plot(fig2)

# 3. 地域別売上比較（棒グラフ）
region_sales = df.groupby('region')['sales'].sum().sort_values(ascending=False)
fig3, ax3 = plt.subplots(figsize=(10, 6))
bars = ax3.bar(region_sales.index, region_sales.values, color=['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'])
ax3.set_title('地域別売上比較', fontsize=16, fontweight='bold')
ax3.set_xlabel('地域')
ax3.set_ylabel('売上金額 (円)')
ax3.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'¥{x:,.0f}'))

# 棒グラフに数値ラベル追加
for bar in bars:
    height = bar.get_height()
    ax3.text(bar.get_x() + bar.get_width()/2., height,
             f'¥{height:,.0f}', ha='center', va='bottom', fontweight='bold')

plot3_base64 = create_base64_plot(fig3)

# 統計データ計算
total_sales = df['sales'].sum()
total_profit = df['profit'].sum()
avg_profit_margin = df['profit_margin'].mean()
best_product = product_sales.idxmax()
best_region = region_sales.idxmax()

# HTMLレポート生成
html_content = f'''
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>売上分析レポート</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }}
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 30px;
        }}
        .header h1 {{
            margin: 0;
            font-size: 2.5em;
        }}
        .header p {{
            margin: 10px 0 0 0;
            opacity: 0.9;
        }}
        .summary {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }}
        .summary-card {{
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
            border-left: 5px solid #667eea;
        }}
        .summary-card h3 {{
            margin: 0 0 10px 0;
            color: #667eea;
            font-size: 1.1em;
        }}
        .summary-card .value {{
            font-size: 2em;
            font-weight: bold;
            color: #2c3e50;
            margin: 10px 0;
        }}
        .chart-section {{
            background: white;
            margin: 30px 0;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }}
        .chart-section h2 {{
            color: #2c3e50;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }}
        .chart-container {{
            text-align: center;
            margin: 20px 0;
        }}
        .chart-container img {{
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        .insights {{
            background: #e8f4fd;
            padding: 25px;
            border-radius: 10px;
            border-left: 5px solid #3498db;
            margin: 30px 0;
        }}
        .insights h3 {{
            color: #2980b9;
            margin-top: 0;
        }}
        .insights ul {{
            margin: 0;
            padding-left: 20px;
        }}
        .insights li {{
            margin: 8px 0;
        }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            color: #7f8c8d;
            border-top: 1px solid #ecf0f1;
        }}
        @media print {{
            body {{ background-color: white; }}
            .chart-section {{ page-break-inside: avoid; }}
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 売上分析レポート</h1>
        <p>期間: 2024年1月1日 〜 2024年6月30日</p>
        <p>作成日時: {datetime.now().strftime('%Y年%m月%d日 %H:%M')}</p>
    </div>

    <div class="summary">
        <div class="summary-card">
            <h3>📈 総売上</h3>
            <div class="value">¥{total_sales:,.0f}</div>
        </div>
        <div class="summary-card">
            <h3>💰 総利益</h3>
            <div class="value">¥{total_profit:,.0f}</div>
        </div>
        <div class="summary-card">
            <h3>📊 平均利益率</h3>
            <div class="value">{avg_profit_margin:.1%}</div>
        </div>
        <div class="summary-card">
            <h3>🏆 最優秀商品</h3>
            <div class="value">{best_product}</div>
        </div>
    </div>

    <div class="chart-section">
        <h2>📈 月別売上推移</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{plot1_base64}" alt="月別売上推移">
        </div>
    </div>

    <div class="chart-section">
        <h2>🥧 商品別売上シェア</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{plot2_base64}" alt="商品別売上シェア">
        </div>
    </div>

    <div class="chart-section">
        <h2>🗾 地域別売上比較</h2>
        <div class="chart-container">
            <img src="data:image/png;base64,{plot3_base64}" alt="地域別売上比較">
        </div>
    </div>

    <div class="insights">
        <h3>💡 主要インサイト</h3>
        <ul>
            <li><strong>最優秀地域:</strong> {best_region}が最も高い売上を記録</li>
            <li><strong>トップ商品:</strong> {best_product}が売上をリード</li>
            <li><strong>利益率:</strong> 平均{avg_profit_margin:.1%}の健全な利益率を維持</li>
            <li><strong>成長トレンド:</strong> 月次売上は安定した成長を示している</li>
            <li><strong>地域バランス:</strong> 全地域で均等な売上分布を実現</li>
        </ul>
    </div>

    <div class="footer">
        <p>このレポートは自動生成されました | 機密情報 - 社外秘</p>
    </div>
</body>
</html>
'''

# HTMLファイル保存
with open('sales_report.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("✅ HTMLレポートが生成されました: sales_report.html")
print(f"ファイルサイズ: {os.path.getsize('sales_report.html')} bytes")

# データサマリーも表示
print("\\n=== レポートサマリー ===")
print(f"総売上: ¥{total_sales:,.0f}")
print(f"総利益: ¥{total_profit:,.0f}")
print(f"平均利益率: {avg_profit_margin:.1%}")
print(f"最優秀商品: {best_product}")
print(f"最優秀地域: {best_region}")
print(f"データ期間: {df['date'].min().strftime('%Y-%m-%d')} 〜 {df['date'].max().strftime('%Y-%m-%d')}")
」
```

---

## 高度な活用テクニック

### 🔧 エラーハンドリング・デバッグ

#### 堅牢なコード作成
```python
# プロンプト例
「以下のようなエラーハンドリングを含む堅牢なデータ処理システムを作成してください：

import pandas as pd
import numpy as np
import logging
from datetime import datetime
import traceback
import warnings

# ログ設定
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class DataProcessor:
    def __init__(self):
        self.processed_data = None
        self.errors = []
        self.warnings = []
        
    def validate_data(self, df):
        \"\"\"データの妥当性をチェック\"\"\"
        issues = []
        
        try:
            # 基本チェック
            if df.empty:
                issues.append("データが空です")
                return issues
            
            # 欠損値チェック
            missing_data = df.isnull().sum()
            if missing_data.sum() > 0:
                missing_cols = missing_data[missing_data > 0]
                issues.append(f"欠損値発見: {dict(missing_cols)}")
            
            # データ型チェック
            for col in df.columns:
                if df[col].dtype == 'object':
                    # 数値として解釈可能かチェック
                    try:
                        pd.to_numeric(df[col], errors='raise')
                        issues.append(f"列'{col}'は数値型に変換可能です")
                    except (ValueError, TypeError):
                        pass
            
            # 重複チェック
            duplicates = df.duplicated().sum()
            if duplicates > 0:
                issues.append(f"重複行: {duplicates}件")
            
            # 外れ値チェック（数値列のみ）
            numeric_cols = df.select_dtypes(include=[np.number]).columns
            for col in numeric_cols:
                Q1 = df[col].quantile(0.25)
                Q3 = df[col].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - 1.5 * IQR
                upper_bound = Q3 + 1.5 * IQR
                
                outliers = df[(df[col] < lower_bound) | (df[col] > upper_bound)]
                if len(outliers) > 0:
                    issues.append(f"列'{col}'に外れ値: {len(outliers)}件")
            
            return issues
            
        except Exception as e:
            logger.error(f"データ検証エラー: {e}")
            return [f"検証プロセスエラー: {str(e)}"]
    
    def clean_data(self, df):
        \"\"\"データクリーニング\"\"\"
        try:
            logger.info("データクリーニング開始")
            original_shape = df.shape
            
            # 1. 重複行の削除
            df_cleaned = df.drop_duplicates()
            if df_cleaned.shape[0] != original_shape[0]:
                removed_duplicates = original_shape[0] - df_cleaned.shape[0]
                logger.info(f"重複行 {removed_duplicates}件を削除")
            
            # 2. 欠損値の処理
            for col in df_cleaned.columns:
                missing_count = df_cleaned[col].isnull().sum()
                if missing_count > 0:
                    if df_cleaned[col].dtype in ['int64', 'float64']:
                        # 数値列は中央値で補完
                        median_val = df_cleaned[col].median()
                        df_cleaned[col].fillna(median_val, inplace=True)
                        logger.info(f"列'{col}': 欠損値{missing_count}件を中央値{median_val}で補完")
                    else:
                        # カテゴリ列は最頻値で補完
                        mode_val = df_cleaned[col].mode()
                        if len(mode_val) > 0:
                            df_cleaned[col].fillna(mode_val[0], inplace=True)
                            logger.info(f"列'{col}': 欠損値{missing_count}件を最頻値'{mode_val[0]}'で補完")
                        else:
                            df_cleaned[col].fillna('Unknown', inplace=True)
                            logger.info(f"列'{col}': 欠損値{missing_count}件を'Unknown'で補完")
            
            # 3. データ型の最適化
            for col in df_cleaned.columns:
                if df_cleaned[col].dtype == 'object':
                    # 数値変換を試行
                    try:
                        numeric_series = pd.to_numeric(df_cleaned[col], errors='coerce')
                        if not numeric_series.isnull().all():
                            # 整数か浮動小数点かを判定
                            if numeric_series.equals(numeric_series.astype('int64', errors='ignore')):
                                df_cleaned[col] = numeric_series.astype('int64')
                                logger.info(f"列'{col}'をint64に変換")
                            else:
                                df_cleaned[col] = numeric_series
                                logger.info(f"列'{col}'をfloat64に変換")
                    except Exception as e:
                        logger.debug(f"列'{col}'の数値変換失敗: {e}")
                        # カテゴリ化を検討
                        unique_ratio = df_cleaned[col].nunique() / len(df_cleaned)
                        if unique_ratio < 0.5:  # ユニーク値の割合が50%未満
                            df_cleaned[col] = df_cleaned[col].astype('category')
                            logger.info(f"列'{col}'をカテゴリ型に変換")
            
            logger.info(f"クリーニング完了: {original_shape} → {df_cleaned.shape}")
            return df_cleaned
            
        except Exception as e:
            logger.error(f"データクリーニングエラー: {e}")
            logger.error(traceback.format_exc())
            return df
    
    def analyze_data(self, df):
        \"\"\"データ分析実行\"\"\"
        results = {}
        
        try:
            logger.info("データ分析開始")
            
            # 基本情報
            results['basic_info'] = {
                'shape': df.shape,
                'columns': list(df.columns),
                'dtypes': df.dtypes.to_dict(),
                'memory_usage': df.memory_usage(deep=True).sum()
            }
            
            # 数値列の統計
            numeric_cols = df.select_dtypes(include=[np.number]).columns
            if len(numeric_cols) > 0:
                results['numeric_stats'] = df[numeric_cols].describe().to_dict()
                
                # 相関分析
                if len(numeric_cols) > 1:
                    correlation_matrix = df[numeric_cols].corr()
                    results['correlations'] = correlation_matrix.to_dict()
            
            # カテゴリ列の分析
            categorical_cols = df.select_dtypes(include=['object', 'category']).columns
            if len(categorical_cols) > 0:
                results['categorical_stats'] = {}
                for col in categorical_cols:
                    results['categorical_stats'][col] = {
                        'unique_count': df[col].nunique(),
                        'top_values': df[col].value_counts().head(5).to_dict()
                    }
            
            logger.info("データ分析完了")
            return results
            
        except Exception as e:
            logger.error(f"データ分析エラー: {e}")
            logger.error(traceback.format_exc())
            return {'error': str(e)}
    
    def process_file(self, file_path):
        \"\"\"ファイル処理のメインフロー\"\"\"
        try:
            logger.info(f"ファイル処理開始: {file_path}")
            
            # ファイル読み込み
            try:
                if file_path.endswith('.csv'):
                    df = pd.read_csv(file_path, encoding='utf-8')
                elif file_path.endswith('.xlsx'):
                    df = pd.read_excel(file_path)
                elif file_path.endswith('.json'):
                    df = pd.read_json(file_path)
                else:
                    raise ValueError(f"サポートされていないファイル形式: {file_path}")
                
                logger.info(f"ファイル読み込み成功: {df.shape}")
                
            except UnicodeDecodeError:
                logger.warning("UTF-8での読み込み失敗、Shift_JISで再試行")
                df = pd.read_csv(file_path, encoding='shift_jis')
            except Exception as e:
                logger.error(f"ファイル読み込みエラー: {e}")
                raise
            
            # データ検証
            validation_issues = self.validate_data(df)
            if validation_issues:
                logger.warning("データ検証で問題を発見:")
                for issue in validation_issues:
                    logger.warning(f"  - {issue}")
                self.warnings.extend(validation_issues)
            
            # データクリーニング
            df_cleaned = self.clean_data(df)
            
            # データ分析
            analysis_results = self.analyze_data(df_cleaned)
            
            # 結果保存
            self.processed_data = df_cleaned
            
            # 結果サマリー
            summary = {
                'file_path': file_path,
                'original_shape': df.shape,
                'processed_shape': df_cleaned.shape,
                'processing_time': datetime.now().isoformat(),
                'warnings': self.warnings,
                'analysis': analysis_results
            }
            
            logger.info("ファイル処理完了")
            return summary
            
        except Exception as e:
            logger.error(f"ファイル処理エラー: {e}")
            logger.error(traceback.format_exc())
            self.errors.append(str(e))
            return {'error': str(e), 'traceback': traceback.format_exc()}

# 使用例
processor = DataProcessor()

# テストデータ作成
test_data = pd.DataFrame({
    'A': [1, 2, np.nan, 4, 5, 1],  # 重複と欠損値
    'B': ['x', 'y', 'z', 'x', np.nan, 'x'],  # カテゴリデータ
    'C': [10.5, 20.0, 30.0, 40.0, 1000.0, 50.0],  # 外れ値あり
    'D': ['2024-01-01', '2024-01-02', 'invalid', '2024-01-04', '2024-01-05', '2024-01-06']
})

test_data.to_csv('test_data.csv', index=False)

# 処理実行
result = processor.process_file('test_data.csv')

print("=== 処理結果 ===")
if 'error' in result:
    print(f"エラー: {result['error']}")
else:
    print(f"元データ: {result['original_shape']}")
    print(f"処理後: {result['processed_shape']}")
    print(f"警告数: {len(result['warnings'])}")
    
    if result['warnings']:
        print("\\n警告内容:")
        for warning in result['warnings']:
            print(f"  - {warning}")
    
    print(f"\\n処理済みデータ:")
    print(processor.processed_data.head())
    print(f"\\nデータ型:")
    print(processor.processed_data.dtypes)
」
```

### 🚀 パフォーマンス最適化

#### 大量データ処理の最適化
```python
# プロンプト例
「大量データを効率的に処理するための最適化技術を実装してください：

import pandas as pd
import numpy as np
import time
from functools import wraps
import psutil
import gc
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor
import multiprocessing as mp

def performance_monitor(func):
    \"\"\"パフォーマンス監視デコレータ\"\"\"
    @wraps(func)
    def wrapper(*args, **kwargs):
        # メモリ使用量（実行前）
        process = psutil.Process()
        memory_before = process.memory_info().rss / 1024 / 1024  # MB
        
        # 実行時間測定
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        
        # メモリ使用量（実行後）
        memory_after = process.memory_info().rss / 1024 / 1024  # MB
        
        print(f"\\n=== {func.__name__} パフォーマンス ===")
        print(f"実行時間: {end_time - start_time:.2f}秒")
        print(f"メモリ使用量: {memory_before:.1f}MB → {memory_after:.1f}MB")
        print(f"メモリ増加: {memory_after - memory_before:.1f}MB")
        
        return result
    return wrapper

class OptimizedDataProcessor:
    def __init__(self):
        self.chunk_size = 10000
        self.n_cores = mp.cpu_count()
    
    @performance_monitor
    def create_large_dataset(self, n_rows=1000000):
        \"\"\"大量テストデータ作成\"\"\"
        print(f"大量データ作成中... ({n_rows:,}行)")
        
        # メモリ効率的なデータ生成
        np.random.seed(42)
        
        data = {
            'id': range(1, n_rows + 1),
            'category': np.random.choice(['A', 'B', 'C', 'D', 'E'], n_rows),
            'value1': np.random.normal(100, 15, n_rows),
            'value2': np.random.exponential(50, n_rows),
            'date': pd.date_range('2020-01-01', periods=n_rows, freq='H'),
            'flag': np.random.choice([True, False], n_rows, p=[0.3, 0.7])
        }
        
        df = pd.DataFrame(data)
        
        # データ型最適化
        df = self.optimize_dtypes(df)
        
        print(f"データサイズ: {df.memory_usage(deep=True).sum() / 1024 / 1024:.1f}MB")
        return df
    
    def optimize_dtypes(self, df):
        \"\"\"データ型最適化\"\"\"
        original_memory = df.memory_usage(deep=True).sum()
        
        for col in df.columns:
            col_type = df[col].dtype
            
            if col_type != 'object':
                c_min = df[col].min()
                c_max = df[col].max()
                
                if str(col_type)[:3] == 'int':
                    if c_min > np.iinfo(np.int8).min and c_max < np.iinfo(np.int8).max:
                        df[col] = df[col].astype(np.int8)
                    elif c_min > np.iinfo(np.int16).min and c_max < np.iinfo(np.int16).max:
                        df[col] = df[col].astype(np.int16)
                    elif c_min > np.iinfo(np.int32).min and c_max < np.iinfo(np.int32).max:
                        df[col] = df[col].astype(np.int32)
                
                elif str(col_type)[:5] == 'float':
                    if c_min > np.finfo(np.float32).min and c_max < np.finfo(np.float32).max:
                        df[col] = df[col].astype(np.float32)
            
            elif col_type == 'object':
                # カテゴリ化の検討
                unique_ratio = df[col].nunique() / len(df)
                if unique_ratio < 0.5:
                    df[col] = df[col].astype('category')
        
        optimized_memory = df.memory_usage(deep=True).sum()
        reduction = (1 - optimized_memory / original_memory) * 100
        
        print(f"メモリ使用量削減: {reduction:.1f}%")
        return df
    
    @performance_monitor
    def chunked_processing(self, df, operation='sum'):
        \"\"\"チャンク処理\"\"\"
        print(f"チャンク処理開始 (チャンクサイズ: {self.chunk_size:,})")
        
        results = []
        n_chunks = len(df) // self.chunk_size + (1 if len(df) % self.chunk_size != 0 else 0)
        
        for i in range(0, len(df), self.chunk_size):
            chunk = df.iloc[i:i + self.chunk_size]
            
            if operation == 'sum':
                result = chunk.select_dtypes(include=[np.number]).sum()
            elif operation == 'mean':
                result = chunk.select_dtypes(include=[np.number]).mean()
            elif operation == 'group_sum':
                result = chunk.groupby('category')['value1'].sum()
            
            results.append(result)
            
            if (i // self.chunk_size + 1) % 10 == 0:
                print(f"進捗: {i // self.chunk_size + 1}/{n_chunks} チャンク処理完了")
        
        # 結果統合
        if operation in ['sum', 'mean']:
            final_result = pd.concat(results, axis=1).sum(axis=1)
        elif operation == 'group_sum':
            final_result = pd.concat(results).groupby('category').sum()
        
        return final_result
    
    def parallel_chunk_processor(self, chunk):
        \"\"\"並列処理用のチャンク処理関数\"\"\"
        return chunk.groupby('category').agg({
            'value1': ['sum', 'mean', 'count'],
            'value2': ['sum', 'mean']
        })
    
    @performance_monitor
    def parallel_processing(self, df):
        \"\"\"並列処理\"\"\"
        print(f"並列処理開始 (コア数: {self.n_cores})")
        
        # データをチャンクに分割
        chunks = [df.iloc[i:i + self.chunk_size] for i in range(0, len(df), self.chunk_size)]
        
        # ProcessPoolExecutorで並列処理
        with ProcessPoolExecutor(max_workers=self.n_cores) as executor:
            results = list(executor.map(self.parallel_chunk_processor, chunks))
        
        # 結果統合
        combined_result = pd.concat(results)
        final_result = combined_result.groupby('category').agg({
            ('value1', 'sum'): 'sum',
            ('value1', 'mean'): 'mean',
            ('value1', 'count'): 'sum',
            ('value2', 'sum'): 'sum',
            ('value2', 'mean'): 'mean'
        })
        
        return final_result
    
    @performance_monitor
    def vectorized_operations(self, df):
        \"\"\"ベクトル化演算\"\"\"
        print("ベクトル化演算実行")
        
        # 複雑な計算をベクトル化
        # 従来のループ処理の代わりにベクトル演算を使用
        
        # 条件に基づくスコア計算
        conditions = [
            (df['value1'] > 100) & (df['value2'] > 50),
            (df['value1'] > 80) & (df['value2'] > 30),
            (df['value1'] > 60) & (df['value2'] > 20)
        ]
        choices = [100, 80, 60]
        
        df['score'] = np.select(conditions, choices, default=0)
        
        # 複雑な数式計算
        df['complex_metric'] = (
            np.log1p(df['value1']) * 
            np.sqrt(df['value2']) * 
            np.where(df['flag'], 1.2, 1.0)
        )
        
        # カテゴリ別統計の高速計算
        category_stats = df.groupby('category').agg({
            'value1': ['sum', 'mean', 'std'],
            'value2': ['sum', 'mean', 'std'],
            'score': 'mean',
            'complex_metric': 'mean'
        })
        
        return category_stats
    
    @performance_monitor
    def memory_efficient_join(self, df1, df2):
        \"\"\"メモリ効率的な結合\"\"\"
        print("メモリ効率的な結合実行")
        
        # インデックスを最適化
        df1_indexed = df1.set_index('id')
        df2_indexed = df2.set_index('id')
        
        # チャンクごとに結合
        results = []
        for i in range(0, len(df1_indexed), self.chunk_size):
            chunk1 = df1_indexed.iloc[i:i + self.chunk_size]
            
            # 対応するIDのみをdf2から抽出
            matching_ids = chunk1.index.intersection(df2_indexed.index)
            chunk2 = df2_indexed.loc[matching_ids]
            
            # 結合
            joined_chunk = chunk1.join(chunk2, how='inner')
            results.append(joined_chunk)
            
            # メモリクリーンアップ
            del chunk1, chunk2, joined_chunk
            gc.collect()
        
        final_result = pd.concat(results)
        return final_result

# 使用例とベンチマーク
processor = OptimizedDataProcessor()

# 1. 大量データ作成
large_df = processor.create_large_dataset(500000)

# 2. 通常処理 vs チャンク処理の比較
print("\\n" + "="*50)
print("処理方法の比較")
print("="*50)

# 通常のグループ化
@performance_monitor
def normal_grouping(df):
    return df.groupby('category')['value1'].sum()

# チャンク処理
result_normal = normal_grouping(large_df)
result_chunked = processor.chunked_processing(large_df, 'group_sum')

print("\\n結果比較:")
print("通常処理:")
print(result_normal)
print("\\nチャンク処理:")
print(result_chunked)

# 3. 並列処理
result_parallel = processor.parallel_processing(large_df)
print("\\n並列処理結果:")
print(result_parallel)

# 4. ベクトル化演算
result_vectorized = processor.vectorized_operations(large_df.copy())
print("\\nベクトル化演算結果:")
print(result_vectorized.head())

# 5. メモリ使用量監視
print("\\n" + "="*50)
print("メモリ使用量分析")
print("="*50)

process = psutil.Process()
memory_info = process.memory_info()
print(f"現在のメモリ使用量: {memory_info.rss / 1024 / 1024:.1f}MB")
print(f"仮想メモリ使用量: {memory_info.vms / 1024 / 1024:.1f}MB")

# ガベージコレクション実行
gc.collect()
memory_after_gc = process.memory_info()
print(f"GC後のメモリ使用量: {memory_after_gc.rss / 1024 / 1024:.1f}MB")

# 6. 最適化のまとめ
print("\\n" + "="*50)
print("最適化手法まとめ")
print("="*50)
print("✅ データ型最適化: メモリ使用量を大幅削減")
print("✅ チャンク処理: 大量データを安全に処理")
print("✅ 並列処理: 複数コアを活用して高速化")
print("✅ ベクトル化演算: NumPyの高速演算を活用")
print("✅ メモリ管理: 定期的なガベージコレクション")
」
```

---

## 💡 実践演習

### 演習1: 基本的なデータ分析

以下のタスクをChatGPT Code Interpreterで実行してください：

```
タスク: 売上データの分析

データ作成:
- 6か月分の日別売上データ
- 5つの商品カテゴリ
- 3つの地域
- 売上金額、数量、利益率

分析内容:
1. 基本統計情報の算出
2. 月別・カテゴリ別・地域別の集計
3. 相関分析
4. 可視化（3種類以上のグラフ）
5. 主要インサイトの抽出
```

### 演習2: ファイル処理・変換

以下の変換タスクを実行してください：

```
タスク: 複数フォーマット間の変換

処理内容:
1. JSON → CSV変換
2. Excel → JSON変換
3. データクリーニング・検証
4. HTML レポート生成
5. エラーハンドリングの実装

要件:
- 堅牢なエラー処理
- データ妥当性検証
- 処理ログの出力
- パフォーマンス監視
```

### 演習3: 高度な可視化・レポート

以下の高度なレポートを作成してください：

```
タスク: インタラクティブダッシュボード

機能:
1. Plotlyを使った動的グラフ
2. 複数の可視化形式
3. HTMLレポートの自動生成
4. 統計分析結果の組み込み
5. プロフェッショナルなデザイン

技術要件:
- レスポンシブ対応
- 印刷最適化
- データ更新対応
- エラー時のフォールバック
```

---

## 📚 参考資料

### ChatGPT Code Interpreter
- [OpenAI Code Interpreter Guide](https://help.openai.com/en/articles/8437071-code-interpreter)
- [Advanced Data Analysis](https://openai.com/blog/chatgpt-plugins#code-interpreter)

### Python データ分析
- [Pandas Documentation](https://pandas.pydata.org/docs/)
- [NumPy Documentation](https://numpy.org/doc/)
- [Matplotlib Tutorials](https://matplotlib.org/stable/tutorials/index.html)
- [Plotly Python](https://plotly.com/python/)

### パフォーマンス最適化
- [Pandas Performance](https://pandas.pydata.org/docs/user_guide/enhancingperf.html)
- [Python Profiling](https://docs.python.org/3/library/profile.html)

---

## ✅ 理解度確認

この講座の内容を理解できたか、以下で確認してください：

1. ChatGPT Code Interpreterの基本操作を習得しましたか？
2. データ分析・可視化を効果的に実行できますか？
3. ファイル処理・変換作業を自動化できますか？
4. エラーハンドリングとデバッグ技術を理解しましたか？
5. パフォーマンス最適化の手法を適用できますか？

すべて「はい」なら次の講座に進めます。

---

**次の講座**: [ClaudeでのPython実行](12-python-claude.md)