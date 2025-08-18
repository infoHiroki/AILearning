/**
* @OnlyCurrentDoc
* このスクリプトは、Google風デザインテンプレートに基づきGoogleスライドを自動生成します。
* Version: 12.0 (Universal Google Design - Final)
* Author: Googleスライド自動生成マスター
* Prompt Design: まじん式プロンプト
* Description: 指定されたslideData配列を元に、Google風デザインに準拠したスライドを生成します。
*/

// --- 1. 実行設定 ---
const SETTINGS = {
SHOULD_CLEAR_ALL_SLIDES: true,
TARGET_PRESENTATION_ID: null
};

// --- 2. マスターデザイン設定 (HERMETIC inc. Corporate Design Ver.) --- 
const CONFIG = { 
    BASE_PX: { W: 960, H: 540 },

    // レイアウトの基準となる不変のpx値 
    POS_PX: { 
        titleSlide: { 
            logo:       { left: 55,  top: 105,  width: 135 }, 
            title:      { left: 50,  top: 230, width: 800, height: 90 }, 
            date:       { left: 50,  top: 340, width: 250, height: 40 }, 
        },
        contentSlide: { 
            headerLogo:     { right: 20, top: 20, width: 75 }, 
            title:          { left: 25, top: 60,  width: 830, height: 65 }, 
            titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
            subhead:        { left: 25, top: 140, width: 830, height: 30 }, 
            body:           { left: 25, top: 172, width: 910, height: 303 }, 
            twoColLeft:     { left: 25,  top: 172, width: 440, height: 303 }, 
            twoColRight:    { left: 495, top: 172, width: 440, height: 303 } 
        }, 
        compareSlide: { 
            headerLogo:     { right: 20, top: 20, width: 75 }, 
            title:          { left: 25, top: 60,  width: 830, height: 65 }, 
            titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
            subhead:        { left: 25, top: 140, width: 830, height: 30 }, 
            leftBox:        { left: 25,  top: 172, width: 430, height: 303 }, 
            rightBox:       { left: 505, top: 172, width: 430, height: 303 } 
        }, 
        processSlide: { 
            headerLogo:     { right: 20, top: 20, width: 75 }, 
            title:          { left: 25, top: 60,  width: 830, height: 65 }, 
            titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
            subhead:        { left: 25, top: 140, width: 830, height: 30 }, 
            area:           { left: 25, top: 172, width: 910, height: 303 } 
        }, 
        timelineSlide: { 
            headerLogo:     { right: 20, top: 20, width: 75 }, 
            title:          { left: 25, top: 60,  width: 830, height: 65 }, 
            titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
            subhead:        { left: 25, top: 140, width: 830, height: 30 }, 
            area:           { left: 25, top: 172, width: 910, height: 303 } 
        }, 
        diagramSlide: { 
            headerLogo:     { right: 20, top: 20, width: 75 }, 
            title:          { left: 25, top: 60,  width: 830, height: 65 }, 
            titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
            subhead:        { left: 25, top: 140, width: 830, height: 30 }, 
            lanesArea:      { left: 25, top: 172, width: 910, height: 303 } 
        }, 
        cardsSlide: { 
            headerLogo:     { right: 20, top: 20, width: 75 }, 
            title:          { left: 25, top: 60,  width: 830, height: 65 }, 
            titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
            subhead:        { left: 25, top: 140, width: 830, height: 30 }, 
            gridArea:       { left: 25, top: 172, width: 910, height: 303 } 
        }, 
        tableSlide: { 
            headerLogo:     { right: 20, top: 20, width: 75 }, 
            title:          { left: 25, top: 60,  width: 830, height: 65 }, 
            titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
            subhead:        { left: 25, top: 140, width: 830, height: 30 }, 
            area:           { left: 25, top: 172, width: 910, height: 303 } 
        }, 
        progressSlide: { 
            headerLogo:     { right: 20, top: 20, width: 75 }, 
            title:          { left: 25, top: 60,  width: 830, height: 65 }, 
            titleUnderline: { left: 25, top: 128, width: 260, height: 4 }, 
            subhead:        { left: 25, top: 140, width: 830, height: 30 }, 
            area:           { left: 25, top: 172, width: 910, height: 303 } 
        },
        sectionSlide: { 
            title:      { left: 55, top: 230, width: 840, height: 80 }, 
            ghostNum:   { left: 35, top: 120, width: 300, height: 200 } 
        },
        footer: { 
            leftText:   { left: 15, top: 505, width: 250, height: 20 }, 
            rightPage: { right: 15, top: 505, width: 50,  height: 20 } 
        }, 
        bottomBar: { left: 0, top: 534, width: 960, height: 6 } 
    },

    FONTS: { 
        family: 'Noto Sans JP',
        sizes: { 
            title: 45, date: 16, sectionTitle: 38, contentTitle: 28, 
            subhead: 18, body: 14, footer: 9, chip: 11, 
            laneTitle: 13, small: 10, processStep: 14, axis: 12, ghostNum: 180 
        } 
    }, 
    COLORS: {
        primary_blue: '#3B67CC', 
        google_red: '#EA4335',
        google_yellow: '#FBBC04',
        google_green: '#51b849', 
        text_primary: '#333333', 
        background_white: '#FFFFFF', 
        background_gray: '#f7f7f7', 
        faint_gray: '#e5e5e5', 
        lane_title_bg: '#f7f7f7', 
        lane_border: '#e5e5e5', 
        card_bg: '#ffffff', 
        card_border: '#e5e5e5', 
        neutral_gray: '#777777', 
        ghost_gray: '#EBF0FA' 
    }, 
    DIAGRAM: { 
        laneGap_px: 24, lanePad_px: 10, laneTitle_h_px: 30, 
        cardGap_px: 12, cardMin_h_px: 48, cardMax_h_px: 70, 
        arrow_h_px: 10, arrowGap_px: 8 
    },

    LOGOS: {
        header: 'https://hmtc.jp/images/common/logo-hmtc_new.png', 
        closing: 'https://hmtc.jp/images/common/logo-hmtc_new.png' 
    },

    FOOTER_TEXT: `© ${new Date().getFullYear()} HERMETIC inc.` // ★更新
};

