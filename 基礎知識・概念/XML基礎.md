# XML基礎とAI活用

**所要時間**: 45分  
**レベル**: 基礎  
**前提知識**: [Markdown活用基礎](05-markdown-basics.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- XMLの基本構造と記法を理解できる
- AIとの対話でXMLフォーマットを効果的に活用できる
- データ交換・設定ファイルとしてのXML活用ができる
- XMLとHTML、JSONとの使い分けができる

## 📋 目次

1. [XMLとは](#xmlとは)
2. [XML基本構文](#xml基本構文)
3. [AIとの対話でのXML活用](#aiとの対話でのxml活用)
4. [実践的なXML活用パターン](#実践的なxml活用パターン)
5. [XMLツールと処理方法](#xmlツールと処理方法)

---

## XMLとは

### 🤔 XMLの特徴と重要性

**XML**（eXtensible Markup Language）は、データを構造化して記述するためのマークアップ言語です。

#### XMLの主な特徴
```
✅ 構造化データの表現が得意
✅ 自己記述的（データの意味が分かりやすい）
✅ プラットフォーム非依存
✅ 厳密な構文規則
✅ 拡張性が高い
```

#### AI時代におけるXMLの価値
- **構造化された指示**: 複雑なデータ構造をAIに正確に伝達
- **設定ファイル**: AI系ツールの設定やワークフロー定義
- **データ交換**: 異なるシステム間でのデータ交換
- **テンプレート**: 構造化されたテンプレートの定義

### 🔄 XML vs HTML vs JSON

| 特徴 | XML | HTML | JSON |
|------|-----|------|------|
| **主な用途** | データ構造化 | Web表示 | データ交換 |
| **厳密性** | 厳密 | 緩い | 厳密 |
| **可読性** | 高い | 中程度 | 高い |
| **サイズ** | 大きい | 中程度 | 小さい |
| **AI活用** | 構造化指示 | Web解析 | API連携 |

#### 使い分けの指針
```
XML を選ぶべき場面:
- 複雑なデータ構造
- メタデータが重要
- 厳密な検証が必要
- 文書構造の定義

JSON を選ぶべき場面:
- API通信
- 軽量なデータ交換
- JavaScript連携
- シンプルな構造

HTML を選ぶべき場面:
- Web表示
- マークアップ
- ブラウザ表示
```

---

## XML基本構文

### 📝 基本構造

#### 最小限のXML文書
```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <data>Hello, XML!</data>
</root>
```

#### 完全なXML文書の例
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- これはコメントです -->
<bookstore>
    <book id="1" category="fiction">
        <title lang="en">Great Gatsby</title>
        <author>F. Scott Fitzgerald</author>
        <year>1925</year>
        <price currency="USD">12.99</price>
        <description>
            <![CDATA[The Great Gatsby is a classic American novel.]]>
        </description>
    </book>
    <book id="2" category="science">
        <title lang="en">A Brief History of Time</title>
        <author>Stephen Hawking</author>
        <year>1988</year>
        <price currency="USD">14.99</price>
    </book>
</bookstore>
```

### 🏗️ XML構文規則

#### 1. 必須要素
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- XML宣言（省略可能だが推奨） -->

<root>
    <!-- ルート要素は必須（1つだけ） -->
    <content>データ</content>
</root>
```

#### 2. 要素（Elements）
```xml
<!-- 開始タグと終了タグ -->
<element>コンテンツ</element>

<!-- 空要素（2つの書き方） -->
<empty></empty>
<empty/>

<!-- ネストした要素 -->
<parent>
    <child>子要素</child>
    <child>別の子要素</child>
</parent>
```

#### 3. 属性（Attributes）
```xml
<!-- 属性の基本形 -->
<element attribute="value">コンテンツ</element>

<!-- 複数属性 -->
<book id="123" category="fiction" available="true">
    <title>Book Title</title>
</book>

<!-- 属性値は必ずクォートで囲む -->
<correct attribute="value"/>
<!-- <incorrect attribute=value/> これはエラー -->
```

#### 4. 特殊文字とCDATA
```xml
<!-- 特殊文字のエスケープ -->
<text>5 &lt; 10 &amp; 10 &gt; 5</text>
<!-- 結果: 5 < 10 & 10 > 5 -->

<!-- エスケープ文字一覧 -->
<!-- &lt; → < -->
<!-- &gt; → > -->
<!-- &amp; → & -->
<!-- &quot; → " -->
<!-- &apos; → ' -->

<!-- CDATA セクション（エスケープ不要） -->
<code>
    <![CDATA[
    if (x < y && y > z) {
        console.log("Hello & Goodbye");
    }
    ]]>
</code>
```

#### 5. コメント
```xml
<!-- これは単行コメント -->

<!-- 
これは
複数行
コメント
-->

<!-- コメントは要素内には書けない -->
<element <!-- これはエラー --> attribute="value">
```

### 🔍 名前空間（Namespaces）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- デフォルト名前空間 -->
<bookstore xmlns="http://example.com/bookstore">
    <book>
        <title>Sample Book</title>
    </book>
</bookstore>

<!-- プレフィックス付き名前空間 -->
<root xmlns:books="http://example.com/books"
      xmlns:authors="http://example.com/authors">
    <books:book>
        <books:title>XML Guide</books:title>
        <authors:author>John Doe</authors:author>
    </books:book>
</root>
```

---

## AIとの対話でのXML活用

### 🎯 構造化データの指示

#### データ構造の明確な定義
```xml
<!-- AIに対してデータ構造を指示する例 -->
以下のXML構造に従って、商品データを生成してください：

<products>
    <product id="1">
        <name>商品名</name>
        <category>カテゴリ</category>
        <price currency="JPY">価格</price>
        <description>商品説明</description>
        <specifications>
            <spec name="サイズ">値</spec>
            <spec name="重量">値</spec>
            <spec name="材質">値</spec>
        </specifications>
        <availability>在庫状況</availability>
    </product>
</products>

条件：
- 商品は5つ作成
- カテゴリは「電子機器」「家具」「衣類」から選択
- 価格は1,000円〜50,000円の範囲
- 仕様は各商品で適切な項目を設定
```

#### 複雑な設定指示
```xml
<!-- AIツールの設定をXMLで指示 -->
以下の設定に従って、データ分析レポートを作成してください：

<analysis-config>
    <data-source>
        <file>sales_data.csv</file>
        <columns>
            <column name="date" type="datetime"/>
            <column name="product" type="string"/>
            <column name="sales" type="numeric"/>
            <column name="region" type="string"/>
        </columns>
    </data-source>
    
    <analysis-methods>
        <method name="trend-analysis">
            <parameters>
                <period>monthly</period>
                <smoothing>moving-average</smoothing>
            </parameters>
        </method>
        <method name="regional-comparison">
            <parameters>
                <groupby>region</groupby>
                <metric>total-sales</metric>
            </parameters>
        </method>
    </analysis-methods>
    
    <output-format>
        <type>markdown</type>
        <include-charts>true</include-charts>
        <chart-types>
            <chart>line</chart>
            <chart>bar</chart>
            <chart>pie</chart>
        </chart-types>
    </output-format>
</analysis-config>
```

### 📋 テンプレート定義

#### 文書テンプレートの指示
```xml
<!-- 報告書テンプレートをXMLで定義 -->
以下のテンプレート構造に従って報告書を作成してください：

<report-template>
    <header>
        <title>報告書タイトル</title>
        <date>作成日</date>
        <author>作成者</author>
        <department>部署</department>
    </header>
    
    <executive-summary>
        <length max-words="200">要約</length>
        <key-points>
            <point priority="high">重要ポイント1</point>
            <point priority="medium">重要ポイント2</point>
            <point priority="low">重要ポイント3</point>
        </key-points>
    </executive-summary>
    
    <sections>
        <section id="background">
            <title>背景・目的</title>
            <content type="narrative">背景説明</content>
        </section>
        <section id="methodology">
            <title>調査方法</title>
            <content type="structured">
                <method>調査手法</method>
                <sample>サンプル情報</sample>
                <period>調査期間</period>
            </content>
        </section>
        <section id="results">
            <title>結果</title>
            <content type="data-driven">
                <findings>主な発見</findings>
                <charts>グラフ・表</charts>
                <statistics>統計データ</statistics>
            </content>
        </section>
        <section id="conclusions">
            <title>結論・提言</title>
            <content type="actionable">
                <conclusions>結論</conclusions>
                <recommendations>提言</recommendations>
                <next-steps>次のステップ</next-steps>
            </content>
        </section>
    </sections>
    
    <appendices>
        <appendix id="raw-data">生データ</appendix>
        <appendix id="references">参考文献</appendix>
    </appendices>
</report-template>
```

### 🔧 ワークフロー定義

#### 業務プロセスの構造化
```xml
<!-- AIに業務フローを指示するXML -->
以下のワークフローに従って、プロジェクト管理手順を作成してください：

<workflow name="project-management">
    <phases>
        <phase id="planning" duration="2-weeks">
            <title>企画・計画段階</title>
            <tasks>
                <task id="requirement-gathering" priority="high">
                    <name>要件収集</name>
                    <assignee role="project-manager"/>
                    <deliverables>
                        <deliverable>要件定義書</deliverable>
                        <deliverable>ステークホルダー一覧</deliverable>
                    </deliverables>
                    <dependencies/>
                </task>
                <task id="resource-planning" priority="high">
                    <name>リソース計画</name>
                    <assignee role="project-manager"/>
                    <deliverables>
                        <deliverable>リソース計画書</deliverable>
                        <deliverable>予算計画</deliverable>
                    </deliverables>
                    <dependencies>
                        <dependency task-id="requirement-gathering"/>
                    </dependencies>
                </task>
            </tasks>
            <milestones>
                <milestone>企画承認</milestone>
            </milestones>
        </phase>
        
        <phase id="execution" duration="8-weeks">
            <title>実行段階</title>
            <tasks>
                <task id="development" priority="high">
                    <name>開発作業</name>
                    <assignee role="developer"/>
                    <deliverables>
                        <deliverable>機能実装</deliverable>
                        <deliverable>テストコード</deliverable>
                    </deliverables>
                    <dependencies>
                        <dependency task-id="resource-planning"/>
                    </dependencies>
                </task>
            </tasks>
        </phase>
    </phases>
    
    <quality-gates>
        <gate phase="planning">
            <criteria>要件定義完了</criteria>
            <criteria>予算承認済み</criteria>
        </gate>
        <gate phase="execution">
            <criteria>テスト完了</criteria>
            <criteria>品質基準クリア</criteria>
        </gate>
    </quality-gates>
    
    <communication-plan>
        <meeting type="status" frequency="weekly">
            <participants>
                <participant role="project-manager"/>
                <participant role="team-lead"/>
            </participants>
        </meeting>
        <reporting type="progress" frequency="bi-weekly">
            <recipient role="stakeholder"/>
            <format>dashboard</format>
        </reporting>
    </communication-plan>
</workflow>
```

---

## 実践的なXML活用パターン

### 📊 データ管理での活用

#### 顧客データベース設計
```xml
<?xml version="1.0" encoding="UTF-8"?>
<customer-database>
    <customer id="C001" status="active" created="2024-01-15">
        <personal-info>
            <name>
                <first>太郎</first>
                <last>山田</last>
                <full>山田太郎</full>
            </name>
            <contact>
                <email primary="true">yamada@example.com</email>
                <email>yamada.sub@example.com</email>
                <phone type="mobile">090-1234-5678</phone>
                <phone type="office">03-1234-5678</phone>
                <address type="billing">
                    <postal-code>100-0001</postal-code>
                    <prefecture>東京都</prefecture>
                    <city>千代田区</city>
                    <street>千代田1-1-1</street>
                    <building>サンプルビル301</building>
                </address>
                <address type="shipping">
                    <postal-code>150-0001</postal-code>
                    <prefecture>東京都</prefecture>
                    <city>渋谷区</city>
                    <street>神宮前1-1-1</street>
                </address>
            </contact>
        </personal-info>
        
        <business-info>
            <company>株式会社サンプル</company>
            <department>IT部</department>
            <position>部長</position>
            <industry>情報技術</industry>
        </business-info>
        
        <preferences>
            <communication>
                <preferred-method>email</preferred-method>
                <language>ja</language>
                <timezone>Asia/Tokyo</timezone>
            </communication>
            <marketing>
                <newsletter consent="true"/>
                <sms consent="false"/>
                <phone consent="true"/>
            </marketing>
        </preferences>
        
        <purchase-history>
            <order id="ORD001" date="2024-01-20" total="15000">
                <item product-id="P001" quantity="2" price="5000"/>
                <item product-id="P002" quantity="1" price="5000"/>
                <shipping-method>standard</shipping-method>
                <payment-method>credit-card</payment-method>
                <status>completed</status>
            </order>
            <order id="ORD002" date="2024-02-15" total="25000">
                <item product-id="P003" quantity="1" price="25000"/>
                <shipping-method>express</shipping-method>
                <payment-method>bank-transfer</payment-method>
                <status>shipped</status>
            </order>
        </purchase-history>
        
        <segmentation>
            <segment>premium-customer</segment>
            <segment>frequent-buyer</segment>
            <loyalty-level>gold</loyalty-level>
            <lifetime-value>45000</lifetime-value>
        </segmentation>
    </customer>
</customer-database>
```

### ⚙️ 設定ファイルでの活用

#### アプリケーション設定
```xml
<?xml version="1.0" encoding="UTF-8"?>
<application-config>
    <general>
        <app-name>AI Assistant Pro</app-name>
        <version>2.1.0</version>
        <environment>production</environment>
        <debug-mode>false</debug-mode>
    </general>
    
    <database>
        <connection>
            <host>db.example.com</host>
            <port>5432</port>
            <database>ai_assistant</database>
            <username>app_user</username>
            <password encrypted="true">XyZ123EnCryPted</password>
            <ssl-mode>require</ssl-mode>
        </connection>
        <pool>
            <min-connections>5</min-connections>
            <max-connections>50</max-connections>
            <timeout>30</timeout>
        </pool>
    </database>
    
    <ai-services>
        <openai>
            <api-key encrypted="true">sk-EnCryPtedKey</api-key>
            <model>gpt-4</model>
            <max-tokens>2000</max-tokens>
            <temperature>0.7</temperature>
            <rate-limit>
                <requests-per-minute>60</requests-per-minute>
                <tokens-per-minute>90000</tokens-per-minute>
            </rate-limit>
        </openai>
        <claude>
            <api-key encrypted="true">sk-ant-EnCryPtedKey</api-key>
            <model>claude-3-sonnet-20240229</model>
            <max-tokens>4000</max-tokens>
        </claude>
    </ai-services>
    
    <features>
        <feature name="multi-language" enabled="true">
            <supported-languages>
                <language code="ja">日本語</language>
                <language code="en">English</language>
                <language code="zh">中文</language>
            </supported-languages>
        </feature>
        <feature name="file-upload" enabled="true">
            <max-file-size>10MB</max-file-size>
            <allowed-types>
                <type>pdf</type>
                <type>docx</type>
                <type>txt</type>
                <type>csv</type>
                <type>xlsx</type>
            </allowed-types>
        </feature>
        <feature name="voice-input" enabled="false"/>
    </features>
    
    <logging>
        <level>INFO</level>
        <output>
            <file path="/var/log/ai-assistant.log" max-size="100MB"/>
            <console format="json"/>
        </output>
        <categories>
            <category name="api" level="DEBUG"/>
            <category name="database" level="WARN"/>
            <category name="security" level="ERROR"/>
        </categories>
    </logging>
    
    <security>
        <authentication>
            <method>jwt</method>
            <secret-key encrypted="true">JwtSecretKey</secret-key>
            <expiration>3600</expiration>
        </authentication>
        <cors>
            <allowed-origins>
                <origin>https://app.example.com</origin>
                <origin>https://admin.example.com</origin>
            </allowed-origins>
            <allowed-methods>
                <method>GET</method>
                <method>POST</method>
                <method>PUT</method>
                <method>DELETE</method>
            </allowed-methods>
        </cors>
    </security>
</application-config>
```

### 📄 文書構造での活用

#### 技術文書のメタデータ
```xml
<?xml version="1.0" encoding="UTF-8"?>
<technical-document>
    <metadata>
        <document-info>
            <title>AI API統合ガイド</title>
            <subtitle>実践的な実装手順書</subtitle>
            <version>1.2</version>
            <status>published</status>
            <classification>internal</classification>
        </document-info>
        
        <authoring>
            <author id="author1">
                <name>田中太郎</name>
                <email>tanaka@example.com</email>
                <role>シニアエンジニア</role>
                <department>開発部</department>
            </author>
            <reviewer id="reviewer1">
                <name>佐藤花子</name>
                <email>sato@example.com</email>
                <role>テックリード</role>
            </reviewer>
            <approver id="approver1">
                <name>鈴木次郎</name>
                <email>suzuki@example.com</email>
                <role>部長</role>
            </approver>
        </authoring>
        
        <dates>
            <created>2024-01-15</created>
            <last-modified>2024-03-10</last-modified>
            <reviewed>2024-03-05</reviewed>
            <approved>2024-03-08</approved>
            <next-review>2024-09-15</next-review>
        </dates>
        
        <tags>
            <tag category="technology">AI</tag>
            <tag category="technology">API</tag>
            <tag category="audience">developer</tag>
            <tag category="difficulty">intermediate</tag>
        </tags>
        
        <related-documents>
            <document id="DOC001" relationship="prerequisite">API基礎ガイド</document>
            <document id="DOC002" relationship="reference">セキュリティガイドライン</document>
            <document id="DOC003" relationship="follow-up">高度なAI活用</document>
        </related-documents>
    </metadata>
    
    <structure>
        <section id="overview" level="1">
            <title>概要</title>
            <estimated-reading-time>10分</estimated-reading-time>
            <prerequisites>
                <prerequisite>RESTful API の基本理解</prerequisite>
                <prerequisite>JSON形式の理解</prerequisite>
                <prerequisite>プログラミング経験（任意の言語）</prerequisite>
            </prerequisites>
        </section>
        
        <section id="setup" level="1">
            <title>環境設定</title>
            <estimated-reading-time>20分</estimated-reading-time>
            <subsections>
                <subsection id="api-keys" level="2">
                    <title>APIキーの取得</title>
                </subsection>
                <subsection id="libraries" level="2">
                    <title>必要なライブラリ</title>
                </subsection>
            </subsections>
        </section>
        
        <section id="implementation" level="1">
            <title>実装</title>
            <estimated-reading-time>45分</estimated-reading-time>
            <difficulty>high</difficulty>
            <code-examples>
                <example language="python">基本的な実装例</example>
                <example language="javascript">Node.js実装例</example>
                <example language="java">Java実装例</example>
            </code-examples>
        </section>
    </structure>
    
    <content-guidelines>
        <style-guide>technical-writing-v2</style-guide>
        <target-audience>
            <audience level="intermediate">開発者</audience>
            <audience level="beginner">IT担当者</audience>
        </target-audience>
        <quality-criteria>
            <criterion>実行可能なコード例</criterion>
            <criterion>エラーハンドリングの説明</criterion>
            <criterion>セキュリティ考慮事項</criterion>
        </quality-criteria>
    </content-guidelines>
</technical-document>
```

---

## XMLツールと処理方法

### 🛠️ オンラインXMLツール

#### 検証・整形ツール
```
XML検証ツール:
- XMLValidator.com
- W3Schools XML Validator
- FreeFormater.com XML Validator

XML整形ツール:
- XML Formatter
- Code Beautify XML Formatter
- Online XML Tools
```

#### 変換ツール
```
XML ↔ JSON 変換:
- ConvertJSON.com
- XMLtoJSON.org
- JSONtoXML.com

XML ↔ CSV 変換:
- XML to CSV Converter
- ConvertCSV.com
```

### 💻 プログラミング言語でのXML処理

#### Python での XML処理
```python
import xml.etree.ElementTree as ET
import json

# XMLファイルの読み込み
tree = ET.parse('data.xml')
root = tree.getroot()

# 要素の検索
for book in root.findall('book'):
    title = book.find('title').text
    author = book.find('author').text
    print(f"タイトル: {title}, 著者: {author}")

# XMLの作成
root = ET.Element('bookstore')
book = ET.SubElement(root, 'book', {'id': '1'})
title = ET.SubElement(book, 'title')
title.text = 'Sample Book'

# XMLとして出力
xml_string = ET.tostring(root, encoding='unicode')
print(xml_string)
```

#### JavaScript での XML処理
```javascript
// XMLの解析（ブラウザ環境）
function parseXML(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    // 要素の取得
    const books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        console.log(`タイトル: ${title}, 著者: ${author}`);
    }
}

// XMLの作成
function createXML() {
    const xmlDoc = document.implementation.createDocument("", "", null);
    const root = xmlDoc.createElement("bookstore");
    xmlDoc.appendChild(root);
    
    const book = xmlDoc.createElement("book");
    book.setAttribute("id", "1");
    
    const title = xmlDoc.createElement("title");
    title.textContent = "Sample Book";
    book.appendChild(title);
    
    root.appendChild(book);
    
    // XMLとして文字列化
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDoc);
    return xmlString;
}
```

### 🔍 XMLスキーマ検証

#### XSD（XML Schema Definition）の例
```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
    
    <!-- ルート要素の定義 -->
    <xs:element name="bookstore">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="book" maxOccurs="unbounded">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="title" type="xs:string"/>
                            <xs:element name="author" type="xs:string"/>
                            <xs:element name="year" type="xs:int"/>
                            <xs:element name="price" type="priceType"/>
                        </xs:sequence>
                        <xs:attribute name="id" type="xs:string" use="required"/>
                        <xs:attribute name="category" type="categoryType"/>
                    </xs:complexType>
                </xs:element>
            </xs:sequence>
        </xs:complexType>
    </xs:element>
    
    <!-- カスタム型の定義 -->
    <xs:complexType name="priceType">
        <xs:simpleContent>
            <xs:extension base="xs:decimal">
                <xs:attribute name="currency" type="xs:string"/>
            </xs:extension>
        </xs:simpleContent>
    </xs:complexType>
    
    <xs:simpleType name="categoryType">
        <xs:restriction base="xs:string">
            <xs:enumeration value="fiction"/>
            <xs:enumeration value="science"/>
            <xs:enumeration value="history"/>
            <xs:enumeration value="biography"/>
        </xs:restriction>
    </xs:simpleType>
    
</xs:schema>
```

---

## 💡 実践演習

### 演習1: 基本XML作成

以下の情報をXML形式で構造化してください：

```
タスク: 社員データベースの設計

含める情報:
- 社員ID、名前、部署、役職
- 連絡先（メール、電話）
- スキル（複数可）
- プロジェクト履歴（複数可）
- 評価情報

要件:
- 適切な属性の使い分け
- ネストした構造の活用
- 名前空間の適用（任意）
```

### 演習2: AIとの対話でのXML活用

以下のシナリオでXMLを使った指示を作成してください：

```
シナリオ: ECサイトの商品データ生成依頼

条件:
- XMLスキーマでデータ構造を定義
- 生成する商品数と条件を指定
- バリデーション規則を含める
- 出力形式を詳細に指定
```

### 演習3: XML変換・処理

以下のタスクを実行してください：

```
タスク: XMLデータの変換と処理

手順:
1. XMLファイルをJSONに変換
2. 特定の条件でデータをフィルタリング
3. 集計・分析を実行
4. 結果を新しいXMLフォーマットで出力

ツール: オンラインツールまたはプログラミング言語
```

---

## 📚 参考資料

### XML仕様・標準
- [W3C XML Specification](https://www.w3.org/XML/)
- [XML Schema (XSD) Tutorial](https://www.w3schools.com/xml/schema_intro.asp)
- [XSLT Tutorial](https://www.w3schools.com/xml/xsl_intro.asp)

### ツール・ライブラリ
- [lxml (Python)](https://lxml.de/)
- [xml2js (Node.js)](https://github.com/Leonidas-from-XIV/node-xml2js)
- [Jackson XML (Java)](https://github.com/FasterXML/jackson-dataformat-xml)

### オンラインリソース
- [W3Schools XML Tutorial](https://www.w3schools.com/xml/)
- [XML Tutorial - MDN](https://developer.mozilla.org/en-US/docs/Web/XML)

---

## ✅ 理解度確認

この講座の内容を理解できたか、以下で確認してください：

1. XMLの基本構文を理解し、正しく記述できますか？
2. AIとの対話でXMLフォーマットを効果的に活用できますか？
3. XMLとJSON、HTMLの使い分けができますか？
4. XMLスキーマの基本概念を理解していますか？
5. 実際の業務でXMLを活用できますか？

すべて「はい」なら次の講座に進めます。

---

**次の講座**: [HTML基礎](07-html-basics.md)