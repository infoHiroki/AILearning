# Excel VBA + AI活用

**所要時間**: 45分  
**レベル**: 中級  
**前提知識**: [Excel関数 + AI](excel-formulas-ai.md)完了

## 学習目標

この講座を修了すると、以下ができるようになります：
- AIを使ってVBAマクロを自動生成できる
- 定型業務を効率的に自動化できる
- VBAのエラーを診断・修正できる
- 実際の業務で使えるマクロを作成できる

---

## VBA自動生成の基本

### 基本的なVBA生成プロンプト

```
以下の作業を自動化するVBAマクロを作成してください。

【自動化したい作業】
[具体的な作業内容をステップごとに記述]

【対象データ】
- シート: [シート名]
- 範囲: [セル範囲]
- データの種類: [内容]

【処理手順】
1. [ステップ1]
2. [ステップ2]
3. [ステップ3]

【エラー対応】
- [想定されるエラーと対応]

コメント付きで分かりやすいコードをお願いします。
```

### シンプルな例から始める

#### 例1: データのコピーと貼り付け

**プロンプト**:
```
アクティブシートのA1:C10の範囲を、新しいワークシートにコピーするVBAマクロを作成してください。

【要件】
- 新しいシートの名前は「コピーデータ」
- 既に同名シートがある場合は削除してから作成
- 元データの書式も一緒にコピー
```

**AI生成例**:
```vb
Sub CopyDataToNewSheet()
    Dim ws As Worksheet
    Dim newWs As Worksheet
    
    ' 既存の「コピーデータ」シートを削除
    On Error Resume Next
    Application.DisplayAlerts = False
    Worksheets("コピーデータ").Delete
    Application.DisplayAlerts = True
    On Error GoTo 0
    
    ' 新しいシートを作成
    Set newWs = Worksheets.Add
    newWs.Name = "コピーデータ"
    
    ' データをコピー
    ActiveSheet.Range("A1:C10").Copy
    newWs.Range("A1").PasteSpecial xlPasteAll
    
    ' コピーモードを解除
    Application.CutCopyMode = False
    
    MsgBox "データのコピーが完了しました。"
End Sub
```

#### 例2: 条件に基づく書式設定

**プロンプト**:
```
売上データの書式を自動設定するVBAマクロを作成してください。

【データ】
- B列: 売上金額（数値）
- 対象範囲: B2:B100

【書式設定】
- 100万円以上: 背景色を緑、文字を太字
- 50万円以上: 背景色を黄色
- 30万円未満: 背景色を薄い赤
```

**AI生成例**:
```vb
Sub FormatSalesData()
    Dim rng As Range
    Dim cell As Range
    
    ' 対象範囲を設定
    Set rng = Range("B2:B100")
    
    ' 各セルをチェックして書式設定
    For Each cell In rng
        If IsNumeric(cell.Value) And cell.Value <> "" Then
            Select Case cell.Value
                Case Is >= 1000000
                    ' 100万円以上: 緑背景、太字
                    cell.Interior.Color = RGB(144, 238, 144)
                    cell.Font.Bold = True
                    
                Case Is >= 500000
                    ' 50万円以上: 黄色背景
                    cell.Interior.Color = RGB(255, 255, 0)
                    cell.Font.Bold = False
                    
                Case Is < 300000
                    ' 30万円未満: 薄い赤背景
                    cell.Interior.Color = RGB(255, 182, 193)
                    cell.Font.Bold = False
                    
                Case Else
                    ' その他: 書式クリア
                    cell.Interior.ColorIndex = xlNone
                    cell.Font.Bold = False
            End Select
        End If
    Next cell
    
    MsgBox "書式設定が完了しました。"
End Sub
```

---

## 実用的なマクロパターン

### ファイル操作系

#### CSVファイルの一括読み込み

**プロンプト**:
```
指定フォルダ内のすべてのCSVファイルを読み込んで、1つのシートにまとめるVBAマクロを作成してください。

【要件】
- フォルダはユーザーが指定
- 各ファイルのデータを縦に連結
- ファイル名を最初の列に追加
- ヘッダー行は最初のファイルのみ残す
```

