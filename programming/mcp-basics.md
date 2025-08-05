# MCP (Model Context Protocol) 基礎

**所要時間**: 1時間  
**レベル**: プログラミング基礎  
**前提知識**: [API活用基礎](api-basics.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- MCPの基本概念と仕組みを理解できる
- MCP対応アプリケーションの開発ができる
- Claude DesktopとMCPの連携を活用できる
- 独自のMCPサーバーを構築・運用できる

## 📋 目次

1. [MCPとは何か](#mcpとは何か)
2. [MCP基本アーキテクチャ](#mcp基本アーキテクチャ)
3. [Claude Desktop + MCP実践](#claude-desktop--mcp実践)
4. [独自MCPサーバー開発](#独自mcpサーバー開発)
5. [実用的なMCPアプリケーション](#実用的なmcpアプリケーション)

---

## MCPとは何か

### 🤔 MCPの基本概念

**MCP**（Model Context Protocol）は、AI言語モデルが外部のシステム・データ・ツールと安全に連携するための標準プロトコル。Anthropicが開発し、オープンソースとして公開されている。

#### 従来の問題
```
問題点:
❌ AIモデルは孤立した環境で動作
❌ リアルタイムデータにアクセスできない
❌ 外部システムとの連携が困難
❌ セキュリティとプライバシーの課題
```

#### MCPによる解決
```
解決策:
✅ 標準化されたプロトコルで外部連携
✅ リアルタイムデータへの安全なアクセス
✅ 拡張可能なアーキテクチャ
✅ セキュリティとプライバシーの保護
```

### 🌟 MCPの主要機能

#### 1. Resources (リソース)
```
機能: 外部データソースへのアクセス
例:
- ファイルシステム
- データベース
- Webサービス
- クラウドストレージ
```

#### 2. Tools (ツール)
```
機能: 外部システムでの操作実行
例:
- ファイル操作
- API呼び出し
- システムコマンド実行
- 自動化処理
```

#### 3. Prompts (プロンプト)
```
機能: 構造化されたプロンプトテンプレート
例:
- コードレビュー用テンプレート
- 文書作成用テンプレート
- 分析用テンプレート
```

### 💡 MCPの利点

#### 開発者視点
- **標準化**: 統一されたインターフェース
- **拡張性**: 新機能の追加が容易
- **セキュリティ**: 制御されたアクセス権限
- **再利用性**: 他のプロジェクトでの活用

#### エンドユーザー視点
- **一貫性**: 同じ操作方法で様々なサービス利用
- **効率性**: 複数のシステムを横断した作業
- **安全性**: 制御されたアクセス環境
- **カスタマイズ**: 個人・組織のニーズに対応

---

## MCP基本アーキテクチャ

### 🏗️ アーキテクチャ概要

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AI Client     │    │   MCP Server    │    │ External System │
│  (Claude など)   │◄──►│                 │◄──►│ (DB, API, etc.) │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        │                        │                        │
    MCP Protocol           Implementation            Data/Services
```

### 📡 通信プロトコル

#### JSON-RPC over Transport
```json
{
  "jsonrpc": "2.0",
  "method": "resources/list",
  "params": {},
  "id": 1
}

{
  "jsonrpc": "2.0",
  "result": {
    "resources": [
      {
        "uri": "file:///project/README.md",
        "name": "Project README",
        "mimeType": "text/markdown"
      }
    ]
  },
  "id": 1
}
```

#### Transport Layer Options
```
対応Transport:
- stdio (標準入出力)
- HTTP/HTTPS
- WebSocket
- SSE (Server-Sent Events)
```

### 🛠️ MCP Server基本構造

```typescript
// mcp-server-basic.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

class BasicMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "basic-mcp-server",
        version: "1.0.0"
      },
      {
        capabilities: {
          resources: {},
          tools: {},
          prompts: {}
        }
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // リソースリスト
    this.server.setRequestHandler('resources/list', async () => {
      return {
        resources: [
          {
            uri: "example://resource1",
            name: "Example Resource",
            description: "An example resource",
            mimeType: "text/plain"
          }
        ]
      };
    });

    // リソース読み取り
    this.server.setRequestHandler('resources/read', async (request) => {
      const { uri } = request.params;
      
      if (uri === "example://resource1") {
        return {
          contents: [
            {
              uri,
              mimeType: "text/plain",
              text: "Hello from MCP resource!"
            }
          ]
        };
      }
      
      throw new Error(`Resource not found: ${uri}`);
    });

    // ツールリスト
    this.server.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: "echo",
            description: "Echo back the input",
            inputSchema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "Message to echo"
                }
              },
              required: ["message"]
            }
          }
        ]
      };
    });

    // ツール実行
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;
      
      if (name === "echo") {
        return {
          content: [
            {
              type: "text",
              text: `Echo: ${args.message}`
            }
          ]
        };
      }
      
      throw new Error(`Tool not found: ${name}`);
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Basic MCP Server running on stdio");
  }
}

