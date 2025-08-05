# RAG開発入門ガイド

**所要時間**: 2-3時間  
**レベル**: 初級〜中級  
**前提知識**: 基本的なプログラミング知識（Python推奨）

## 🎯 学習目標

- RAG（Retrieval Augmented Generation）の基本概念を理解する
- 実際にRAGシステムを構築できるようになる
- 主要フレームワーク（LangChain、LlamaIndex）の使い方を学ぶ
- 実用的なRAGアプリケーションを作成する

## 📋 目次

1. [RAGとは何か？](#ragとは何か)
2. [RAGシステムの構成要素](#ragシステムの構成要素)
3. [開発環境の準備](#開発環境の準備)
4. [はじめてのRAG実装](#はじめてのrag実装)
5. [LangChainでRAG構築](#langchainでrag構築)
6. [LlamaIndexでRAG構築](#llamaindexでrag構築)
7. [RAGシステムの改善](#ragシステムの改善)
8. [実践的な応用例](#実践的な応用例)
9. [よくある問題と解決方法](#よくある問題と解決方法)

---

## RAGとは何か？

**RAG（Retrieval Augmented Generation）**は、検索と生成を組み合わせたAI技術です。

### 従来のLLMとRAGの違い

| 従来のLLM | RAG |
|-----------|-----|
| 訓練時の知識のみ | 外部データも活用 |
| 知識の更新が困難 | リアルタイム情報取得 |
| ハルシネーション発生 | 根拠のある回答 |

### RAGが解決する問題

1. **知識の鮮度** - 最新情報への対応
2. **専門知識** - 社内文書や特定分野の知識
3. **回答の根拠** - 情報源の明示

## RAGシステムの構成要素

### 1. データ準備
- **文書収集**: PDF、Word、Webページなど
- **前処理**: テキスト抽出、クリーニング
- **チャンク分割**: 適切なサイズに分割

### 2. ベクトル化
- **埋め込みモデル**: テキストをベクトルに変換
- **ベクトルDB**: 効率的な類似検索

### 3. 検索システム
- **類似度検索**: クエリに関連する文書を取得
- **リランキング**: 検索結果の精度向上

### 4. 生成システム
- **プロンプト作成**: 検索結果を含むプロンプト
- **LLM生成**: 最終的な回答生成

## 開発環境の準備

### 必要なライブラリのインストール

```bash
pip install langchain
pip install langchain-community
pip install langchain-openai
pip install chromadb
pip install pypdf
pip install python-dotenv
```

### 環境変数の設定

```bash
# .envファイルを作成
OPENAI_API_KEY=your_openai_api_key_here
```

## はじめてのRAG実装

### シンプルなRAGシステム

```python
import os
from dotenv import load_dotenv
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA

# 環境変数の読み込み
load_dotenv()

# 1. ドキュメントの準備
documents = [
    "RAGは検索拡張生成の略です。",
    "RAGシステムは外部データベースから情報を検索し、その情報を使って回答を生成します。",
    "ベクトルデータベースは文書の意味的検索を可能にします。"
]

# 2. テキスト分割
text_splitter = CharacterTextSplitter(chunk_size=100, chunk_overlap=0)
texts = text_splitter.create_documents(documents)

# 3. 埋め込みの作成
embeddings = OpenAIEmbeddings()

# 4. ベクトルストアの作成
vectorstore = Chroma.from_documents(texts, embeddings)

# 5. 検索チェーンの作成
llm = OpenAI(temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

# 6. 質問と回答
question = "RAGとは何ですか？"
answer = qa_chain.run(question)
print(f"質問: {question}")
print(f"回答: {answer}")
```

## LangChainでRAG構築

### PDFファイルを使ったRAG

```python
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

class PDFRAGSystem:
    def __init__(self, pdf_path):
        self.pdf_path = pdf_path
        self.setup_rag()
    
    def setup_rag(self):
        # 1. PDF読み込み
        loader = PyPDFLoader(self.pdf_path)
        documents = loader.load()
        
        # 2. テキスト分割
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        texts = text_splitter.split_documents(documents)
        
        # 3. ベクトルストア作成
        embeddings = OpenAIEmbeddings()
        self.vectorstore = Chroma.from_documents(texts, embeddings)
        
        # 4. 会話チェーン作成
        llm = ChatOpenAI(temperature=0)
        memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )
        
        self.qa_chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=self.vectorstore.as_retriever(),
            memory=memory
        )
    
    def ask(self, question):
        response = self.qa_chain({"question": question})
        return response["answer"]

# 使用例
rag_system = PDFRAGSystem("document.pdf")
answer = rag_system.ask("この文書の主要なポイントは何ですか？")
print(answer)
```

## LlamaIndexでRAG構築

### シンプルなLlamaIndex実装

```python
from llama_index import VectorStoreIndex, SimpleDirectoryReader, ServiceContext
from llama_index.llms import OpenAI
from llama_index.embeddings import OpenAIEmbedding

class LlamaIndexRAG:
    def __init__(self, data_dir):
        self.data_dir = data_dir
        self.setup_index()
    
    def setup_index(self):
        # 1. ドキュメント読み込み
        documents = SimpleDirectoryReader(self.data_dir).load_data()
        
        # 2. サービスコンテキスト設定
        llm = OpenAI(model="gpt-3.5-turbo", temperature=0)
        embed_model = OpenAIEmbedding()
        
        service_context = ServiceContext.from_defaults(
            llm=llm,
            embed_model=embed_model
        )
        
        # 3. インデックス作成
        self.index = VectorStoreIndex.from_documents(
            documents,
            service_context=service_context
        )
        
        # 4. クエリエンジン作成
        self.query_engine = self.index.as_query_engine()
    
    def query(self, question):
        response = self.query_engine.query(question)
        return response.response

# 使用例
rag = LlamaIndexRAG("./documents")
answer = rag.query("この文書について教えてください")
print(answer)
```

## RAGシステムの改善

### 1. チャンクサイズの最適化

```python
# 異なるチャンクサイズでテスト
chunk_sizes = [200, 500, 1000, 1500]
best_score = 0
best_size = 0

for size in chunk_sizes:
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=size,
        chunk_overlap=size//5
    )
    # 評価ロジック
    score = evaluate_rag_system(text_splitter)
    if score > best_score:
        best_score = score
        best_size = size

print(f"最適なチャンクサイズ: {best_size}")
```

### 2. 検索精度の向上

```python
from langchain.retrievers import BM25Retriever, EnsembleRetriever

# ハイブリッド検索の実装
def create_hybrid_retriever(documents):
    # ベクトル検索
    embeddings = OpenAIEmbeddings()
    vectorstore = Chroma.from_documents(documents, embeddings)
    vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
    
    # キーワード検索
    bm25_retriever = BM25Retriever.from_documents(documents)
    bm25_retriever.k = 5
    
    # アンサンブル検索
    ensemble_retriever = EnsembleRetriever(
        retrievers=[vector_retriever, bm25_retriever],
        weights=[0.7, 0.3]
    )
    
    return ensemble_retriever
```

### 3. プロンプトの改善

```python
from langchain.prompts import PromptTemplate

# カスタムプロンプトテンプレート
custom_prompt = PromptTemplate(
    template="""以下の文脈を使用して質問に答えてください。
答えがわからない場合は、「わかりません」と答えてください。
必ず文脈に基づいて回答し、情報源を明示してください。

文脈:
{context}

質問: {question}

回答:""",
    input_variables=["context", "question"]
)

# プロンプト付きチェーンの作成
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type_kwargs={"prompt": custom_prompt}
)
```

## 実践的な応用例

### 1. 社内FAQシステム

```python
class CompanyFAQSystem:
    def __init__(self, faq_documents):
        self.setup_rag(faq_documents)
    
    def setup_rag(self, documents):
        # RAGシステムの構築
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )
        texts = text_splitter.create_documents(documents)
        
        embeddings = OpenAIEmbeddings()
        self.vectorstore = Chroma.from_documents(texts, embeddings)
        
        llm = ChatOpenAI(temperature=0)
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=self.vectorstore.as_retriever()
        )
    
    def get_answer(self, question):
        # 関連度の低い質問をフィルタリング
        if self.is_relevant_question(question):
            return self.qa_chain.run(question)
        else:
            return "申し訳ございませんが、その質問については回答できません。"
    
    def is_relevant_question(self, question):
        # 関連度チェックのロジック
        relevant_docs = self.vectorstore.similarity_search(question, k=1)
        return len(relevant_docs) > 0 and relevant_docs[0].metadata.get('score', 0) > 0.7
```

### 2. 文書要約システム

```python
from langchain.chains.summarize import load_summarize_chain

class DocumentSummarizer:
    def __init__(self):
        self.llm = ChatOpenAI(temperature=0)
        self.summarize_chain = load_summarize_chain(
            self.llm,
            chain_type="map_reduce"
        )
    
    def summarize_with_rag(self, documents, query=None):
        if query:
            # RAGを使って特定の観点から要約
            retriever = self.create_retriever(documents)
            relevant_docs = retriever.get_relevant_documents(query)
            return self.summarize_chain.run(relevant_docs)
        else:
            # 全体の要約
            return self.summarize_chain.run(documents)
```

## よくある問題と解決方法

### 1. 検索精度が低い

**問題**: 関連性の低い文書が検索される

**解決策**:
- チャンクサイズの調整
- 埋め込みモデルの変更
- ハイブリッド検索の導入

```python
# 改善例
def improve_retrieval_accuracy():
    # より良い埋め込みモデルを使用
    embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
    
    # メタデータフィルタリング
    retriever = vectorstore.as_retriever(
        search_kwargs={
            "k": 10,
            "filter": {"category": "技術文書"}
        }
    )
    
    return retriever
```

### 2. 回答が長すぎる

**問題**: 冗長な回答が生成される

**解決策**:
- プロンプトで回答の長さを指定
- temperatureパラメータの調整

```python
concise_prompt = PromptTemplate(
    template="""以下の文脈を使用して、質問に対して簡潔に答えてください（100文字以内）。

文脈: {context}
質問: {question}
簡潔な回答:""",
    input_variables=["context", "question"]
)
```

### 3. 処理速度が遅い

**問題**: 大量のドキュメントで検索が遅い

**解決策**:
- ベクトルDBの最適化
- キャッシュの活用
- 並列処理の導入

```python
# キャッシュの実装例
from functools import lru_cache

class CachedRAGSystem:
    @lru_cache(maxsize=100)
    def cached_search(self, query):
        return self.vectorstore.similarity_search(query)
```

### 4. コスト管理

**問題**: API使用料が高額になる

**解決策**:
- ローカルLLMの活用
- キャッシュによるAPI呼び出し削減
- バッチ処理の導入

```python
# コスト削減の例
def cost_effective_rag():
    # より安価なモデルを使用
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
    
    # 検索結果を制限
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
    
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever
    )
```

## 🎓 まとめ

このガイドでは、RAGシステムの基礎から実践的な応用まで学習しました：

1. **基本概念** - RAGの仕組みと利点
2. **実装方法** - LangChainとLlamaIndexでの構築
3. **改善技術** - 精度向上とパフォーマンス最適化
4. **実用例** - 実際のビジネス場面での活用
5. **問題解決** - よくある課題への対処法

### 次のステップ

1. **実際に手を動かす** - サンプルコードを試してみる
2. **自分のデータで実験** - 身近なドキュメントでRAGを構築
3. **評価指標の学習** - RAGシステムの性能評価方法
4. **本番運用の準備** - スケーラビリティとモニタリング

RAG技術は急速に進歩しているため、継続的な学習と実験が重要です。