**AI生成例**:
```vb
Sub ImportMultipleCSV()
    Dim folderPath As String
    Dim fileName As String
    Dim wb As Workbook
    Dim wsTarget As Worksheet
    Dim wsSource As Worksheet
    Dim lastRow As Long
    Dim sourceLastRow As Long
    Dim i As Long
    Dim isFirstFile As Boolean
    
    ' フォルダを選択
    With Application.FileDialog(msoFileDialogFolderPicker)
        .Title = "CSVファイルがあるフォルダを選択してください"
        If .Show = -1 Then
            folderPath = .SelectedItems(1) & "\"
        Else
            Exit Sub
        End If
    End With
    
    ' 結果シートを準備
    Set wsTarget = ActiveSheet
    wsTarget.Cells.Clear
    isFirstFile = True
    lastRow = 1
    
    ' フォルダ内のCSVファイルを処理
    fileName = Dir(folderPath & "*.csv")
    Do While fileName <> ""
        ' CSVファイルを開く
        Set wb = Workbooks.Open(folderPath & fileName)
        Set wsSource = wb.Sheets(1)
        
        ' データを取得
        sourceLastRow = wsSource.Cells(wsSource.Rows.Count, "A").End(xlUp).Row
        
        If isFirstFile Then
            ' 最初のファイル: ヘッダーも含めてコピー
            wsSource.Range("A1:Z" & sourceLastRow).Copy
            wsTarget.Range("B1").PasteSpecial xlPasteValues
            
            ' ファイル名列を追加
            For i = 1 To sourceLastRow
                wsTarget.Cells(i, 1).Value = fileName
            Next i
            
            lastRow = sourceLastRow + 1
            isFirstFile = False
        Else
            ' 2つ目以降: ヘッダーを除いてコピー
            If sourceLastRow > 1 Then
                wsSource.Range("A2:Z" & sourceLastRow).Copy
                wsTarget.Range("B" & lastRow).PasteSpecial xlPasteValues
                
                ' ファイル名列を追加
                For i = lastRow To lastRow + sourceLastRow - 2
                    wsTarget.Cells(i, 1).Value = fileName
                Next i
                
                lastRow = lastRow + sourceLastRow - 1
            End If
        End If
        
        ' ファイルを閉じる
        wb.Close SaveChanges:=False
        
        ' 次のファイル
        fileName = Dir
    Loop
    
    Application.CutCopyMode = False
    MsgBox "CSVファイルの読み込みが完了しました。"
End Sub
```

### データ整形系

#### 重複データの削除と整理

**プロンプト**:
```
顧客データの重複を削除して整理するVBAマクロを作成してください。

【データ構造】
- A列: 顧客ID
- B列: 顧客名
- C列: 電話番号
- D列: メールアドレス

【処理内容】
1. 顧客IDが重複している行を削除（新しいデータを残す）
2. 空白行を削除
3. 電話番号の形式を統一（ハイフンを削除）
4. 結果を別シートに出力
```

**AI生成例**:
```vb
Sub CleanCustomerData()
    Dim wsSource As Worksheet
    Dim wsResult As Worksheet
    Dim lastRow As Long
    Dim i As Long
    Dim targetRow As Long
    
    Set wsSource = ActiveSheet
    
    ' 結果シートを作成
    On Error Resume Next
    Application.DisplayAlerts = False
    Worksheets("整理済み顧客データ").Delete
    Application.DisplayAlerts = True
    On Error GoTo 0
    
    Set wsResult = Worksheets.Add
    wsResult.Name = "整理済み顧客データ"
    
    ' ヘッダーをコピー
    wsSource.Range("A1:D1").Copy wsResult.Range("A1")
    
    ' データの処理
    lastRow = wsSource.Cells(wsSource.Rows.Count, "A").End(xlUp).Row
    targetRow = 2
    
    For i = 2 To lastRow
        ' 空白行をスキップ
        If wsSource.Cells(i, 1).Value <> "" Then
            ' 重複チェック（結果シートで顧客IDを検索）
            If Application.CountIf(wsResult.Range("A:A"), wsSource.Cells(i, 1).Value) = 0 Then
                ' 顧客IDをコピー
                wsResult.Cells(targetRow, 1).Value = wsSource.Cells(i, 1).Value
                ' 顧客名をコピー
                wsResult.Cells(targetRow, 2).Value = wsSource.Cells(i, 2).Value
                ' 電話番号を整形してコピー
                wsResult.Cells(targetRow, 3).Value = Replace(wsSource.Cells(i, 3).Value, "-", "")
                ' メールアドレスをコピー
                wsResult.Cells(targetRow, 4).Value = wsSource.Cells(i, 4).Value
                
                targetRow = targetRow + 1
            End If
        End If
    Next i
    
    MsgBox "顧客データの整理が完了しました。重複除去後: " & (targetRow - 2) & "件"
End Sub
```