// --- 3. スライドデータ（サンプル：必ず置換してください） ---
const slideData = [
{ type: 'title', title: '[[XMLという考え方]]で仕事の効率を変える', date: '2025.01.18', notes: 'みなさん、こんにちは。今回は、XMLという考え方について、3つの重要なポイントに絞ってお話しします。プログラミングの知識は不要です。でも、この考え方を知っているだけで、仕事の効率が大きく変わります。それでは、始めましょう。' },
{ type: 'content', title: '本日お伝えする3つのポイント', points: ['なぜ構造化が重要か', 'XMLの実際の活用方法', 'AIプロンプトでの実践活用'], notes: '今日は3つの重要なポイントについてお話します。1つ目は、なぜ情報の構造化が重要なのか。2つ目は、XMLを実際にどう活用するか。そして3つ目は、AIツールでどう実践するか。これらを理解することで、明日から仕事の効率が劇的に向上します。' },
{ type: 'section', title: '1. なぜ構造化が重要か', notes: '第1のポイントです。第1のポイントはなぜ構造化が重要か、です。まず、こんな場面を想像してください。' },
{ type: 'compare', title: '情報の伝え方の違い', leftTitle: '構造化されていない情報', rightTitle: '構造化された情報', leftItems: ['「ノートPC、黒、100000、5個」', '100000が何を意味するか不明', 'シリアル番号？価格？重さ？', '理解に時間がかかる'], rightItems: ['商品名：ノートPC', '色：黒', '価格：100,000円', '在庫：5個'], notes: '会議で誰かが、「ノートPC、黒、100000、5個」と言ったとします。100000って何でしょうか。シリアル番号なのか価格なのか重さなのか、分かりませんよね。でも、商品名はノートPC、色は黒、価格は100,000円、在庫は5個、と言われたらすぐに理解できます。これがXMLの本質的な部分です。情報に「なんの情報か」というラベルを付ける。たったこれだけで、情報の価値が劇的に上がります。' },
{ type: 'content', title: '営業報告での実例', points: ['曖昧な報告：「田中商事、500万、70パーセント、来月」', '明確な報告：顧客名、案件金額、成約確率、クロージング予定', '[[構造化により誰が聞いても同じ理解が可能]]', '報告作業短縮・分析簡単化・情報共有スムーズ化'], notes: '実際の仕事でも同じです。営業報告で、「田中商事、500万、70パーセント、来月」と聞いても、何のことか分かりません。でも、顧客名：田中商事、案件金額：500万円、成約確率：70パーセント、クロージング予定：来月、こう整理すれば、誰が聞いても同じ理解ができます。このように情報を構造化することで、報告作業が短縮されたり、分析が簡単になったり、チーム内での情報共有がスムーズになります。なぜなら、情報が最初から整理されているから、集計も分析も自動化できるからです。' },
{ type: 'section', title: '2. XMLの実際の活用方法', notes: '第2のポイントです。第2のポイントは、XMLの実際の活用方法です。まず重要なことは、XMLを自分で書く必要はありません。' },
{ type: 'cards', title: 'AIを使った簡単な構造化', columns: 2, items: [{ title: '**ステップ1**', desc: 'AIに「商品情報を整理して、XML形式で教えて」と頼む' }, { title: '**ステップ2**', desc: 'AIが構造化された形式で返答' }, { title: '**ステップ3**', desc: '山かっこで囲まれた「ラベル」と「内容」の構造を理解' }, { title: '**ステップ4**', desc: '次回はこの構造をテンプレートとして再利用' }], notes: 'AIに「情報を整理して」と頼むだけで、XMLで返してくれます。例えば、「商品情報を整理して、XML形式で教えて」と頼むと、AIは山かっこで囲まれた形式で返してくれます。商品タグの中に、名前、価格、在庫などがきれいに整理されています。これを見て、構造を理解することが大切です。山かっこで囲まれた部分が「ラベル」で、その中が「内容」です。次回は、この構造をテンプレートとして使えます。' },
{ type: 'section', title: '3. AIプロンプトでの実践活用', notes: '第3のポイントです。AIプロンプトでの実践活用。最後に、最も重要なポイントです。みなさんはすでにChatGPT、Claude、Geminiなど、AIツールを使っていますか？' },
{ type: 'table', title: '主要AIツールの特徴', headers: ['AIツール', 'XML対応', 'JSON対応', '特徴'], rows: [['ChatGPT', '○', '◎', 'JSONの方が得意'], ['Gemini', '○', '◎', 'JSONの方が得意'], ['Claude', '◎', '○', '[[XMLベースで設計、特に正確]]']], notes: 'XMLはどのAIでも使える、汎用的な構造化手法です。そして、どのAIを使うかによって、少し特徴があります。ChatGPTやGeminiは、XMLもJSONも使えますが、JSONの方が得意です。Claudeは、XMLをベースに設計されているため、XML形式を特に正確に理解してくれます。複雑な指示を出すときは、XMLを活用してみてください。特にClaudeを使う場合は、より明確で正確な回答が得られます。' },
{ type: 'process', title: '実践レベル別活用方法', steps: ['レベル1：AIに「この情報をXML形式で整理してください」と頼む', 'レベル2：AIが作ったXML構造を保存してテンプレート化', 'レベル3：チーム全体で同じXML形式を統一して使用'], notes: 'では、具体的には何をすればいいでしょうか。まず、レベル1、AIに整理してもらう。普通にAIに質問した後、「この情報をXML形式で整理してください」と追加で頼んでみてください。次に、レベル2、構造をテンプレートとして保存する。AIが作ってくれたXML構造を保存しておき、次回似たような質問をするときに使います。最後に、レベル3、チームで形式を統一する。良いXML構造ができたら、チーム全員で共有します。議事録、報告書、企画書など、同じ形式を使うことで、情報の整理と共有が格段に楽になります。' },
{ type: 'content', title: 'まとめ：3つのポイント', points: ['**なぜ構造化が重要か**：情報にラベルを付けることで理解しやすさが劇的に向上', '**XMLの実際の活用方法**：AIに「XML形式で整理して」と頼み、テンプレート化', '**AIプロンプトでの実践活用**：どのAIでも使える汎用的手法、[[特にClaudeで威力を発揮]]'], notes: '今日お話しした3つのポイントを振り返ります。1つ目、なぜ構造化が重要か。情報にラベルを付けることで、理解しやすさが劇的に向上する。2つ目、XMLの実際の活用方法。AIに「XML形式で整理して」と頼み、返された構造をテンプレートとして保存・再利用する。3つ目、AIプロンプトでの実践活用。どのAIでも使える汎用的な手法で、特にClaudeで威力を発揮する。' },
{ type: 'cards', title: 'よくある質問', columns: 3, items: [{ title: '**プログラミング不要？**', desc: '山かっこで囲むだけの簡単な記法。知識は一切不要' }, { title: '**XMLとJSONの違い**', desc: 'XMLは文書構造化が得意、JSONはデータ交換が得意' }, { title: '**本当に精度が上がる？**', desc: '特にClaudeでは回答の正確性と構造化が大幅に向上' }], notes: '最後によくある質問についてお答えします。質問1、プログラミングができなくても大丈夫ですか。はい、大丈夫です。XMLは山かっこで囲むだけの簡単な記法です。質問2、XMLとJSONの違いは何ですか。XMLは文書の構造化が得意、JSONはデータ交換が得意です。質問3、本当にAIの精度が上がりますか。はい、劇的に上がります。特にClaudeでは、XML形式の指示により、回答の正確性と構造化が大幅に向上します。' },
{ type: 'closing', notes: 'お疲れさまでした！今日学んだXMLの活用方法、ぜひ明日のAI活用で試してみてください。まずはAIに「XML形式で整理して」と頼んでみる、返された構造を理解して保存してみる、たったこれだけでも、情報整理が格段に楽になります。XMLは難しそうに見えて、実はとても簡単です。AIに任せるだけで、情報が構造化できます。それでは、また次回お会いしましょう！' }
];

