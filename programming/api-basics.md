# API活用基礎 + AI連携

**所要時間**: 1時間  
**レベル**: プログラミング基礎  
**前提知識**: [ターミナル・CLI基礎](terminal-cli.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- APIの基本概念とHTTPの仕組みを理解できる
- AI APIを実際に活用してアプリケーションを作成できる
- 認証・エラーハンドリング・レート制限への対応ができる
- 複数のAI APIを組み合わせた実用的なシステムを構築できる

## 📋 目次

1. [APIの基本概念](#apiの基本概念)
2. [AI API活用の実践](#ai-api活用の実践)
3. [認証・セキュリティ対応](#認証セキュリティ対応)
4. [エラーハンドリング・最適化](#エラーハンドリング最適化)
5. [実用的なAI APIアプリケーション](#実用的なai-apiアプリケーション)

---

## APIの基本概念

### 🤔 APIとは何か

**API**（Application Programming Interface）は、異なるソフトウェア間でデータをやり取りするための仕組み。AI時代においては、強力なAI機能を自分のアプリケーションに組み込む重要な手段。

#### なぜAPIが重要か（AI時代の視点）
```
従来のアプリ開発:
ローカル処理のみ → 限定的な機能

AI API活用:
ローカル処理 + クラウドAI → 高度な機能
- 自然言語処理
- 画像生成・認識
- 音声合成・認識
- データ分析・予測
```

### 🌐 HTTP基礎とREST API

#### HTTP基本概念
```
HTTP メソッド:
GET    : データの取得
POST   : データの作成・送信
PUT    : データの更新・置換
DELETE : データの削除
PATCH  : データの部分更新
```

#### ステータスコード
```
成功系:
200 OK          : 正常処理
201 Created     : 作成成功
204 No Content  : 成功（レスポンスボディなし）

エラー系:
400 Bad Request : リクエストエラー
401 Unauthorized: 認証エラー
403 Forbidden   : 権限エラー
404 Not Found   : リソース未発見
429 Too Many Requests: レート制限
500 Internal Server Error: サーバーエラー
```

#### JSON形式の理解
```json
{
  "request": {
    "model": "gpt-4",
    "messages": [
      {
        "role": "user",
        "content": "Hello, how are you?"
      }
    ],
    "max_tokens": 100
  },
  "response": {
    "choices": [
      {
        "message": {
          "role": "assistant",
          "content": "I'm doing well, thank you for asking!"
        }
      }
    ],
    "usage": {
      "total_tokens": 25
    }
  }
}
```

### 🔧 APIテスト基礎

#### curlコマンドによるAPIテスト
```bash
# 基本的なGETリクエスト
curl https://api.example.com/data

# POSTリクエスト（JSONデータ送信）
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"message": "Hello API"}' \
  https://api.example.com/chat

# レスポンスヘッダーも表示
curl -i https://api.example.com/data

# レスポンスをファイルに保存
curl -o response.json https://api.example.com/data
```

#### Postmanの活用
```
Postman 基本操作:
1. リクエスト作成
2. ヘッダー設定
3. ボディ設定（JSON）
4. 環境変数設定
5. テスト自動化
```

---

## AI API活用の実践

### 🤖 主要AI APIサービス

#### OpenAI API
```javascript
// OpenAI API 基本例
const openai = require('openai');

const client = new openai({
  apiKey: process.env.OPENAI_API_KEY
});

async function chatWithGPT(message) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 150
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API エラー:', error);
    throw error;
  }
}

// 使用例
chatWithGPT("JavaScript でファイルを読み込む方法を教えて")
  .then(response => console.log(response));
```

#### Anthropic Claude API
```javascript
// Claude API 基本例
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function chatWithClaude(message) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    });
    
    return response.content[0].text;
  } catch (error) {
    console.error('Claude API エラー:', error);
    throw error;
  }
}

// 使用例
chatWithClaude("Python でWebスクレイピングを行う方法")
  .then(response => console.log(response));
```

#### Google Gemini API
```javascript
// Gemini API 基本例
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function chatWithGemini(message) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Gemini API エラー:', error);
    throw error;
  }
}

// 画像分析の例
async function analyzeImageWithGemini(imagePath, prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    // 画像をBase64に変換
    const fs = require('fs');
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg"
        }
      }
    ]);
    
    return result.response.text();
  } catch (error) {
    console.error('Gemini Vision API エラー:', error);
    throw error;
  }
}
```

### 🛠️ 実践的なAPI活用パターン

#### 1. AI翻訳サービス
```javascript
// 多言語翻訳システム
class AITranslator {
  constructor() {
    this.openai = new openai({ apiKey: process.env.OPENAI_API_KEY });
  }
  
  async translate(text, sourceLang, targetLang) {
    const prompt = `Translate the following text from ${sourceLang} to ${targetLang}. Only return the translated text:

${text}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500
      });
      
      return response.choices[0].message.content.trim();
    } catch (error) {
      throw new Error(`翻訳エラー: ${error.message}`);
    }
  }
  
  async detectLanguage(text) {
    const prompt = `Detect the language of the following text and return only the language name in English:

${text}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50
      });
      
      return response.choices[0].message.content.trim();
    } catch (error) {
      throw new Error(`言語検出エラー: ${error.message}`);
    }
  }
}

// 使用例
const translator = new AITranslator();
translator.translate("Hello, how are you?", "English", "Japanese")
  .then(result => console.log('翻訳結果:', result));
```

#### 2. 文書要約サービス
```javascript
// 文書要約システム
class DocumentSummarizer {
  constructor() {
    this.claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  
  async summarize(document, maxLength = 200) {
    const prompt = `以下の文書を${maxLength}文字以内で要約してください。重要なポイントを箇条書きで整理してください：

${document}`;

    try {
      const response = await this.claude.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      });
      
      return response.content[0].text;
    } catch (error) {
      throw new Error(`要約エラー: ${error.message}`);
    }
  }
  
  async extractKeywords(document) {
    const prompt = `以下の文書からキーワードを抽出し、重要度順にランキングしてください：

${document}`;

    try {
      const response = await this.claude.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }]
      });
      
      return response.content[0].text;
    } catch (error) {
      throw new Error(`キーワード抽出エラー: ${error.message}`);
    }
  }
}
```

#### 3. コード生成・レビューサービス
```javascript
// AI コード生成・レビューシステム
class AICodeAssistant {
  constructor() {
    this.openai = new openai({ apiKey: process.env.OPENAI_API_KEY });
  }
  
  async generateCode(requirement, language = "JavaScript") {
    const prompt = `${language}で以下の要件を満たすコードを生成してください。
コメントも含めて実装してください：

要件: ${requirement}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000
      });
      
      return response.choices[0].message.content;
    } catch (error) {
      throw new Error(`コード生成エラー: ${error.message}`);
    }
  }
  
  async reviewCode(code, language = "JavaScript") {
    const prompt = `以下の${language}コードをレビューして、改善点を指摘してください：

\`\`\`${language.toLowerCase()}
${code}
\`\`\`

レビュー観点：
1. バグの可能性
2. パフォーマンス
3. 可読性
4. セキュリティ
5. ベストプラクティス`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500
      });
      
      return response.choices[0].message.content;
    } catch (error) {
      throw new Error(`コードレビューエラー: ${error.message}`);
    }
  }
  
  async explainCode(code, language = "JavaScript") {
    const prompt = `以下の${language}コードの動作を初心者にもわかりやすく説明してください：

\`\`\`${language.toLowerCase()}
${code}
\`\`\``;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      });
      
      return response.choices[0].message.content;
    } catch (error) {
      throw new Error(`コード説明エラー: ${error.message}`);
    }
  }
}
```

---

## 認証・セキュリティ対応

### 🔐 API Key管理

#### 環境変数による管理
```bash
# .env ファイル（Gitで管理しない）
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AI...

