/**
 * AI活用アンケートフォーム自動生成スクリプト
 * 
 * 使い方:
 * 1. Google Driveで新規 > Google Apps Scriptを作成
 * 2. このコードを貼り付け
 * 3. createAISurveyForm()関数を実行
 * 4. 権限を承認
 * 5. 作成されたフォームのURLがログに表示される
 */

function createAISurveyForm() {
  try {
    // フォームの作成
    const form = FormApp.create('AI活用に関するアンケート');
    
    // フォームの基本設定
    form.setDescription('AIツールの活用状況と学習ニーズを把握するためのアンケートです（所要時間：約3分）');
    form.setConfirmationMessage('アンケートへのご協力ありがとうございました。\nいただいた回答は、今後のサービス改善に活用させていただきます。');
    form.setAllowResponseEdits(false);
    form.setLimitOneResponsePerUser(false); // Googleログイン不要にする場合
    
    // 質問1: AIツールの利用経験
    const q1 = form.addMultipleChoiceItem();
    q1.setTitle('質問1: AIツールの利用経験')
      .setRequired(true)
      .setChoices([
        q1.createChoice('全く使ったことがない'),
        q1.createChoice('少し使ったことがある'),
        q1.createChoice('定期的に使っている')
      ]);
    
    // 質問2: 業務での活用レベル
    const q2 = form.addMultipleChoiceItem();
    q2.setTitle('質問2: 業務での活用レベル')
      .setRequired(true)
      .setChoices([
        q2.createChoice('個人的な用途のみ'),
        q2.createChoice('簡単な業務に活用'),
        q2.createChoice('積極的に業務活用')
      ]);
    
    // 質問3: 学習の目標
    const q3 = form.addMultipleChoiceItem();
    q3.setTitle('質問3: 学習の目標')
      .setRequired(true)
      .setChoices([
        q3.createChoice('基本的な使い方を覚えたい'),
        q3.createChoice('業務効率化を実現したい'),
        q3.createChoice('チーム・組織に展開したい')
      ]);
    
    // 質問4: 技術的なスキル
    const q4 = form.addMultipleChoiceItem();
    q4.setTitle('質問4: 技術的なスキル')
      .setRequired(true)
      .setChoices([
        q4.createChoice('パソコンの基本操作のみ'),
        q4.createChoice('表計算の応用ができる'),
        q4.createChoice('プログラミングをしたことがある')
      ]);
    
    // 質問5: 重視したい活用分野（複数選択可）
    const q5 = form.addCheckboxItem();
    q5.setTitle('質問5: 重視したい活用分野（複数選択可）')
      .setRequired(true)
      .setChoices([
        q5.createChoice('文書作成・メール効率化'),
        q5.createChoice('Excel活用・分析'),
        q5.createChoice('Google Sheets・GAS活用'),
        q5.createChoice('画像・動画制作'),
        q5.createChoice('情報収集・リサーチ'),
        q5.createChoice('業務プロセス改善'),
        q5.createChoice('チーム管理・教育')
      ]);
    
    // 質問6: 普段使用している表計算ツール
    const q6 = form.addMultipleChoiceItem();
    q6.setTitle('質問6: 普段使用している表計算ツール')
      .setRequired(true)
      .setChoices([
        q6.createChoice('主にExcelを使用'),
        q6.createChoice('主にGoogle Sheetsを使用'),
        q6.createChoice('両方を使用'),
        q6.createChoice('どちらも使わない')
      ]);
    
    // 質問7: Webサイトに関する知識
    const q7 = form.addMultipleChoiceItem();
    q7.setTitle('質問7: Webサイトに関する知識')
      .setRequired(true)
      .setChoices([
        q7.createChoice('Webサイトを見るだけで、作ったことはない'),
        q7.createChoice('HTMLやCSSの基本を理解している'),
        q7.createChoice('Webサイトを作成・運営したことがある')
      ]);
    
    // スプレッドシートとの連携設定
    const spreadsheetId = createResponseSpreadsheet(form);
    
    // フォームのURLを取得してログに出力
    const formUrl = form.getPublishedUrl();
    const editUrl = form.getEditUrl();
    
    console.log('=== フォーム作成完了 ===');
    console.log('公開URL: ' + formUrl);
    console.log('編集URL: ' + editUrl);
    console.log('回答スプレッドシート: https://docs.google.com/spreadsheets/d/' + spreadsheetId);
    
    return {
      formUrl: formUrl,
      editUrl: editUrl,
      spreadsheetId: spreadsheetId
    };
    
  } catch (error) {
    console.error('フォーム作成中にエラーが発生しました:', error);
    throw error;
  }
}

/**
 * 回答収集用のスプレッドシートを作成して連携
 */
