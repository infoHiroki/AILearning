# システム連携

**所要時間**: 1時間  
**レベル**: 上級  
**前提知識**: [ワークフロー設計](09-workflow-design.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- 複数システム間の連携アーキテクチャを設計できる
- API連携による自動化システムを構築できる
- エンタープライズレベルのシステム統合を計画できる
- セキュリティ・ガバナンスを考慮した連携を実装できる

## 📋 目次

1. [システム連携の基本概念](#システム連携の基本概念)
2. [API連携アーキテクチャ](#api連携アーキテクチャ)
3. [データ統合・ETL処理](#データ統合etl処理)
4. [リアルタイム連携システム](#リアルタイム連携システム)
5. [セキュリティ・ガバナンス](#セキュリティガバナンス)
6. [エンタープライズ統合](#エンタープライズ統合)
7. [運用・監視・保守](#運用監視保守)

---

## システム連携の基本概念

### 連携パターンの分類

#### 🔗 連携方式の種類
```
【同期連携】リアルタイム処理
├── REST API
├── GraphQL
├── WebSocket
└── RPC（Remote Procedure Call）

【非同期連携】バッチ・イベント処理
├── メッセージキュー（SQS、RabbitMQ）
├── イベントストリーミング（Kafka）
├── ファイル転送（SFTP、FTP）
└── データベース連携

【データ統合】
├── ETL（Extract, Transform, Load）
├── ELT（Extract, Load, Transform）
├── CDC（Change Data Capture）
└── データレイク・ウェアハウス
```

### AIを活用したシステム連携設計

#### 連携設計プロンプト
```
「以下のシステム環境について、最適な連携アーキテクチャを設計してください。

【現状システム構成】
- 基幹システム: [ERP、CRM、会計システム等]
- クラウドサービス: [SaaS、AWS/Azure/GCPサービス]
- データソース: [データベース、ファイル、API等]
- エンドユーザー: [Web、モバイル、デスクトップアプリ]

【連携要件】
1. データ連携要件
   - リアルタイム性: [必要/不要、レスポンス時間]
   - データ量: [1日あたりの処理件数・データサイズ]
   - データ形式: [JSON、XML、CSV、バイナリ等]

2. 機能連携要件
   - 業務プロセス連携: [承認、通知、自動処理等]
   - ユーザー認証・認可: [SSO、権限管理]
   - エラーハンドリング: [再試行、デッドレター処理]

3. 非機能要件
   - 可用性: [稼働率、ダウンタイム許容]
   - 拡張性: [将来的な規模拡大対応]
   - セキュリティ: [暗号化、監査ログ]

【技術制約】
- 利用可能技術: [プログラミング言語、ミドルウェア]
- 予算制約: [初期投資、運用コスト]
- スキル制約: [開発・運用チームのスキルレベル]

【設計項目】
1. アーキテクチャ概要図
2. 連携方式の選定理由
3. データフロー設計
4. セキュリティ・認証設計
5. エラーハンドリング・監視設計
6. 実装計画・段階的導入

実装可能性とコストを考慮した現実的な設計提案をお願いします。」
```

### 連携パターンの選択基準

#### パターン選択マトリックス
```
【リアルタイム性 × データ量による選択】

高リアルタイム × 大量データ
→ イベントストリーミング（Kafka）
→ WebSocket + 負荷分散

高リアルタイム × 少量データ
→ REST API
→ WebSocket

低リアルタイム × 大量データ
→ ETLバッチ処理
→ ファイル転送

低リアルタイム × 少量データ
→ 定期API連携
→ メール・ファイル連携

【コスト × 複雑さによる選択】

低コスト × 低複雑さ
→ 定期ファイル転送
→ 単純API連携

低コスト × 高複雑さ
→ オープンソース活用
→ サーバーレス アーキテクチャ

高コスト × 低複雑さ
→ SaaS統合プラットフォーム
→ iPaaS（Integration Platform as a Service）

高コスト × 高複雑さ
→ フルカスタム開発
→ エンタープライズESB
```

---

## API連携アーキテクチャ

### RESTful API設計

#### API設計プロンプト
```
「以下のビジネス要件を満たすRESTful APIシステムを設計してください。

【ビジネス要件】
- 対象システム: [CRM、在庫管理、決済システム等]
- 主要機能: [顧客管理、商品管理、注文処理等]
- 利用者: [社内システム、パートナー、モバイルアプリ等]

【API要件】
1. 機能要件
   - CRUD操作: [Create、Read、Update、Delete]
   - 検索・フィルタリング機能
   - 一括処理・バッチ操作
   - ファイルアップロード・ダウンロード

2. 非機能要件
   - レスポンス時間: [目標値]
   - スループット: [同時接続数、1秒あたり処理数]
   - 可用性: [稼働率目標]
   - セキュリティ: [認証・認可方式]

【設計項目】
1. APIエンドポイント設計
   - URLパス構造
   - HTTPメソッド定義
   - パラメータ・リクエストボディ
   - レスポンス形式

2. データモデル設計
   - JSON スキーマ定義
   - バリデーションルール
   - エラーレスポンス形式

3. 認証・認可設計
   - 認証方式（JWT、OAuth2.0等）
   - 権限管理・スコープ設計
   - レート制限・スロットリング

4. 運用設計
   - ログ・監視項目
   - バージョニング戦略
   - ドキュメント・テスト仕様

OpenAPI 3.0仕様書も含めて設計してください。」
```

#### AI生成API設計例

##### 顧客管理API設計例
```yaml
openapi: 3.0.0
info:
  title: Customer Management API
  version: 1.0.0
  description: 顧客情報管理システムAPI

servers:
  - url: https://api.company.com/v1
    description: Production server

paths:
  /customers:
    get:
      summary: 顧客一覧取得
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
        - name: search
          in: query
          schema:
            type: string
          description: 顧客名・メールアドレスでの検索
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Customer'
                  pagination:
                    $ref: '#/components/schemas/Pagination'

    post:
      summary: 顧客新規作成
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CustomerCreate'
      responses:
        '201':
          description: 作成成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Customer'
        '400':
          description: バリデーションエラー
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /customers/{id}:
    get:
      summary: 顧客詳細取得
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Customer'
        '404':
          description: 顧客が見つからない

    put:
      summary: 顧客情報更新
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CustomerUpdate'
      responses:
        '200':
          description: 更新成功
        '404':
          description: 顧客が見つからない

    delete:
      summary: 顧客削除
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: 削除成功
        '404':
          description: 顧客が見つからない

components:
  schemas:
    Customer:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
          maxLength: 100
        email:
          type: string
          format: email
        phone:
          type: string
          pattern: '^[0-9\-+()\ ]{10,20}$'
        address:
          $ref: '#/components/schemas/Address'
        created_at:
          type: string
          format: date-time
        updated_at:
          type: string
          format: date-time

    CustomerCreate:
      type: object
      required:
        - name
        - email
      properties:
        name:
          type: string
          maxLength: 100
        email:
          type: string
          format: email
        phone:
          type: string
        address:
          $ref: '#/components/schemas/Address'

    CustomerUpdate:
      type: object
      properties:
        name:
          type: string
          maxLength: 100
        email:
          type: string
          format: email
        phone:
          type: string
        address:
          $ref: '#/components/schemas/Address'

    Address:
      type: object
      properties:
        postal_code:
          type: string
          pattern: '^[0-9]{3}-[0-9]{4}$'
        prefecture:
          type: string
        city:
          type: string
        street:
          type: string

    Pagination:
      type: object
      properties:
        current_page:
          type: integer
        per_page:
          type: integer
        total:
          type: integer
        last_page:
          type: integer

    Error:
      type: object
      properties:
        error:
          type: string
        message:
          type: string
        details:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
              message:
                type: string

  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

security:
  - BearerAuth: []
```

### GraphQL API設計

#### GraphQL スキーマ設計
```
「GraphQLを使った統合APIシステムを設計してください。

【要件】
複数のマイクロサービス（顧客、商品、注文）を統合するGraphQL Gateway

【設計項目】
1. スキーマ設計
   - Type定義
   - Query・Mutation・Subscription
   - リレーション設計

2. リゾルバー設計
   - データソース連携
   - N+1問題対策
   - キャッシュ戦略

3. 認証・認可
   - フィールドレベル認可
   - データレベル認可
   - レート制限

【期待効果】
- 複数API呼び出しの最適化
- フロントエンド開発効率化
- 強い型付けによる品質向上」
```

---

## データ統合・ETL処理

### データパイプライン設計

#### ETL設計プロンプト
```
「以下のデータ統合要件を満たすETLパイプラインを設計してください。

【データソース】
- 基幹システムDB: [PostgreSQL、Oracle等]
- SaaSアプリケーション: [Salesforce、HubSpot等]
- ファイルデータ: [CSV、Excel、JSON等]
- リアルタイムデータ: [IoT、ログ、イベント等]

【データターゲット】
- データウェアハウス: [Snowflake、BigQuery等]
- 分析用DB: [ClickHouse、Amazon Redshift等]
- ダッシュボード: [Tableau、Power BI等]

【処理要件】
1. データ変換
   - 正規化・非正規化
   - データクレンジング
   - 集計・計算処理
   - フォーマット変換

2. 品質管理
   - データ検証・バリデーション
   - 重複除去・一意性チェック
   - 欠損値処理・補完

3. パフォーマンス
   - 大量データ処理（TB級）
   - リアルタイム処理要件
   - バッチ処理最適化

【設計要素】
1. アーキテクチャ設計
   - データフロー図
   - 処理ステップ定義
   - エラーハンドリング

2. 技術選定
   - ETLツール選定（Apache Airflow、dbt等）
   - インフラ選定（クラウド、オンプレ）
   - 監視・アラート設計

3. 運用設計
   - スケジュール管理
   - 再実行・リカバリ処理
   - データ品質監視

実装可能で運用しやすいETLパイプラインを設計してください。」
```

#### AI生成ETL設計例

##### eコマース統合データパイプライン
```python
"""
eコマース統合データパイプライン設計
Apache Airflow + dbt + Snowflake
"""

from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator
from datetime import datetime, timedelta

# デフォルト設定
default_args = {
    'owner': 'data_team',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1),
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=5)
}

# DAG定義
dag = DAG(
    'ecommerce_data_integration',
    default_args=default_args,
    description='EC統合データパイプライン',
    schedule_interval='0 2 * * *',  # 毎日2時実行
    catchup=False,
    tags=['ecommerce', 'etl']
)

# 1. データ抽出タスク
def extract_order_data(**context):
    """注文データ抽出"""
    import pandas as pd
    from sqlalchemy import create_engine
    
    # 基幹システムから注文データ取得
    engine = create_engine('postgresql://user:pass@host:5432/ecommerce')
    
    sql = """
    SELECT 
        order_id,
        customer_id,
        product_id,
        quantity,
        price,
        order_date,
        status
    FROM orders 
    WHERE order_date >= '{{ ds }}' 
    AND order_date < '{{ next_ds }}'
    """
    
    df = pd.read_sql(sql, engine)
    
    # データ品質チェック
    if df.empty:
        raise ValueError("抽出データが空です")
    
    if df['order_id'].duplicated().any():
        raise ValueError("重複する注文IDが存在します")
    
    # Snowflakeに生データ保存
    df.to_sql('raw_orders', 
              create_engine('snowflake://...'), 
              if_exists='append', 
              index=False)
    
    return f"抽出完了: {len(df)} 件"

extract_orders = PythonOperator(
    task_id='extract_orders',
    python_callable=extract_order_data,
    dag=dag
)

def extract_customer_data(**context):
    """顧客データ抽出（SalesforceAPI）"""
    import requests
    import pandas as pd
    
    # Salesforce API設定
    headers = {'Authorization': 'Bearer {{ var.value.salesforce_token }}'}
    
    # 顧客データ取得
    response = requests.get(
        'https://company.salesforce.com/services/data/v52.0/sobjects/Account',
        headers=headers
    )
    
    if response.status_code != 200:
        raise Exception(f"Salesforce API エラー: {response.status_code}")
    
    # データ変換・保存処理
    # ...

extract_customers = PythonOperator(
    task_id='extract_customers',
    python_callable=extract_customer_data,
    dag=dag
)

# 2. データ変換タスク（dbt）
transform_data = BashOperator(
    task_id='transform_data',
    bash_command='cd /opt/dbt && dbt run --profiles-dir /opt/dbt/profiles',
    dag=dag
)

# 3. データ品質チェック
data_quality_check = BashOperator(
    task_id='data_quality_check',
    bash_command='cd /opt/dbt && dbt test --profiles-dir /opt/dbt/profiles',
    dag=dag
)

# 4. 集計テーブル更新
update_aggregates = SnowflakeOperator(
    task_id='update_aggregates',
    sql="""
    -- 日次売上集計
    MERGE INTO daily_sales_summary AS target
    USING (
        SELECT 
            DATE(order_date) as sales_date,
            COUNT(*) as order_count,
            SUM(quantity * price) as total_sales,
            COUNT(DISTINCT customer_id) as unique_customers
        FROM processed_orders 
        WHERE DATE(order_date) = '{{ ds }}'
        GROUP BY DATE(order_date)
    ) AS source
    ON target.sales_date = source.sales_date
    WHEN MATCHED THEN 
        UPDATE SET 
            order_count = source.order_count,
            total_sales = source.total_sales,
            unique_customers = source.unique_customers
    WHEN NOT MATCHED THEN 
        INSERT (sales_date, order_count, total_sales, unique_customers)
        VALUES (source.sales_date, source.order_count, source.total_sales, source.unique_customers);
    """,
    snowflake_conn_id='snowflake_default',
    dag=dag
)

# 5. 通知タスク
def send_completion_notification(**context):
    """処理完了通知"""
    import smtplib
    from email.mime.text import MIMEText
    
    # 処理結果サマリー取得
    # ...
    
    # Slack通知
    # ...
    
    print("ETL処理完了通知を送信しました")

notify_completion = PythonOperator(
    task_id='notify_completion',
    python_callable=send_completion_notification,
    dag=dag
)

# タスク依存関係
[extract_orders, extract_customers] >> transform_data >> data_quality_check >> update_aggregates >> notify_completion
```

### リアルタイムデータ処理

#### ストリーミング処理設計
```
「リアルタイムデータ処理システムを設計してください。

【用途】
ECサイトのリアルタイム分析・レコメンデーション

【データストリーム】
- ユーザー行動ログ（クリック、閲覧、購入）
- 在庫変動データ
- 価格変更イベント
- 外部データ（天気、イベント情報）

【処理要件】
1. リアルタイム分析
   - 同時接続ユーザー数
   - 売上リアルタイム集計
   - 異常検知・アラート

2. パーソナライゼーション
   - リアルタイムレコメンデーション
   - 動的価格調整
   - 在庫最適化

【技術スタック】
- Apache Kafka：メッセージストリーミング
- Apache Flink：ストリーム処理
- Redis：リアルタイムキャッシュ
- Elasticsearch：リアルタイム検索

実装方法と運用監視の仕組みを含めて設計してください。」
```

---

## リアルタイム連携システム

### WebSocket・Server-Sent Events

#### リアルタイム通信設計
```
「ビジネス用リアルタイム通信システムを設計してください。

【用途】
- ダッシュボードのリアルタイム更新
- チャット・コラボレーション機能
- 通知・アラートシステム
- ライブデータ監視

【要件】
1. 接続管理
   - 同時接続数：10,000+
   - 接続認証・認可
   - 接続状態管理・再接続

2. メッセージング
   - ブロードキャスト・ユニキャスト
   - チャンネル・ルーム機能
   - メッセージ永続化・履歴

3. スケーラビリティ
   - 水平スケーリング
   - 負荷分散・フェイルオーバー
   - クラスター間通信

【技術選択】
WebSocket vs Server-Sent Events vs WebRTC
の比較と選択基準も含めて設計してください。」
```

### イベント駆動アーキテクチャ

#### Event Sourcing設計
```
「イベント駆動型の業務システムを設計してください。

【対象業務】
注文処理システム（在庫確認→決済→配送手配）

【イベント設計】
1. ドメインイベント
   - OrderCreated（注文作成）
   - PaymentProcessed（決済処理）
   - InventoryReserved（在庫引当）
   - ShippingArranged（配送手配）

2. イベントストア
   - イベント永続化方式
   - スナップショット戦略
   - リプレイ・復旧機能

3. イベントハンドラ
   - 非同期処理
   - 冪等性保証
   - エラーハンドリング

【メリット】
- システム間疎結合
- 監査ログ自動生成
- 時間軸での状態再現
- スケーラビリティ

実装パターンとベストプラクティスを含めて設計してください。」
```

---

## セキュリティ・ガバナンス

### API セキュリティ

#### セキュリティ設計プロンプト
```
「エンタープライズレベルのAPIセキュリティ体系を設計してください。

【セキュリティ要件】
1. 認証・認可
   - OAuth 2.0 / OpenID Connect
   - JWT トークン管理
   - Multi-Factor Authentication
   - Role-Based Access Control (RBAC)

2. 通信セキュリティ
   - TLS 1.3 強制
   - Certificate Pinning
   - API キー管理
   - レート制限・DDoS対策

3. データ保護
   - 機密データマスキング
   - 暗号化（保存時・転送時）
   - データ分類・ラベリング
   - 監査ログ・追跡

【コンプライアンス】
- GDPR（データ保護規則）
- SOX法（内部統制）
- PCI DSS（決済情報保護）
- ISO 27001（情報セキュリティ）

【実装要素】
1. API Gateway設定
   - 認証・認可ポリシー
   - レート制限・スロットリング
   - ログ・監視設定

2. セキュリティミドルウェア
   - 入力値検証・サニタイゼーション
   - SQLインジェクション対策
   - XSS・CSRF対策

3. 監視・検知
   - 異常アクセス検知
   - リアルタイムアラート
   - セキュリティインシデント対応

実装可能で運用しやすいセキュリティ設計を提案してください。」
```

### データガバナンス

#### データ管理体制設計
```
「組織のデータガバナンス体制を構築してください。

【ガバナンス項目】
1. データ品質管理
   - データ品質指標（完全性、正確性、一意性）
   - 品質監視・アラート
   - データクレンジング・修正プロセス

2. データライフサイクル管理
   - データ保持期間ポリシー
   - アーカイブ・削除ルール
   - バックアップ・復旧戦略

3. アクセス制御・プライバシー
   - データ分類・機密レベル設定
   - アクセス権限管理
   - 個人情報保護・匿名化

【組織体制】
- データオーナー：ビジネス責任者
- データスチュワード：日常管理者
- データアーキテクト：技術設計者
- データプライバシーオフィサー：プライバシー責任者

【技術基盤】
- データカタログ：メタデータ管理
- 系譜管理：データフロー可視化
- 品質監視：自動化ツール
- アクセス制御：認証・認可システム

実践的で継続可能なガバナンス体制を提案してください。」
```

---

## エンタープライズ統合

### Enterprise Service Bus (ESB)

#### ESB アーキテクチャ設計
```
「大企業向けのエンタープライズ統合基盤を設計してください。

【統合対象システム】
- 基幹システム（ERP、HRM、財務）
- 部門システム（営業、製造、物流）
- 外部システム（取引先、金融機関、官公庁）
- クラウドサービス（SaaS、PaaS）

【統合パターン】
1. メッセージング統合
   - Point-to-Point
   - Publish-Subscribe
   - Request-Reply
   - Message Router

2. データ統合
   - Master Data Management (MDM)
   - Data Virtualization
   - Change Data Capture (CDC)
   - Event Sourcing

3. プロセス統合
   - Business Process Management (BPM)
   - Workflow Orchestration
   - Service Choreography
   - Human Task Management

【非機能要件】
- 高可用性：99.9%以上
- 性能：1秒間に10,000メッセージ処理
- セキュリティ：エンドツーエンド暗号化
- 運用性：24/7監視・自動復旧

【技術選定】
- ESB製品：MuleSoft、IBM Integration Bus、WSO2 ESB
- メッセージング：Apache Kafka、IBM MQ、RabbitMQ
- オーケストレーション：Apache Camel、Spring Integration

企業規模に応じた段階的導入計画も含めて設計してください。」
```

### マイクロサービス統合

#### サービスメッシュ設計
```
「マイクロサービス環境のサービスメッシュを設計してください。

【マイクロサービス構成】
- ユーザー管理サービス
- 商品管理サービス
- 注文処理サービス
- 決済サービス
- 通知サービス

【サービスメッシュ機能】
1. トラフィック管理
   - Load Balancing
   - Circuit Breaker
   - Retry Policy
   - Traffic Splitting (Canary Deployment)

2. セキュリティ
   - mTLS（相互TLS認証）
   - Service-to-Service認証
   - ポリシーベースアクセス制御
   - セキュリティポリシー管理

3. 可観測性
   - 分散トレーシング
   - メトリクス収集
   - ログ集約
   - サービス依存関係可視化

【技術スタック】
- サービスメッシュ：Istio、Linkerd、Consul Connect
- オーケストレーション：Kubernetes
- 監視：Prometheus、Grafana、Jaeger
- ログ：ELK Stack、Fluentd

実装・運用・トラブルシューティングの観点も含めて設計してください。」
```

---

## 運用・監視・保守

### 統合監視システム

#### 監視・アラート設計
```
「システム連携の統合監視システムを構築してください。

【監視対象】
1. インフラ監視
   - サーバー・ネットワーク・ストレージ
   - クラウドリソース使用率
   - パフォーマンスメトリクス

2. アプリケーション監視
   - API レスポンス時間・エラー率
   - トランザクション追跡
   - ビジネスメトリクス

3. データ統合監視
   - ETL処理状況・エラー
   - データ品質・整合性
   - データフロー可視化

【アラート設計】
1. 重要度レベル
   - Critical：即座対応必要
   - Warning：注意監視必要
   - Info：参考情報

2. 通知チャネル
   - メール・SMS・電話
   - Slack・Teams
   - PagerDuty・OpsGenie

3. エスカレーション
   - 未対応時の自動エスカレーション
   - オンコール体制・ローテーション
   - インシデント管理プロセス

【技術構成】
- 監視ツール：Prometheus、Grafana、Datadog
- ログ管理：ELK Stack、Splunk
- APM：New Relic、Dynatrace、AppDynamics
- インシデント管理：PagerDuty、ServiceNow

運用チームが効率的に使える監視システムを設計してください。」
```

### 障害対応・復旧

#### インシデント管理
```
「システム連携障害の対応・復旧プロセスを策定してください。

【障害分類】
1. 連携停止
   - API接続エラー
   - ネットワーク障害
   - システムダウン

2. データ不整合
   - 同期エラー
   - 重複・欠損
   - タイムラグ

3. パフォーマンス劣化
   - レスポンス遅延
   - スループット低下
   - リソース枯渇

【対応手順】
1. 検知・通知（5分以内）
   - 自動監視システム
   - アラート通知
   - 初動チーム招集

2. 影響範囲特定（15分以内）
   - 関連システム確認
   - ビジネス影響評価
   - ステークホルダー通知

3. 応急対応（30分以内）
   - 緊急回避措置
   - 手動運用切り替え
   - データ保護

4. 根本原因調査・恒久対策
   - ログ・証跡分析
   - 再発防止策検討
   - システム改善実装

【復旧戦略】
- RTO（Recovery Time Objective）：目標復旧時間
- RPO（Recovery Point Objective）：目標復旧ポイント
- バックアップ・レプリケーション戦略
- フェイルオーバー・フェイルバック手順

【事後対応】
- ポストモーテム（振り返り）
- インシデントレポート作成
- 改善アクション実装
- 運用手順アップデート

実践的で実行可能な障害対応プロセスを策定してください。」
```

---

## 💡 実践演習

### 演習1: API連携アーキテクチャ設計

以下の要件でAPI連携システムを設計してください：

```
【要件】
- 既存CRMシステムと新しいマーケティングオートメーションツールの連携
- 顧客データの双方向同期
- リアルタイム性：15分以内の同期
- データ量：1日1万件の更新

【設計項目】
1. 連携方式の選定:
2. API設計（エンドポイント・データ形式）:
3. セキュリティ設計:
4. エラーハンドリング:
5. 監視・アラート:
```

### 演習2: ETLパイプライン設計

データ統合システムを設計してください：

```
【シナリオ】
複数店舗の売上データを統合して、リアルタイムダッシュボードを構築

【データソース】
- 各店舗のPOSシステム（5店舗）
- ECサイトの売上データ
- 在庫管理システム

【設計内容】
1. データフロー設計:
2. 変換ロジック:
3. 品質チェック項目:
4. スケジュール・実行方式:
5. 障害時の対応:
```

### 演習3: システム統合計画

あなたの組織のシステム統合を計画してください：

```
【現状システム】
[あなたの組織の既存システムを列挙]

【統合目標】
[達成したい業務改善・効率化]

【統合計画】
1. 優先順位・段階的アプローチ:
2. 技術アーキテクチャ:
3. セキュリティ・ガバナンス:
4. 実装スケジュール:
5. リスク・対策:
```

---

## 📚 参考資料

### システム統合・API設計
- RESTful API 設計ガイド
- マイクロサービスアーキテクチャ
- エンタープライズ統合パターン

### データ統合・ETL
- データパイプライン設計原則
- Apache Airflow実践ガイド
- データ品質管理ベストプラクティス

---

## ✅ 理解度確認

この講座の内容を理解できたか、以下で確認してください：

1. 複数システム間の連携アーキテクチャを設計できますか？
2. API連携による自動化システムを構築できますか？
3. データ統合・ETL処理を実装できますか？
4. リアルタイム連携システムを設計できますか？
5. セキュリティ・ガバナンスを考慮した設計ができますか？
6. エンタープライズレベルの統合を計画できますか？
7. 運用・監視・保守の仕組みを構築できますか？

すべて「はい」なら次の講座に進めます。

---

**次の講座**: [チーム展開](11-team-deployment.md)

<!-- 動画埋め込み用プレースホルダー -->
<!-- VIDEO: system-integration-overview.mp4 -->
<!-- VIDEO: api-architecture-design.mp4 -->
<!-- VIDEO: etl-pipeline-construction.mp4 -->
<!-- VIDEO: realtime-integration.mp4 -->
<!-- VIDEO: enterprise-integration.mp4 -->