# Node.js での読み込み
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OPENAI_API_KEY が設定されていません');
}
```

#### セキュアな設定管理
```javascript
// config/api-config.js
class APIConfig {
  constructor() {
    this.validateEnvironment();
  }
  
  validateEnvironment() {
    const requiredKeys = [
      'OPENAI_API_KEY',
      'ANTHROPIC_API_KEY',
      'GEMINI_API_KEY'
    ];
    
    const missingKeys = requiredKeys.filter(key => !process.env[key]);
    
    if (missingKeys.length > 0) {
      throw new Error(`必要な環境変数が不足: ${missingKeys.join(', ')}`);
    }
  }
  
  getOpenAIConfig() {
    return {
      apiKey: process.env.OPENAI_API_KEY,
      organization: process.env.OPENAI_ORG_ID,
      maxRetries: 3,
      timeout: 30000
    };
  }
  
  getClaudeConfig() {
    return {
      apiKey: process.env.ANTHROPIC_API_KEY,
      maxRetries: 3,
      timeout: 30000
    };
  }
}

module.exports = new APIConfig();
```

### 🛡️ レート制限・使用量管理

#### レート制限対応
```javascript
// rate-limiter.js
class RateLimiter {
  constructor(maxRequests = 60, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }
  
  async checkLimit(apiKey) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    if (!this.requests.has(apiKey)) {
      this.requests.set(apiKey, []);
    }
    