// サーバー起動
const server = new BasicMCPServer();
server.start().catch(console.error);
```

---

## Claude Desktop + MCP実践

### 🖥️ Claude Desktop設定

#### 設定ファイルの場所
```bash
# macOS
~/Library/Application Support/Claude/claude_desktop_config.json

# Windows
%APPDATA%\Claude\claude_desktop_config.json

# Linux
~/.config/Claude/claude_desktop_config.json
```

#### 基本設定例
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Documents"
      ]
    },
    "git": {
      "command": "npx",
      "args": [
        "-y", 
        "@modelcontextprotocol/server-git",
        "--repository",
        "/Users/username/my-project"
      ]
    },
    "sqlite": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sqlite",
        "--db-path",
        "/Users/username/database.sqlite"
      ]
    }
  }
}
```

### 📁 ファイルシステム連携

#### ファイル操作の実践
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/projects"
      ]
    }
  }
}
```

**Claude Desktop での使用例**:
```
ユーザー: "プロジェクトフォルダ内のJavaScriptファイルを一覧表示して"

Claude: ファイルシステムにアクセスして、プロジェクトフォルダ内の
.js ファイルを検索します...

[MCPを通じて実際のファイルシステムにアクセス]

見つかったJavaScriptファイル:
- src/index.js
- src/utils.js  
- tests/test.js
- config/webpack.config.js
```

### 🗄️ データベース連携

#### SQLite設定と活用
```json
{
  "mcpServers": {
    "database": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sqlite",
        "--db-path",
        "/Users/username/app.db"
      ]
    }
  }
}
```

**実用例**:
```sql
-- データベース構造
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  amount DECIMAL(10,2),
  status TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Claude Desktop での活用**:
```
ユーザー: "今月の売上が多いユーザー上位10名を教えて"

Claude: データベースにアクセスして分析します...

[MCPを通じてSQLiteデータベースにクエリ実行]

今月の売上上位10名:
1. 田中太郎 - ¥150,000 (注文数: 5件)
2. 佐藤花子 - ¥120,000 (注文数: 3件)
...
```

### 🔧 Git連携

#### Git操作の自動化
```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-git", 
        "--repository",
        "/Users/username/my-project"
      ]
    }
  }
}
```

**活用例**:
```
ユーザー: "最近のコミット履歴を分析して、コードの変更パターンを教えて"

Claude: Gitリポジトリの履歴を分析します...

[MCPを通じてGit履歴にアクセス]

最近の変更パターン分析:
- フロントエンド関連: 60% (React コンポーネント更新)
- バックエンド関連: 25% (API エンドポイント追加)
- テスト関連: 15% (単体テスト追加)

主な開発者の貢献:
- 山田さん: フロントエンド中心
- 鈴木さん: バックエンド・インフラ
```

---

## 独自MCPサーバー開発

### 🏗️ MCPサーバー開発環境

#### プロジェクトセットアップ
```bash
# 新規プロジェクト作成
mkdir my-mcp-server
cd my-mcp-server

# package.json 初期化
npm init -y

# MCP SDK インストール
npm install @modelcontextprotocol/sdk

# TypeScript開発環境
npm install -D typescript @types/node ts-node
npx tsc --init
```

#### TypeScript設定
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 📊 実用的なMCPサーバー例

