# Make活用 〜視覚的なシナリオ構築で複雑な業務自動化を実現〜


## 学習目標

この講座を修了すると、以下ができるようになります：
- Makeの視覚的インターフェースを使った複雑なワークフローを構築できる
- 高度な条件分岐とデータ変換を実装できる
- リアルタイム処理とバッチ処理を使い分けできる
- エラーハンドリングと最適化ができる

---

## Makeとは

### 基本概念

**Make = 視覚的なフローチャートで自動化を構築するツール**

**特徴**
- **ビジュアルエディター**: フローチャート形式で直感的
- **高度な条件分岐**: 複雑なロジックも視覚的に構築
- **リアルタイム処理**: データの変化を即座に検知
- **豊富なデータ変換機能**: JSON、CSV、XMLなど自在に変換

### Zapierとの違い

| 項目 | Make | Zapier |
|------|------|--------|
| **インターフェース** | ビジュアルエディター | 線形フロー |
| **条件分岐** | 複雑な条件処理が得意 | シンプルな条件のみ |
| **データ変換** | 高度な変換機能 | 基本的な変換のみ |
| **学習コスト** | やや高い | 低い |
| **適用場面** | 複雑な業務プロセス | シンプルな連携 |

---

## 基本的な使い方

### シナリオの構成要素

#### 1. モジュール
**処理の単位**
```
主要モジュール:
□ Trigger: 処理開始のきっかけ
□ Action: 実行する処理
□ Filter: 条件分岐
□ Router: 処理の分岐
□ Aggregator: データの集約
□ Iterator: データの繰り返し処理
```

#### 2. 接続線
**データの流れ**
```
線の種類:
□ 通常の接続: データを次のモジュールに渡す
□ 条件付き接続: 条件を満たした場合のみ
□ エラー処理接続: エラー時の処理フロー
```

#### 3. データマッピング
**データの変換・加工**
```
機能:
□ フィールドのマッピング
□ 数式による計算
□ 条件による値の変更
□ 配列・オブジェクトの操作
```

### 基本的な設定手順

**Step 1: シナリオの作成**
```
1. 新しいシナリオを作成
2. トリガーモジュールを配置
3. 接続先サービスを選択
4. 認証情報を設定
```

**Step 2: フローの構築**
```
1. アクションモジュールを追加
2. モジュール間を接続線で結ぶ
3. データマッピングを設定
4. 条件やフィルターを追加
```

**Step 3: テストと運用**
```
1. テスト実行で動作確認
2. スケジュール設定
3. シナリオを有効化
4. 実行ログの監視
```

---

## 実践的な活用例

### 1. 売上データ統合・分析シナリオ

**処理フロー（視覚的表現）**
```
Salesforce → データ取得
    ↓
Excel → 売上データ処理
    ↓
Router → 条件分岐
    ├─ 高額取引 → Slack通知
    ├─ 通常取引 → Google Sheets記録
    └─ 問題あり → エラー処理
    ↓
AI分析 → ChatGPT
    ↓
レポート生成 → Google Docs
    ↓
配信 → Gmail
```

**詳細設定**

#### Step 1: データ取得
```
Module: Salesforce - Search Records
Object: Opportunity
Filter: CloseDate = Yesterday
Fields: Name, Amount, Stage, Account
```

#### Step 2: データ処理
```
Module: Microsoft Excel - Create Worksheet
Action: 取得したデータを新しいワークシートに挿入
Calculations: 
- SUM関数で合計売上計算
- AVERAGE関数で平均単価計算
- COUNT関数で件数集計
```

#### Step 3: Router（条件分岐）
```
Branch 1: Amount >= 1000000 (高額取引)
Branch 2: Amount >= 100000 AND Amount < 1000000 (通常取引)
Branch 3: Stage = "Closed Lost" (失注案件)
```

#### Step 4: 各分岐の処理
```
高額取引ルート:
Module: Slack - Send Message
Channel: #sales-alerts
Message: 🎉 高額成約！
顧客: {{account_name}}
金額: ¥{{amount}}
担当: {{owner_name}}

通常取引ルート:
Module: Google Sheets - Add Row
Sheet: 日次売上記録
Data: {{date}}, {{account}}, {{amount}}, {{stage}}

失注ルート:
Module: ChatGPT - Analyze
Prompt: "以下の失注案件を分析し、改善提案をしてください：
顧客: {{account_name}}
金額: {{amount}}
失注理由: {{lost_reason}}"
```

### 2. 顧客サポート自動化シナリオ

**処理フロー**
```
Gmail → 新着メール検知
    ↓
ChatGPT → 内容分析
    ↓
Router → 緊急度判定
    ├─ 緊急 → 即時対応フロー
    ├─ 通常 → 標準対応フロー
    └─ 簡単 → 自動回答フロー
    ↓
各種処理実行
    ↓
Aggregator → 結果集約
    ↓
レポート → 管理者に送信
```

**詳細設定**

