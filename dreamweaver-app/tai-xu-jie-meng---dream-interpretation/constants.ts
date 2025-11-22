
import { SymbolDefinition } from './types';

// A. Scientific Symbols Knowledge Base
export const SCIENTIFIC_SYMBOLS: SymbolDefinition[] = [
  {
    id: 101,
    symbol_name: "恐惧/追逐 (Fear/Chasing)",
    theory_or_source: "Freud/Jung/Cognitive Science",
    meaning: "象征潜意识中未解决的冲突或被压抑的欲望。追逐者往往是自我不愿面对的部分。",
    emotional_link: "逃避 (Avoidance), 焦虑 (Anxiety)",
    source: "Sigmund Freud, 'The Interpretation of Dreams'; Carl Jung, 'Man and His Symbols'",
    type: 'scientific'
  },
  {
    id: 102,
    symbol_name: "爱/亲密关系 (Love/Intimacy)",
    theory_or_source: "Jungian Psychology",
    meaning: "象征对完整性的渴望或自我的投射。梦中伴侣可能是潜意识中理想化的‘阿尼玛/阿尼姆斯’。",
    emotional_link: "渴望 (Desire), 完整性 (Wholeness)",
    source: "Carl Jung, 'The Archetypes and The Collective Unconscious'",
    type: 'scientific'
  },
  {
    id: 103,
    symbol_name: "焦虑/迷路 (Anxiety/Getting Lost)",
    theory_or_source: "Cognitive Psychology",
    meaning: "象征现实生活中方向感的缺失或认知负荷过重。是潜意识对当前生活状态失控感的反映。",
    emotional_link: "无助 (Helplessness), 困惑 (Confusion)",
    source: "Revonsuo, 'The Re-creation of waking life events in dreams'",
    type: 'scientific'
  }
];

// B. Traditional Symbols Knowledge Base
export const TRADITIONAL_SYMBOLS: SymbolDefinition[] = [
  {
    id: 201,
    symbol_name: "恐惧/追逐 (Fear/Chasing)",
    theory_or_source: "Taoism/Folk Beliefs",
    meaning: "追逐可能象征劫难或是非即将到来。但在道家思想中，也可能是心魔的外化。",
    prediction_type: "警示 (Warning)",
    source: "道家内丹术 (Taoist Inner Alchemy Texts); 民俗口传 (Folk Oral Traditions)",
    type: 'traditional'
  },
  {
    id: 202,
    symbol_name: "爱/亲密关系 (Love/Intimacy)",
    theory_or_source: "Zhou Gong's Dream Dictionary",
    meaning: "亲密关系可能象征家庭的和睦或人际关系的和谐。梦中婚嫁则常有特殊的吉凶预示。",
    prediction_type: "预兆 (Omen)",
    source: "周公解梦 (Zhou Gong Jie Meng)",
    type: 'traditional'
  },
  {
    id: 203,
    symbol_name: "焦虑/迷路 (Anxiety/Getting Lost)",
    theory_or_source: "I Ching (Book of Changes)",
    meaning: "迷路通常象征事业或前途的迷惘。在《易经》中，可能与某些爻象所代表的进退两难状态对应。",
    prediction_type: "启示 (Revelation)",
    source: "易经 (I Ching), 坎卦 (Hexagram 29 Kan) & 蹇卦 (Hexagram 39 Jian)",
    type: 'traditional'
  }
];

export const APP_NAME = "太虚解梦";
export const APP_SUBTITLE = "一梦一世界 · 虚实皆真意";
export const DEMO_DREAM = "我梦到我在一个迷宫里奔跑，后面好像有人在追我，感觉非常焦虑。";

// Strictly Dream-related poetry
export const POETRY_QUOTES = [
  "庄生晓梦迷蝴蝶，望帝春心托杜鹃。",
  "醉后不知天在水，满船清梦压星河。",
  "梦里不知身是客，一晌贪欢。",
  "世事一场大梦，人生几度秋凉。",
  "夜来幽梦忽还乡，小轩窗，正梳妆。",
  "觉后不知明月上，满身花影倩人扶。",
  "梦入江南烟水路，行尽江南，不与离人遇。",
  "云母屏风烛影深，长河渐落晓星沉。"
];