#### Notion連携MCPサーバー
```typescript
// src/notion-mcp-server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Client } from '@notionhq/client';

class NotionMCPServer {
  private server: Server;
  private notion: Client;

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_TOKEN
    });

    this.server = new Server(
      {
        name: "notion-mcp-server",
        version: "1.0.0"
      },
      {
        capabilities: {
          resources: {},
          tools: {}
        }
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // データベース一覧取得
    this.server.setRequestHandler('resources/list', async () => {
      try {
        const response = await this.notion.search({
          filter: { property: 'object', value: 'database' }
        });

        return {
          resources: response.results.map((db: any) => ({
            uri: `notion://database/${db.id}`,
            name: db.title?.[0]?.plain_text || 'Untitled Database',
            description: `Notion database: ${db.id}`,
            mimeType: "application/json"
          }))
        };
      } catch (error) {
        throw new Error(`Failed to list Notion databases: ${error.message}`);
      }
    });

    // データベース内容読み取り
    this.server.setRequestHandler('resources/read', async (request) => {
      const { uri } = request.params;
      const match = uri.match(/notion:\/\/database\/(.+)/);
      
      if (!match) {
        throw new Error(`Invalid Notion URI: ${uri}`);
      }

      const databaseId = match[1];

      try {
        const response = await this.notion.databases.query({
          database_id: databaseId
        });

        const pages = response.results.map((page: any) => {
          const properties = {};
          Object.entries(page.properties).forEach(([key, value]: [string, any]) => {
            switch (value.type) {
              case 'title':
                properties[key] = value.title?.[0]?.plain_text || '';
                break;
              case 'rich_text':
                properties[key] = value.rich_text?.[0]?.plain_text || '';
                break;
              case 'number':
                properties[key] = value.number;
                break;
              case 'select':
                properties[key] = value.select?.name || '';
                break;
              case 'date':
                properties[key] = value.date?.start || '';
                break;
              default:
                properties[key] = JSON.stringify(value);
            }
          });
          return { id: page.id, properties };
        });

        return {
          contents: [
            {
              uri,
              mimeType: "application/json",
              text: JSON.stringify(pages, null, 2)
            }
          ]
        };
      } catch (error) {
        throw new Error(`Failed to read Notion database: ${error.message}`);
      }
    });

    // ページ作成ツール
    this.server.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: "create_notion_page",
            description: "Create a new page in a Notion database",
            inputSchema: {
              type: "object",
              properties: {
                database_id: {
                  type: "string",
                  description: "Database ID"
                },
                title: {
                  type: "string", 
                  description: "Page title"
                },
                properties: {
                  type: "object",
                  description: "Page properties"
                }
              },
              required: ["database_id", "title"]
            }
          },
          {
            name: "search_notion",
            description: "Search Notion pages and databases",
            inputSchema: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "Search query"
                }
              },
              required: ["query"]
            }
          }
        ]
      };
    });

    // ツール実行
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "create_notion_page":
          return await this.createNotionPage(args);
        case "search_notion":
          return await this.searchNotion(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async createNotionPage(args: any) {
    try {
      const response = await this.notion.pages.create({
        parent: { database_id: args.database_id },
        properties: {
          title: {
            title: [{ text: { content: args.title } }]
          },
          ...args.properties
        }
      });

      return {
        content: [
          {
            type: "text",
            text: `Created Notion page: ${response.url}`
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to create Notion page: ${error.message}`);
    }
  }

  private async searchNotion(args: any) {
    try {
      const response = await this.notion.search({
        query: args.query
      });

      const results = response.results.map((item: any) => ({
        id: item.id,
        title: this.extractTitle(item),
        url: item.url,
        type: item.object
      }));

      return {
        content: [
          {
            type: "text",
            text: `Found ${results.length} results:\n${JSON.stringify(results, null, 2)}`
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to search Notion: ${error.message}`);
    }
  }

  private extractTitle(item: any): string {
    if (item.object === 'page') {
      const titleProperty = Object.values(item.properties).find(
        (prop: any) => prop.type === 'title'
      ) as any;
      return titleProperty?.title?.[0]?.plain_text || 'Untitled';
    } else if (item.object === 'database') {
      return item.title?.[0]?.plain_text || 'Untitled Database';
    }
    return 'Unknown';
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Notion MCP Server running on stdio");
  }
}

// サーバー起動
if (process.env.NOTION_TOKEN) {
  const server = new NotionMCPServer();
  server.start().catch(console.error);
} else {
  console.error("NOTION_TOKEN environment variable is required");
  process.exit(1);
}
```

#### package.json設定
```json
{
  "name": "notion-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/notion-mcp-server.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/notion-mcp-server.js",
    "dev": "ts-node --esm src/notion-mcp-server.ts"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "latest",
    "@notionhq/client": "^2.2.3"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "ts-node": "^10.9.0",
    "typescript": "^5.0.0"
  }
}
```

### 🔧 Claude Desktop設定
```json
{
  "mcpServers": {
    "notion": {
      "command": "node",
      "args": [
        "/path/to/notion-mcp-server/dist/notion-mcp-server.js"
      ],
      "env": {
        "NOTION_TOKEN": "your-notion-integration-token"
      }
    }
  }
}
```

---

## 実用的なMCPアプリケーション

### 📈 プロジェクト管理システム

#### 統合プロジェクト管理MCPサーバー
```typescript
// src/project-management-mcp.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import fs from 'fs/promises';
import path from 'path';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  tasks: Task[];
  members: string[];
  startDate: string;
  endDate?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

class ProjectManagementMCP {
  private server: Server;
  private dataDir: string;

  constructor(dataDir: string = './data') {
    this.dataDir = dataDir;
    this.server = new Server(
      {
        name: "project-management-mcp",
        version: "1.0.0"
      },
      {
        capabilities: {
          resources: {},
          tools: {},
          prompts: {}
        }
      }
    );

    this.setupHandlers();
    this.ensureDataDir();
  }

  private async ensureDataDir() {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }
  }

  private setupHandlers() {
    // リソース一覧
    this.server.setRequestHandler('resources/list', async () => {
      const projects = await this.loadProjects();
      return {
        resources: projects.map(project => ({
          uri: `project://${project.id}`,
          name: project.name,
          description: `Project: ${project.name} (${project.status})`,
          mimeType: "application/json"
        }))
      };
    });

    // プロジェクト詳細読み取り
    this.server.setRequestHandler('resources/read', async (request) => {
      const { uri } = request.params;
      const match = uri.match(/project:\/\/(.+)/);
      
      if (!match) {
        throw new Error(`Invalid project URI: ${uri}`);
      }

      const projectId = match[1];
      const project = await this.loadProject(projectId);
      
      if (!project) {
        throw new Error(`Project not found: ${projectId}`);
      }

      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(project, null, 2)
          }
        ]
      };
    });

    // ツール一覧
    this.server.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: "create_project",
            description: "Create a new project",
            inputSchema: {
              type: "object",
              properties: {
                name: { type: "string", description: "Project name" },
                members: { 
                  type: "array", 
                  items: { type: "string" },
                  description: "Team members"
                },
                startDate: { type: "string", description: "Start date (YYYY-MM-DD)" }
              },
              required: ["name", "startDate"]
            }
          },
          {
            name: "add_task",
            description: "Add a task to a project",
            inputSchema: {
              type: "object",
              properties: {
                projectId: { type: "string", description: "Project ID" },
                title: { type: "string", description: "Task title" },
                description: { type: "string", description: "Task description" },
                assignee: { type: "string", description: "Task assignee" },
                priority: { 
                  type: "string", 
                  enum: ["low", "medium", "high"],
                  description: "Task priority"
                },
                dueDate: { type: "string", description: "Due date (YYYY-MM-DD)" }
              },
              required: ["projectId", "title", "priority"]
            }
          },
          {
            name: "update_task_status",
            description: "Update task status",
            inputSchema: {
              type: "object",
              properties: {
                projectId: { type: "string", description: "Project ID" },
                taskId: { type: "string", description: "Task ID" },
                status: {
                  type: "string",
                  enum: ["todo", "in-progress", "done"],
                  description: "New task status"
                }
              },
              required: ["projectId", "taskId", "status"]
            }
          },
          {
            name: "project_report",
            description: "Generate project status report",
            inputSchema: {
              type: "object",
              properties: {
                projectId: { type: "string", description: "Project ID" }
              },
              required: ["projectId"]
            }
          }
        ]
      };
    });

    // プロンプト一覧
    this.server.setRequestHandler('prompts/list', async () => {
      return {
        prompts: [
          {
            name: "project_status_analysis",
            description: "Analyze project status and provide insights",
            arguments: [
              {
                name: "projectId",
                description: "Project ID to analyze",
                required: true
              }
            ]
          },
          {
            name: "task_prioritization",
            description: "Help prioritize tasks based on project goals",
            arguments: [
              {
                name: "projectId", 
                description: "Project ID",
                required: true
              }
            ]
          }
        ]
      };
    });

    // プロンプト取得
    this.server.setRequestHandler('prompts/get', async (request) => {
      const { name, arguments: args } = request.params;
      
      switch (name) {
        case "project_status_analysis":
          return await this.getProjectAnalysisPrompt(args.projectId);
        case "task_prioritization":
          return await this.getTaskPrioritizationPrompt(args.projectId);
        default:
          throw new Error(`Unknown prompt: ${name}`);
      }
    });

    // ツール実行
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "create_project":
          return await this.createProject(args);
        case "add_task":
          return await this.addTask(args);
        case "update_task_status":
          return await this.updateTaskStatus(args);
        case "project_report":
          return await this.generateProjectReport(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async loadProjects(): Promise<Project[]> {
    try {
      const files = await fs.readdir(this.dataDir);
      const projectFiles = files.filter(f => f.endsWith('.json'));
      
      const projects = await Promise.all(
        projectFiles.map(async file => {
          const content = await fs.readFile(path.join(this.dataDir, file), 'utf-8');
          return JSON.parse(content) as Project;
        })
      );
      
      return projects;
    } catch (error) {
      return [];
    }
  }

  private async loadProject(projectId: string): Promise<Project | null> {
    try {
      const content = await fs.readFile(
        path.join(this.dataDir, `${projectId}.json`), 
        'utf-8'
      );
      return JSON.parse(content) as Project;
    } catch (error) {
      return null;
    }
  }

  private async saveProject(project: Project): Promise<void> {
    await fs.writeFile(
      path.join(this.dataDir, `${project.id}.json`),
      JSON.stringify(project, null, 2)
    );
  }

  private async createProject(args: any) {
    const project: Project = {
      id: `proj_${Date.now()}`,
      name: args.name,
      status: 'active',
      tasks: [],
      members: args.members || [],
      startDate: args.startDate
    };

    await this.saveProject(project);

    return {
      content: [
        {
          type: "text",
          text: `Created project "${project.name}" with ID: ${project.id}`
        }
      ]
    };
  }

  private async addTask(args: any) {
    const project = await this.loadProject(args.projectId);
    if (!project) {
      throw new Error(`Project not found: ${args.projectId}`);
    }

    const task: Task = {
      id: `task_${Date.now()}`,
      title: args.title,
      description: args.description || '',
      status: 'todo',
      assignee: args.assignee,
      priority: args.priority,
      dueDate: args.dueDate
    };

    project.tasks.push(task);
    await this.saveProject(project);

    return {
      content: [
        {
          type: "text",
          text: `Added task "${task.title}" to project "${project.name}"`
        }
      ]
    };
  }

  private async updateTaskStatus(args: any) {
    const project = await this.loadProject(args.projectId);
    if (!project) {
      throw new Error(`Project not found: ${args.projectId}`);
    }

    const task = project.tasks.find(t => t.id === args.taskId);
    if (!task) {
      throw new Error(`Task not found: ${args.taskId}`);
    }

    task.status = args.status;
    await this.saveProject(project);

    return {
      content: [
        {
          type: "text",
          text: `Updated task "${task.title}" status to: ${args.status}`
        }
      ]
    };
  }

  private async generateProjectReport(args: any) {
    const project = await this.loadProject(args.projectId);
    if (!project) {
      throw new Error(`Project not found: ${args.projectId}`);
    }

    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(t => t.status === 'done').length;
    const inProgressTasks = project.tasks.filter(t => t.status === 'in-progress').length;
    const todoTasks = project.tasks.filter(t => t.status === 'todo').length;

    const highPriorityTasks = project.tasks.filter(t => t.priority === 'high').length;
    const overdueTasks = project.tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
    ).length;

    const report = `
# Project Report: ${project.name}

## Overview
- **Status**: ${project.status}
- **Start Date**: ${project.startDate}
- **Team Members**: ${project.members.join(', ') || 'None assigned'}

## Task Summary
- **Total Tasks**: ${totalTasks}
- **Completed**: ${completedTasks} (${totalTasks > 0 ? Math.round(completedTasks / totalTasks * 100) : 0}%)
- **In Progress**: ${inProgressTasks}
- **To Do**: ${todoTasks}
- **High Priority**: ${highPriorityTasks}
- **Overdue**: ${overdueTasks}

## Task Details
${project.tasks.map(task => `
### ${task.title}
- **Status**: ${task.status}
- **Priority**: ${task.priority}
- **Assignee**: ${task.assignee || 'Unassigned'}
- **Due Date**: ${task.dueDate || 'Not set'}
- **Description**: ${task.description}
`).join('\n')}
`;

    return {
      content: [
        {
          type: "text",
          text: report
        }
      ]
    };
  }

  private async getProjectAnalysisPrompt(projectId: string) {
    const project = await this.loadProject(projectId);
    if (!project) {
      throw new Error(`Project not found: ${projectId}`);
    }

    return {
      description: `Analyze the status of project "${project.name}" and provide insights`,
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Please analyze the following project data and provide insights on:
1. Overall progress and health
2. Potential risks or bottlenecks
3. Recommendations for improvement
4. Team performance insights

Project Data:
${JSON.stringify(project, null, 2)}`
          }
        }
      ]
    };
  }

  private async getTaskPrioritizationPrompt(projectId: string) {
    const project = await this.loadProject(projectId);
    if (!project) {
      throw new Error(`Project not found: ${projectId}`);
    }

    return {
      description: `Help prioritize tasks for project "${project.name}"`,
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Based on the following project data, please help prioritize the tasks by:
1. Analyzing dependencies between tasks
2. Considering due dates and urgency
3. Evaluating impact on project goals
4. Suggesting an optimal task sequence

Project Data:
${JSON.stringify(project, null, 2)}`
          }
        }
      ]
    };
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Project Management MCP Server running on stdio");
  }
}

