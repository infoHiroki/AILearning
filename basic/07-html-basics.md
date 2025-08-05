# HTML基礎とAI活用

**所要時間**: 45分  
**レベル**: 基礎  
**前提知識**: [XML基礎](06-xml-basics.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- HTMLの基本構造と主要タグを理解できる
- AIを使ったHTML生成とWebスクレイピングができる
- HTML形式でのデータ表示とレポート作成ができる
- WebページからのAI支援による情報抽出ができる

## 📋 目次

1. [HTMLとは](#htmlとは)
2. [HTML基本構造とタグ](#html基本構造とタグ)
3. [AIによるHTML生成](#aiによるhtml生成)
4. [Webスクレイピングとデータ抽出](#webスクレイピングとデータ抽出)
5. [HTML活用の実践パターン](#html活用の実践パターン)

---

## HTMLとは

### 🌐 HTMLの役割と特徴

**HTML**（HyperText Markup Language）は、Webページの構造と内容を定義するマークアップ言語です。

#### HTMLの主な特徴
```
✅ Web表示に最適化
✅ ブラウザでの表示が可能
✅ CSS・JavaScriptとの連携
✅ 豊富な表示要素
✅ アクセシビリティ対応
```

#### AI時代におけるHTMLの価値
- **データ可視化**: 分析結果を見やすく表示
- **レポート生成**: 動的なHTML レポートの作成
- **情報抽出**: Webサイトからのデータ収集
- **テンプレート**: 構造化されたHTML テンプレート

### 🔄 HTML vs XML vs Markdown

| 特徴 | HTML | XML | Markdown |
|------|------|-----|----------|
| **主な用途** | Web表示 | データ構造化 | 文書作成 |
| **構文の厳密性** | 緩い | 厳密 | 非常に緩い |
| **表示機能** | 豊富 | なし | 基本的 |
| **学習コスト** | 中程度 | 高い | 低い |
| **AI活用** | 可視化・抽出 | 構造化指示 | 簡易指示 |

---

## HTML基本構造とタグ

### 📝 基本的なHTML文書構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ページタイトル</title>
    <style>
        /* CSS スタイル */
        body { font-family: Arial, sans-serif; }
        .highlight { background-color: yellow; }
    </style>
</head>
<body>
    <!-- ページの内容 -->
    <header>
        <h1>メインタイトル</h1>
        <nav>
            <ul>
                <li><a href="#section1">セクション1</a></li>
                <li><a href="#section2">セクション2</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="section1">
            <h2>セクション1のタイトル</h2>
            <p>内容を記述します。</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 サンプルサイト</p>
    </footer>
</body>
</html>
```

### 🏷️ 主要HTMLタグ一覧

#### 1. 文書構造タグ
```html
<!-- 文書型宣言と基本構造 -->
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>タイトル</title>
</head>
<body>
    <!-- コンテンツ -->
</body>
</html>

<!-- セマンティック構造タグ -->
<header>ヘッダー部分</header>
<nav>ナビゲーション</nav>
<main>メインコンテンツ</main>
<article>記事</article>
<section>セクション</section>
<aside>サイドバー</aside>
<footer>フッター</footer>
```

#### 2. テキスト関連タグ
```html
<!-- 見出し -->
<h1>レベル1見出し</h1>
<h2>レベル2見出し</h2>
<h3>レベル3見出し</h3>
<h4>レベル4見出し</h4>
<h5>レベル5見出し</h5>
<h6>レベル6見出し</h6>

<!-- 段落と改行 -->
<p>段落テキスト</p>
<br> <!-- 改行 -->
<hr> <!-- 水平線 -->

<!-- テキスト装飾 -->
<strong>重要なテキスト</strong>
<em>強調されたテキスト</em>
<b>太字</b>
<i>斜体</i>
<u>下線</u>
<s>取り消し線</s>
<mark>ハイライト</mark>
<small>小さいテキスト</small>
<sub>下付き文字</sub>
<sup>上付き文字</sup>

<!-- 引用 -->
<blockquote>ブロック引用</blockquote>
<q>インライン引用</q>
<cite>引用元</cite>

<!-- コード -->
<code>インラインコード</code>
<pre>整形済みテキスト</pre>
<kbd>キーボード入力</kbd>
<var>変数</var>
<samp>サンプル出力</samp>
```

#### 3. リストタグ
```html
<!-- 順序なしリスト -->
<ul>
    <li>アイテム1</li>
    <li>アイテム2</li>
    <li>アイテム3</li>
</ul>

<!-- 順序ありリスト -->
<ol>
    <li>ステップ1</li>
    <li>ステップ2</li>
    <li>ステップ3</li>
</ol>

<!-- 定義リスト -->
<dl>
    <dt>用語1</dt>
    <dd>用語1の定義</dd>
    <dt>用語2</dt>
    <dd>用語2の定義</dd>
</dl>
```

#### 4. リンクと画像
```html
<!-- リンク -->
<a href="https://example.com">外部リンク</a>
<a href="#section1">内部リンク</a>
<a href="mailto:contact@example.com">メールリンク</a>
<a href="tel:+81-90-1234-5678">電話リンク</a>

<!-- 画像 -->
<img src="image.jpg" alt="画像の説明" width="300" height="200">

<!-- 図表 -->
<figure>
    <img src="chart.jpg" alt="売上グラフ">
    <figcaption>2024年度売上推移</figcaption>
</figure>
```

#### 5. テーブル
```html
<table>
    <caption>売上データ</caption>
    <thead>
        <tr>
            <th>月</th>
            <th>売上</th>
            <th>前年比</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1月</td>
            <td>100万円</td>
            <td>+10%</td>
        </tr>
        <tr>
            <td>2月</td>
            <td>120万円</td>
            <td>+15%</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>合計</td>
            <td>220万円</td>
            <td>+12.5%</td>
        </tr>
    </tfoot>
</table>
```

#### 6. フォーム要素
```html
<form action="/submit" method="post">
    <!-- テキスト入力 -->
    <label for="name">名前:</label>
    <input type="text" id="name" name="name" required>
    
    <!-- メール入力 -->
    <label for="email">メール:</label>
    <input type="email" id="email" name="email" required>
    
    <!-- パスワード -->
    <label for="password">パスワード:</label>
    <input type="password" id="password" name="password">
    
    <!-- 数値入力 -->
    <label for="age">年齢:</label>
    <input type="number" id="age" name="age" min="0" max="150">
    
    <!-- 日付入力 -->
    <label for="birthdate">生年月日:</label>
    <input type="date" id="birthdate" name="birthdate">
    
    <!-- 選択肢 -->
    <fieldset>
        <legend>性別</legend>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">男性</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">女性</label>
    </fieldset>
    
    <!-- チェックボックス -->
    <input type="checkbox" id="subscribe" name="subscribe">
    <label for="subscribe">ニュースレターを購読する</label>
    
    <!-- セレクトボックス -->
    <label for="country">国:</label>
    <select id="country" name="country">
        <option value="jp">日本</option>
        <option value="us">アメリカ</option>
        <option value="uk">イギリス</option>
    </select>
    
    <!-- テキストエリア -->
    <label for="message">メッセージ:</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea>
    
    <!-- 送信ボタン -->
    <button type="submit">送信</button>
    <button type="reset">リセット</button>
</form>
```

---

## AIによるHTML生成

### 🎯 構造化されたHTML生成指示

#### レポート形式のHTML生成
```
以下の構造に従って、売上分析レポートのHTMLを生成してください：

要件:
- セマンティックなHTML5構造を使用
- レスポンシブデザイン対応
- 表、グラフ、リストを適切に配置
- アクセシビリティを考慮

構造:
1. ヘッダー（タイトル、作成日、作成者）
2. エグゼクティブサマリー
3. データ表（月別売上）
4. 分析結果（箇条書き）
5. 結論・提言
6. フッター（連絡先情報）

スタイル要件:
- プロフェッショナルな外観
- 表は境界線と交互背景色
- 重要なポイントはハイライト
- 印刷対応レイアウト

データ:
- 対象期間: 2024年1-6月
- 売上データ: 1月100万、2月120万、3月90万、4月130万、5月140万、6月150万
- 前年同期比: +15%
- 主要商品: 商品A(40%)、商品B(35%)、商品C(25%)
```

#### ダッシュボード形式のHTML生成
```html
<!-- AIに生成してもらうダッシュボードの例 -->
以下の仕様でダッシュボードHTMLを作成してください：

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>営業ダッシュボード</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            color: #333;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .metric-value {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }
        .metric-label {
            color: #666;
            margin-top: 5px;
        }
        .chart-container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #667eea;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .positive { color: #4CAF50; }
        .negative { color: #f44336; }
        .status-active { 
            background-color: #4CAF50;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
        }
        .status-pending {
            background-color: #ff9800;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>営業ダッシュボード</h1>
            <p>更新日時: <span id="update-time">2024年3月15日 10:30</span></p>
        </header>

        <!-- KPI メトリクス -->
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">¥15,240,000</div>
                <div class="metric-label">今月の売上</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">142</div>
                <div class="metric-label">成約件数</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">23.5%</div>
                <div class="metric-label">成約率</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">¥107,324</div>
                <div class="metric-label">平均受注金額</div>
            </div>
        </div>

        <!-- チャートエリア -->
        <div class="chart-container">
            <h2>月別売上推移</h2>
            <canvas id="salesChart" width="400" height="200"></canvas>
        </div>

        <!-- 営業担当者別データ -->
        <div class="chart-container">
            <h2>営業担当者別成績</h2>
            <table>
                <thead>
                    <tr>
                        <th>担当者名</th>
                        <th>売上金額</th>
                        <th>成約件数</th>
                        <th>成約率</th>
                        <th>前月比</th>
                        <th>ステータス</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>田中太郎</td>
                        <td>¥3,500,000</td>
                        <td>32件</td>
                        <td>28.6%</td>
                        <td class="positive">+15%</td>
                        <td><span class="status-active">目標達成</span></td>
                    </tr>
                    <tr>
                        <td>佐藤花子</td>
                        <td>¥2,800,000</td>
                        <td>26件</td>
                        <td>24.8%</td>
                        <td class="positive">+8%</td>
                        <td><span class="status-active">目標達成</span></td>
                    </tr>
                    <tr>
                        <td>鈴木次郎</td>
                        <td>¥2,200,000</td>
                        <td>21件</td>
                        <td>19.1%</td>
                        <td class="negative">-5%</td>
                        <td><span class="status-pending">要改善</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <script>
        // 簡単なグラフ描画（実際にはChart.jsなどを使用）
        document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('salesChart');
            const ctx = canvas.getContext('2d');
            
            // サンプルデータでの簡単な棒グラフ
            const data = [100, 120, 90, 130, 140, 150];
            const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
            
            // 簡単な棒グラフの描画
            ctx.fillStyle = '#667eea';
            data.forEach((value, index) => {
                const x = index * 60 + 20;
                const height = value * 1.5;
                ctx.fillRect(x, 200 - height, 40, height);
                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.fillText(months[index], x, 220);
                ctx.fillStyle = '#667eea';
            });
        });
    </script>
</body>
</html>
```

### 📊 データ可視化HTML

#### インタラクティブレポートの生成指示
```
以下の条件でインタラクティブなHTML レポートを生成してください：

データ: CSVファイルから以下のデータを使用
- 日付, 商品名, 売上金額, 地域, 担当者

機能要件:
1. フィルタリング機能（地域、担当者、期間で絞り込み）
2. ソート機能（各列でソート可能）
3. 集計表示（合計、平均、最大、最小）
4. エクスポート機能（CSV、PDF）
5. レスポンシブ対応

技術要件:
- vanilla JavaScript使用
- CDNからライブラリ読み込み可能
- モダンブラウザ対応
- アクセシビリティ考慮

デザイン要件:
- プロフェッショナルな外観
- カラーコード: #2E86AB (青), #A23B72 (紫), #F18F01 (オレンジ)
- フォント: 'Noto Sans JP', sans-serif
- マテリアルデザイン風のコンポーネント
```

---

## Webスクレイピングとデータ抽出

### 🔍 HTML構造の分析

#### ページ構造の理解
```html
<!-- 典型的なニュースサイトの構造例 -->
<html>
<head>
    <title>ニュースサイト</title>
</head>
<body>
    <header class="site-header">
        <nav class="main-nav">...</nav>
    </header>
    
    <main class="content">
        <article class="news-article">
            <header class="article-header">
                <h1 class="article-title">記事タイトル</h1>
                <div class="article-meta">
                    <time datetime="2024-03-15">2024年3月15日</time>
                    <span class="author">記者名</span>
                    <span class="category">カテゴリ</span>
                </div>
            </header>
            
            <div class="article-content">
                <p>記事の本文...</p>
                <img src="image.jpg" alt="記事画像">
                <p>続きの文章...</p>
            </div>
            
            <footer class="article-footer">
                <div class="tags">
                    <span class="tag">タグ1</span>
                    <span class="tag">タグ2</span>
                </div>
                <div class="share-buttons">...</div>
            </footer>
        </article>
        
        <aside class="sidebar">
            <div class="related-articles">
                <h3>関連記事</h3>
                <ul>
                    <li><a href="/article1">関連記事1</a></li>
                    <li><a href="/article2">関連記事2</a></li>
                </ul>
            </div>
        </aside>
    </main>
</body>
</html>
```

### 🤖 AIを活用したHTML解析

#### HTML解析プロンプト
```
以下のHTMLソースから構造化されたデータを抽出してください：

[HTMLソースコードを貼り付け]

抽出したい情報:
1. ページタイトル
2. メインコンテンツの見出し
3. 記事の公開日時
4. 記事の著者
5. 記事本文（段落ごと）
6. 画像のURL と alt テキスト
7. リンク一覧（URL とリンクテキスト）
8. メタデータ（keywords, description等）

出力形式: JSON
{
  "title": "ページタイトル",
  "article": {
    "headline": "記事見出し",
    "date": "公開日時",
    "author": "著者名",
    "content": ["段落1", "段落2", ...],
    "images": [
      {"url": "画像URL", "alt": "alt テキスト"}
    ],
    "links": [
      {"url": "リンクURL", "text": "リンクテキスト"}
    ]
  },
  "metadata": {
    "keywords": ["キーワード1", "キーワード2"],
    "description": "ページ説明"
  }
}
```

#### 表データの抽出指示
```
以下のHTMLテーブルから構造化されたデータを抽出し、CSV形式で出力してください：

[HTMLテーブルのソースコード]

要件:
- ヘッダー行を正しく識別
- データ型を推測（数値、日付、文字列）
- 空のセルは適切に処理
- 結合セルがある場合は展開
- エンコード問題がある場合は修正

出力:
1. CSVデータ
2. データ構造の説明
3. 発見された問題点と対処法
```

### 📊 HTMLから構造化データへの変換

#### 商品情報の抽出例
```python
# Python + BeautifulSoup での例
from bs4 import BeautifulSoup
import json

html_content = """
<div class="product-list">
    <div class="product-item" data-id="1">
        <h3 class="product-name">商品A</h3>
        <p class="price">¥1,200</p>
        <img src="product-a.jpg" alt="商品A画像">
        <div class="description">高品質な商品です</div>
        <span class="category">電子機器</span>
    </div>
    <div class="product-item" data-id="2">
        <h3 class="product-name">商品B</h3>
        <p class="price">¥2,500</p>
        <img src="product-b.jpg" alt="商品B画像">
        <div class="description">人気の商品です</div>
        <span class="category">家具</span>
    </div>
</div>
"""

soup = BeautifulSoup(html_content, 'html.parser')
products = []

for item in soup.find_all('div', class_='product-item'):
    product = {
        'id': item.get('data-id'),
        'name': item.find('h3', class_='product-name').text,
        'price': item.find('p', class_='price').text,
        'image': item.find('img')['src'],
        'description': item.find('div', class_='description').text,
        'category': item.find('span', class_='category').text
    }
    products.append(product)

# JSON形式で出力
print(json.dumps(products, ensure_ascii=False, indent=2))
```

---

## HTML活用の実践パターン

### 📈 動的レポートの生成

#### 売上分析レポートテンプレート
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>売上分析レポート - {{report_date}}</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Noto Sans JP', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #fff;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #2E86AB;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2E86AB;
        }
        .report-title {
            font-size: 28px;
            margin: 10px 0;
            color: #2E86AB;
        }
        .report-meta {
            color: #666;
            font-size: 14px;
        }
        .summary-section {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            border-left: 5px solid #2E86AB;
        }
        .summary-title {
            color: #2E86AB;
            font-size: 20px;
            margin-bottom: 15px;
        }
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .kpi-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-top: 4px solid #2E86AB;
        }
        .kpi-value {
            font-size: 32px;
            font-weight: bold;
            color: #2E86AB;
            margin-bottom: 5px;
        }
        .kpi-label {
            color: #666;
            font-size: 14px;
        }
        .kpi-change {
            font-size: 12px;
            margin-top: 5px;
        }
        .positive { color: #28a745; }
        .negative { color: #dc3545; }
        .section {
            margin-bottom: 40px;
        }
        .section-title {
            font-size: 22px;
            color: #2E86AB;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .data-table th {
            background: #2E86AB;
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }
        .data-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #e9ecef;
        }
        .data-table tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        .data-table tr:hover {
            background-color: #e3f2fd;
        }
        .chart-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin: 20px 0;
        }
        .insights-list {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
        }
        .insights-list h4 {
            color: #856404;
            margin-bottom: 15px;
        }
        .insights-list ul {
            list-style-type: none;
            padding-left: 0;
        }
        .insights-list li {
            padding: 8px 0;
            border-bottom: 1px solid #ffeaa7;
            position: relative;
            padding-left: 25px;
        }
        .insights-list li:before {
            content: "💡";
            position: absolute;
            left: 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #666;
            font-size: 12px;
        }
        @media print {
            .header { page-break-after: avoid; }
            .section { page-break-inside: avoid; }
            .kpi-grid { page-break-inside: avoid; }
            .data-table { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- ヘッダー -->
        <header class="header">
            <div class="logo">COMPANY LOGO</div>
            <h1 class="report-title">売上分析レポート</h1>
            <div class="report-meta">
                <p>対象期間: {{start_date}} 〜 {{end_date}}</p>
                <p>作成日: {{creation_date}} | 作成者: {{author}}</p>
            </div>
        </header>

        <!-- エグゼクティブサマリー -->
        <section class="summary-section">
            <h2 class="summary-title">📊 エグゼクティブサマリー</h2>
            <p>{{summary_text}}</p>
            
            <div class="kpi-grid">
                <div class="kpi-card">
                    <div class="kpi-value">{{total_sales}}</div>
                    <div class="kpi-label">総売上</div>
                    <div class="kpi-change {{sales_trend_class}}">
                        {{sales_change}}
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-value">{{total_orders}}</div>
                    <div class="kpi-label">注文件数</div>
                    <div class="kpi-change {{orders_trend_class}}">
                        {{orders_change}}
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-value">{{avg_order_value}}</div>
                    <div class="kpi-label">平均注文金額</div>
                    <div class="kpi-change {{aov_trend_class}}">
                        {{aov_change}}
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-value">{{conversion_rate}}</div>
                    <div class="kpi-label">コンバージョン率</div>
                    <div class="kpi-change {{conversion_trend_class}}">
                        {{conversion_change}}
                    </div>
                </div>
            </div>
        </section>

        <!-- 詳細データ -->
        <section class="section">
            <h2 class="section-title">📈 月別売上推移</h2>
            <div class="chart-container">
                <canvas id="monthlyChart" width="400" height="200"></canvas>
            </div>
            
            <table class="data-table">
                <thead>
                    <tr>
                        <th>月</th>
                        <th>売上金額</th>
                        <th>注文件数</th>
                        <th>平均注文金額</th>
                        <th>前年同月比</th>
                    </tr>
                </thead>
                <tbody>
                    {{#monthly_data}}
                    <tr>
                        <td>{{month}}</td>
                        <td>{{sales}}</td>
                        <td>{{orders}}</td>
                        <td>{{avg_value}}</td>
                        <td class="{{yoy_class}}">{{yoy_change}}</td>
                    </tr>
                    {{/monthly_data}}
                </tbody>
            </table>
        </section>

        <!-- 商品別分析 -->
        <section class="section">
            <h2 class="section-title">🛍️ 商品別売上TOP10</h2>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>順位</th>
                        <th>商品名</th>
                        <th>売上金額</th>
                        <th>販売数量</th>
                        <th>売上構成比</th>
                    </tr>
                </thead>
                <tbody>
                    {{#product_data}}
                    <tr>
                        <td>{{rank}}</td>
                        <td>{{product_name}}</td>
                        <td>{{sales}}</td>
                        <td>{{quantity}}</td>
                        <td>{{percentage}}</td>
                    </tr>
                    {{/product_data}}
                </tbody>
            </table>
        </section>

        <!-- インサイト -->
        <section class="section">
            <h2 class="section-title">🔍 主要インサイト</h2>
            <div class="insights-list">
                <h4>発見された傾向と課題</h4>
                <ul>
                    {{#insights}}
                    <li>{{.}}</li>
                    {{/insights}}
                </ul>
            </div>
        </section>

        <!-- 提言 -->
        <section class="section">
            <h2 class="section-title">💡 提言・アクションプラン</h2>
            <div class="insights-list">
                <h4>推奨アクション</h4>
                <ul>
                    {{#recommendations}}
                    <li>{{.}}</li>
                    {{/recommendations}}
                </ul>
            </div>
        </section>

        <!-- フッター -->
        <footer class="footer">
            <p>本レポートに関するお問い合わせ: {{contact_email}}</p>
            <p>機密情報 - 社外秘</p>
        </footer>
    </div>

    <script>
        // 簡単なグラフ描画
        document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('monthlyChart');
            const ctx = canvas.getContext('2d');
            
            // 月別データ（実際のデータに置き換え）
            const monthlyData = {{monthly_chart_data}};
            
            // 簡単な折れ線グラフ
            drawLineChart(ctx, monthlyData, canvas.width, canvas.height);
        });

        function drawLineChart(ctx, data, width, height) {
            const margin = 40;
            const chartWidth = width - 2 * margin;
            const chartHeight = height - 2 * margin;
            
            // 軸の描画
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 1;
            
            // Y軸
            ctx.beginPath();
            ctx.moveTo(margin, margin);
            ctx.lineTo(margin, height - margin);
            ctx.stroke();
            
            // X軸
            ctx.beginPath();
            ctx.moveTo(margin, height - margin);
            ctx.lineTo(width - margin, height - margin);
            ctx.stroke();
            
            // データポイントの描画
            ctx.strokeStyle = '#2E86AB';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            data.forEach((point, index) => {
                const x = margin + (chartWidth / (data.length - 1)) * index;
                const y = height - margin - (point.value / Math.max(...data.map(d => d.value))) * chartHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                
                // データポイント
                ctx.fillStyle = '#2E86AB';
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
                
                // ラベル
                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(point.label, x, height - margin + 20);
            });
            
            ctx.stroke();
        }
    </script>
</body>
</html>
```

### 📱 レスポンシブHTML テンプレート

#### モバイル対応ダッシュボード
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>モバイル対応ダッシュボード</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #f8f9fa;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem 1rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        .header h1 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }
        
        .header p {
            opacity: 0.9;
            font-size: 0.9rem;
        }
        
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .metric-card {
            background: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            border-left: 4px solid #667eea;
        }
        
        .metric-value {
            font-size: 2.2rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 0.25rem;
        }
        
        .metric-label {
            color: #6c757d;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .metric-change {
            font-size: 0.85rem;
            font-weight: 600;
        }
        
        .positive { color: #28a745; }
        .negative { color: #dc3545; }
        
        .content-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
            overflow: hidden;
        }
        
        .card-header {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid #e9ecef;
            background: #f8f9fa;
        }
        
        .card-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #495057;
        }
        
        .card-body {
            padding: 1.5rem;
        }
        
        .table-responsive {
            overflow-x: auto;
        }
        
        .table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
        }
        
        .table th,
        .table td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e9ecef;
        }
        
        .table th {
            background-color: #f8f9fa;
            font-weight: 600;
            color: #495057;
        }
        
        .table tr:hover {
            background-color: #f8f9fa;
        }
        
        .status {
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        .status-success {
            background-color: #d4edda;
            color: #155724;
        }
        
        .status-warning {
            background-color: #fff3cd;
            color: #856404;
        }
        
        .status-danger {
            background-color: #f8d7da;
            color: #721c24;
        }
        
        /* タブレット対応 */
        @media (min-width: 768px) {
            .container {
                padding: 2rem;
            }
            
            .content-grid {
                grid-template-columns: 2fr 1fr;
            }
            
            .metrics {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        /* デスクトップ対応 */
        @media (min-width: 1024px) {
            .header h1 {
                font-size: 2.2rem;
            }
            
            .metrics {
                grid-template-columns: repeat(4, 1fr);
            }
            
            .content-grid {
                grid-template-columns: 3fr 2fr;
            }
        }
        
        /* スマートフォン縦向け対応 */
        @media (max-width: 480px) {
            .container {
                padding: 0.75rem;
            }
            
            .header {
                padding: 1rem;
            }
            
            .header h1 {
                font-size: 1.5rem;
            }
            
            .metric-card {
                padding: 1rem;
            }
            
            .metric-value {
                font-size: 1.8rem;
            }
            
            .metrics {
                grid-template-columns: 1fr;
                gap: 0.75rem;
            }
            
            .table {
                font-size: 0.8rem;
            }
            
            .table th,
            .table td {
                padding: 0.5rem 0.25rem;
            }
        }
        
        /* ダークモード対応 */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #1a1a1a;
                color: #e9ecef;
            }
            
            .card,
            .metric-card {
                background: #2d2d2d;
                color: #e9ecef;
            }
            
            .card-header {
                background: #3d3d3d;
                border-bottom-color: #404040;
            }
            
            .table th {
                background-color: #3d3d3d;
                color: #e9ecef;
            }
            
            .table td {
                border-bottom-color: #404040;
            }
            
            .table tr:hover {
                background-color: #3d3d3d;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>📊 ダッシュボード</h1>
            <p>最終更新: <span id="last-update">2024年3月15日 14:30</span></p>
        </header>
        
        <div class="metrics">
            <div class="metric-card">
                <div class="metric-value">¥2,450,000</div>
                <div class="metric-label">今月の売上</div>
                <div class="metric-change positive">↗ +12.5%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">342</div>
                <div class="metric-label">新規顧客</div>
                <div class="metric-change positive">↗ +8.3%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">89.2%</div>
                <div class="metric-label">顧客満足度</div>
                <div class="metric-change positive">↗ +2.1%</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">156</div>
                <div class="metric-label">アクティブプロジェクト</div>
                <div class="metric-change negative">↘ -3.2%</div>
            </div>
        </div>
        
        <div class="content-grid">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">最新の注文</h3>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>注文ID</th>
                                    <th>顧客名</th>
                                    <th>金額</th>
                                    <th>ステータス</th>
                                    <th>日時</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#ORD-001</td>
                                    <td>田中太郎</td>
                                    <td>¥15,000</td>
                                    <td><span class="status status-success">完了</span></td>
                                    <td>3/15 10:30</td>
                                </tr>
                                <tr>
                                    <td>#ORD-002</td>
                                    <td>佐藤花子</td>
                                    <td>¥8,500</td>
                                    <td><span class="status status-warning">処理中</span></td>
                                    <td>3/15 09:15</td>
                                </tr>
                                <tr>
                                    <td>#ORD-003</td>
                                    <td>鈴木次郎</td>
                                    <td>¥22,000</td>
                                    <td><span class="status status-danger">保留</span></td>
                                    <td>3/14 16:45</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">売上トップ商品</h3>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>商品名</th>
                                    <th>売上</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>商品A</td>
                                    <td>¥450,000</td>
                                </tr>
                                <tr>
                                    <td>商品B</td>
                                    <td>¥320,000</td>
                                </tr>
                                <tr>
                                    <td>商品C</td>
                                    <td>¥280,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // 自動更新機能
        function updateTimestamp() {
            const now = new Date();
            const formatted = now.toLocaleDateString('ja-JP') + ' ' + 
                             now.toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit'});
            document.getElementById('last-update').textContent = formatted;
        }
        
        // 5分ごとに更新
        setInterval(updateTimestamp, 300000);
        
        // PWA対応（Service Worker）
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered'))
                .catch(error => console.log('SW registration failed'));
        }
    </script>
</body>
</html>
```

---

## 💡 実践演習

### 演習1: 基本HTML作成

以下の仕様でHTMLページを作成してください：

```
タスク: 会社紹介ページの作成

含める要素:
- 適切なHTML5セマンティック構造
- 会社情報（名前、設立年、事業内容）
- サービス一覧（表形式）
- 問い合わせフォーム
- レスポンシブ対応CSS

技術要件:
- HTML5の適切なタグ使用
- アクセシビリティ対応
- モバイルファースト設計
```

### 演習2: データ可視化HTML

以下のデータを使ってHTML ダッシュボードを作成してください：

```
データ: 月別売上データ
- 1月: 150万円, 2月: 180万円, 3月: 120万円
- 4月: 200万円, 5月: 170万円, 6月: 220万円

要件:
- KPIカードでの表示
- 表形式でのデータ表示
- 簡単なグラフ表示
- 前年比の表示（+10%想定）
```

### 演習3: AIを活用したHTML解析

以下のタスクを実行してください：

```
タスク: Webページからのデータ抽出

手順:
1. 任意のニュースサイトのHTMLソースを取得
2. AIに記事情報の抽出を依頼
3. 抽出したデータを構造化
4. 新しいHTMLレポートとして整理
```

---

## 📚 参考資料

### HTML仕様・標準
- [MDN Web Docs - HTML](https://developer.mozilla.org/ja/docs/Web/HTML)
- [W3C HTML Specification](https://html.spec.whatwg.org/)
- [HTML5 Validator](https://validator.w3.org/)

### CSS・レスポンシブデザイン
- [CSS Grid Layout](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

### アクセシビリティ
- [WebAIM Guidelines](https://webaim.org/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### ツール・ライブラリ
- [Chart.js](https://www.chartjs.org/) - グラフ作成
- [DataTables](https://datatables.net/) - 高機能テーブル
- [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) - Pythonスクレイピング

---

## ✅ 理解度確認

この講座の内容を理解できたか、以下で確認してください：

1. HTML基本構造とセマンティックタグを理解していますか？
2. AIを使ったHTML生成を効果的に活用できますか？
3. Webスクレイピングの基本概念を理解していますか？
4. レスポンシブなHTML テンプレートを作成できますか？
5. HTMLとCSS、JavaScriptの連携を理解していますか？

すべて「はい」なら次の講座に進めます。

---

**次の講座**: [JSON活用基礎](08-json-basics.md)