#### AI分析モジュール
```
Module: OpenAI - Create Chat Completion
System Prompt: "カスタマーサポート担当者として、
以下のメールを分析してください。

【分析項目】
1. 緊急度（緊急/通常/簡単）
2. カテゴリー（技術/請求/一般/クレーム）
3. 推奨対応（即時/24時間以内/自動回答可能）

【出力形式】
JSON形式で返答してください。
{
  'urgency': '緊急度',
  'category': 'カテゴリー',
  'action': '推奨対応',
  'reason': '判断理由'
}"

User Prompt: "件名: {{subject}}
差出人: {{sender}}
内容: {{body}}"
```

#### Router設定
```
Route 1: {{urgency}} = "緊急"
→ 即時対応フロー

Route 2: {{urgency}} = "通常"
→ 標準対応フロー  

Route 3: {{urgency}} = "簡単"
→ 自動回答フロー
```

#### 即時対応フロー
```
Module 1: Slack - Send Message
Channel: #support-urgent
Message: 🚨 緊急対応が必要です
件名: {{subject}}
差出人: {{sender}}
緊急度: {{urgency}}
理由: {{reason}}

Module 2: Gmail - Send Email  
To: {{sender}}
Subject: Re: {{subject}}
Body: お問い合わせいただき、ありがとうございます。
緊急案件として承り、担当者が30分以内にご連絡いたします。
```

### 3. マーケティングオートメーション

**処理フロー**
```
Webhook → リード情報受信
    ↓
CRM → 顧客データ照合
    ↓
Scoring → リードスコア計算
    ↓
Router → スコア判定
    ├─ 高スコア → 営業チーム即時通知
    ├─ 中スコア → ナーチャリングメール
    └─ 低スコア → 教育コンテンツ配信  
    ↓
各種アクション実行
    ↓
Analytics → 効果測定
```

**詳細設定**

#### リードスコア計算
```
Module: Tools - Set Variable
Variables:
- 会社規模スコア: {{company_size}} = "大企業" ? 30 : 
                  {{company_size}} = "中企業" ? 20 : 10
- 役職スコア: {{title}} contains "部長" ? 25 :
            {{title}} contains "課長" ? 20 : 15  
- 業界スコア: {{industry}} = "IT" ? 25 : 15
- 行動スコア: {{page_views}} * 2 + {{download_count}} * 5

Total Score: {{会社規模スコア}} + {{役職スコア}} + {{業界スコア}} + {{行動スコア}}
```

#### 高スコアリード処理
```
Module 1: Salesforce - Create Lead
Data: 全ての受信データをCRMに登録

Module 2: Slack - Send Message
Channel: #sales-hot-leads
Message: 🔥 高品質リードが発生！
会社: {{company}}
担当者: {{name}}
スコア: {{total_score}}点
詳細: {{lead_url}}

Module 3: Gmail - Send Email
To: sales-team@company.com
Subject: 高品質リード通知 - {{company}}
Body: 詳細な営業向け情報を添付
```

---

## 高度なテクニック

### 1. Iterator（繰り返し処理）

**用途**: 配列データを1つずつ処理

**設定例: 複数の顧客データを一括処理**
```
Input: [
  {"name": "田中", "email": "tanaka@example.com"},
  {"name": "佐藤", "email": "sato@example.com"},
  {"name": "鈴木", "email": "suzuki@example.com"}
]

Iterator設定:
Array: {{customers}}

各顧客に対して実行:
Module: Gmail - Send Email
To: {{email}}
Subject: 個別カスタマイズメッセージ
Body: {{name}}様へのパーソナライズコンテンツ
```

### 2. Aggregator（集約処理）

**用途**: 複数の処理結果をまとめる

**設定例: 複数APIの結果を統合**
```
複数のAPI呼び出し結果を集約:

Aggregator設定:
Source Module: API呼び出しモジュール
Structure: 
- api_name: API名
- response_data: レスポンスデータ
- status: ステータス

出力: 全APIの結果をまとめたレポート
```

### 3. Error Handler（エラー処理）

**設定例: 包括的なエラー処理**
```
Main Flow: 通常の処理
    ↓ (エラー発生時)
Error Handler:
    ├─ Slack通知
    ├─ エラーログ記録
    ├─ 管理者メール
    └─ バックアップ処理実行

Error Handler設定:
Directive: Resume (処理を継続)
Module 1: Slack - Send Message
  Message: ⚠️ シナリオエラー
  Details: {{error.message}}
  
Module 2: Google Sheets - Add Row
  Sheet: エラーログ
  Data: {{timestamp}}, {{scenario.name}}, {{error.type}}
```

### 4. 条件付きフィルター

**高度な条件設定例**
```
複合条件:
({{amount}} > 100000 AND {{customer_type}} = "Premium")
OR
({{urgency}} = "High" AND {{department}} = "Sales")

日付条件:
{{created_date}} >= {{addDays(now; -7)}}

配列条件:
{{tags}} contains "VIP" AND length({{purchases}}) > 5

正規表現:
{{email}} matches "^[a-zA-Z0-9._%+-]+@company\.com$"
```