---

## エラー処理とデバッグ

### よくあるエラーの対処

#### ランタイムエラーの対処

**プロンプト**:
```
以下のVBAコードで「オブジェクトが設定されていません」エラーが発生します。修正してください。

【エラーコード】
Sub TestMacro()
    Dim ws As Worksheet
    ws.Range("A1").Value = "テスト"
End Sub

【修正要件】
- エラーが発生しても処理を継続
- エラー内容をユーザーに分かりやすく表示
```

**AI修正例**:
```vb
Sub TestMacro()
    Dim ws As Worksheet
    
    On Error GoTo ErrorHandler
    
    ' ワークシートオブジェクトを正しく設定
    Set ws = ActiveSheet
    
    ' セルに値を設定
    ws.Range("A1").Value = "テスト"
    
    MsgBox "処理が完了しました。"
    Exit Sub
    
ErrorHandler:
    MsgBox "エラーが発生しました: " & Err.Description & vbCrLf & _
           "処理を中断します。", vbCritical
End Sub
```

### デバッグ支援

#### 処理状況の表示

**プロンプト**:
```
大量データを処理するVBAマクロに進捗表示機能を追加してください。

【現在のコード概要】
1000行のデータを1行ずつ処理するループ

【追加したい機能】
- 処理状況をステータスバーに表示
- 10%ごとに進捗をメッセージ表示
- 処理のキャンセル機能
```

**AI修正例**:
```vb
Sub ProcessDataWithProgress()
    Dim totalRows As Long
    Dim currentRow As Long
    Dim progressPercent As Integer
    Dim lastProgressPercent As Integer
    
    totalRows = 1000 ' 処理する行数
    lastProgressPercent = -1
    
    ' 画面更新を停止してパフォーマンス向上
    Application.ScreenUpdating = False
    Application.EnableEvents = False
    
    For currentRow = 1 To totalRows
        ' 実際の処理をここに記述
        ' 例: セルの値を変更
        Cells(currentRow, 1).Value = "処理済み" & currentRow
        
        ' 進捗計算
        progressPercent = Int((currentRow / totalRows) * 100)
        
        ' ステータスバーに進捗表示
        Application.StatusBar = "処理中... " & progressPercent & "% (" & _
                               currentRow & "/" & totalRows & ")"
        
        ' 10%ごとにメッセージ表示
        If progressPercent Mod 10 = 0 And progressPercent <> lastProgressPercent Then
            If MsgBox(progressPercent & "% 完了しました。続行しますか？", _
                     vbYesNo + vbQuestion) = vbNo Then
                Exit For
            End If
            lastProgressPercent = progressPercent
        End If
        
        ' 定期的にDoEventsを実行（応答性確保）
        If currentRow Mod 100 = 0 Then
            DoEvents
        End If
    Next currentRow
    
    ' 設定を元に戻す
    Application.ScreenUpdating = True
    Application.EnableEvents = True
    Application.StatusBar = False
    
    MsgBox "処理が完了しました。"
End Sub
```

---

## 業務別マクロ例

### 報告書作成の自動化

#### 月次レポート生成

**プロンプト**:
```
売上データから月次レポートを自動生成するVBAマクロを作成してください。

【データ】
- Sheet1: 売上データ（日付、商品、金額）

【レポート内容】
1. 月別売上集計表
2. 商品別売上TOP5
3. 簡単なグラフ作成
4. 新しいシート「月次レポート」に出力
```

