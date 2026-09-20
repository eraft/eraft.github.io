---
name: E-RAFT Lab Design System
version: 1.0.0

colors:
  light:
    background:
      primary: "#f5f5f5"
      secondary: "#e8e8e8"
      card: "#ffffff"
    text:
      primary: "#1a1a1a"
      secondary: "#4a4a4a"
      muted: "#7a7a7a"
    border: "#d5d5d5"
    shadow: "rgba(0, 0, 0, 0.08)"
    shadowHover: "rgba(0, 0, 0, 0.12)"
    header:
      gradientStart: "rgba(226, 236, 233, 0.8)"
      gradientEnd: "rgba(241, 250, 238, 0.8)"
    iconButton:
      background: "rgba(210, 220, 217, 1.0)"
      backgroundHover: "rgba(190, 200, 197, 1.0)"

  dark:
    background:
      primary: "#0f172a"
      secondary: "#1e293b"
      card: "#1e293b"
    text:
      primary: "#f5f5f5"
      secondary: "#d0d0d0"
      muted: "#a0a0a0"
    border: "#334155"
    shadow: "rgba(0, 0, 0, 0.3)"
    shadowHover: "rgba(0, 0, 0, 0.5)"
    header:
      gradientStart: "rgba(226, 236, 233, 0.15)"
      gradientEnd: "rgba(241, 250, 238, 0.15)"

  accent:
    gradientStart: "#009900"
    gradientMid: "#288903"
    gradientEnd: "#59A207"
    hover: "#288903"
    darkGradientStart: "#00bb00"
    darkGradientMid: "#33aa11"
    darkGradientEnd: "#6bc20f"
    darkHover: "#33aa11"
    buttonText: "#ffffff"

typography:
  fontFamily:
    primary: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

  heading:
    h1:
      fontSize: "32px"
      fontWeight: 700
      lineHeight: 1.2
    h2:
      fontSize: "28px"
      fontWeight: 700
      lineHeight: 1.3
    h3:
      fontSize: "20px"
      fontWeight: 600
      lineHeight: 1.4

  body:
    large:
      fontSize: "16px"
      fontWeight: 400
      lineHeight: 1.6
    regular:
      fontSize: "14px"
      fontWeight: 400
      lineHeight: 1.5
    small:
      fontSize: "12px"
      fontWeight: 400
      lineHeight: 1.5

  label:
    medium:
      fontSize: "14px"
      fontWeight: 500
    small:
      fontSize: "12px"
      fontWeight: 500

spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"

borderRadius:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"

transitions:
  fast: "150ms ease"
  normal: "250ms ease"
  slow: "350ms ease"

effects:
  backdropBlur: "blur(10px)"
  modalOverlay:
    light: "rgba(0, 0, 0, 0.4)"
    dark: "rgba(0, 0, 0, 0.6)"
---

# E-RAFT Lab Design System

## Overview

E-RAFT Labのデザインシステムは、**生産性ツールとしての信頼性**と**親しみやすさ**を両立させることを目指しています。シンプルで明快なインターフェースを通じて、ユーザーが日々の作業を効率化できる環境を提供します。

## Design Philosophy

### 1. クリーンで整理された空間
- 余白を活用した視覚的な快適さ
- 必要な情報だけを提示する情報設計
- カード型レイアウトによる情報の構造化

### 2. 親しみやすいブランドカラー
- E-RAFT Greenをアクセントカラーとして使用
- グリーンは「成長」「効率」「新鮮さ」を象徴
- グラデーションによる視覚的な深みと動き

### 3. ライト・ダークモード対応
- ユーザーの好みや作業環境に適応
- どちらのモードでも快適な可読性を保証
- スムーズなテーマ切替トランジション

## Colors

