# JSON活用基礎とAPI連携

**所要時間**: 45分  
**レベル**: 基礎  
**前提知識**: [HTML基礎](07-html-basics.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- JSONの基本構造と記法を完全に理解できる
- AIとの対話でJSONフォーマットを効果的に活用できる
- API連携でのJSON処理を実装できる
- JSONデータの変換・操作・検証ができる

## 📋 目次

1. [JSONとは](#jsonとは)
2. [JSON基本構文とデータ型](#json基本構文とデータ型)
3. [AIとの対話でのJSON活用](#aiとの対話でのjson活用)
4. [API連携とJSONデータ処理](#api連携とjsonデータ処理)
5. [実践的なJSON活用パターン](#実践的なjson活用パターン)

---

## JSONとは

### 🤔 JSONの特徴と重要性

**JSON**（JavaScript Object Notation）は、軽量なデータシリアライゼーション形式で、現代のWeb開発とAPI通信の標準フォーマットです。

#### JSONの主な特徴
```
✅ 軽量で高速
✅ 人間にとって読みやすい
✅ 多くのプログラミング言語でサポート
✅ JavaScriptネイティブ対応
✅ API通信の事実上の標準
```

#### AI時代におけるJSONの価値
- **API連携**: AI APIとの通信で必須
- **データ交換**: 異なるシステム間でのデータ受け渡し
- **設定管理**: 柔軟な設定ファイル形式
- **構造化指示**: AIに対する複雑な指示の構造化

### 🔄 JSON vs XML vs YAML vs CSV

| 特徴 | JSON | XML | YAML | CSV |
|------|------|-----|------|-----|
| **可読性** | 高い | 中程度 | 非常に高い | 低い |
| **サイズ** | 小さい | 大きい | 小さい | 最小 |
| **構造化** | 優秀 | 優秀 | 優秀 | 制限的 |
| **API使用** | 標準 | 減少傾向 | 少ない | 特殊用途 |
| **学習コスト** | 低い | 高い | 低い | 最低 |

#### 使い分けの指針
```
JSON を選ぶべき場面:
✅ API通信
✅ Web アプリケーション
✅ リアルタイムデータ交換
✅ モバイルアプリ
✅ AI・機械学習データ

XML を選ぶべき場面:
- レガシーシステム
- 厳密なスキーマ検証が必要
- SOAP API
- 文書構造が複雑

YAML を選ぶべき場面:
- 設定ファイル
- DevOps (Docker, Kubernetes)
- ドキュメント
- 人間が頻繁に編集

CSV を選ぶべき場面:
- 表形式データ
- Excel連携
- 大量データの単純な交換
- 統計分析
```

---

## JSON基本構文とデータ型

### 📝 基本構造

#### 最小限のJSON
```json
{
  "message": "Hello, JSON!"
}
```

#### 完全なJSON例
```json
{
  "company": {
    "name": "テクノロジー株式会社",
    "founded": 2020,
    "employees": 150,
    "public": false,
    "revenue": null,
    "departments": [
      {
        "name": "開発部",
        "head": "田中太郎",
        "members": 45,
        "technologies": ["JavaScript", "Python", "Go"],
        "projects": [
          {
            "id": "PRJ001",
            "name": "AI チャットボット",
            "status": "active",
            "startDate": "2024-01-15",
            "budget": 5000000,
            "team": {
              "pm": "佐藤花子",
              "developers": ["鈴木次郎", "高橋美咲"],
              "testers": ["伊藤健太"]
            },
            "milestones": [
              {
                "phase": "設計",
                "dueDate": "2024-02-28",
                "completed": true
              },
              {
                "phase": "開発",
                "dueDate": "2024-04-30",
                "completed": false
              }
            ]
          }
        ]
      },
      {
        "name": "営業部",
        "head": "山田花子",
        "members": 25,
        "targets": {
          "quarterly": 100000000,
          "annual": 400000000
        }
      }
    ],
    "contact": {
      "address": {
        "postalCode": "100-0001",
        "prefecture": "東京都",
        "city": "千代田区",
        "street": "千代田1-1-1"
      },
      "phone": "+81-3-1234-5678",
      "email": "info@techcorp.co.jp",
      "website": "https://www.techcorp.co.jp"
    }
  }
}
```

### 🎯 JSONデータ型

#### 1. 文字列（String）
```json
{
  "text": "これは文字列です",
  "multiline": "改行文字を含む\n文字列",
  "unicode": "日本語 🚀 Emoji",
  "escaped": "引用符\"やバックスラッシュ\\を含む",
  "empty": ""
}
```

#### 2. 数値（Number）
```json
{
  "integer": 42,
  "negative": -17,
  "decimal": 3.14159,
  "scientific": 1.23e-4,
  "zero": 0,
  "price": 1234.56
}
```

#### 3. 真偽値（Boolean）
```json
{
  "isActive": true,
  "isDeleted": false,
  "hasPermission": true
}
```

#### 4. null値
```json
{
  "optionalField": null,
  "deletedAt": null,
  "middleName": null
}
```

#### 5. 配列（Array）
```json
{
  "numbers": [1, 2, 3, 4, 5],
  "strings": ["apple", "banana", "cherry"],
  "mixed": [1, "text", true, null],
  "nested": [
    [1, 2],
    [3, 4],
    [5, 6]
  ],
  "objects": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ],
  "empty": []
}
```

#### 6. オブジェクト（Object）
```json
{
  "user": {
    "id": 123,
    "profile": {
      "name": "田中太郎",
      "age": 30,
      "address": {
        "country": "Japan",
        "city": "Tokyo"
      }
    },
    "preferences": {
      "theme": "dark",
      "language": "ja",
      "notifications": {
        "email": true,
        "push": false,
        "sms": null
      }
    }
  },
  "emptyObject": {}
}
```

### ⚠️ JSON構文規則

#### 必須のルール
```json
// ❌ 間違った書き方
{
  name: "田中太郎",           // キーにクォートがない
  'age': 30,                // シングルクォート使用
  "skills": ["JS", "Python",], // 末尾のカンマ
  "isActive": True,         // 大文字のTrue
  "comment": undefined      // undefined使用
}

// ✅ 正しい書き方
{
  "name": "田中太郎",
  "age": 30,
  "skills": ["JS", "Python"],
  "isActive": true,
  "comment": null
}
```

#### 重要な制約
```
1. 文字列は必ずダブルクォート（"）で囲む
2. キー名も必ずダブルクォートで囲む
3. 末尾のカンマは禁止
4. コメントは使用不可
5. undefined、function、Symbolは使用不可
6. 日付はISO 8601文字列形式で表現
7. 循環参照は不可
```

---

## AIとの対話でのJSON活用

### 🎯 構造化データ生成の指示

#### 顧客データ生成の例
```
以下のJSON構造に従って、架空の顧客データを5件生成してください：

{
  "customers": [
    {
      "id": "顧客ID（6桁の数字）",
      "personal": {
        "name": {
          "first": "名前",
          "last": "苗字",
          "full": "フルネーム"
        },
        "age": "年齢（20-70の範囲）",
        "gender": "male | female | other",
        "email": "メールアドレス",
        "phone": "電話番号（日本の形式）"
      },
      "address": {
        "postalCode": "郵便番号",
        "prefecture": "都道府県",
        "city": "市区町村",
        "street": "住所詳細"
      },
      "business": {
        "company": "会社名",
        "department": "部署",
        "position": "役職",
        "industry": "業界"
      },
      "purchasing": {
        "totalSpent": "累計購入金額",
        "orderCount": "注文回数",
        "lastOrderDate": "最終注文日（YYYY-MM-DD形式）",
        "favoriteCategories": ["好きなカテゴリの配列"],
        "loyaltyLevel": "bronze | silver | gold | platinum"
      },
      "preferences": {
        "communication": {
          "email": "メール受信可否（boolean）",
          "sms": "SMS受信可否（boolean）",
          "phone": "電話連絡可否（boolean）"
        },
        "interests": ["興味のあるトピックの配列"],
        "language": "ja | en",
        "timezone": "Asia/Tokyo"
      },
      "metadata": {
        "createdAt": "登録日時（ISO 8601形式）",
        "updatedAt": "更新日時（ISO 8601形式）",
        "source": "登録経路（website | mobile | store | referral）",
        "status": "active | inactive | suspended"
      }
    }
  ]
}

条件:
- 日本人らしい名前を使用
- 実在する住所（都道府県・市区町村レベル）
- ビジネスメールアドレス形式
- リアルな業界・職種の組み合わせ
- 購入履歴は現実的な範囲で設定
- 各顧客で多様性を持たせる

出力: 上記構造に従った完全なJSONデータ
```

#### 商品カタログ生成の指示
```
ECサイト用の商品カタログをJSON形式で生成してください：

{
  "catalog": {
    "metadata": {
      "version": "1.0",
      "lastUpdated": "更新日時",
      "totalProducts": "商品総数",
      "categories": ["カテゴリ一覧"]
    },
    "products": [
      {
        "id": "商品ID",
        "sku": "SKUコード",
        "name": "商品名",
        "description": {
          "short": "短い説明（50文字以内）",
          "long": "詳細説明（200文字程度）",
          "features": ["特徴の配列"],
          "specifications": {
            "dimension": "サイズ情報",
            "weight": "重量",
            "material": "材質",
            "color": "色",
            "customFields": {}
          }
        },
        "pricing": {
          "regular": "通常価格",
          "sale": "セール価格（あれば）",
          "currency": "JPY",
          "taxIncluded": "税込み可否（boolean）"
        },
        "inventory": {
          "inStock": "在庫あり（boolean）",
          "quantity": "在庫数",
          "reserved": "予約済み数",
          "warehouse": "倉庫名"
        },
        "category": {
          "primary": "メインカテゴリ",
          "secondary": "サブカテゴリ",
          "tags": ["タグの配列"]
        },
        "media": {
          "images": [
            {
              "url": "画像URL",
              "alt": "alt テキスト",
              "type": "main | thumbnail | detail"
            }
          ],
          "videos": [
            {
              "url": "動画URL",
              "thumbnail": "サムネイルURL",
              "duration": "再生時間（秒）"
            }
          ]
        },
        "seo": {
          "title": "SEOタイトル",
          "description": "SEO説明文",
          "keywords": ["SEOキーワード配列"],
          "slug": "URL スラッグ"
        },
        "vendor": {
          "name": "メーカー名",
          "code": "メーカーコード",
          "contact": "連絡先"
        },
        "shipping": {
          "weight": "配送重量",
          "dimensions": {
            "length": "長さ",
            "width": "幅",
            "height": "高さ"
          },
          "freeShipping": "送料無料（boolean）",
          "restrictions": ["配送制限の配列"]
        },
        "status": "active | inactive | discontinued",
        "createdAt": "作成日時",
        "updatedAt": "更新日時"
      }
    ]
  }
}

要件:
- 電子機器、家具、衣類から各2-3商品
- 現実的な価格設定
- 詳細な商品情報
- SEO対応
- 多様な在庫状況
```

### 📊 データ分析結果の構造化

#### 分析レポートのJSON出力指示
```
売上データ分析の結果を以下のJSON構造で出力してください：

{
  "report": {
    "metadata": {
      "reportId": "レポートID",
      "title": "売上分析レポート",
      "period": {
        "start": "開始日",
        "end": "終了日",
        "type": "monthly | quarterly | yearly"
      },
      "generatedAt": "生成日時",
      "generatedBy": "作成者",
      "version": "1.0"
    },
    "summary": {
      "totalSales": "総売上",
      "totalOrders": "注文件数",
      "averageOrderValue": "平均注文金額",
      "uniqueCustomers": "ユニーク顧客数",
      "growthRates": {
        "salesGrowth": "売上成長率（%）",
        "orderGrowth": "注文成長率（%）",
        "customerGrowth": "顧客成長率（%）"
      }
    },
    "breakdowns": {
      "byTime": [
        {
          "period": "期間（月/週/日）",
          "sales": "売上",
          "orders": "注文数",
          "customers": "顧客数",
          "aov": "平均注文金額"
        }
      ],
      "byProduct": [
        {
          "productId": "商品ID",
          "productName": "商品名",
          "sales": "売上",
          "quantity": "販売数",
          "revenue": "収益",
          "margin": "利益率"
        }
      ],
      "byCategory": [
        {
          "category": "カテゴリ名",
          "sales": "売上",
          "percentage": "構成比",
          "growth": "前期比成長率"
        }
      ],
      "byRegion": [
        {
          "region": "地域名",
          "sales": "売上",
          "orders": "注文数",
          "avgOrderValue": "平均注文金額"
        }
      ]
    },
    "insights": [
      {
        "type": "trend | opportunity | concern",
        "title": "インサイトタイトル",
        "description": "詳細説明",
        "impact": "high | medium | low",
        "recommendation": "推奨アクション"
      }
    ],
    "forecasts": {
      "nextPeriod": {
        "predictedSales": "予測売上",
        "confidence": "信頼度（%）",
        "factors": ["予測根拠の配列"]
      },
      "scenarios": [
        {
          "name": "楽観シナリオ",
          "sales": "予測売上",
          "probability": "確率（%）"
        },
        {
          "name": "現実的シナリオ",
          "sales": "予測売上",
          "probability": "確率（%）"
        },
        {
          "name": "悲観シナリオ",
          "sales": "予測売上",
          "probability": "確率（%）"
        }
      ]
    },
    "recommendations": [
      {
        "priority": "high | medium | low",
        "action": "推奨アクション",
        "expectedImpact": "期待される効果",
        "timeline": "実施期間",
        "resources": "必要リソース"
      }
    ]
  }
}

分析対象データ:
- 期間: 2024年1-6月
- 総売上: 12,450,000円
- 注文件数: 892件
- 主要商品: PC（40%）、周辺機器（35%）、ソフトウェア（25%）
- 地域別: 東京（45%）、大阪（25%）、その他（30%）
- 前年同期比: +15%成長

このデータを基に、上記JSON構造に従った完全な分析レポートを生成してください。
```

### 🔧 API設定・プロンプトテンプレート

#### プロンプトテンプレートのJSON設計
```json
{
  "promptTemplates": {
    "metadata": {
      "version": "2.1",
      "lastUpdated": "2024-03-15T10:30:00Z",
      "author": "AI Team",
      "description": "業務用プロンプトテンプレート集"
    },
    "categories": {
      "document": {
        "name": "文書作成",
        "description": "各種文書の作成支援",
        "templates": [
          {
            "id": "email_business",
            "name": "ビジネスメール作成",
            "description": "フォーマルなビジネスメール生成",
            "parameters": [
              {
                "name": "recipient",
                "type": "string",
                "required": true,
                "description": "受信者名"
              },
              {
                "name": "purpose",
                "type": "string",
                "required": true,
                "description": "メールの目的"
              },
              {
                "name": "tone",
                "type": "enum",
                "values": ["formal", "casual", "urgent"],
                "default": "formal",
                "description": "文体"
              },
              {
                "name": "includeAttachment",
                "type": "boolean",
                "default": false,
                "description": "添付ファイル言及の有無"
              }
            ],
            "prompt": "以下の条件でビジネスメールを作成してください：\n\n受信者: {{recipient}}\n目的: {{purpose}}\n文体: {{tone}}\n{{#if includeAttachment}}添付ファイルについても言及してください。{{/if}}\n\n件名と本文を含む完全なメールを作成してください。日本のビジネスマナーに従い、適切な敬語を使用してください。",
            "outputFormat": "email",
            "tags": ["business", "communication", "email"],
            "usageCount": 1247,
            "rating": 4.8
          },
          {
            "id": "report_summary",
            "name": "レポート要約",
            "description": "長文レポートの要約生成",
            "parameters": [
              {
                "name": "document",
                "type": "text",
                "required": true,
                "description": "要約対象の文書"
              },
              {
                "name": "maxLength",
                "type": "number",
                "default": 300,
                "min": 100,
                "max": 1000,
                "description": "要約の最大文字数"
              },
              {
                "name": "format",
                "type": "enum",
                "values": ["paragraph", "bullets", "executive"],
                "default": "paragraph",
                "description": "要約形式"
              },
              {
                "name": "audience",
                "type": "enum",
                "values": ["executives", "technical", "general"],
                "default": "general",
                "description": "対象読者"
              }
            ],
            "prompt": "以下の文書を{{maxLength}}文字以内で要約してください：\n\n{{document}}\n\n要約形式: {{format}}\n対象読者: {{audience}}\n\n{{#if format === 'bullets'}}箇条書き形式で重要なポイントを整理してください。{{/if}}{{#if format === 'executive'}}経営層向けのエグゼクティブサマリーとして作成してください。{{/if}}",
            "outputFormat": "text",
            "tags": ["analysis", "summary", "report"],
            "usageCount": 892,
            "rating": 4.6
          }
        ]
      },
      "analysis": {
        "name": "データ分析",
        "description": "データ分析・可視化支援",
        "templates": [
          {
            "id": "data_insight",
            "name": "データインサイト抽出",
            "description": "データから洞察を抽出",
            "parameters": [
              {
                "name": "data",
                "type": "text",
                "required": true,
                "description": "分析対象データ（CSV/JSON/表形式）"
              },
              {
                "name": "analysisType",
                "type": "array",
                "items": {
                  "type": "enum",
                  "values": ["trend", "correlation", "anomaly", "distribution", "comparison"]
                },
                "default": ["trend", "correlation"],
                "description": "分析タイプ"
              },
              {
                "name": "businessContext",
                "type": "string",
                "description": "ビジネス文脈・背景"
              }
            ],
            "prompt": "以下のデータを分析し、ビジネスインサイトを抽出してください：\n\n{{data}}\n\n分析タイプ: {{analysisType}}\n{{#if businessContext}}ビジネス文脈: {{businessContext}}{{/if}}\n\n以下の観点で分析してください：\n1. 主要な傾向・パターン\n2. 注目すべき異常値や変化点\n3. ビジネスへの影響・示唆\n4. 推奨アクション\n\n結果は構造化して提示してください。",
            "outputFormat": "structured",
            "tags": ["analysis", "business", "insights"],
            "usageCount": 634,
            "rating": 4.7
          }
        ]
      }
    },
    "customFields": {
      "companySpecific": {
        "companyName": "株式会社サンプル",
        "industry": "IT",
        "commonTerms": ["DX", "AI活用", "業務効率化"],
        "styleGuide": {
          "tone": "professional",
          "perspective": "customer-focused",
          "brandVoice": "innovative yet approachable"
        }
      }
    },
    "usage": {
      "totalExecutions": 2773,
      "avgRating": 4.7,
      "topCategories": ["document", "analysis", "communication"],
      "monthlyGrowth": "+23%"
    }
  }
}
```

---

## API連携とJSONデータ処理

### 🌐 REST API との JSON通信

#### API リクエスト・レスポンスの例
```javascript
// OpenAI API の例
const apiRequest = {
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "あなたは優秀なビジネスアナリストです。"
    },
    {
      "role": "user",
      "content": "2024年第1四半期の売上データを分析してください。"
    }
  ],
  "max_tokens": 1500,
  "temperature": 0.7,
  "top_p": 1.0,
  "frequency_penalty": 0.0,
  "presence_penalty": 0.0
};

// APIレスポンス例
const apiResponse = {
  "id": "chatcmpl-8YJKLMNOPqrSTUVwxYZ123",
  "object": "chat.completion",
  "created": 1710504831,
  "model": "gpt-4-0613",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "2024年第1四半期の売上データ分析結果:\n\n## 全体概要\n売上総額: ¥45,200,000（前年同期比+12.3%）\n\n## 月別推移\n- 1月: ¥14,500,000\n- 2月: ¥15,800,000  \n- 3月: ¥14,900,000\n\n## 主要インサイト\n1. 2月が最高売上を記録\n2. 前年同期を一貫して上回る\n3. 商品Aの売上が全体の40%を占める\n\n## 推奨アクション\n- 2月の成功要因を他月に適用\n- 商品Aの在庫管理強化\n- 新規顧客獲得施策の継続"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 156,
    "completion_tokens": 234,
    "total_tokens": 390
  }
}
```

#### API エラーハンドリング
```javascript
// エラーレスポンスの例
const errorResponse = {
  "error": {
    "message": "The model `gpt-5` does not exist",
    "type": "invalid_request_error",
    "param": "model",
    "code": "model_not_found"
  }
};

// 堅牢なAPI呼び出し関数
async function robustApiCall(endpoint, data) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new APIError(
        result.error?.message || 'Unknown API error',
        response.status,
        result.error?.code
      );
    }
    
    return result;
    
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`API Error [${error.code}]: ${error.message}`);
      // エラータイプに応じた処理
      switch (error.code) {
        case 'rate_limit_exceeded':
          // リトライロジック
          await sleep(60000); // 1分待機
          return robustApiCall(endpoint, data);
        case 'insufficient_quota':
          // 使用量制限対応
          throw new Error('API使用量の上限に達しました');
        default:
          throw error;
      }
    } else {
      console.error('Network Error:', error);
      throw new Error('ネットワークエラーが発生しました');
    }
  }
}

class APIError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
  }
}
```

### 📊 複雑なJSONデータの処理

#### ネストしたJSONの操作
```javascript
// 複雑なJSONデータの例
const salesData = {
  "company": "TechCorp",
  "reportPeriod": "2024-Q1",
  "regions": [
    {
      "name": "関東",
      "stores": [
        {
          "id": "TK001",
          "name": "東京店",
          "sales": [
            {
              "month": "2024-01",
              "products": [
                {"category": "PC", "amount": 1200000, "units": 24},
                {"category": "Mobile", "amount": 800000, "units": 40}
              ]
            },
            {
              "month": "2024-02", 
              "products": [
                {"category": "PC", "amount": 1500000, "units": 30},
                {"category": "Mobile", "amount": 900000, "units": 45}
              ]
            }
          ]
        }
      ]
    }
  ]
};

// JSONデータ操作のユーティリティ関数
class JSONProcessor {
  
  // 深いオブジェクトから値を安全に取得
  static safeGet(obj, path, defaultValue = null) {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current === null || current === undefined || !(key in current)) {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current;
  }
  
  // ネストしたオブジェクトに値を設定
  static safeSet(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let current = obj;
    
    for (const key of keys) {
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    
    current[lastKey] = value;
  }
  
  // 配列データの集計
  static aggregateArray(arr, groupBy, aggregateField, operation = 'sum') {
    const groups = {};
    
    arr.forEach(item => {
      const key = this.safeGet(item, groupBy);
      const value = this.safeGet(item, aggregateField, 0);
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(value);
    });
    
    const result = {};
    for (const [key, values] of Object.entries(groups)) {
      switch (operation) {
        case 'sum':
          result[key] = values.reduce((sum, val) => sum + val, 0);
          break;
        case 'avg':
          result[key] = values.reduce((sum, val) => sum + val, 0) / values.length;
          break;
        case 'max':
          result[key] = Math.max(...values);
          break;
        case 'min':
          result[key] = Math.min(...values);
          break;
        case 'count':
          result[key] = values.length;
          break;
      }
    }
    
    return result;
  }
  
  // JSONデータの変換
  static transform(data, transformMap) {
    if (Array.isArray(data)) {
      return data.map(item => this.transform(item, transformMap));
    }
    
    if (typeof data === 'object' && data !== null) {
      const result = {};
      
      for (const [newKey, path] of Object.entries(transformMap)) {
        if (typeof path === 'string') {
          result[newKey] = this.safeGet(data, path);
        } else if (typeof path === 'function') {
          result[newKey] = path(data);
        } else if (typeof path === 'object') {
          result[newKey] = this.transform(this.safeGet(data, path.source), path.transform);
        }
      }
      
      return result;
    }
    
    return data;
  }
  
  // JSONの検証
  static validate(data, schema) {
    const errors = [];
    
    function validateNode(value, schemaNode, path = '') {
      if (schemaNode.required && (value === undefined || value === null)) {
        errors.push(`${path}: Required field is missing`);
        return;
      }
      
      if (value === undefined || value === null) return;
      
      if (schemaNode.type) {
        const actualType = Array.isArray(value) ? 'array' : typeof value;
        if (actualType !== schemaNode.type) {
          errors.push(`${path}: Expected ${schemaNode.type}, got ${actualType}`);
          return;
        }
      }
      
      if (schemaNode.type === 'string') {
        if (schemaNode.minLength && value.length < schemaNode.minLength) {
          errors.push(`${path}: String too short (min: ${schemaNode.minLength})`);
        }
        if (schemaNode.maxLength && value.length > schemaNode.maxLength) {
          errors.push(`${path}: String too long (max: ${schemaNode.maxLength})`);
        }
        if (schemaNode.pattern && !new RegExp(schemaNode.pattern).test(value)) {
          errors.push(`${path}: String doesn't match pattern ${schemaNode.pattern}`);
        }
      }
      
      if (schemaNode.type === 'number') {
        if (schemaNode.min !== undefined && value < schemaNode.min) {
          errors.push(`${path}: Number too small (min: ${schemaNode.min})`);
        }
        if (schemaNode.max !== undefined && value > schemaNode.max) {
          errors.push(`${path}: Number too large (max: ${schemaNode.max})`);
        }
      }
      
      if (schemaNode.type === 'array' && schemaNode.items) {
        value.forEach((item, index) => {
          validateNode(item, schemaNode.items, `${path}[${index}]`);
        });
      }
      
      if (schemaNode.type === 'object' && schemaNode.properties) {
        for (const [key, propSchema] of Object.entries(schemaNode.properties)) {
          validateNode(value[key], propSchema, `${path}.${key}`);
        }
      }
    }
    
    validateNode(data, schema);
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// 使用例
const categoryTotals = JSONProcessor.aggregateArray(
  salesData.regions[0].stores[0].sales[0].products,
  'category',
  'amount',
  'sum'
);
console.log(categoryTotals); // { PC: 1200000, Mobile: 800000 }

// データ変換例
const transformedData = JSONProcessor.transform(salesData, {
  companyName: 'company',
  period: 'reportPeriod',
  totalStores: data => data.regions.reduce((total, region) => total + region.stores.length, 0),
  regions: {
    source: 'regions',
    transform: {
      name: 'name',
      storeCount: data => data.stores.length
    }
  }
});
```

### 🔄 JSONとCSV/XML変換

#### 形式変換ユーティリティ
```javascript
class DataConverter {
  
  // JSON to CSV
  static jsonToCsv(jsonArray, options = {}) {
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
      return '';
    }
    
    const {
      delimiter = ',',
      includeHeaders = true,
      flattenObjects = true
    } = options;
    
    // オブジェクトをフラット化
    const flattenedData = flattenObjects 
      ? jsonArray.map(item => this.flattenObject(item))
      : jsonArray;
    
    // ヘッダーを取得
    const headers = new Set();
    flattenedData.forEach(row => {
      Object.keys(row).forEach(key => headers.add(key));
    });
    const headerArray = Array.from(headers);
    
    // CSVを構築
    const csvRows = [];
    
    if (includeHeaders) {
      csvRows.push(headerArray.map(header => this.escapeCsvField(header)).join(delimiter));
    }
    
    flattenedData.forEach(row => {
      const values = headerArray.map(header => {
        const value = row[header];
        return this.escapeCsvField(value);
      });
      csvRows.push(values.join(delimiter));
    });
    
    return csvRows.join('\n');
  }
  
  // CSV to JSON
  static csvToJson(csvString, options = {}) {
    const {
      delimiter = ',',
      hasHeaders = true,
      autoDetectTypes = true
    } = options;
    
    const lines = csvString.trim().split('\n');
    if (lines.length === 0) return [];
    
    const headers = hasHeaders 
      ? this.parseCsvLine(lines[0], delimiter)
      : lines[0].split(delimiter).map((_, index) => `column_${index}`);
    
    const dataLines = hasHeaders ? lines.slice(1) : lines;
    
    return dataLines.map(line => {
      const values = this.parseCsvLine(line, delimiter);
      const row = {};
      
      headers.forEach((header, index) => {
        let value = values[index] || '';
        
        if (autoDetectTypes) {
          value = this.detectAndConvertType(value);
        }
        
        row[header] = value;
      });
      
      return row;
    });
  }
  
  // JSON to XML
  static jsonToXml(json, rootElement = 'root') {
    function convertValue(value, key) {
      if (value === null || value === undefined) {
        return `<${key}></${key}>`;
      }
      
      if (Array.isArray(value)) {
        return value.map(item => convertValue(item, key)).join('');
      }
      
      if (typeof value === 'object') {
        const content = Object.entries(value)
          .map(([k, v]) => convertValue(v, k))
          .join('');
        return `<${key}>${content}</${key}>`;
      }
      
      // プリミティブ値
      const escapedValue = String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
      
      return `<${key}>${escapedValue}</${key}>`;
    }
    
    const xmlContent = Object.entries(json)
      .map(([key, value]) => convertValue(value, key))
      .join('');
    
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootElement}>${xmlContent}</${rootElement}>`;
  }
  
  // ヘルパーメソッド
  static flattenObject(obj, prefix = '', result = {}) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];
        
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          this.flattenObject(value, newKey, result);
        } else {
          result[newKey] = value;
        }
      }
    }
    return result;
  }
  
  static escapeCsvField(field) {
    if (field === null || field === undefined) return '';
    
    const stringField = String(field);
    
    // フィールドにカンマ、改行、ダブルクォートが含まれている場合はクォートで囲む
    if (stringField.includes(',') || stringField.includes('\n') || stringField.includes('"')) {
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    
    return stringField;
  }
  
  static parseCsvLine(line, delimiter) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++; // 次の文字をスキップ
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }
  
  static detectAndConvertType(value) {
    if (value === '') return '';
    
    // 数値の検出
    if (/^-?\d+$/.test(value)) {
      return parseInt(value, 10);
    }
    
    if (/^-?\d+\.\d+$/.test(value)) {
      return parseFloat(value);
    }
    
    // 真偽値の検出
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
    
    // 日付の検出（ISO 8601）
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(value)) {
      return new Date(value).toISOString();
    }
    
    return value;
  }
}

// 使用例
const sampleData = [
  {
    id: 1,
    name: "田中太郎",
    profile: {
      age: 30,
      department: "営業部"
    },
    sales: [100, 200, 150]
  },
  {
    id: 2,
    name: "佐藤花子", 
    profile: {
      age: 28,
      department: "開発部"
    },
    sales: [300, 250, 400]
  }
];

// JSON to CSV変換
const csvData = DataConverter.jsonToCsv(sampleData);
console.log(csvData);

// CSV to JSON変換
const jsonData = DataConverter.csvToJson(csvData);
console.log(jsonData);

// JSON to XML変換
const xmlData = DataConverter.jsonToXml({employees: sampleData});
console.log(xmlData);
```

---

## 実践的なJSON活用パターン

### 📋 設定ファイル管理

#### アプリケーション設定のJSON設計
```json
{
  "application": {
    "name": "AI Business Assistant",
    "version": "2.1.0",
    "environment": "production",
    "debug": false,
    "maintenance": {
      "enabled": false,
      "message": "システムメンテナンス中です",
      "startTime": "2024-03-20T02:00:00Z",
      "endTime": "2024-03-20T04:00:00Z"
    }
  },
  "server": {
    "host": "0.0.0.0",
    "port": 8080,
    "ssl": {
      "enabled": true,
      "certPath": "/path/to/cert.pem",
      "keyPath": "/path/to/key.pem",
      "ciphers": [
        "ECDHE-RSA-AES128-GCM-SHA256",
        "ECDHE-RSA-AES256-GCM-SHA384"
      ]
    },
    "cors": {
      "origin": ["https://app.example.com", "https://admin.example.com"],
      "methods": ["GET", "POST", "PUT", "DELETE"],
      "allowedHeaders": ["Content-Type", "Authorization"],
      "credentials": true
    },
    "rateLimit": {
      "windowMs": 900000,
      "max": 100,
      "standardHeaders": true,
      "legacyHeaders": false,
      "skipSuccessfulRequests": false,
      "skipFailedRequests": false
    }
  },
  "database": {
    "primary": {
      "type": "postgresql",
      "host": "db-primary.example.com",
      "port": 5432,
      "database": "ai_assistant",
      "username": "app_user",
      "password": "${DB_PASSWORD}",
      "ssl": true,
      "pool": {
        "min": 5,
        "max": 20,
        "acquireTimeoutMillis": 30000,
        "idleTimeoutMillis": 30000
      }
    },
    "replica": {
      "type": "postgresql",
      "host": "db-replica.example.com",
      "port": 5432,
      "database": "ai_assistant",
      "username": "readonly_user", 
      "password": "${DB_REPLICA_PASSWORD}",
      "ssl": true
    },
    "redis": {
      "host": "redis.example.com",
      "port": 6379,
      "password": "${REDIS_PASSWORD}",
      "db": 0,
      "keyPrefix": "ai_assistant:",
      "ttl": 3600
    }
  },
  "ai": {
    "providers": {
      "openai": {
        "apiKey": "${OPENAI_API_KEY}",
        "organization": "${OPENAI_ORG_ID}",
        "models": {
          "chat": "gpt-4",
          "completion": "gpt-3.5-turbo",
          "embedding": "text-embedding-ada-002"
        },
        "limits": {
          "maxTokens": 4000,
          "requestsPerMinute": 60,
          "tokensPerMinute": 90000
        },
        "retries": {
          "maxAttempts": 3,
          "backoffMs": 1000,
          "maxBackoffMs": 10000
        }
      },
      "anthropic": {
        "apiKey": "${ANTHROPIC_API_KEY}",
        "model": "claude-3-sonnet-20240229",
        "maxTokens": 4000,
        "limits": {
          "requestsPerMinute": 50,
          "tokensPerMinute": 80000
        }
      },
      "fallback": {
        "enabled": true,
        "order": ["openai", "anthropic"],
        "switchOnError": true,
        "maxFailures": 3,
        "cooldownMs": 60000
      }
    },
    "features": {
      "conversationMemory": {
        "enabled": true,
        "maxMessages": 50,
        "persistToDb": true
      },
      "functionCalling": {
        "enabled": true,
        "allowedFunctions": [
          "calculateBusinessMetrics",
          "generateReport",
          "scheduleEvent",
          "sendEmail"
        ]
      },
      "contentFiltering": {
        "enabled": true,
        "strictMode": false,
        "blockedCategories": ["harassment", "hate", "violence"]
      }
    }
  },
  "integrations": {
    "email": {
      "provider": "sendgrid",
      "apiKey": "${SENDGRID_API_KEY}",
      "fromEmail": "noreply@example.com",
      "fromName": "AI Assistant",
      "templates": {
        "welcome": "d-1234567890abcdef",
        "notification": "d-abcdef1234567890",
        "report": "d-567890abcdef1234"
      }
    },
    "calendar": {
      "provider": "google",
      "clientId": "${GOOGLE_CLIENT_ID}",
      "clientSecret": "${GOOGLE_CLIENT_SECRET}",
      "scopes": [
        "https://www.googleapis.com/auth/calendar.readonly",
        "https://www.googleapis.com/auth/calendar.events"
      ]
    },
    "storage": {
      "provider": "aws-s3",
      "bucket": "ai-assistant-files",
      "region": "ap-northeast-1",
      "accessKeyId": "${AWS_ACCESS_KEY_ID}",
      "secretAccessKey": "${AWS_SECRET_ACCESS_KEY}",
      "encryption": "AES256",
      "publicRead": false
    }
  },
  "monitoring": {
    "logging": {
      "level": "info",
      "format": "json",
      "outputs": [
        {
          "type": "file",
          "path": "/var/log/ai-assistant.log",
          "maxSize": "100MB",
          "maxFiles": 5
        },
        {
          "type": "console",
          "colorize": false
        }
      ]
    },
    "metrics": {
      "enabled": true,
      "endpoint": "/metrics",
      "collectDefaultMetrics": true,
      "customMetrics": [
        "ai_requests_total",
        "ai_response_time_seconds",
        "user_sessions_active"
      ]
    },
    "healthCheck": {
      "enabled": true,
      "endpoint": "/health",
      "checks": [
        {
          "name": "database",
          "timeout": 5000,
          "critical": true
        },
        {
          "name": "redis",
          "timeout": 3000,
          "critical": false
        },
        {
          "name": "ai_provider",
          "timeout": 10000,
          "critical": true
        }
      ]
    }
  },
  "security": {
    "authentication": {
      "method": "jwt",
      "secret": "${JWT_SECRET}",
      "expiresIn": "24h",
      "refreshTokenExpiry": "7d",
      "issuer": "ai-assistant.example.com",
      "audience": "ai-assistant-users"
    },
    "authorization": {
      "roles": [
        {
          "name": "admin",
          "permissions": ["*"]
        },
        {
          "name": "user", 
          "permissions": [
            "chat:read",
            "chat:write",
            "profile:read",
            "profile:write"
          ]
        },
        {
          "name": "viewer",
          "permissions": [
            "chat:read",
            "profile:read"
          ]
        }
      ]
    },
    "encryption": {
      "algorithm": "AES-256-GCM",
      "keyRotation": {
        "enabled": true,
        "intervalDays": 90,
        "previousKeysRetainDays": 30
      }
    },
    "audit": {
      "enabled": true,
      "events": [
        "user_login",
        "user_logout", 
        "ai_request",
        "data_export",
        "config_change"
      ],
      "retention": "2y"
    }
  },
  "localization": {
    "defaultLanguage": "ja",
    "supportedLanguages": ["ja", "en", "zh", "ko"],
    "timeZone": "Asia/Tokyo",
    "dateFormat": "YYYY-MM-DD",
    "timeFormat": "HH:mm:ss",
    "currency": {
      "code": "JPY",
      "symbol": "¥",
      "decimals": 0
    }
  },
  "features": {
    "betaFeatures": {
      "enabled": false,
      "allowedUsers": ["admin@example.com"]
    },
    "experimental": {
      "voiceInput": false,
      "multimodalInput": true,
      "advancedAnalytics": false
    },
    "limits": {
      "maxFileSize": "10MB",
      "maxRequestsPerHour": 1000,
      "maxConversationLength": 100,
      "maxUsersPerAccount": 50
    }
  }
}
```

### 📊 ダッシュボードデータ設計

#### リアルタイムダッシュボードのJSON構造
```json
{
  "dashboard": {
    "metadata": {
      "id": "sales-dashboard-001",
      "title": "営業ダッシュボード",
      "description": "リアルタイム営業データの可視化",
      "owner": "sales-team",
      "version": "2.3.1",
      "lastUpdated": "2024-03-15T14:30:00Z",
      "updateInterval": 300,
      "timezone": "Asia/Tokyo"
    },
    "config": {
      "layout": {
        "type": "grid",
        "columns": 12,
        "rows": 8,
        "gap": 16,
        "responsive": true
      },
      "theme": {
        "name": "corporate",
        "primaryColor": "#2E86AB",
        "secondaryColor": "#A23B72",
        "backgroundColor": "#F8F9FA",
        "textColor": "#333333"
      },
      "filters": {
        "dateRange": {
          "type": "daterange",
          "default": "last30days",
          "options": ["today", "last7days", "last30days", "thisQuarter", "custom"]
        },
        "region": {
          "type": "multiselect",
          "default": ["all"],
          "options": [
            {"value": "all", "label": "全地域"},
            {"value": "kanto", "label": "関東"},
            {"value": "kansai", "label": "関西"},
            {"value": "chubu", "label": "中部"}
          ]
        },
        "salesRep": {
          "type": "select",
          "default": "all",
          "options": "dynamic"
        }
      }
    },
    "widgets": [
      {
        "id": "total-sales",
        "type": "metric-card",
        "title": "総売上",
        "position": {"x": 0, "y": 0, "w": 3, "h": 2},
        "config": {
          "metric": "sales.total",
          "format": "currency",
          "comparison": {
            "enabled": true,
            "period": "previousPeriod",
            "format": "percentage"
          },
          "threshold": {
            "warning": 8000000,
            "critical": 5000000
          }
        },
        "data": {
          "current": 12450000,
          "previous": 10800000,
          "change": 15.28,
          "trend": "up",
          "status": "healthy"
        }
      },
      {
        "id": "sales-chart",
        "type": "line-chart",
        "title": "売上推移",
        "position": {"x": 3, "y": 0, "w": 6, "h": 4},
        "config": {
          "xAxis": {
            "type": "datetime",
            "label": "日付"
          },
          "yAxis": {
            "type": "number",
            "label": "売上 (円)",
            "format": "currency"
          },
          "series": [
            {
              "name": "実績",
              "color": "#2E86AB",
              "type": "line"
            },
            {
              "name": "目標",
              "color": "#A23B72",
              "type": "line",
              "style": "dashed"
            }
          ],
          "legend": {
            "enabled": true,
            "position": "top"
          }
        },
        "data": {
          "series": [
            {
              "name": "実績",
              "data": [
                {"x": "2024-03-01", "y": 400000},
                {"x": "2024-03-02", "y": 450000},
                {"x": "2024-03-03", "y": 380000},
                {"x": "2024-03-04", "y": 520000},
                {"x": "2024-03-05", "y": 490000}
              ]
            },
            {
              "name": "目標",
              "data": [
                {"x": "2024-03-01", "y": 420000},
                {"x": "2024-03-02", "y": 420000},
                {"x": "2024-03-03", "y": 420000},
                {"x": "2024-03-04", "y": 420000},
                {"x": "2024-03-05", "y": 420000}
              ]
            }
          ]
        }
      },
      {
        "id": "top-products",
        "type": "table",
        "title": "売上TOP商品",
        "position": {"x": 9, "y": 0, "w": 3, "h": 4},
        "config": {
          "columns": [
            {"key": "rank", "title": "順位", "type": "number", "width": 60},
            {"key": "product", "title": "商品名", "type": "string", "width": 150},
            {"key": "sales", "title": "売上", "type": "currency", "width": 100},
            {"key": "growth", "title": "成長率", "type": "percentage", "width": 80}
          ],
          "sorting": {
            "enabled": true,
            "default": {"column": "sales", "direction": "desc"}
          },
          "pagination": {
            "enabled": false
          }
        },
        "data": {
          "rows": [
            {"rank": 1, "product": "ノートPC Pro", "sales": 2400000, "growth": 18.5},
            {"rank": 2, "product": "タブレット X", "sales": 1800000, "growth": 12.3},
            {"rank": 3, "product": "スマートフォン Z", "sales": 1600000, "growth": -5.2},
            {"rank": 4, "product": "ワイヤレスイヤホン", "sales": 1200000, "growth": 25.7},
            {"rank": 5, "product": "スマートウォッチ", "sales": 900000, "growth": 8.9}
          ]
        }
      },
      {
        "id": "regional-performance",
        "type": "pie-chart",
        "title": "地域別売上構成",
        "position": {"x": 0, "y": 4, "w": 4, "h": 4},
        "config": {
          "colors": ["#2E86AB", "#A23B72", "#F18F01", "#C73E1D"],
          "showLabels": true,
          "showLegend": true,
          "innerRadius": 0.4
        },
        "data": {
          "series": [
            {"name": "関東", "value": 5580000, "percentage": 44.8},
            {"name": "関西", "value": 3112500, "percentage": 25.0},
            {"name": "中部", "value": 2490000, "percentage": 20.0},
            {"name": "その他", "value": 1267500, "percentage": 10.2}
          ]
        }
      },
      {
        "id": "sales-funnel",
        "type": "funnel-chart",
        "title": "営業ファネル",
        "position": {"x": 4, "y": 4, "w": 4, "h": 4},
        "config": {
          "stages": [
            {"name": "リード", "color": "#E3F2FD"},
            {"name": "商談", "color": "#90CAF9"},
            {"name": "提案", "color": "#42A5F5"},
            {"name": "成約", "color": "#1976D2"}
          ],
          "showConversionRates": true
        },
        "data": {
          "stages": [
            {"name": "リード", "value": 1250, "conversionRate": 100},
            {"name": "商談", "value": 375, "conversionRate": 30.0},
            {"name": "提案", "value": 150, "conversionRate": 40.0},
            {"name": "成約", "value": 45, "conversionRate": 30.0}
          ]
        }
      },
      {
        "id": "activity-feed",
        "type": "activity-list",
        "title": "最新活動",
        "position": {"x": 8, "y": 4, "w": 4, "h": 4},
        "config": {
          "maxItems": 10,
          "autoRefresh": true,
          "showTimestamp": true,
          "groupByDate": true
        },
        "data": {
          "activities": [
            {
              "id": "act001",
              "type": "deal_won",
              "title": "商談成約",
              "description": "田中太郎が ABC商事との商談を成約しました",
              "amount": 850000,
              "timestamp": "2024-03-15T14:25:00Z",
              "user": "田中太郎",
              "priority": "high"
            },
            {
              "id": "act002", 
              "type": "meeting_scheduled",
              "title": "商談予定",
              "description": "佐藤花子が XYZ株式会社との商談を予定しました",
              "timestamp": "2024-03-15T13:45:00Z",
              "user": "佐藤花子",
              "priority": "medium"
            },
            {
              "id": "act003",
              "type": "proposal_sent",
              "title": "提案書送付",
              "description": "鈴木次郎が DEF会社に提案書を送付しました",
              "amount": 1200000,
              "timestamp": "2024-03-15T12:30:00Z",
              "user": "鈴木次郎",
              "priority": "medium"
            }
          ]
        }
      }
    ],
    "dataConnections": [
      {
        "id": "salesforce",
        "type": "api",
        "name": "Salesforce CRM",
        "endpoint": "https://api.salesforce.com/v1/sales",
        "authentication": {
          "type": "oauth2",
          "tokenEndpoint": "https://login.salesforce.com/services/oauth2/token"
        },
        "updateInterval": 300,
        "mappings": {
          "sales.total": "opportunities.closedWon.sum",
          "sales.count": "opportunities.closedWon.count",
          "activities": "activities.recent"
        }
      },
      {
        "id": "database",
        "type": "sql",
        "name": "Sales Database",
        "connectionString": "${DB_CONNECTION_STRING}",
        "queries": {
          "regional_sales": "SELECT region, SUM(amount) as total FROM sales WHERE date >= ? GROUP BY region",
          "top_products": "SELECT product_name, SUM(amount) as sales FROM sales WHERE date >= ? GROUP BY product_name ORDER BY sales DESC LIMIT 10"
        },
        "updateInterval": 600
      }
    ],
    "alerts": [
      {
        "id": "low-sales-alert",
        "name": "売上低下アラート",
        "condition": "sales.total < 5000000",
        "severity": "warning",
        "enabled": true,
        "notifications": [
          {
            "type": "email",
            "recipients": ["sales-manager@example.com"],
            "template": "low-sales-alert"
          },
          {
            "type": "slack",
            "channel": "#sales-alerts",
            "webhook": "${SLACK_WEBHOOK_URL}"
          }
        ]
      }
    ]
  }
}
```

---

## 💡 実践演習

### 演習1: 基本JSON操作

以下のタスクを実行してください：

```
タスク: 社員データの管理

データ構造設計:
- 社員基本情報（ID、名前、部署、役職）
- 連絡先情報（メール、電話、住所）
- スキル情報（プログラミング言語、レベル）
- プロジェクト履歴（プロジェクト名、期間、役割）

要件:
1. 上記構造でサンプルデータを5件作成
2. JSON形式での検証
3. 特定条件での検索・フィルタリング機能
4. CSV形式への変換
```

### 演習2: AIとのJSON連携

以下のシナリオでJSONを活用してください：

```
シナリオ: 商品レビュー分析システム

タスク:
1. レビューデータのJSON構造設計
2. AIに分析指示をJSON形式で送信
3. 分析結果をJSON形式で受信
4. 結果データの可視化用JSON変換

含める要素:
- レビューテキスト
- 評価スコア
- 商品情報
- 顧客情報
- 感情分析結果
- カテゴリ分類
```

### 演習3: APIとJSON統合

以下の機能を実装してください：

```
タスク: REST API クライアントの作成

機能:
1. JSONデータでのAPI リクエスト送信
2. レスポンスデータの解析・処理
3. エラーハンドリング
4. データキャッシュ機能
5. 設定ファイル（JSON）による管理

技術要件:
- 複数API プロバイダーに対応
- 認証情報の安全な管理
- リトライ・フォールバック機能
- ログ・監視機能
```

---

## 📚 参考資料

### JSON仕様・標準
- [JSON.org](https://www.json.org/json-ja.html)
- [RFC 7159 - JSON Data Interchange Format](https://tools.ietf.org/html/rfc7159)
- [JSON Schema](https://json-schema.org/)

### JSON処理ライブラリ
- [JavaScript Built-in JSON](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [Python json module](https://docs.python.org/3/library/json.html)
- [Lodash](https://lodash.com/) - JavaScript ユーティリティ

### 検証・ツール
- [JSONLint](https://jsonlint.com/) - JSON検証
- [JSON Formatter](https://jsonformatter.curiousconcept.com/) - 整形
- [JSON to CSV Converter](https://www.convertcsv.com/json-to-csv.htm)
- [Postman](https://www.postman.com/) - API テスト

### API設計・開発
- [RESTful API Design Guidelines](https://restfulapi.net/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [JSON API](https://jsonapi.org/) - API 規約

---

## ✅ 理解度確認

この講座の内容を理解できたか、以下で確認してください：

1. JSON基本構文とデータ型を完全に理解していますか？
2. AIとの対話でJSONフォーマットを効果的に活用できますか？
3. API連携でのJSON処理を実装できますか？
4. 複雑なJSONデータの操作・変換ができますか？
5. JSON設計のベストプラクティスを適用できますか？

すべて「はい」なら次の段階に進めます。

---

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "\u30c7\u30fc\u30bf\u30d5\u30a9\u30fc\u30de\u30c3\u30c8\u7cfb\u8b1b\u5ea7\uff084\u3064\uff09\u306e\u4f5c\u6210", "status": "completed", "priority": "high"}, {"id": "2", "content": "Python\u5b9f\u884c\u74b0\u5883\u7cfb\u8b1b\u5ea7\uff083\u3064\uff09\u306e\u4f5c\u6210", "status": "pending", "priority": "high"}, {"id": "3", "content": "\u30d5\u30a1\u30a4\u30eb\u8aad\u307f\u8fbc\u307f\u7cfb\u8b1b\u5ea7\uff083\u3064\uff09\u306e\u4f5c\u6210", "status": "pending", "priority": "high"}, {"id": "4", "content": "AI\u4f01\u696d\u30fb\u6280\u8853\u7cfb\u8b1b\u5ea7\uff084\u3064\uff09\u306e\u4f5c\u6210", "status": "pending", "priority": "medium"}, {"id": "5", "content": "\u30c7\u30a3\u30fc\u30d7\u30ea\u30b5\u30fc\u30c1\u7cfb\u8b1b\u5ea7\uff084\u3064\uff09\u306e\u4f5c\u6210", "status": "pending", "priority": "high"}, {"id": "6", "content": "LLM\u3068Web\u691c\u7d22\u7cfb\u8b1b\u5ea7\uff084\u3064\uff09\u306e\u4f5c\u6210", "status": "pending", "priority": "high"}, {"id": "7", "content": "\u30ab\u30ea\u30ad\u30e5\u30e9\u30e0\u7d71\u5408\u3068\u30ea\u30f3\u30af\u6574\u5099", "status": "pending", "priority": "medium"}]