---

## データ変換テクニック

### 1. JSON操作

**JSONデータの加工**
```
Input JSON:
{
  "customer": {
    "name": "田中太郎",
    "orders": [
      {"product": "商品A", "price": 1000},
      {"product": "商品B", "price": 2000}
    ]
  }
}

変換処理:
- 顧客名を取得: {{customer.name}}
- 注文合計を計算: {{sum(customer.orders.price)}}
- 商品リストを作成: {{join(customer.orders.product; ", ")}}
```

### 2. 配列操作

**配列の変換・フィルタリング**
```
Input Array: [
  {"name": "商品A", "price": 1000, "category": "電子機器"},
  {"name": "商品B", "price": 500, "category": "書籍"},
  {"name": "商品C", "price": 2000, "category": "電子機器"}
]

フィルタリング:
{{filter(products; category = "電子機器")}}

マッピング:
{{map(products; name + " - ¥" + price)}}

ソート:
{{sort(products; price)}}
```

### 3. 文字列操作

**テキストデータの加工**
```
正規表現による抽出:
{{replace(text; "/[^0-9]/g"; "")}} // 数字のみ抽出

文字列の結合:
{{name}} + " (" + {{email}} + ")"

条件による文字列生成:
{{if(amount > 10000; "高額"; "通常")}} + "顧客"

日付フォーマット:
{{formatDate(now; "YYYY/MM/DD HH:mm:ss")}}
```

---

## 料金体系とコスト管理

### プラン比較

**Free プラン**
```
料金: 無料
制限: 月1,000オペレーション
シナリオ数: 2個まで
用途: 個人利用・テスト
```

**Core プラン**
```
料金: 月$9
制限: 月10,000オペレーション
シナリオ数: 無制限
機能: 基本機能すべて
```

**Pro プラン**
```
料金: 月$16  
制限: 月10,000オペレーション
機能: 高度な機能、優先サポート
API: カスタムAPI連携
```

**Teams プラン**
```
料金: 月$29
制限: 月10,000オペレーション  
機能: チーム管理、ログ管理
ユーザー: 複数ユーザー対応
```

### オペレーション使用量の最適化

**効率的な使用方法**
```
□ バッチ処理の活用（まとめて処理）
□ 不要なモジュールの削除
□ 条件分岐による処理のスキップ
□ スケジュール実行の調整
□ データ量の事前フィルタリング
```

**使用量監視**
```
定期確認項目:
□ 月間オペレーション使用量
□ シナリオ別の使用状況
□ エラー率の確認
□ 処理時間の分析
```

---

## 監視とメンテナンス

### 実行ログの活用

**ログの確認項目**
```
□ 実行成功率
□ エラーの種類と頻度
□ 処理時間の推移
□ データ量の変化
□ APIレスポンス時間
```

**アラート設定**
```
設定推奨項目:
□ エラー率が10%を超えた場合
□ 処理時間が通常の2倍を超えた場合
□ 月間オペレーション数が上限に近づいた場合
□ 特定のAPIでエラーが連続発生した場合
```

### パフォーマンス最適化

**処理速度向上のポイント**
```
□ 並列処理の活用
□ 不要なデータ変換の削除
□ APIコールの最小化
□ キャッシュの活用
□ バッチサイズの最適化
```

---

## 実践演習

### 演習1: 複雑な条件分岐シナリオ

以下の要件でシナリオを設計してください：

```
【要件】
新規注文データを受信し、以下の条件で処理を分岐：
1. 金額50万円以上 → 営業部長に即時通知
2. 金額10万円以上 → 営業チームに通知
3. 初回注文 → ウェルカムメール送信
4. リピート注文 → ポイント付与処理

【設計項目】
Trigger:
Router条件:
各ルートの処理:
エラーハンドリング:
```

### 演習2: データ変換・集約シナリオ

以下のデータ処理シナリオを設計してください：

```
【要件】
1. 複数のAPIから売上データを取得
2. データを統合・正規化
3. AIで分析・予測
4. 結果をダッシュボードに反映

【設計項目】
データソース:
変換処理:
AI分析内容:
出力形式:
```

---

## まとめ

Make活用の成功要因：

- **視覚的設計**: フローチャートで複雑な処理も直感的に理解
- **高度な条件分岐**: 複雑なビジネスロジックにも対応
- **エラーハンドリング**: 想定外の状況に対する適切な対応
- **継続的最適化**: ログを活用した定期的な改善

次は [Power Automate活用](Power-Automate活用.md) で、Microsoft環境での自動化を学びましょう。

---

## 関連講座

- [業務自動化の考え方](../基礎知識・概念/業務自動化の考え方.md) - 自動化の基本概念
- [Zapier活用](Zapier活用.md) - シンプルな自動化手法
- [Power Automate活用](Power-Automate活用.md) - Microsoft環境での自動化