// --- 4. メイン実行関数 ---
let __SECTION_COUNTER = 0; // 章番号カウンタ（ゴースト数字用）

function generatePresentation() {
let presentation;
try {
presentation = SETTINGS.TARGET_PRESENTATION_ID
? SlidesApp.openById(SETTINGS.TARGET_PRESENTATION_ID)
: SlidesApp.getActivePresentation();
if (!presentation) throw new Error('対象のプレゼンテーションが見つかりません。');

if (SETTINGS.SHOULD_CLEAR_ALL_SLIDES) {
  const slides = presentation.getSlides();
  for (let i = slides.length - 1; i >= 0; i--) slides[i].remove();
}

__SECTION_COUNTER = 0;

const layout = createLayoutManager(presentation.getPageWidth(), presentation.getPageHeight());

let pageCounter = 0;
for (const data of slideData) {
  const generator = slideGenerators[data.type];
  if (data.type !== 'title' && data.type !== 'closing') pageCounter++;
  if (generator) {
    const slide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
    generator(slide, data, layout, pageCounter);
    
    // スピーカーノートを設定する処理
    if (data.notes) {
      try {
        const notesShape = slide.getNotesPage().getSpeakerNotesShape();
        if (notesShape) {
          notesShape.getText().setText(data.notes);
        }
      } catch (e) {
        Logger.log(`スピーカーノートの設定に失敗しました: ${e.message}`);
      }
    }
  }
}

} catch (e) {
Logger.log(`処理が中断されました: ${e.message}\nStack: ${e.stack}`);
}
}

// --- 5. スライド生成ディスパッチャ ---
const slideGenerators = {
title:    createTitleSlide,
section:  createSectionSlide,
content:  createContentSlide,
compare:  createCompareSlide,
process:  createProcessSlide,
timeline: createTimelineSlide,
diagram:  createDiagramSlide,
cards:    createCardsSlide,
table:    createTableSlide,
progress: createProgressSlide,
closing:  createClosingSlide
};

// --- 6. スライド生成関数群 ---
function createTitleSlide(slide, data, layout) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);

const logoRect = layout.getRect('titleSlide.logo');
const logo = slide.insertImage(CONFIG.LOGOS.header);
const aspect = logo.getHeight() / logo.getWidth();
logo.setLeft(logoRect.left).setTop(logoRect.top).setWidth(logoRect.width).setHeight(logoRect.width * aspect);

const titleRect = layout.getRect('titleSlide.title');
const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height);
setStyledText(titleShape, data.title, { size: CONFIG.FONTS.sizes.title, bold: true });

const dateRect = layout.getRect('titleSlide.date');
const dateShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, dateRect.left, dateRect.top, dateRect.width, dateRect.height);
dateShape.getText().setText(data.date || '');
applyTextStyle(dateShape.getText(), { size: CONFIG.FONTS.sizes.date });

drawBottomBar(slide, layout);
}

function createSectionSlide(slide, data, layout, pageNum) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_gray);

// 透かし番号：sectionNo > タイトル先頭の数字 > 自動連番
__SECTION_COUNTER++;
const parsedNum = (() => {
if (Number.isFinite(data.sectionNo)) return Number(data.sectionNo);
const m = String(data.title || '').match(/^\s*(\d+)[\.．]/);
return m ? Number(m[1]) : __SECTION_COUNTER;
})();
const num = String(parsedNum).padStart(2, '0');