### Light Mode
**背景色の階層構造:**
- `primary` (#f5f5f5): ページ全体の基本背景。柔らかく目に優しいグレー
- `secondary` (#e8e8e8): セクション区切りや副次的な要素の背景
- `card` (#ffffff): カードやモーダルの背景。最も目立たせたいコンテンツ

**テキストの階層:**
- `primary` (#1a1a1a): 見出しや本文。高いコントラストで可読性を確保
- `secondary` (#4a4a4a): 補足情報やラベル
- `muted` (#7a7a7a): メタ情報や控えめな要素

**ヘッダーグラデーション:**
ヘッダーには薄い緑がかったグラデーション (rgba(226, 236, 233, 0.8) → rgba(241, 250, 238, 0.8)) を使用。ブランドカラーの緑を控えめに取り入れつつ、backdrop-filterとの組み合わせで透明感と奥行きを演出。

**アイコンボタン:**
ヘッダーのグラデーションと調和する緑がかった色 (rgba(210, 220, 217, 1.0)) を使用。ヘッダー背景よりも少し濃いめにすることで、視認性を確保しながら統一感を保つ。

### Dark Mode
**スレート系の落ち着いた背景:**
- `primary` (#0f172a): 深い青みがかった黒。長時間の作業でも目が疲れにくい
- `secondary` (#1e293b): やや明るいスレート色
- `card` (#1e293b): カード背景。primaryとの対比で視覚的な階層を作る

**明るいテキスト:**
- `primary` (#f5f5f5): 高いコントラストの白
- `secondary` (#d0d0d0): 柔らかいグレー
- `muted` (#a0a0a0): 控えめな情報

**ダークモードでのアクセント:**
ダークモード時はアクセントグリーンをやや明るく (#00bb00, #33aa11, #6bc20f) することで、暗い背景でも鮮やかさを維持。

### Accent - E-RAFT Green
**グラデーション構成:**
- ライトモード: #009900 → #288903 → #59A207
- ダークモード: #00bb00 → #33aa11 → #6bc20f

**使用箇所:**
- プライマリボタン（ダウンロード、詳細を見るなど）
- アクティブな状態表示
- 重要なCTA（Call to Action）

**意図:**
緑は「成長」「効率化」「新鮮さ」を象徴。グラデーションを使用することで、静的な単色よりも視覚的に魅力的で、ブランドの活気を表現。

## Typography

### Font Family
**Inter**を採用。Googleが開発したモダンなサンセリフフォント。
- 高い可読性: 小さいサイズでも判読しやすい
- ニュートラルな印象: 様々なコンテンツに適応
- 豊富なウェイト: 階層表現に最適

フォールバック: システムフォント (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto) により、どの環境でも快適な表示を保証。

### Type Scale
**見出し:**
- H1 (32px/700): ページタイトル、セクション見出し
- H2 (28px/700): サブセクション、モーダルタイトル
- H3 (20px/600): カードタイトル、小見出し

**本文:**
- Large (16px/400): 説明文、長文コンテンツ
- Regular (14px/400): 標準的な本文、ラベル
- Small (12px/400): メタ情報、補足

**ラベル:**
- Medium (14px/500): ボタンテキスト、重要なラベル
- Small (12px/500): タグ、ステータス表示

**行間 (line-height):**
- 見出し: 1.2-1.4（タイトな間隔で力強さを表現）
- 本文: 1.5-1.6（読みやすさを重視）

## Spacing

**8pxベースのスペーシングシステム:**
- xs (6px): 密接な要素間（アイコンとテキスト）
- sm (12px): 関連する要素間
- md (16px): 標準的な間隔（コンポーネント内）
- lg (24px): セクション間
- xl (32px): 大きな余白（ページパディング）
- xxl (48px): セクション間の大きな余白

**一貫性の原則:**
同じ意味を持つ間隔には同じスペーシング値を使用。これにより、視覚的なリズムと予測可能性が生まれる。

## Border Radius

**柔らかさのグラデーション:**
- sm (6px): 小さな要素（タグ、チップ）
- md (8px): ボタン、インプット
- lg (12px): カード、モーダル
- xl (16px): 大きなコンテナ

**意図:**
適度な丸みで親しみやすさを表現しつつ、過度に丸くしないことでプロフェッショナルな印象を維持。

## Transitions

**スムーズなインタラクション:**
- fast (150ms): ボタンのホバー、小さな状態変化
- normal (250ms): テーマ切替、フェードイン/アウト
- slow (350ms): モーダルの開閉、大きな変化

**イージング:**
すべてのトランジションに `ease` を使用。自然な加速・減速で心地よい動きを実現。

## Effects

### Backdrop Filter
ヘッダーに `blur(10px)` を適用。スクロール時にコンテンツがヘッダーの後ろを通過する際、ぼかし効果で可読性を保ちつつ、モダンで洗練された印象を与える。

### Shadows
**段階的なシャドウ:**
- 通常: rgba(0, 0, 0, 0.08) - 控えめな浮遊感
- ホバー: rgba(0, 0, 0, 0.12) - インタラクション可能であることを示唆

ダークモード時はより強いシャドウ (0.3/0.5) で、暗い背景でも視覚的な階層を維持。

### Modal Overlay
- ライトモード: rgba(0, 0, 0, 0.4) - 適度な暗さで背景を隠す
- ダークモード: rgba(0, 0, 0, 0.6) - より強い暗さで視覚的な分離

## Implementation Guidelines

### カラーの適用
1. **背景から適用:** ページ全体 → セクション → カード の順で階層を意識
2. **テキストコントラスト:** 背景色に応じて適切なテキスト色を選択（WCAG AA準拠を推奨）
3. **アクセントは控えめに:** 重要なCTAや状態表示にのみ使用

### タイポグラフィの適用
1. **情報階層を明確に:** 見出し、本文、補足の3段階を意識
2. **一貫性:** 同じ意味を持つテキストには同じスタイルを適用
3. **可読性:** 長文には行間1.5以上を確保

### スペーシングの適用
1. **8pxグリッド:** できるだけ8の倍数でレイアウト
2. **視覚的グルーピング:** 関連する要素は近く、異なる要素は遠く配置
3. **呼吸する空間:** 詰め込みすぎず、適度な余白を確保

## Accessibility

### コントラスト比
- 通常テキスト: 4.5:1以上
- 大きいテキスト: 3:1以上
- UI要素: 3:1以上

### フォーカス状態
すべてのインタラクティブ要素に明確なフォーカス表示を提供（アウトライン、シャドウなど）。

### モーションの配慮
トランジションは視覚的なフィードバックを提供しますが、`prefers-reduced-motion` メディアクエリで動きを減らすオプションを検討。

## Version History

### v1.0.0 (2026-09-09)
- 初版リリース
- ライト・ダークモード対応
- E-RAFT Greenアクセントカラー定義
- Interフォント採用
- ヘッダーグラデーションとアイコンボタンの統一
