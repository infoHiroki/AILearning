# Power Automate活用 〜Microsoft環境での企業向け業務自動化〜

**所要時間**: 45分  
**レベル**: 中級  
**前提知識**: [業務自動化の考え方](../基礎知識・概念/業務自動化の考え方.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- Power AutomateとMicrosoft 365の深い連携を活用できる
- 企業のセキュリティ要件に対応したワークフローを構築できる
- AI Builderと連携した高度な自動化を実装できる
- 承認フローやガバナンス機能を適切に設定できる

---

## Power Automateとは

### 基本概念

**Power Automate = Microsoft製品に最適化された企業向け自動化ツール**

**特徴**
- **Microsoft 365との深い統合**: Office製品間のシームレスな連携
- **企業レベルのセキュリティ**: Azure ADとの統合、データ保護
- **AI Builder統合**: ノーコードでAI機能を利用
- **承認ワークフロー**: 企業の意思決定プロセスに対応

### 他ツールとの比較

| 項目 | Power Automate | Zapier | Make |
|------|----------------|--------|------|
| **Microsoft連携** | 最高レベル | 基本的 | 基本的 |
| **企業向け機能** | 充実 | 限定的 | 限定的 |
| **セキュリティ** | 企業レベル | 標準的 | 標準的 |
| **承認フロー** | 標準機能 | 別途必要 | 別途必要 |
| **ガバナンス** | 強力 | 基本的 | 基本的 |

---

## 主要な連携先とできること

### Microsoft 365連携

#### Office アプリケーション
```
Excel Online:
□ ワークブックの自動更新
□ 新規行の検知と処理
□ グラフ・ピボットテーブルの自動生成
□ 複数ワークブック間のデータ同期

Outlook:
□ メール受信トリガー
□ 添付ファイルの自動保存
□ カレンダー予定の自動作成
□ 署名・承認依頼の自動送信

Teams:
□ チャット・チャンネル投稿
□ 会議の自動作成
□ ファイル共有の通知
□ 外部システムとの通知連携

SharePoint:
□ ドキュメント管理の自動化
□ リスト項目の更新検知
□ 承認ワークフローの実装
□ メタデータの自動設定
```

#### Power Platform統合
```
Power Apps:
□ アプリからのデータ送信処理
□ アプリ間のデータ同期
□ 通知・アラート機能

Power BI:
□ データセットの自動更新
□ レポート配信の自動化
□ アラート条件に基づく処理

AI Builder:
□ 文書処理（OCR、フォーム認識）
□ 予測モデルの活用
□ 感情分析・テキスト分類
```

### 外部サービス連携

#### Azure Services
```
Azure SQL Database:
□ データベース操作の自動化
□ データの一括更新
□ バックアップ処理

Azure Logic Apps:
□ 複雑なAPI連携
□ B2B統合
□ エンタープライズパターン

Azure Cognitive Services:
□ 音声・画像認識
□ 自然言語処理
□ 翻訳・要約処理
```

#### 外部API
```
REST API:
□ カスタムコネクタの作成
□ HTTP要求の送信
□ JSON/XMLデータの処理

GraphQL:
□ データクエリの実行
□ リアルタイムデータ取得
```

---

## 実践的な活用例

### 1. 承認ワークフロー自動化

**業務フロー**
```
申請書提出 → 上司承認 → 部長承認 → 経理処理 → 申請者通知
```

**Power Automate設定**

#### 申請トリガー
```
Trigger: SharePoint - When an item is created
List: 経費申請リスト
Conditions: Status = "申請中"
```

#### 承認フロー設定
```
Action: Start and wait for an approval
Approval type: Approve/Reject - First to respond
Title: 経費申請の承認依頼
Details: 
申請者: {{Author.DisplayName}}
金額: {{金額}}
用途: {{使用目的}}
領収書: {{添付ファイル}}

Assigned to: {{申請者.上司}}
```

#### 条件分岐処理
```
Condition: Approval outcome = Approve
Yes branch:
  If 金額 > 100000:
    Action: Start approval (部長承認)
    Assigned to: 部長グループ
  Else:
    Action: SharePoint - Update item
    Status: 承認済み
    
No branch:
  Action: SharePoint - Update item
  Status: 却下
  Action: Send email to applicant  
  Subject: 経費申請が却下されました
```

#### 最終処理
```
Final approval received:
Action 1: SharePoint - Update item
Status: 最終承認済み

Action 2: Excel Online - Add row
Workbook: 会計データ.xlsx
Table: 経費データ
Values: {{申請データ}}

Action 3: Outlook - Send email
To: {{申請者.Email}}
Subject: 経費申請が承認されました
Body: 申請番号{{ID}}の処理が完了しました。
```

### 2. 文書管理自動化（AI Builder活用）

**業務フロー**
```
文書アップロード → AI文書解析 → データ抽出 → システム登録 → 通知
```

**Power Automate設定**

#### 文書アップロードトリガー
```
Trigger: SharePoint - When a file is created
Library: 契約書ライブラリ
File type: PDF, Word, Excel
```

#### AI Builder文書処理
```
Action: AI Builder - Extract information from forms
Form processor model: 契約書フォーム処理モデル
File content: {{File content}}

抽出項目:
□ 契約者名
□ 契約期間
□ 契約金額
□ 開始日・終了日
□ 特記事項
```

#### データ検証・補正
```
Action: Condition
If 信頼度 < 0.8:
  Action: Start approval
  Title: AI抽出結果の確認依頼
  Details: 以下の抽出結果を確認してください
  抽出データ: {{AI抽出結果}}
  Assigned to: 文書管理者
Else:
  Continue to next step
```

#### システム登録
```
Action: Common Data Service - Create record
Entity: 契約情報
Fields:
- 契約者名: {{AI抽出.契約者名}}
- 金額: {{AI抽出.契約金額}}
- 期間: {{AI抽出.契約期間}}
- ファイルパス: {{File path}}
```

#### 関係者通知
```
Action: Teams - Post message
Team: 契約管理チーム
Channel: 一般
Message: 📄 新規契約書が登録されました
契約者: {{契約者名}}
金額: {{契約金額}}
詳細: {{契約詳細URL}}
```

### 3. 営業プロセス自動化

**業務フロー**
```
リード獲得 → スコアリング → CRM登録 → 営業割り当て → フォローアップ
```

**Power Automate設定**

#### リード獲得トリガー
```
Trigger: Microsoft Forms - When a new response is submitted
Form: お問い合わせフォーム
```

#### AI スコアリング
```
Action: AI Builder - Predict
Model: リードスコアリングモデル
Input data:
- 会社規模: {{会社規模}}
- 業界: {{業界}}
- 役職: {{役職}}  
- 予算: {{予算}}
- 導入時期: {{導入時期}}

Output: スコア (0-100)
```

#### Dynamic CRM連携
```
Action: Common Data Service - Create record
Entity: Lead
Fields:
- Name: {{氏名}}
- Company: {{会社名}}
- Email: {{メールアドレス}}
- Lead Score: {{AI予測スコア}}
- Lead Source: Webフォーム
```

#### 営業担当者割り当て
```
Action: Condition
If スコア >= 80:
  Action: Get records (高スコア担当者)
  Entity: User
  Filter: 部署 eq '営業部' and スキルレベル eq '上級'
Else if スコア >= 50:
  Action: Get records (中スコア担当者)  
  Entity: User
  Filter: 部署 eq '営業部' and スキルレベル eq '中級'
```

#### 担当者通知・タスク作成
```
Action: Outlook - Send email
To: {{選択された営業担当者.Email}}
Subject: 新規リード割り当て - {{会社名}}
Body: スコア: {{スコア}}点の高品質リードです
詳細: {{CRMレコードURL}}

Action: Planner - Create task
Plan: 営業タスク管理
Title: {{会社名}} - 初回コンタクト
Assigned to: {{営業担当者}}
Due date: {{3日後}}
```

---

## AI Builder活用

### 1. フォーム処理

**請求書処理の自動化**
```
AI Builder Model: 請求書処理
抽出項目:
□ 請求書番号
□ 請求日
□ 支払期限
□ 請求金額
□ 消費税額  
□ 請求元会社情報

処理フロー:
請求書PDF → AI Builder → Excel記録 → 承認依頼 → 会計システム登録
```

### 2. 予測モデル

**顧客解約予測**
```
Model Input:
□ 利用頻度
□ サポート問い合わせ数
□ 契約期間
□ 支払い遅延履歴
□ 機能利用状況

Model Output:
□ 解約確率 (0-1)
□ 主要要因
□ 推奨アクション

自動化アクション:
解約確率 > 0.7:
- 営業チームに即時通知
- カスタマーサクセス担当にタスク作成
- 特別オファーメール送信
```

### 3. テキスト処理

**顧客フィードバック分析**
```
AI Builder - Text Classification:
Categories:
□ 製品機能
□ サポート品質
□ 価格・コスト
□ その他

Sentiment Analysis:
□ ポジティブ
□ ニュートラル  
□ ネガティブ

処理フロー:
フィードバック受信 → AI分析 → 部門別振り分け → 改善アクション
```

---

## セキュリティとガバナンス

### データ保護

#### Data Loss Prevention (DLP)
```
設定項目:
□ 機密データの検出
□ 外部共有の制限
□ コンプライアンス要件の確保
□ 監査ログの取得

実装例:
Condition: Contains 個人番号 OR Contains クレジットカード番号
Action: Stop flow execution
Notify: セキュリティ管理者に通知
```

#### 接続の管理
```
管理項目:
□ コネクタの利用承認
□ サービスプリンシパルの設定
□ OAuth認証の管理
□ API権限の最小化
```

### アクセス制御

#### Azure AD統合
```
設定機能:
□ 条件付きアクセス
□ 多要素認証
□ デバイス管理
□ 場所ベースアクセス制御

実装例:
Trigger: When a user from outside Japan tries to access
Action: Require additional approval
```

### 監査とコンプライアンス

#### ログ管理
```
記録項目:
□ フロー実行履歴
□ ユーザー操作ログ
□ データアクセス記録
□ エラー・例外処理

保存先:
□ Microsoft 365 Compliance Center
□ Azure Log Analytics
□ Power Platform Admin Center
```

---

## 料金体系とライセンス

### ライセンス種類

**Per User Plan**
```
Power Automate per user:
料金: ユーザーあたり月額1,520円
制限: 無制限フロー実行
機能: 全機能利用可能

Office 365含有:
多くのOffice 365プランに含まれる
制限: 一部高度機能は別ライセンス必要
```

**Per Flow Plan**
```
Power Automate per flow:
料金: フローあたり月額1,210円
制限: 無制限実行
用途: 組織全体で共有するフロー
```

**追加容量**
```
AI Builder Credits:
料金: 100万クレジット/月額6,080円
用途: AI機能の利用

Process Mining:
料金: ユーザーあたり月額4,080円
用途: プロセス分析・最適化
```

### コスト最適化

**効率的な利用方法**
```
□ Office 365含有機能の最大活用
□ フロー実行回数の最適化
□ 不要なトリガーの削除
□ バッチ処理による効率化
□ 条件分岐による処理スキップ
```

---

## 管理とガバナンス

### Center of Excellence (CoE)

#### 管理体制
```
役割分担:
□ Platform Admin: 環境・セキュリティ管理
□ Power Platform Admin: フロー・アプリ管理
□ Business Admin: 業務要件・承認
□ Developer: 開発・メンテナンス
```

#### 標準化
```
標準項目:
□ 命名規則
□ 承認プロセス  
□ エラーハンドリング
□ ドキュメント様式
□ テスト手順
```

### 環境管理

#### 環境戦略
```
環境構成:
□ Production: 本番環境
□ Test: テスト環境
□ Development: 開発環境
□ Sandbox: 実験環境

移行プロセス:
Development → Test → Production
各段階で承認・検証実施
```

---

## 実践演習

### 演習1: 承認ワークフロー設計

以下の要件で承認フローを設計してください：

```
【要件】
契約書承認プロセス:
1. 申請者が契約書をアップロード
2. 直属上司が一次承認
3. 金額に応じて役員承認（100万円以上）
4. 法務部確認（500万円以上）
5. 最終決裁者承認

【設計項目】
トリガー条件:
承認ルート:
条件分岐:
通知設定:
記録・監査:
```

### 演習2: AI Builder連携シナリオ

以下の要件でAI活用フローを設計してください：

```
【要件】
顧客アンケート自動分析:
1. Microsoft Formsでアンケート回収
2. AI Builderで感情・カテゴリ分析
3. 結果をPower BIダッシュボードに反映
4. ネガティブフィードバックは即座に通知

【設計項目】
AI Builder設定:
データ変換:
ダッシュボード連携:
アラート条件:
```

---

## まとめ

Power Automate活用の成功要因：

- **Microsoft 365統合の最大活用**: 既存環境との深い連携
- **企業ガバナンスの実装**: セキュリティ・コンプライアンス要件への対応
- **AI Builder活用**: ノーコードでのAI機能統合
- **継続的な改善**: CoEによる組織的な取り組み

次は [Power Apps開発](../開発・技術/Power-Apps開発.md) で、アプリケーション開発を学びましょう。

---

## 関連講座

- [業務自動化の考え方](../基礎知識・概念/業務自動化の考え方.md) - 自動化の基本概念
- [Power Apps開発](../開発・技術/Power-Apps開発.md) - Microsoft ローコードアプリ開発
- [Zapier活用](Zapier活用.md) - 他の自動化ツールとの比較