const ghostRect = layout.getRect('sectionSlide.ghostNum');
const ghost = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, ghostRect.left, ghostRect.top, ghostRect.width, ghostRect.height);
ghost.getText().setText(num);
applyTextStyle(ghost.getText(), { size: CONFIG.FONTS.sizes.ghostNum, color: CONFIG.COLORS.ghost_gray, bold: true });
try { ghost.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch(e) {}

const titleRect = layout.getRect('sectionSlide.title');
const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height);
titleShape.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE);
setStyledText(titleShape, data.title, { size: CONFIG.FONTS.sizes.sectionTitle, bold: true, align: SlidesApp.ParagraphAlignment.CENTER });

addGoogleFooter(slide, layout, pageNum);
}

// content（1/2カラム + 小見出し + 画像）
function createContentSlide(slide, data, layout, pageNum) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
drawStandardTitleHeader(slide, layout, 'contentSlide', data.title);
const dy = drawSubheadIfAny(slide, layout, 'contentSlide', data.subhead);

// アジェンダ安全装置
const isAgenda = isAgendaTitle(data.title || '');
let points = Array.isArray(data.points) ? data.points.slice(0) : [];
if (isAgenda && (!points || points.length === 0)) {
points = buildAgendaFromSlideData();
if (points.length === 0) points = ['本日の目的', '進め方', '次のアクション'];
}

const hasImages = Array.isArray(data.images) && data.images.length > 0;
const isTwo = !!(data.twoColumn || data.columns);

if ((isTwo && (data.columns || points)) || (!isTwo && points && points.length > 0)) {
if (isTwo) {
let L = [], R = [];
if (Array.isArray(data.columns) && data.columns.length === 2) {
L = data.columns[0] || []; R = data.columns[1] || [];
} else {
const mid = Math.ceil(points.length / 2);
L = points.slice(0, mid); R = points.slice(mid);
}
const leftRect = offsetRect(layout.getRect('contentSlide.twoColLeft'), 0, dy);
const rightRect = offsetRect(layout.getRect('contentSlide.twoColRight'), 0, dy);
const leftShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, leftRect.left, leftRect.top, leftRect.width, leftRect.height);
const rightShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rightRect.left, rightRect.top, rightRect.width, rightRect.height);
setBulletsWithInlineStyles(leftShape, L);
setBulletsWithInlineStyles(rightShape, R);
} else {
const bodyRect = offsetRect(layout.getRect('contentSlide.body'), 0, dy);
const bodyShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, bodyRect.left, bodyRect.top, bodyRect.width, bodyRect.height);
setBulletsWithInlineStyles(bodyShape, points);
}
}

// 画像（任意）
if (hasImages) {
const area = offsetRect(layout.getRect('contentSlide.body'), 0, dy);
renderImagesInArea(slide, layout, area, normalizeImages(data.images));
}

drawBottomBarAndFooter(slide, layout, pageNum);
}

// compare（左右ボックス：ヘッダー青＋白文字）
function createCompareSlide(slide, data, layout, pageNum) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
drawStandardTitleHeader(slide, layout, 'compareSlide', data.title);
const dy = drawSubheadIfAny(slide, layout, 'compareSlide', data.subhead);

const leftBox = offsetRect(layout.getRect('compareSlide.leftBox'), 0, dy);
const rightBox = offsetRect(layout.getRect('compareSlide.rightBox'), 0, dy);
drawCompareBox(slide, leftBox, data.leftTitle || '選択肢A', data.leftItems || []);
drawCompareBox(slide, rightBox, data.rightTitle || '選択肢B', data.rightItems || []);

drawBottomBarAndFooter(slide, layout, pageNum);
}
function drawCompareBox(slide, rect, title, items) {
const box = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, rect.left, rect.top, rect.width, rect.height);
box.getFill().setSolidFill(CONFIG.COLORS.lane_title_bg);
box.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.lane_border);
box.getBorder().setWeight(1);

const th = 0.75 * 40; // 約30px相当
const titleBar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, rect.left, rect.top, rect.width, th);
titleBar.getFill().setSolidFill(CONFIG.COLORS.primary_blue);
titleBar.getBorder().setTransparent();
setStyledText(titleBar, title, { size: CONFIG.FONTS.sizes.laneTitle, bold: true, color: CONFIG.COLORS.background_white, align: SlidesApp.ParagraphAlignment.CENTER });

const pad = 0.75 * 12;
const textRect = { left: rect.left + pad, top: rect.top + th + pad, width: rect.width - pad * 2, height: rect.height - th - pad * 2 };
const body = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, textRect.left, textRect.top, textRect.width, textRect.height);
setBulletsWithInlineStyles(body, items);
}

// process（角枠1px＋一桁数字）
function createProcessSlide(slide, data, layout, pageNum) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
drawStandardTitleHeader(slide, layout, 'processSlide', data.title);
const dy = drawSubheadIfAny(slide, layout, 'processSlide', data.subhead);

const area = offsetRect(layout.getRect('processSlide.area'), 0, dy);
const steps = Array.isArray(data.steps) ? data.steps : [];
const n = Math.max(1, steps.length);
const gapY = (area.height - layout.pxToPt(40)) / Math.max(1, n - 1);
const cx = area.left + layout.pxToPt(44);
const top0 = area.top + layout.pxToPt(10);

const line = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, cx - layout.pxToPt(1), top0 + layout.pxToPt(6), layout.pxToPt(2), gapY * (n - 1));
line.getFill().setSolidFill(CONFIG.COLORS.faint_gray);
line.getBorder().setTransparent();