    const userRequests = this.requests.get(apiKey);
    
    // 古いリクエストを削除
    while (userRequests.length > 0 && userRequests[0] < windowStart) {
      userRequests.shift();
    }
    
    if (userRequests.length >= this.maxRequests) {
      throw new Error('レート制限に達しました。しばらく待ってから再試行してください。');
    }
    
    userRequests.push(now);
    return true;
  }
}

// 使用例
const rateLimiter = new RateLimiter(10, 60000); // 1分間に10リクエスト

async function apiCall(userKey, data) {
  await rateLimiter.checkLimit(userKey);
  // API呼び出し実行...
}
```

#### 使用量追跡
```javascript
// usage-tracker.js
class UsageTracker {
  constructor() {
    this.usage = new Map();
  }
  
  trackRequest(userId, model, inputTokens, outputTokens) {
    const key = `${userId}-${model}`;
    
    if (!this.usage.has(key)) {
      this.usage.set(key, {
        requests: 0,
        inputTokens: 0,
        outputTokens: 0,
        totalCost: 0
      });
    }
    
    const stats = this.usage.get(key);
    stats.requests += 1;
    stats.inputTokens += inputTokens;
    stats.outputTokens += outputTokens;
    stats.totalCost += this.calculateCost(model, inputTokens, outputTokens);
    
    this.usage.set(key, stats);
  }
  
  calculateCost(model, inputTokens, outputTokens) {
    const pricing = {
      'gpt-4': { input: 0.03, output: 0.06 }, // per 1K tokens
      'gpt-3.5-turbo': { input: 0.0015, output: 0.002 },
      'claude-3-sonnet': { input: 0.003, output: 0.015 }
    };
    
    if (!pricing[model]) return 0;
    
    const inputCost = (inputTokens / 1000) * pricing[model].input;
    const outputCost = (outputTokens / 1000) * pricing[model].output;
    
    return inputCost + outputCost;
  }
  
  getUsage(userId) {
    const userUsage = {};
    
    for (const [key, stats] of this.usage) {
      if (key.startsWith(userId)) {
        const model = key.split('-')[1];
        userUsage[model] = stats;
      }
    }
    
    return userUsage;
  }
}
```

---

## エラーハンドリング・最適化

### ⚠️ 包括的なエラーハンドリング

#### APIエラーの分類と対応
```javascript
// error-handler.js
class APIErrorHandler {
  static handleError(error, context = {}) {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      context,
      originalError: error
    };
    