// サーバー起動
const server = new ProjectManagementMCP();
server.start().catch(console.error);
```

### 🌐 Web API連携MCPサーバー

#### 外部API統合例
```typescript
// src/web-api-mcp.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import fetch from 'node-fetch';

class WebAPIMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "web-api-mcp",
        version: "1.0.0"
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.setRequestHandler('tools/list', async () => {
      return {
        tools: [
          {
            name: "get_weather",
            description: "Get current weather information",
            inputSchema: {
              type: "object",
              properties: {
                city: { type: "string", description: "City name" },
                country: { type: "string", description: "Country code (optional)" }
              },
              required: ["city"]
            }
          },
          {
            name: "currency_convert",
            description: "Convert currency amounts",
            inputSchema: {
              type: "object",
              properties: {
                amount: { type: "number", description: "Amount to convert" },
                from: { type: "string", description: "Source currency code" },
                to: { type: "string", description: "Target currency code" }
              },
              required: ["amount", "from", "to"]
            }
          },
          {
            name: "news_search",
            description: "Search for recent news articles",
            inputSchema: {
              type: "object",
              properties: {
                query: { type: "string", description: "Search query" },
                language: { type: "string", description: "Language code (e.g., 'ja', 'en')" },
                limit: { type: "number", description: "Number of articles (max 20)" }
              },
              required: ["query"]
            }
          }
        ]
      };
    });

    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "get_weather":
          return await this.getWeather(args);
        case "currency_convert":
          return await this.convertCurrency(args);
        case "news_search":
          return await this.searchNews(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private async getWeather(args: any) {
    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (!apiKey) {
        throw new Error("OPENWEATHER_API_KEY not configured");
      }

      const city = args.city;
      const country = args.country ? `,${args.country}` : '';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}${country}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Weather API error');
      }

      const weather = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        wind_speed: data.wind.speed
      };

      return {
        content: [
          {
            type: "text",
            text: `Weather in ${weather.city}, ${weather.country}:
- Temperature: ${weather.temperature}°C (feels like ${weather.feels_like}°C)
- Conditions: ${weather.description}
- Humidity: ${weather.humidity}%
- Wind Speed: ${weather.wind_speed} m/s`
          }
        ]
      };
    } catch (error) {
      throw new Error(`Weather lookup failed: ${error.message}`);
    }
  }

  private async convertCurrency(args: any) {
    try {
      // 無料の為替レートAPI使用（実際にはAPI キーが必要な場合があります）
      const url = `https://api.exchangerate-api.com/v4/latest/${args.from}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Currency API error');
      }

      const rate = data.rates[args.to];
      if (!rate) {
        throw new Error(`Currency code not found: ${args.to}`);
      }

      const convertedAmount = args.amount * rate;

      return {
        content: [
          {
            type: "text",
            text: `Currency Conversion:
${args.amount} ${args.from} = ${convertedAmount.toFixed(2)} ${args.to}
Exchange Rate: 1 ${args.from} = ${rate} ${args.to}`
          }
        ]
      };
    } catch (error) {
      throw new Error(`Currency conversion failed: ${error.message}`);
    }
  }

  private async searchNews(args: any) {
    try {
      const apiKey = process.env.NEWS_API_KEY;
      if (!apiKey) {
        throw new Error("NEWS_API_KEY not configured");
      }

      const query = encodeURIComponent(args.query);
      const language = args.language || 'en';
      const pageSize = Math.min(args.limit || 5, 20);
      
      const url = `https://newsapi.org/v2/everything?q=${query}&language=${language}&pageSize=${pageSize}&apiKey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'News API error');
      }

      const articles = data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name
      }));

      const newsText = articles.map((article, index) => `
${index + 1}. **${article.title}**
   Source: ${article.source}
   Published: ${new Date(article.publishedAt).toLocaleDateString()}
   Description: ${article.description}
   URL: ${article.url}
`).join('\n');

      return {
        content: [
          {
            type: "text",
            text: `Found ${articles.length} news articles for "${args.query}":
${newsText}`
          }
        ]
      };
    } catch (error) {
      throw new Error(`News search failed: ${error.message}`);
    }
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Web API MCP Server running on stdio");
  }
}