for (let i = 0; i < n; i++) {
const cy = top0 + gapY * i;
const sz = layout.pxToPt(28);
const numBox = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, cx - sz/2, cy - sz/2, sz, sz);
numBox.getFill().setSolidFill(CONFIG.COLORS.background_white);
numBox.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.primary_blue);
numBox.getBorder().setWeight(1);
const num = numBox.getText(); num.setText(String(i + 1));
applyTextStyle(num, { size: 12, bold: true, color: CONFIG.COLORS.primary_blue, align: SlidesApp.ParagraphAlignment.CENTER });

const txt = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, cx + layout.pxToPt(28), cy - layout.pxToPt(16), area.width - layout.pxToPt(70), layout.pxToPt(32));
setStyledText(txt, steps[i] || '', { size: CONFIG.FONTS.sizes.processStep });
try { txt.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch(e){}

}

drawBottomBarAndFooter(slide, layout, pageNum);
}

// timeline（左右余白広め）
function createTimelineSlide(slide, data, layout, pageNum) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
drawStandardTitleHeader(slide, layout, 'timelineSlide', data.title);
const dy = drawSubheadIfAny(slide, layout, 'timelineSlide', data.subhead);

const area = offsetRect(layout.getRect('timelineSlide.area'), 0, dy);
const milestones = Array.isArray(data.milestones) ? data.milestones : [];
if (milestones.length === 0) { drawBottomBarAndFooter(slide, layout, pageNum); return; }

const inner = layout.pxToPt(60);
const baseY = area.top + area.height * 0.55;
const leftX = area.left + inner;
const rightX = area.left + area.width - inner;

const line = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, leftX, baseY - layout.pxToPt(1), rightX - leftX, layout.pxToPt(2));
line.getFill().setSolidFill(CONFIG.COLORS.faint_gray);
line.getBorder().setTransparent();

const dotR = layout.pxToPt(8);
const gap = (rightX - leftX) / Math.max(1, (milestones.length - 1));

milestones.forEach((m, i) => {
const x = leftX + gap * i - dotR / 2;
const dot = slide.insertShape(SlidesApp.ShapeType.ELLIPSE, x, baseY - dotR / 2, dotR, dotR);
const state = (m.state || 'todo').toLowerCase();
if (state === 'done') { dot.getFill().setSolidFill(CONFIG.COLORS.google_green); dot.getBorder().setTransparent(); }
else if (state === 'next') { dot.getFill().setSolidFill(CONFIG.COLORS.background_white); dot.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.google_yellow); dot.getBorder().setWeight(2); }
else { dot.getFill().setSolidFill(CONFIG.COLORS.background_white); dot.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.neutral_gray); dot.getBorder().setWeight(1); }

const t = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, x - layout.pxToPt(40), baseY - layout.pxToPt(40), layout.pxToPt(90), layout.pxToPt(20));
t.getText().setText(String(m.label || ''));
applyTextStyle(t.getText(), { size: CONFIG.FONTS.sizes.small, bold: true, align: SlidesApp.ParagraphAlignment.CENTER });

const d = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, x - layout.pxToPt(40), baseY + layout.pxToPt(8), layout.pxToPt(90), layout.pxToPt(18));
d.getText().setText(String(m.date || ''));
applyTextStyle(d.getText(), { size: CONFIG.FONTS.sizes.small, color: CONFIG.COLORS.neutral_gray, align: SlidesApp.ParagraphAlignment.CENTER });

});

drawBottomBarAndFooter(slide, layout, pageNum);
}

// diagram（Mermaid風・レーン＋カード＋自動矢印）
function createDiagramSlide(slide, data, layout, pageNum) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
drawStandardTitleHeader(slide, layout, 'diagramSlide', data.title);
const dy = drawSubheadIfAny(slide, layout, 'diagramSlide', data.subhead);

const lanes = Array.isArray(data.lanes) ? data.lanes : [];
const area0 = layout.getRect('diagramSlide.lanesArea');
const area = offsetRect(area0, 0, dy);

const px = (p)=> layout.pxToPt(p);
const laneGap = px(CONFIG.DIAGRAM.laneGap_px);
const lanePad = px(CONFIG.DIAGRAM.lanePad_px);
const laneTitleH = px(CONFIG.DIAGRAM.laneTitle_h_px);
const cardGap = px(CONFIG.DIAGRAM.cardGap_px);
const cardMinH = px(CONFIG.DIAGRAM.cardMin_h_px);
const cardMaxH = px(CONFIG.DIAGRAM.cardMax_h_px);
const arrowH = px(CONFIG.DIAGRAM.arrow_h_px);
const arrowGap = px(CONFIG.DIAGRAM.arrowGap_px);

const n = Math.max(1, lanes.length);
const laneW = (area.width - laneGap * (n - 1)) / n;

const cardBoxes = [];

for (let j = 0; j < n; j++) {
const lane = lanes[j] || { title: '', items: [] };
const left = area.left + j * (laneW + laneGap);
const top = area.top;

const lt = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, left, top, laneW, laneTitleH);
lt.getFill().setSolidFill(CONFIG.COLORS.lane_title_bg);
lt.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.lane_border);
lt.getBorder().setWeight(1);
lt.getText().setText(lane.title || '');
applyTextStyle(lt.getText(), { size: CONFIG.FONTS.sizes.laneTitle, bold: true, align: SlidesApp.ParagraphAlignment.CENTER });

const items = Array.isArray(lane.items) ? lane.items : [];
const availH = area.height - laneTitleH - lanePad * 2;
const rows = Math.max(1, items.length);
const idealH = (availH - cardGap * (rows - 1)) / rows;
const cardH = Math.max(cardMinH, Math.min(cardMaxH, idealH));
const totalH = cardH * rows + cardGap * (rows - 1);
const firstTop = top + laneTitleH + lanePad + Math.max(0, (availH - totalH) / 2);