    // エラータイプ別の処理
    if (error.status === 401) {
      return this.handleAuthError(errorInfo);
    } else if (error.status === 429) {
      return this.handleRateLimitError(errorInfo);
    } else if (error.status === 500) {
      return this.handleServerError(errorInfo);
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return this.handleNetworkError(errorInfo);
    } else {
      return this.handleGenericError(errorInfo);
    }
  }
  
  static handleAuthError(errorInfo) {
    console.error('認証エラー:', errorInfo);
    return {
      success: false,
      error: 'API認証に失敗しました。APIキーを確認してください。',
      canRetry: false
    };
  }
  
  static handleRateLimitError(errorInfo) {
    console.warn('レート制限エラー:', errorInfo);
    return {
      success: false,
      error: 'リクエスト制限に達しました。しばらく待ってから再試行してください。',
      canRetry: true,
      retryAfter: 60000 // 60秒後に再試行
    };
  }
  
  static handleServerError(errorInfo) {
    console.error('サーバーエラー:', errorInfo);
    return {
      success: false,
      error: 'サーバーで一時的な問題が発生しています。後で再試行してください。',
      canRetry: true,
      retryAfter: 30000 // 30秒後に再試行
    };
  }
  
  static handleNetworkError(errorInfo) {
    console.error('ネットワークエラー:', errorInfo);
    return {
      success: false,
      error: 'ネットワーク接続に問題があります。インターネット接続を確認してください。',
      canRetry: true,
      retryAfter: 10000 // 10秒後に再試行
    };
  }
  
  static handleGenericError(errorInfo) {
    console.error('不明なエラー:', errorInfo);
    return {
      success: false,
      error: '予期しないエラーが発生しました。',
      canRetry: false
    };
  }
}
```

#### リトライ機能付きAPIクライアント
```javascript
// resilient-api-client.js
class ResilientAPIClient {
  constructor(options = {}) {
    this.maxRetries = options.maxRetries || 3;
    this.baseDelay = options.baseDelay || 1000;
    this.maxDelay = options.maxDelay || 30000;
  }
  
  async callAPI(apiFunction, ...args) {
    let lastError;
    
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await apiFunction(...args);
        return { success: true, data: result };
      } catch (error) {
        lastError = error;
        
        const errorResult = APIErrorHandler.handleError(error, {
          attempt: attempt + 1,
          maxRetries: this.maxRetries,
          function: apiFunction.name,
          args: this.sanitizeArgs(args)
        });
        
        if (!errorResult.canRetry || attempt === this.maxRetries) {
          return errorResult;
        }
        
        // 指数バックオフでリトライ
        const delay = Math.min(
          this.baseDelay * Math.pow(2, attempt),
          this.maxDelay
        );
        
        console.log(`${delay}ms 後にリトライします... (${attempt + 1}/${this.maxRetries})`);
        await this.sleep(delay);
      }
    }
    
    return APIErrorHandler.handleError(lastError);
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  sanitizeArgs(args) {
    // ログに機密情報が出力されないよう引数をサニタイズ
    return args.map(arg => {
      if (typeof arg === 'string' && arg.includes('sk-')) {
        return '[API_KEY_HIDDEN]';
      }
      return arg;
    });
  }
}

// 使用例
const apiClient = new ResilientAPIClient({
  maxRetries: 3,
  baseDelay: 1000
});