**AI生成例**:
```vb
Sub CreateMonthlyReport()
    Dim wsData As Worksheet
    Dim wsReport As Worksheet
    Dim lastRow As Long
    Dim i As Long
    Dim targetMonth As String
    
    ' データシートを設定
    Set wsData = Worksheets("Sheet1")
    lastRow = wsData.Cells(wsData.Rows.Count, "A").End(xlUp).Row
    
    ' レポートシートを作成
    On Error Resume Next
    Application.DisplayAlerts = False
    Worksheets("月次レポート").Delete
    Application.DisplayAlerts = True
    On Error GoTo 0
    
    Set wsReport = Worksheets.Add
    wsReport.Name = "月次レポート"
    
    ' 対象月を取得（今月）
    targetMonth = Format(Date, "yyyy-mm")
    
    ' レポートのタイトル
    wsReport.Range("A1").Value = targetMonth & " 売上レポート"
    wsReport.Range("A1").Font.Size = 14
    wsReport.Range("A1").Font.Bold = True
    
    ' 月別売上集計（簡易版）
    wsReport.Range("A3").Value = "月別売上集計"
    wsReport.Range("A4").Value = "対象月"
    wsReport.Range("B4").Value = targetMonth
    
    ' 集計処理（実際の業務では SUMIFS関数やピボットテーブルを使用）
    Dim totalSales As Double
    For i = 2 To lastRow
        If Format(wsData.Cells(i, 1).Value, "yyyy-mm") = targetMonth Then
            totalSales = totalSales + wsData.Cells(i, 3).Value
        End If
    Next i
    
    wsReport.Range("A5").Value = "売上金額"
    wsReport.Range("B5").Value = totalSales
    wsReport.Range("B5").NumberFormat = "#,##0"
    
    ' 完了メッセージ
    MsgBox "月次レポートが作成されました。"
End Sub
```

### ファイル管理の自動化

#### バックアップ作成

**プロンプト**:
```
現在のワークブックを日付付きでバックアップするVBAマクロを作成してください。

【要件】
- ファイル名: 元のファイル名_YYYYMMDD_HHMMSS.xlsx
- 保存先: 元ファイルと同じフォルダ
- マクロは削除してから保存
- 成功/失敗をメッセージ表示
```

**AI生成例**:
```vb
Sub CreateBackup()
    Dim originalPath As String
    Dim backupPath As String
    Dim fileName As String
    Dim fileExtension As String
    Dim timestamp As String
    Dim wb As Workbook
    
    On Error GoTo ErrorHandler
    
    ' 現在のワークブックの情報取得
    originalPath = ThisWorkbook.Path
    fileName = Left(ThisWorkbook.Name, InStrRev(ThisWorkbook.Name, ".") - 1)
    fileExtension = Right(ThisWorkbook.Name, Len(ThisWorkbook.Name) - InStrRev(ThisWorkbook.Name, ".") + 1)
    
    ' タイムスタンプ作成
    timestamp = Format(Now, "yyyymmdd_hhmmss")
    
    ' バックアップファイル名作成
    backupPath = originalPath & "\" & fileName & "_" & timestamp & "." & fileExtension
    
    ' ワークブックをコピー
    ThisWorkbook.SaveCopyAs backupPath
    
    ' コピーしたファイルを開いてマクロを削除
    Set wb = Workbooks.Open(backupPath)
    
    ' VBAプロジェクトからモジュールを削除（簡易版）
    On Error Resume Next
    wb.VBProject.VBComponents.Remove wb.VBProject.VBComponents("Module1")
    On Error GoTo ErrorHandler
    
    ' xlsxで保存
    wb.SaveAs backupPath, xlOpenXMLWorkbook
    wb.Close
    
    MsgBox "バックアップが作成されました:" & vbCrLf & backupPath
    Exit Sub
    
ErrorHandler:
    MsgBox "バックアップの作成に失敗しました:" & vbCrLf & Err.Description
    If Not wb Is Nothing Then wb.Close SaveChanges:=False
End Sub
```

---

## 実践演習

### 演習1: データ集計マクロ

以下の条件でデータ集計マクロを作成してください：

```
【データ】
A列: 日付, B列: 商品名, C列: 数量, D列: 単価

【処理内容】
1. 商品名ごとの合計数量と売上金額を計算
2. 結果を別シートに出力
3. 売上金額の降順で並び替え

【作成するマクロ】:
[ここにVBAコードを記述してください]
```

### 演習2: 自動書式設定マクロ

条件付き書式を自動設定するマクロを作成してください：

```
【対象】
売上データ（B列に金額）

【書式ルール】
- 上位20%: 濃い緑の背景
- 下位20%: 薄い赤の背景
- その他: 書式なし

【作成するマクロ】:
[ここにVBAコードを記述してください]
```

---

## まとめ

AIを活用したVBA開発では、以下のポイントが重要です：

- **具体的な処理手順を明確に伝える**
- **エラー処理を忘れずに含める**
- **処理の進捗や結果をユーザーに分かりやすく表示**
- **実際の業務で使いやすい形に調整**

次は [Excel データ分析 + AI](excel-analysis-ai.md) で、高度な分析機能を学びましょう！