cardBoxes[j] = [];
for (let i = 0; i < rows; i++) {
  const cardTop = firstTop + i * (cardH + cardGap);
  const cardLeft = left + lanePad;
  const cardWidth = laneW - lanePad * 2;

  const card = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, cardLeft, cardTop, cardWidth, cardH);
  card.getFill().setSolidFill(CONFIG.COLORS.card_bg);
  card.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.card_border);
  card.getBorder().setWeight(1);
  setStyledText(card, items[i] || '', { size: CONFIG.FONTS.sizes.body });

  try { card.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch(e){}
  cardBoxes[j][i] = { left: cardLeft, top: cardTop, width: cardWidth, height: cardH };
}

}

// 同行カード間を矢印で接続
const maxRows = Math.max(...cardBoxes.map(a => a.length));
for (let j = 0; j < n - 1; j++) {
const L = cardBoxes[j], R = cardBoxes[j + 1];
for (let i = 0; i < maxRows; i++) {
const a = L[i], b = R[i];
if (a && b) drawArrowBetweenRects(slide, a, b, arrowH, arrowGap);
}
}

drawBottomBarAndFooter(slide, layout, pageNum);
}

// cards（グレー枠のみ）— title/desc 両方でインライン装飾を有効化
function createCardsSlide(slide, data, layout, pageNum) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
drawStandardTitleHeader(slide, layout, 'cardsSlide', data.title);
const dy = drawSubheadIfAny(slide, layout, 'cardsSlide', data.subhead);

const area = offsetRect(layout.getRect('cardsSlide.gridArea'), 0, dy);
const items = Array.isArray(data.items) ? data.items : [];
const cols = Math.min(3, Math.max(2, Number(data.columns) || (items.length <= 4 ? 2 : 3)));
const gap = layout.pxToPt(16);
const rows = Math.ceil(items.length / cols);
const cardW = (area.width - gap * (cols - 1)) / cols;
const cardH = Math.max(layout.pxToPt(92), (area.height - gap * (rows - 1)) / rows);

for (let idx = 0; idx < items.length; idx++) {
const r = Math.floor(idx / cols), c = idx % cols;
const left = area.left + c * (cardW + gap);
const top  = area.top  + r * (cardH + gap);

const card = slide.insertShape(SlidesApp.ShapeType.ROUND_RECTANGLE, left, top, cardW, cardH);
card.getFill().setSolidFill(CONFIG.COLORS.card_bg);
card.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.card_border);
card.getBorder().setWeight(1);

const obj = items[idx];
if (typeof obj === 'string') {
  setStyledText(card, obj, { size: CONFIG.FONTS.sizes.body });
} else {
  const title = String(obj.title || '');
  const desc  = String(obj.desc || '');
  const combined = `${title}${desc ? '\n' + desc : ''}`;
  setStyledText(card, combined, { size: CONFIG.FONTS.sizes.body });
  if (title.length > 0) {
    try { card.getText().getRange(0, title.length).getTextStyle().setBold(true); } catch(e){}
  }
}
try { card.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch(e) {}

}

drawBottomBarAndFooter(slide, layout, pageNum);
}

// table（Slidesテーブルでもインライン装飾対応。失敗時は矩形代替でも対応）
function createTableSlide(slide, data, layout, pageNum) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
drawStandardTitleHeader(slide, layout, 'tableSlide', data.title);
const dy = drawSubheadIfAny(slide, layout, 'tableSlide', data.subhead);

const area = offsetRect(layout.getRect('tableSlide.area'), 0, dy);
const headers = Array.isArray(data.headers) ? data.headers : [];
const rows = Array.isArray(data.rows) ? data.rows : [];

try {
if (headers.length > 0) {
const table = slide.insertTable(rows.length + 1, headers.length);
table.setLeft(area.left).setTop(area.top).setWidth(area.width);
for (let c = 0; c < headers.length; c++) {
const cell = table.getCell(0, c);
setStyledText(cell, String(headers[c] || ''), { bold: true, align: SlidesApp.ParagraphAlignment.CENTER });
}
for (let r = 0; r < rows.length; r++) {
const row = rows[r] || [];
for (let c = 0; c < headers.length; c++) {
const cell = table.getCell(r + 1, c);
setStyledText(cell, String(row[c] || ''), { align: SlidesApp.ParagraphAlignment.CENTER });
}
}
} else {
throw new Error('headers is empty');
}
} catch (e) {
const cols = Math.max(1, headers.length || 3);
const rcount = rows.length + 1;
const gap = layout.pxToPt(1);
const cellW = (area.width - gap * (cols - 1)) / cols;
const cellH = (area.height - gap * (rcount - 1)) / rcount;
const drawCell = (r, c, text, bold) => {
const left = area.left + c * (cellW + gap);
const top  = area.top  + r * (cellH + gap);
const cell = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, left, top, cellW, cellH);
cell.getFill().setSolidFill(CONFIG.COLORS.background_white);
cell.getBorder().getLineFill().setSolidFill(CONFIG.COLORS.card_border);
cell.getBorder().setWeight(1);
setStyledText(cell, String(text || ''), { bold: !!bold, align: SlidesApp.ParagraphAlignment.CENTER });
try { cell.setContentAlignment(SlidesApp.ContentAlignment.MIDDLE); } catch(e){}
};
(headers.length ? headers : ['項目','値1','値2']).forEach((h, c) => drawCell(0, c, h, true));
for (let r = 0; r < rows.length; r++) {
const row = rows[r] || [];
for (let c = 0; c < (headers.length || 3); c++) drawCell(r + 1, c, row[c], false);
}
}

drawBottomBarAndFooter(slide, layout, pageNum);
}

// progress（進捗バー）
function createProgressSlide(slide, data, layout, pageNum) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
drawStandardTitleHeader(slide, layout, 'progressSlide', data.title);
const dy = drawSubheadIfAny(slide, layout, 'progressSlide', data.subhead);