function createResponseSpreadsheet(form) {
  // スプレッドシートを作成
  const spreadsheet = SpreadsheetApp.create('AI活用アンケート_回答');
  
  // フォームとスプレッドシートを連携
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  
  // 集計用シートを追加
  const summarySheet = spreadsheet.insertSheet('集計');
  
  // 集計シートのヘッダー設定
  const headers = [
    ['回答分析'],
    [''],
    ['項目', '回答数', '割合'],
    ['AIツール利用経験', '', ''],
    ['業務活用レベル', '', ''],
    ['学習目標', '', ''],
    ['技術スキル', '', ''],
    ['表計算ツール', '', ''],
    ['Web知識', '', '']
  ];
  
  summarySheet.getRange(1, 1, headers.length, 3).setValues(headers);
  
  // スタイル設定
  summarySheet.getRange(1, 1, 1, 3).merge()
    .setBackground('#4285f4')
    .setFontColor('#ffffff')
    .setFontSize(14)
    .setFontWeight('bold');
  
  summarySheet.getRange(3, 1, 1, 3)
    .setBackground('#e8eaf6')
    .setFontWeight('bold');
  
  // 列幅調整
  summarySheet.setColumnWidth(1, 200);
  summarySheet.setColumnWidth(2, 100);
  summarySheet.setColumnWidth(3, 100);
  
  return spreadsheet.getId();
}

/**
 * オプション: 追加の質問を後から追加する関数
 */
function addOptionalQuestions(formId) {
  const form = FormApp.openById(formId);
  
  // 所属部署（テキスト入力）
  const dept = form.addTextItem();
  dept.setTitle('所属部署（任意）')
    .setRequired(false);
  
  // AIツールで解決したい課題（長文回答）
  const challenge = form.addParagraphTextItem();
  challenge.setTitle('AIツールで解決したい課題（任意）')
    .setRequired(false)
    .setHelpText('具体的な業務課題や期待する効果などをご記入ください');
  
  // 興味のあるAIツール（複数選択）
  const tools = form.addCheckboxItem();
  tools.setTitle('興味のあるAIツール（任意・複数選択可）')
    .setRequired(false)
    .setChoices([
      tools.createChoice('ChatGPT'),
      tools.createChoice('Claude'),
      tools.createChoice('Gemini'),
      tools.createChoice('Copilot'),
      tools.createChoice('Midjourney'),
      tools.createChoice('Stable Diffusion'),
      tools.createChoice('その他')
    ]);
  
  // 研修参加の希望時期
  const timing = form.addMultipleChoiceItem();
  timing.setTitle('研修参加の希望時期（任意）')
    .setRequired(false)
    .setChoices([
      timing.createChoice('今すぐ参加したい'),
      timing.createChoice('1ヶ月以内'),
      timing.createChoice('3ヶ月以内'),
      timing.createChoice('半年以内'),
      timing.createChoice('未定')
    ]);
  
  // その他ご意見・ご要望
  const feedback = form.addParagraphTextItem();
  feedback.setTitle('その他ご意見・ご要望（任意）')
    .setRequired(false);
  
  console.log('追加質問を設定しました');
}

/**
 * 回答データを分析する関数
 */
function analyzeResponses(spreadsheetId) {
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const responseSheet = spreadsheet.getSheets()[0]; // フォームの回答シート
  const summarySheet = spreadsheet.getSheetByName('集計');
  
  // 回答データを取得（ヘッダー行を除く）
  const lastRow = responseSheet.getLastRow();
  if (lastRow <= 1) {
    console.log('まだ回答がありません');
    return;
  }
  
  const responses = responseSheet.getRange(2, 2, lastRow - 1, 7).getValues(); // タイムスタンプ列を除く
  
  // 各質問の集計
  const analysis = {
    q1: countResponses(responses, 0),
    q2: countResponses(responses, 1),
    q3: countResponses(responses, 2),
    q4: countResponses(responses, 3),
    q5: analyzeMultipleChoice(responses, 4),
    q6: countResponses(responses, 5),
    q7: countResponses(responses, 6)
  };
  
  // 結果をログに出力
  console.log('=== 回答分析結果 ===');
  console.log('総回答数:', responses.length);
  console.log('質問1 (AI利用経験):', analysis.q1);
  console.log('質問2 (業務活用):', analysis.q2);
  console.log('質問3 (学習目標):', analysis.q3);
  console.log('質問4 (技術スキル):', analysis.q4);
  console.log('質問5 (重視分野):', analysis.q5);
  console.log('質問6 (表計算ツール):', analysis.q6);
  console.log('質問7 (Web知識):', analysis.q7);
  
  return analysis;
}

/**
 * 単一選択の回答を集計
 */
function countResponses(responses, columnIndex) {
  const counts = {};
  responses.forEach(row => {
    const answer = row[columnIndex];
    if (answer) {
      counts[answer] = (counts[answer] || 0) + 1;
    }
  });
  return counts;
}

/**
 * 複数選択の回答を分析
 */
function analyzeMultipleChoice(responses, columnIndex) {
  const counts = {};
  responses.forEach(row => {
    const answer = row[columnIndex];
    if (answer) {
      // 複数選択の回答は文字列として「選択1, 選択2, ...」の形式で保存される
      const choices = answer.toString().split(', ');
      choices.forEach(choice => {
        counts[choice] = (counts[choice] || 0) + 1;
      });
    }
  });
  return counts;
}

/**
 * テスト実行用の関数
 */
function testCreateForm() {
  const result = createAISurveyForm();
  console.log('フォーム作成テスト完了:', result);
}