// サーバー起動
const server = new WebAPIMCPServer();
server.start().catch(console.error);
```

---

## 実践演習

### 演習1: 基本MCP理解
**目標**: MCPの基本概念と仕組みを理解

**手順**:
1. 既存MCPサーバー（filesystem, git等）の設定
2. Claude DesktopでのMCP機能体験
3. リソース・ツール・プロンプトの違いを理解
4. 基本的なMCPサーバーコードの分析

### 演習2: 独自MCPサーバー開発
**目標**: 簡単なMCPサーバーを自作

**課題**:
1. ToDoリスト管理MCPサーバーの作成
2. ファイルベースのデータ永続化
3. CRUD操作の実装
4. Claude Desktopでの動作確認

### 演習3: 実用的なMCP統合
**目標**: 既存サービスとの連携

**課題**:
1. 選択したWebサービス（Slack, Notion, GitHub等）のAPI調査
2. 認証・API連携の実装
3. 実用的な機能（検索、作成、更新等）の開発
4. エラーハンドリング・セキュリティ対策

---

## まとめ

MCPは、AI言語モデルと外部システムの連携を**標準化・安全化する重要な技術**です。

### 🎯 重要なポイント
- **標準化**: 統一されたプロトコルで様々なシステム連携
- **安全性**: 制御されたアクセス環境でのデータ操作
- **拡張性**: 新しい機能・サービスの追加が容易
- **実用性**: 実際のビジネス課題解決への直接的貢献

### 🚀 次のステップ
1. 既存MCPサーバーの活用・カスタマイズ
2. 組織特有のニーズに応じた独自MCP開発
3. セキュリティ・パフォーマンス最適化
4. MCPエコシステムへの貢献・共有

---

**関連講座**: 
- [API活用基礎](api-basics.md)
- [ターミナル・CLI基礎](terminal-cli.md)
- [システム連携・API活用](../advanced/10-system-integration.md)