const area = offsetRect(layout.getRect('progressSlide.area'), 0, dy);
const items = Array.isArray(data.items) ? data.items : [];
const n = Math.max(1, items.length);
const rowH = area.height / n;

for (let i = 0; i < n; i++) {
const y = area.top + i * rowH + layout.pxToPt(6);
const label = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, area.left, y, layout.pxToPt(150), layout.pxToPt(18));
setStyledText(label, String(items[i].label || ''), { size: CONFIG.FONTS.sizes.body });

const barLeft = area.left + layout.pxToPt(160);
const barW    = area.width - layout.pxToPt(210);
const barBG = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, barLeft, y, barW, layout.pxToPt(14));
barBG.getFill().setSolidFill(CONFIG.COLORS.faint_gray); barBG.getBorder().setTransparent();

const p = Math.max(0, Math.min(100, Number(items[i].percent || 0)));
const barFG = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, barLeft, y, barW * (p/100), layout.pxToPt(14));
barFG.getFill().setSolidFill(CONFIG.COLORS.google_green); barFG.getBorder().setTransparent();

const pct = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, barLeft + barW + layout.pxToPt(6), y - layout.pxToPt(1), layout.pxToPt(40), layout.pxToPt(16));
pct.getText().setText(String(p) + '%');
applyTextStyle(pct.getText(), { size: CONFIG.FONTS.sizes.small, color: CONFIG.COLORS.neutral_gray });

}

drawBottomBarAndFooter(slide, layout, pageNum);
}

function createClosingSlide(slide, data, layout) {
slide.getBackground().setSolidFill(CONFIG.COLORS.background_white);
const image = slide.insertImage(CONFIG.LOGOS.closing);
const imgW_pt = layout.pxToPt(450) * layout.scaleX;
const aspect = image.getHeight() / image.getWidth();
image.setWidth(imgW_pt).setHeight(imgW_pt * aspect);
image.setLeft((layout.pageW_pt - imgW_pt) / 2).setTop((layout.pageH_pt - (imgW_pt * aspect)) / 2);
}

// --- 7. ユーティリティ関数群 ---
function createLayoutManager(pageW_pt, pageH_pt) {
const pxToPt = (px) => px * 0.75;
const baseW_pt = pxToPt(CONFIG.BASE_PX.W);
const baseH_pt = pxToPt(CONFIG.BASE_PX.H);
const scaleX = pageW_pt / baseW_pt;
const scaleY = pageH_pt / baseH_pt;

const getPositionFromPath = (path) => path.split('.').reduce((obj, key) => obj[key], CONFIG.POS_PX);
return {
scaleX, scaleY, pageW_pt, pageH_pt, pxToPt,
getRect: (spec) => {
const pos = typeof spec === 'string' ? getPositionFromPath(spec) : spec;
let left_px = pos.left;
if (pos.right !== undefined && pos.left === undefined) {
left_px = CONFIG.BASE_PX.W - pos.right - pos.width;
}
return {
left:   left_px !== undefined ? pxToPt(left_px) * scaleX : undefined,
top:    pos.top !== undefined ? pxToPt(pos.top) * scaleY : undefined,
width:  pos.width !== undefined ? pxToPt(pos.width) * scaleX : undefined,
height: pos.height !== undefined ? pxToPt(pos.height) * scaleY : undefined,
};
}
};
}

function offsetRect(rect, dx, dy) {
return { left: rect.left + (dx || 0), top: rect.top + (dy || 0), width: rect.width, height: rect.height };
}

function drawStandardTitleHeader(slide, layout, key, title) {
const logoRect = layout.getRect(`${key}.headerLogo`);
const logo = slide.insertImage(CONFIG.LOGOS.header);
const asp = logo.getHeight() / logo.getWidth();
logo.setLeft(logoRect.left).setTop(logoRect.top).setWidth(logoRect.width).setHeight(logoRect.width * asp);

const titleRect = layout.getRect(`${key}.title`);
const titleShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, titleRect.left, titleRect.top, titleRect.width, titleRect.height);
setStyledText(titleShape, title || '', { size: CONFIG.FONTS.sizes.contentTitle, bold: true });

const uRect = layout.getRect(`${key}.titleUnderline`);
const u = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, uRect.left, uRect.top, uRect.width, uRect.height);
u.getFill().setSolidFill(CONFIG.COLORS.primary_blue);
u.getBorder().setTransparent();
}

function drawSubheadIfAny(slide, layout, key, subhead) {
if (!subhead) return 0;
const rect = layout.getRect(`${key}.subhead`);
const box = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rect.left, rect.top, rect.width, rect.height);
setStyledText(box, subhead, { size: CONFIG.FONTS.sizes.subhead, color: CONFIG.COLORS.text_primary });
return layout.pxToPt(36);
}

function drawBottomBar(slide, layout) {
const barRect = layout.getRect('bottomBar');
const bar = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, barRect.left, barRect.top, barRect.width, barRect.height);
bar.getFill().setSolidFill(CONFIG.COLORS.primary_blue);
bar.getBorder().setTransparent();
}

function drawBottomBarAndFooter(slide, layout, pageNum) {
drawBottomBar(slide, layout);
addGoogleFooter(slide, layout, pageNum);
}

function addGoogleFooter(slide, layout, pageNum) {
const leftRect = layout.getRect('footer.leftText');
const leftShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, leftRect.left, leftRect.top, leftRect.width, leftRect.height);
leftShape.getText().setText(CONFIG.FOOTER_TEXT);
applyTextStyle(leftShape.getText(), { size: CONFIG.FONTS.sizes.footer, color: CONFIG.COLORS.text_primary });

