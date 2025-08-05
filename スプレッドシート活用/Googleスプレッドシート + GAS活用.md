# Googleスプレッドシート + GAS活用

**所要時間**: 1.5時間  
**レベル**: 中級  
**前提知識**: [Excel + AI活用](05-excel-ai.md)

## 学習目標

この講座を修了すると、以下ができるようになります：
- Google Apps Script（GAS）をAIで自動生成できる
- スプレッドシートとGoogleサービスを連携できる
- Webアプリケーションや自動化システムを構築できる
- API連携による高度な自動化を実装できる

## 📋 目次

1. [GAS + AI活用の基本概念](#gas--ai活用の基本概念)
2. [GAS基本コードの自動生成](#gas基本コードの自動生成)
3. [Googleサービス連携](#googleサービス連携)
4. [API連携の実装](#api連携の実装)
5. [Webアプリケーション開発](#webアプリケーション開発)
6. [自動化システムの構築](#自動化システムの構築)
7. [実践的な活用例](#実践的な活用例)

---

## GAS + AI活用の基本概念

### GASとExcel VBAの違い

| 項目 | Google Apps Script | Excel VBA |
|------|-------------------|-----------|
| 実行環境 | クラウド（Googleサーバー） | ローカル（個人PC） |
| 連携サービス | Googleサービス全般 | Officeアプリケーション |
| 共有・協業 | リアルタイム共有 | ファイル共有ベース |
| 自動実行 | 時間・イベントトリガー | マクロボタン・イベント |
| 外部API | 容易に連携可能 | 制限あり |

### AIでGAS開発する利点

#### ✅ 開発効率の向上
- **コード生成**: 80-90%の時間短縮
- **API連携**: 複雑な設定の自動化
- **エラー対応**: デバッグ支援
- **ベストプラクティス**: 最適なコード構造

#### ✅ 学習コストの削減
- プログラミング初心者でも高度な機能実装
- Google API仕様の自動理解
- セキュリティ考慮の自動組み込み

---

## GAS基本コードの自動生成

### 基本的なGAS生成プロンプト

```
「以下の機能を実現するGoogle Apps Scriptのコードを作成してください。

【機能概要】
[具体的にやりたいこと]

【対象スプレッドシート】
- スプレッドシートID: [IDまたは"アクティブシート"]
- シート名: [シート名]
- データ範囲: [A1:Z100など]

【処理内容】
1. [ステップ1]
2. [ステップ2]
3. [ステップ3]

【実行タイミング】
手動実行/時間トリガー/編集時/フォーム送信時

【エラー処理】
- 想定されるエラーケース
- エラー時の通知方法

【権限・認証】
必要なGoogle APIの権限も教えてください。」
```

### 実践例1: データ整形・集計

#### ビジネスシナリオ
複数のGoogleフォームから収集したデータの自動集計

#### プロンプト
```
「複数のGoogleフォームの回答を1つのスプレッドシートに自動集計するGASを作成してください。

【要件】
1. 3つの異なるフォームの回答を統合
2. 回答者の重複チェック（メールアドレスで判定）
3. 日付別、部門別の集計表を自動作成
4. 新しい回答があった時に自動実行

【フォーム情報】
- フォーム1: 営業部向けアンケート
- フォーム2: 技術部向けアンケート  
- フォーム3: 管理部向けアンケート

【出力形式】
- 統合データシート
- 日別集計シート
- 部門別分析シート

【通知機能】
集計完了時にSlackまたはメール通知」
```

#### AI生成GASコード例
```javascript
function consolidateFormResponses() {
  try {
    // スプレッドシート取得
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const consolidatedSheet = ss.getSheetByName('統合データ') || ss.insertSheet('統合データ');
    
    // フォームIDの配列
    const formIds = [
      '1A2B3C4D5E6F...', // 営業部フォーム
      '1G2H3I4J5K6L...', // 技術部フォーム
      '1M2N3O4P5Q6R...'  // 管理部フォーム
    ];
    
    const departmentNames = ['営業部', '技術部', '管理部'];
    let allResponses = [];
    
    // 各フォームからデータ取得
    formIds.forEach((formId, index) => {
      const form = FormApp.openById(formId);
      const responses = form.getResponses();
      
      responses.forEach(response => {
        const itemResponses = response.getItemResponses();
        let rowData = [
          response.getTimestamp(),
          departmentNames[index],
          response.getRespondentEmail()
        ];
        
        // 回答内容を追加
        itemResponses.forEach(itemResponse => {
          rowData.push(itemResponse.getResponse());
        });
        
        allResponses.push(rowData);
      });
    });
    
    // 重複除去（メールアドレスベース）
    const uniqueResponses = removeDuplicatesByEmail(allResponses);
    
    // データをシートに書き込み
    consolidatedSheet.clear();
    if (uniqueResponses.length > 0) {
      consolidatedSheet.getRange(1, 1, uniqueResponses.length, uniqueResponses[0].length)
                      .setValues(uniqueResponses);
    }
    
    // 集計表の作成
    createSummaryTables(ss, uniqueResponses);
    
    // 通知送信
    sendNotification(`データ統合完了: ${uniqueResponses.length}件の回答を処理しました`);
    
  } catch (error) {
    console.error('エラー発生:', error);
    sendNotification(`エラー発生: ${error.message}`);
  }
}

function removeDuplicatesByEmail(responses) {
  const emailIndex = 2; // メールアドレスの列インデックス
  const seen = new Set();
  
  return responses.filter(row => {
    const email = row[emailIndex];
    if (seen.has(email)) {
      return false;
    }
    seen.add(email);
    return true;
  });
}

function createSummaryTables(ss, data) {
  // 日別集計シート作成
  const dailySheet = ss.getSheetByName('日別集計') || ss.insertSheet('日別集計');
  // 部門別集計シート作成
  const deptSheet = ss.getSheetByName('部門別集計') || ss.insertSheet('部門別集計');
  
  // 集計ロジック実装...
}

function sendNotification(message) {
  // Slack webhook URLまたはメール送信
  GmailApp.sendEmail('admin@company.com', 'フォーム集計通知', message);
}
```

### 実践例2: 定期レポート自動生成

#### プロンプト
```
「月次売上レポートを自動生成・配信するGASを作成してください。

【機能】
1. 売上データシートから当月データを集計
2. グラフ付きレポートをGoogleドキュメントで作成
3. PDFに変換してGoogle Driveに保存
4. 関係者にメール配信（PDF添付）
5. 毎月1日の朝9時に自動実行

【データ構造】
売上データシート: 日付、商品、地域、売上金額、利益

【レポート内容】
- 月次サマリー（売上・利益・前年比）
- 商品別売上TOP10
- 地域別売上グラフ
- 前年同期比較表

【配信先】
配信リストはスpreedsheetの「配信先」シートから取得」
```

---

## Googleサービス連携

### Gmail連携

#### 自動メール送信システム
```
プロンプト:
「条件に応じて自動メール送信を行うGASを作成してください。

【トリガー条件】
- スプレッドシートの特定列が更新された時
- 値が特定の条件を満たした場合（例：売上が目標値の80%を下回る）

【メール内容】
- 件名: 自動生成（条件に応じて変更）
- 本文: テンプレートベース（動的な値を埋め込み）
- 添付ファイル: 該当データのCSVエクスポート

【機能】
- 重複送信防止
- 送信履歴の記録
- エラーハンドリング
- 送信先管理（BCCでプライバシー保護）」
```

### Googleカレンダー連携

#### スケジュール自動登録
```
プロンプト:
「スプレッドシートの予定データを自動でGoogleカレンダーに登録するGASを作成してください。

【データ構造】
A列: 開始日時, B列: 終了日時, C列: タイトル, D列: 場所, E列: 参加者メール

【機能】
1. 新しい行が追加された時に自動でカレンダーイベント作成
2. 既存イベントの更新（データ変更時）
3. 参加者への招待メール自動送信
4. 重複チェック（同じタイトル・時間のイベント防止）

【カレンダー設定】
- 対象カレンダー: メインカレンダー
- 通知設定: 30分前にメール通知
- 公開設定: 社内のみ表示可能」
```

### Google Drive連携

#### ファイル管理自動化
```
プロンプト:
「Google Driveのファイル管理を自動化するGASを作成してください。

【機能】
1. 特定フォルダの新しいファイルを自動分類
2. ファイル名のルール化（日付_部門_内容.拡張子）
3. 古いファイルの自動アーカイブ（90日経過後）
4. アクセス権限の自動設定（部門別）
5. ファイル一覧の自動更新（スプレッドシートに記録）

【分類ルール】
- PDFファイル → 文書フォルダ
- 画像ファイル → 画像フォルダ
- Excelファイル → データフォルダ

【権限設定】
- 営業部フォルダ → 営業部メンバーのみ編集可能
- 全社共有フォルダ → 全員閲覧可能、管理者のみ編集可能」
```

---

## API連携の実装

### 外部API連携の基本

#### Weather API連携例
```
プロンプト:
「天気予報APIと連携して、売上予測を補正するGASを作成してください。

【連携API】
OpenWeatherMap API（無料版）

【機能】
1. 指定地域の5日間天気予報を取得
2. 天気情報をスプレッドシートに記録
3. 天気による売上補正係数の自動計算
   - 晴れ: +10%, 曇り: 0%, 雨: -15%, 雪: -25%
4. 補正後売上予測の自動計算・更新

【データ構造】
売上予測シート: 日付、地域、基礎予測、天気、補正係数、最終予測

【エラーハンドリング】
- API接続失敗時のフォールバック
- レート制限対応
- データ不正時の処理」
```

#### AI生成コード例
```javascript
function updateWeatherAndSales() {
  const API_KEY = 'your_api_key_here'; // PropertiesServiceから取得推奨
  const cities = ['Tokyo', 'Osaka', 'Nagoya'];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('売上予測');
  
  try {
    cities.forEach((city, index) => {
      // Weather API呼び出し
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      const response = UrlFetchApp.fetch(url);
      const data = JSON.parse(response.getContentText());
      
      // 5日間の予報を処理
      data.list.slice(0, 5).forEach((forecast, dayIndex) => {
        const date = new Date(forecast.dt * 1000);
        const weather = forecast.weather[0].main;
        const temp = forecast.main.temp;
        
        // 補正係数の計算
        let weatherFactor = 1.0;
        switch(weather.toLowerCase()) {
          case 'clear': weatherFactor = 1.1; break;
          case 'clouds': weatherFactor = 1.0; break;
          case 'rain': weatherFactor = 0.85; break;
          case 'snow': weatherFactor = 0.75; break;
        }
        
        // スプレッドシートに更新
        const row = (index * 5) + dayIndex + 2; // データ開始行を調整
        sheet.getRange(row, 4).setValue(weather); // D列: 天気
        sheet.getRange(row, 5).setValue(weatherFactor); // E列: 補正係数
        
        // 最終予測の計算（基礎予測 × 補正係数）
        const baseForecast = sheet.getRange(row, 3).getValue(); // C列: 基礎予測
        const finalForecast = baseForecast * weatherFactor;
        sheet.getRange(row, 6).setValue(finalForecast); // F列: 最終予測
      });
      
      Utilities.sleep(1000); // API制限対応
    });
    
    console.log('天気情報の更新が完了しました');
    
  } catch (error) {
    console.error('API連携エラー:', error);
    // エラー通知
    GmailApp.sendEmail('admin@company.com', 'Weather API エラー', error.toString());
  }
}
```

### Slack API連携

#### 自動通知システム
```
プロンプト:
「スプレッドシートの重要な変更をSlackに自動通知するGASを作成してください。

【通知条件】
1. 売上データで目標値を超過/下回った場合
2. 新しい顧客情報が追加された場合
3. タスクの期限が近づいた場合（3日前）

【通知内容】
- メンション付きメッセージ
- データの詳細情報
- 関連するスプレッドシートへのリンク
- 必要に応じてグラフの画像添付

【Slack設定】
- チャンネル: #sales-alerts
- ボット名: SalesBot
- アイコン: カスタムアイコン

【セキュリティ】
- Webhook URLの安全な管理
- 機密情報のマスキング」
```

---

## Webアプリケーション開発

### 基本的なWebアプリ作成

#### データ入力フォーム
```
プロンプト:
「スプレッドシートへのデータ入力用Webアプリを作成してください。

【機能】
1. HTMLフォームでデータ入力
2. 入力データの検証（必須項目、形式チェック）
3. スプレッドシートへの自動追加
4. 入力完了の確認メッセージ
5. 入力履歴の表示

【入力項目】
- 顧客名（必須）
- 連絡先（メール形式検証）
- 商品カテゴリ（選択式）
- 金額（数値のみ）
- 備考（任意）

【デザイン】
- レスポンシブデザイン
- モバイル対応
- 企業ブランドカラー使用

【セキュリティ】
- CSRF対策
- 入力値のサニタイズ
- アクセス制限（社内IPのみ）」
```

#### AI生成コード例（HTML部分）
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>顧客データ入力フォーム</title>
  <style>
    body { font-family: 'Arial', sans-serif; margin: 20px; background: #f5f5f5; }
    .form-container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; color: #333; }
    input, select, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; }
    .submit-btn { background: #1f4e79; color: white; padding: 12px 30px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
    .submit-btn:hover { background: #143a5c; }
    .error { color: red; font-size: 14px; margin-top: 5px; }
    .success { color: green; font-size: 16px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="form-container">
    <h2>顧客データ入力フォーム</h2>
    <form id="customerForm">
      <div class="form-group">
        <label for="customerName">顧客名 *</label>
        <input type="text" id="customerName" name="customerName" required>
        <div class="error" id="customerNameError"></div>
      </div>
      
      <div class="form-group">
        <label for="email">連絡先（メール）*</label>
        <input type="email" id="email" name="email" required>
        <div class="error" id="emailError"></div>
      </div>
      
      <div class="form-group">
        <label for="category">商品カテゴリ *</label>
        <select id="category" name="category" required>
          <option value="">選択してください</option>
          <option value="software">ソフトウェア</option>
          <option value="hardware">ハードウェア</option>
          <option value="service">サービス</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="amount">金額 *</label>
        <input type="number" id="amount" name="amount" min="0" required>
        <div class="error" id="amountError"></div>
      </div>
      
      <div class="form-group">
        <label for="notes">備考</label>
        <textarea id="notes" name="notes" rows="4"></textarea>
      </div>
      
      <button type="submit" class="submit-btn">データを送信</button>
    </form>
    
    <div id="message"></div>
  </div>

  <script>
    document.getElementById('customerForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // フォーム検証
      if (validateForm()) {
        submitForm();
      }
    });
    
    function validateForm() {
      let isValid = true;
      
      // 顧客名チェック
      const customerName = document.getElementById('customerName').value.trim();
      if (!customerName) {
        showError('customerNameError', '顧客名は必須です');
        isValid = false;
      } else {
        clearError('customerNameError');
      }
      
      // メールチェック
      const email = document.getElementById('email').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showError('emailError', '有効なメールアドレスを入力してください');
        isValid = false;
      } else {
        clearError('emailError');
      }
      
      return isValid;
    }
    
    function submitForm() {
      const formData = new FormData(document.getElementById('customerForm'));
      const data = Object.fromEntries(formData);
      
      google.script.run
        .withSuccessHandler(onSuccess)
        .withFailureHandler(onFailure)
        .submitCustomerData(data);
    }
    
    function onSuccess(result) {
      document.getElementById('message').innerHTML = '<div class="success">データを正常に送信しました！</div>';
      document.getElementById('customerForm').reset();
    }
    
    function onFailure(error) {
      document.getElementById('message').innerHTML = '<div class="error">エラーが発生しました: ' + error + '</div>';
    }
    
    function showError(elementId, message) {
      document.getElementById(elementId).textContent = message;
    }
    
    function clearError(elementId) {
      document.getElementById(elementId).textContent = '';
    }
  </script>
</body>
</html>
```

### ダッシュボード型Webアプリ

#### プロンプト例
```
「リアルタイム売上ダッシュボードのWebアプリを作成してください。

【機能】
1. スプレッドシートのデータをリアルタイム表示
2. グラフ・チャートの自動更新
3. フィルター機能（期間、地域、商品別）
4. KPI表示（売上、利益率、目標達成率）
5. データのエクスポート機能

【表示内容】
- 売上トレンドグラフ（Chart.js使用）
- 地域別売上の円グラフ
- 商品別売上ランキング
- 月次/日次切り替え表示

【技術要件】
- レスポンシブデザイン
- 自動更新（30秒間隔）
- ローディング表示
- エラーハンドリング」
```

---

## 自動化システムの構築

### トリガーベース自動化

#### 時間ベーストリガー
```
プロンプト:
「以下のスケジュールで実行される自動化システムを構築してください。

【定期実行タスク】
1. 毎日9時: 日次レポート生成・配信
2. 毎週月曜10時: 週次データ集計
3. 毎月1日: 月次アーカイブ処理
4. 四半期末: 四半期レポート作成

【処理内容】
- データの集計・分析
- レポート作成（PDF生成）
- メール/Slack通知
- ファイルのアーカイブ

【エラー処理】
- 処理失敗時の再試行機能
- エラー通知システム
- ログ記録・管理

【設定管理】
- 実行スケジュールの設定画面
- 通知先の管理
- 処理結果の履歴表示」
```

### イベントドリブン自動化

#### フォーム送信トリガー
```
プロンプト:
「Googleフォームの送信をトリガーとする自動化システムを作成してください。

【トリガーイベント】
フォーム送信時

【自動処理フロー】
1. 送信データの検証・整形
2. 条件に応じた担当者の自動アサイン
3. タスク管理システムへの登録
4. 関係者への自動通知
5. フォローアップスケジュールの設定

【担当者アサインロジック】
- 地域別の担当者マッピング
- 負荷分散アルゴリズム
- 専門分野による振り分け

【通知システム】
- 即座の受付通知（送信者へ）
- 担当者への依頼通知
- 進捗管理用の定期通知」
```

---

## 実践的な活用例

### 活用例1: CRMシステム構築

#### プロンプト
```
「Googleスプレッドシートベースの簡易CRMシステムを構築してください。

【機能要件】
1. 顧客情報管理
   - 基本情報の登録・更新
   - 商談履歴の記録
   - フォローアップスケジュール

2. 営業活動管理
   - 活動記録の自動化
   - 案件進捗の可視化
   - 売上予測の計算

3. レポート・分析
   - 営業成績レポート
   - 顧客分析ダッシュボード
   - 商談成功率分析

4. 自動化機能
   - フォローアップリマインダー
   - 活動レポートの自動生成
   - 成果の自動集計

【データ構造】
- 顧客マスターシート
- 商談履歴シート
- 活動記録シート
- 設定・マスタシート

【インターフェース】
- データ入力用Webフォーム
- ダッシュボード表示
- レポート出力機能」
```

### 活用例2: 在庫管理システム

#### プロンプト
```
「在庫管理を自動化するGASシステムを開発してください。

【機能】
1. 在庫データの自動更新
   - 入庫・出庫の記録
   - リアルタイム在庫数の計算
   - 安全在庫を下回った時のアラート

2. 発注管理
   - 自動発注点の計算
   - 発注書の自動生成
   - 納期管理・追跡

3. 分析・レポート
   - 回転率分析
   - デッドストック検出
   - 調達コスト分析

【外部連携】
- メール通知システム
- QRコードスキャナ連携
- 会計システムとのデータ連携

【アラート機能】
- 在庫不足警告
- 長期滞留在庫通知
- 期限切れ商品アラート」
```

### 活用例3: 勤怠管理システム

#### プロンプト
```
「Googleフォームと連携した勤怠管理システムを作成してください。

【打刻機能】
1. Googleフォームでの出退勤打刻
2. 位置情報による在席確認
3. 打刻漏れの自動検出・通知

【集計・計算機能】
- 労働時間の自動計算
- 残業時間の算出
- 有給取得日数の管理

【管理機能】
- 勤怠データの月次集計
- 異常勤務の検出・アラート
- 管理者用ダッシュボード

【レポート機能】
- 個人別勤怠サマリー
- 部門別労働時間分析
- 法定労働時間チェック

【承認ワークフロー】
- 残業申請・承認
- 有給申請・承認
- 勤怠修正申請"""
```

---

## 💡 実践演習

### 演習1: 基本的なGAS作成

以下の機能を実現するGASコードを作成してください：

```
【要件】
1. スプレッドシートの売上データから月次集計を作成
2. 前年同期比を計算
3. 結果を新しいシートに出力
4. 完了時にメール通知

【データ構造】
A列: 日付, B列: 商品名, C列: 売上金額

【作成するコード】:
[ここにGASコードを記述してください]
```

### 演習2: API連携実装

外部APIと連携する機能を設計してください：

```
【シナリオ】
株価APIから取得したデータをスプレッドシートに記録

【要件】
1. 指定した銘柄の株価を定期取得
2. データの履歴管理
3. 急激な変動時のアラート
4. グラフの自動更新

【設計内容】:
1. 使用するAPI:
2. データ構造:
3. 実行スケジュール:
4. エラー処理:
```

### 演習3: Webアプリ設計

業務で使えるWebアプリケーションを設計してください：

```
【テーマ】
あなたの業務に関連するWebアプリ

【設計項目】
1. 機能概要:
2. 画面構成:
3. データフロー:
4. セキュリティ考慮事項:
5. 期待効果:
```

---

## 📚 参考資料

### Google Apps Script学習リソース
- Google Apps Script公式ドキュメント
- Google Workspace API リファレンス
- GAS開発のベストプラクティス

### Web開発・API連携
- HTML/CSS/JavaScriptの基礎
- RESTful API設計原則
- セキュリティ対策ガイド

---

## ✅ 理解度確認

この講座の内容を理解できたか、以下で確認してください：

1. GASの基本コードをAIで生成できますか？
2. Googleサービスとの連携を実装できますか？
3. 外部APIとの連携システムを構築できますか？
4. Webアプリケーションを開発できますか？
5. トリガーベースの自動化システムを設計できますか？
6. 実際の業務に適用可能なシステムを企画できますか？

すべて「はい」なら次の講座に進めます。

---

**次の講座**: [データ分析・可視化](07-data-analysis.md)

<!-- 動画埋め込み用プレースホルダー -->
<!-- VIDEO: gas-overview.mp4 -->
<!-- VIDEO: google-services-integration.mp4 -->
<!-- VIDEO: api-integration.mp4 -->
<!-- VIDEO: webapp-development.mp4 -->