async function robustChatCompletion(message) {
  const result = await apiClient.callAPI(async () => {
    return await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });
  });
  
  if (result.success) {
    return result.data.choices[0].message.content;
  } else {
    throw new Error(result.error);
  }
}
```

### ⚡ パフォーマンス最適化

#### キャッシュ機能
```javascript
// cache-manager.js
class CacheManager {
  constructor(ttl = 3600000) { // デフォルト1時間
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  generateKey(prefix, data) {
    const hash = require('crypto')
      .createHash('md5')
      .update(JSON.stringify(data))
      .digest('hex');
    return `${prefix}:${hash}`;
  }
  
  set(key, value) {
    const expiresAt = Date.now() + this.ttl;
    this.cache.set(key, { value, expiresAt });
  }
  
  get(key) {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.value;
  }
  
  clear() {
    this.cache.clear();
  }
  
  cleanup() {
    const now = Date.now();
    for (const [key, { expiresAt }] of this.cache) {
      if (now > expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

// キャッシュ付きAI API呼び出し
class CachedAIClient {
  constructor() {
    this.cache = new CacheManager(3600000); // 1時間キャッシュ
    this.openai = new openai({ apiKey: process.env.OPENAI_API_KEY });
  }
  
  async chatCompletion(messages, options = {}) {
    const cacheKey = this.cache.generateKey('chat', { messages, options });
    
    // キャッシュチェック
    const cached = this.cache.get(cacheKey);
    if (cached) {
      console.log('キャッシュからレスポンスを返します');
      return cached;
    }
    
    // API呼び出し
    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      ...options
    });
    
    // キャッシュに保存
    this.cache.set(cacheKey, response);
    
    return response;
  }
}
```

---

## 実用的なAI APIアプリケーション

### 🎯 総合AIアシスタントの構築

#### マルチモーダルAIアシスタント
```javascript
// multi-modal-assistant.js
class MultiModalAssistant {
  constructor() {
    this.openai = new openai({ apiKey: process.env.OPENAI_API_KEY });
    this.claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.cache = new CacheManager();
    this.apiClient = new ResilientAPIClient();
  }
  
  async processText(text, task = 'general') {
    const taskRouting = {
      'code': this.processCode.bind(this),
      'translation': this.translateText.bind(this),
      'summary': this.summarizeText.bind(this),
      'general': this.generalChat.bind(this)
    };
    
    const handler = taskRouting[task] || taskRouting['general'];
    return await handler(text);
  }
  
  async processCode(code) {
    // Claude を使用（コーディングが得意）
    const result = await this.apiClient.callAPI(async () => {
      return await this.claude.messages.create({
        model: "claude-3-sonnet-20240229",
        max_tokens: 2000,
        messages: [{
          role: "user",
          content: `以下のコードをレビューして改善提案をしてください：\n\n${code}`
        }]
      });
    });
    
    return result.success ? result.data.content[0].text : result.error;
  }
  
  async translateText(text) {
    // OpenAI を使用（翻訳精度が高い）
    const result = await this.apiClient.callAPI(async () => {
      return await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `以下のテキストを自然な日本語に翻訳してください：\n\n${text}`
        }]
      });
    });
    
    return result.success ? result.data.choices[0].message.content : result.error;
  }
  
  async processImage(imagePath, prompt) {
    // Gemini Vision を使用（マルチモーダル対応）
    const model = this.gemini.getGenerativeModel({ model: "gemini-pro-vision" });
    
    const result = await this.apiClient.callAPI(async () => {
      const fs = require('fs');
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      
      return await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg"
          }
        }
      ]);
    });
    
    return result.success ? result.data.response.text() : result.error;
  }
  
  async generateContent(type, specifications) {
    const generators = {
      'email': this.generateEmail.bind(this),
      'report': this.generateReport.bind(this),
      'code': this.generateCode.bind(this),
      'presentation': this.generatePresentation.bind(this)
    };
    
    const generator = generators[type];
    if (!generator) {
      throw new Error(`未対応のコンテンツタイプ: ${type}`);
    }
    
    return await generator(specifications);
  }
  
  async generateEmail(specs) {
    const prompt = `以下の仕様でビジネスメールを作成してください：
    
受信者: ${specs.recipient}
目的: ${specs.purpose}
トーン: ${specs.tone || '丁寧'}
重要なポイント: ${specs.keyPoints?.join(', ') || ''}

件名と本文を含む完全なメールを作成してください。`;

    const result = await this.apiClient.callAPI(async () => {
      return await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      });
    });
    
    return result.success ? result.data.choices[0].message.content : result.error;
  }
}

// 使用例
const assistant = new MultiModalAssistant();

// テキスト処理
assistant.processText("const users = []; // TODO: implement user management", "code")
  .then(result => console.log('コードレビュー:', result));

// 画像分析
assistant.processImage("./screenshot.jpg", "この画面の UI/UX の改善点を教えて")
  .then(result => console.log('画像分析:', result));

// コンテンツ生成
assistant.generateContent("email", {
  recipient: "田中部長",
  purpose: "プロジェクトの進捗報告",
  tone: "丁寧",
  keyPoints: ["スケジュール通り進行", "予算内で完了予定", "次回ミーティングの提案"]
}).then(result => console.log('生成メール:', result));
```

#### Web APIサーバーとしての実装
```javascript
// api-server.js
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const assistant = new MultiModalAssistant();