if (pageNum > 0) {
const rightRect = layout.getRect('footer.rightPage');
const rightShape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, rightRect.left, rightRect.top, rightRect.width, rightRect.height);
rightShape.getText().setText(String(pageNum));
applyTextStyle(rightShape.getText(), { size: CONFIG.FONTS.sizes.footer, color: CONFIG.COLORS.primary_blue, align: SlidesApp.ParagraphAlignment.END });
}
}

function applyTextStyle(textRange, opt) {
const style = textRange.getTextStyle();
style.setFontFamily(CONFIG.FONTS.family);
style.setForegroundColor(opt.color || CONFIG.COLORS.text_primary);
style.setFontSize(opt.size || CONFIG.FONTS.sizes.body);
style.setBold(opt.bold || false);
if (opt.align) {
try { textRange.getParagraphs().forEach(p => p.getRange().getParagraphStyle().setParagraphAlignment(opt.align)); } catch (e) {}
}
}

function setStyledText(shapeOrCell, rawText, baseOpt) {
const parsed = parseInlineStyles(rawText || '');
const tr = shapeOrCell.getText();
tr.setText(parsed.output);
applyTextStyle(tr, baseOpt || {});
applyStyleRanges(tr, parsed.ranges);
}

function setBulletsWithInlineStyles(shape, points) {
const joiner = '\n\n';
let combined = '';
const ranges = [];

(points || []).forEach((pt, idx) => {
const parsed = parseInlineStyles(String(pt || ''));
const bullet = '• ' + parsed.output;
if (idx > 0) combined += joiner;
const start = combined.length;
combined += bullet;

parsed.ranges.forEach(r => {
  ranges.push({ start: start + 2 + r.start, end: start + 2 + r.end, bold: r.bold, color: r.color });
});

});

const tr = shape.getText();
tr.setText(combined || '• —');
applyTextStyle(tr, { size: CONFIG.FONTS.sizes.body });

try {
tr.getParagraphs().forEach(p => {
const ps = p.getRange().getParagraphStyle();
ps.setLineSpacing(100);
ps.setSpaceBelow(6);
});
} catch (e) {}

applyStyleRanges(tr, ranges);
}

function parseInlineStyles(s) {
const ranges = [];
let out = '';
for (let i = 0; i < s.length; ) {
// [[青太字]]
if (s[i] === '[' && s[i+1] === '[') {
const close = s.indexOf(']]', i + 2);
if (close !== -1) {
const content = s.substring(i + 2, close);
const start = out.length;
out += content;
const end = out.length;
ranges.push({ start, end, bold: true, color: CONFIG.COLORS.primary_blue });
i = close + 2; continue;
}
}
// **太字**
if (s[i] === '*' && s[i+1] === '*') {
const close = s.indexOf('**', i + 2);
if (close !== -1) {
const content = s.substring(i + 2, close);
const start = out.length;
out += content;
const end = out.length;
ranges.push({ start, end, bold: true });
i = close + 2; continue;
}
}
out += s[i]; i++;
}
return { output: out, ranges };
}

function applyStyleRanges(textRange, ranges) {
ranges.forEach(r => {
try {
const sub = textRange.getRange(r.start, r.end);
if (!sub) return;
const st = sub.getTextStyle();
if (r.bold)  st.setBold(true);
if (r.color) st.setForegroundColor(r.color);
} catch (e) {}
});
}

function normalizeImages(arr) {
return (arr || []).map(v => {
if (typeof v === 'string') return { url: v };
if (v && typeof v.url === 'string') return { url: v.url, caption: v.caption || '' };
return null;
}).filter(Boolean).slice(0, 6);
}

function renderImagesInArea(slide, layout, area, images) {
if (!images || images.length === 0) return;
const n = Math.min(6, images.length);
let cols = 1, rows = 1;
if (n === 1) { cols = 1; rows = 1; }
else if (n === 2) { cols = 2; rows = 1; }
else if (n <= 4) { cols = 2; rows = 2; }
else { cols = 3; rows = 2; }

const gap = layout.pxToPt(10);
const cellW = (area.width - gap * (cols - 1)) / cols;
const cellH = (area.height - gap * (rows - 1)) / rows;

for (let i = 0; i < n; i++) {
const r = Math.floor(i / cols), c = i % cols;
const left = area.left + c * (cellW + gap);
const top  = area.top  + r * (cellH + gap);
try {
const img = slide.insertImage(images[i].url);
const scale = Math.min(cellW / img.getWidth(), cellH / img.getHeight());
const w = img.getWidth() * scale;
const h = img.getHeight() * scale;
img.setWidth(w).setHeight(h);
img.setLeft(left + (cellW - w) / 2).setTop(top + (cellH - h) / 2);
} catch(e) {}
}
}

function isAgendaTitle(title) {
const t = String(title || '').toLowerCase();
return /(agenda|アジェンダ|目次|本日お伝えすること)/.test(t);
}
function buildAgendaFromSlideData() {
const pts = [];
for (const d of slideData) {
if (d && d.type === 'section' && typeof d.title === 'string' && d.title.trim()) pts.push(d.title.trim());
}
if (pts.length > 0) return pts.slice(0, 5);
const alt = [];
for (const d of slideData) {
if (d && d.type === 'content' && typeof d.title === 'string' && d.title.trim()) alt.push(d.title.trim());
}
return alt.slice(0, 5);
}

function drawArrowBetweenRects(slide, a, b, arrowH, arrowGap) {
const fromX = a.left + a.width;
const toX   = b.left;
const width = Math.max(0, toX - fromX - arrowGap * 2);
if (width < 8) return;
const yMid = ((a.top + a.height/2) + (b.top + b.height/2)) / 2;
const top = yMid - arrowH / 2;
const left = fromX + arrowGap;
const arr = slide.insertShape(SlidesApp.ShapeType.RIGHT_ARROW, left, top, width, arrowH);
arr.getFill().setSolidFill(CONFIG.COLORS.primary_blue);
arr.getBorder().setTransparent();
}