// ミドルウェア設定
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// レート制限
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分
  max: 100 // 最大100リクエスト
});
app.use('/api/', limiter);

// 認証ミドルウェア
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  req.userId = getUserIdFromApiKey(apiKey);
  next();
};

// エンドポイント定義
app.post('/api/chat', authenticate, async (req, res) => {
  try {
    const { message, task = 'general' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const response = await assistant.processText(message, task);
    
    res.json({
      success: true,
      response,
      usage: {
        timestamp: new Date().toISOString(),
        userId: req.userId,
        task
      }
    });
    
  } catch (error) {
    console.error('Chat API エラー:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.post('/api/analyze-image', authenticate, async (req, res) => {
  try {
    const { imageBase64, prompt } = req.body;
    
    if (!imageBase64 || !prompt) {
      return res.status(400).json({ error: 'Image and prompt are required' });
    }
    
    // Base64画像を一時ファイルに保存
    const fs = require('fs');
    const path = require('path');
    const tempPath = path.join(__dirname, 'temp', `${Date.now()}.jpg`);
    
    fs.writeFileSync(tempPath, imageBase64, 'base64');
    
    const response = await assistant.processImage(tempPath, prompt);
    
    // 一時ファイル削除
    fs.unlinkSync(tempPath);
    
    res.json({
      success: true,
      response,
      usage: {
        timestamp: new Date().toISOString(),
        userId: req.userId,
        type: 'image_analysis'
      }
    });
    
  } catch (error) {
    console.error('Image analysis API エラー:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.post('/api/generate-content', authenticate, async (req, res) => {
  try {
    const { type, specifications } = req.body;
    
    if (!type || !specifications) {
      return res.status(400).json({ error: 'Type and specifications are required' });
    }
    
    const response = await assistant.generateContent(type, specifications);
    
    res.json({
      success: true,
      response,
      usage: {
        timestamp: new Date().toISOString(),
        userId: req.userId,
        contentType: type
      }
    });
    
  } catch (error) {
    console.error('Content generation API エラー:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// サーバー起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 AI API Server running on port ${PORT}`);
});

// ヘルパー関数
function isValidApiKey(apiKey) {
  // 実際の実装では、データベースでAPIキーを検証
  return apiKey && apiKey.startsWith('ai-');
}

function getUserIdFromApiKey(apiKey) {
  // 実際の実装では、APIキーからユーザーIDを取得
  return apiKey.split('-')[1] || 'anonymous';
}
```

---

## 実践演習

### 演習1: 基本API操作
**目標**: AI APIの基本操作を習得

**手順**:
1. OpenAI または Claude APIのセットアップ
2. 簡単なチャット機能の実装
3. エラーハンドリングの追加
4. レスポンス時間の測定

### 演習2: 実用的なAIツール作成
**目標**: 実際に使えるAIアプリケーションの構築

**課題**:
1. 文書要約ツールの作成
2. 多言語翻訳システムの実装
3. コードレビューボットの開発
4. Web APIとしての公開

### 演習3: 高度なシステム統合
**目標**: 複数のAI APIを組み合わせたシステム

**課題**:
1. マルチモーダルAIアシスタントの実装
2. キャッシュ・レート制限機能の追加
3. ユーザー認証・使用量制限の実装
4. モニタリング・ログ機能の追加

---

## まとめ

AI APIの活用は、現代のアプリケーション開発において**高度な機能を短期間で実装する重要な手段**です。

### 🎯 重要なポイント
- **適切なAPI選択**: 用途に応じたAI APIの使い分け
- **堅牢なエラーハンドリング**: リトライ・フォールバック機能
- **セキュリティ**: APIキー管理・レート制限・使用量制御
- **最適化**: キャッシュ・パフォーマンス改善

### 🚀 次のステップ
1. 実際のプロジェクトでのAI API統合
2. より高度な機能（ストリーミング、ファインチューニング等）の活用
3. 本番環境での運用・監視体制の構築
4. コスト最適化・スケーリング戦略の実装

---

**次の講座**: 
- [MCP (Model Context Protocol)](mcp-basics.md)