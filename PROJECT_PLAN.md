# LingoLearn Web - 项目实施计划

## 项目概述

**LingoLearn** 是一个现代化的 Web 背单词应用，采用 Next.js 14 + Supabase 技术栈，提供类似原生 iOS 应用的流畅体验。支持跨平台使用（桌面、平板、手机），并可作为 PWA 安装。

---

## 🛠 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **UI**: React 18 + TailwindCSS 3
- **动画**: Framer Motion
- **图表**: Recharts
- **字体**: Google Fonts (Inter)
- **类型**: TypeScript 5

### 后端
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth (Google OAuth)
- **存储**: Supabase Storage (用户头像等)
- **实时**: Supabase Realtime (可选)

### 核心算法
- **复习算法**: SM-2 Algorithm (SuperMemo 2)
- **TTS**: Web Speech API (浏览器原生)

---

## 📊 数据库设计

### 1. `profiles` 表（用户资料）
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  daily_goal INTEGER DEFAULT 20,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. `words` 表（单词库）
```sql
CREATE TABLE words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  english TEXT NOT NULL,
  phonetic TEXT,
  chinese TEXT NOT NULL,
  example_sentence TEXT,
  category TEXT, -- CET4, CET6, TOEFL, etc.
  difficulty INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_words_category ON words(category);
```

### 3. `user_words` 表（用户学习记录）
```sql
CREATE TABLE user_words (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  word_id UUID REFERENCES words(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'new', -- new, learning, mastered
  ease_factor REAL DEFAULT 2.5, -- SM-2 算法参数
  interval INTEGER DEFAULT 0, -- 复习间隔（天）
  repetitions INTEGER DEFAULT 0, -- 重复次数
  next_review_date TIMESTAMPTZ,
  is_favorited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, word_id)
);

CREATE INDEX idx_user_words_user_id ON user_words(user_id);
CREATE INDEX idx_user_words_next_review ON user_words(next_review_date);
```

### 4. `study_sessions` 表（学习会话）
```sql
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL, -- study, test_choice, test_fill, test_listening
  words_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX idx_study_sessions_date ON study_sessions(created_at);
```

### 5. `achievements` 表（成就系统）
```sql
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL, -- first_study, streak_7, master_100, etc.
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  requirement_type TEXT, -- streak, word_count, session_count
  requirement_value INTEGER
);

CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
```

---

## 🎨 UI/UX 设计方案

### 配色系统
```css
/* 主色调 - 现代蓝绿渐变 */
--primary: #0EA5E9; /* Sky Blue */
--primary-dark: #0284C7;
--accent: #14B8A6; /* Teal */
--accent-dark: #0D9488;

/* 渐变背景 */
--gradient-primary: linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%);
--gradient-card: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%);

/* 状态色 */
--success: #10B981; /* Green */
--error: #EF4444; /* Red */
--warning: #F59E0B; /* Amber */

/* 中性色 */
--bg-light: #F8FAFC;
--bg-dark: #0F172A;
--card-light: #FFFFFF;
--card-dark: #1E293B;
```

### 设计原则
1. **Glassmorphism（毛玻璃拟态）**: 卡片使用半透明效果 + backdrop-blur
2. **Micro-interactions（微交互）**: 所有按钮、卡片都有 hover/active 状态动画
3. **3D Transforms（3D 变换）**: 卡片翻转使用真实的 3D 透视效果
4. **Gradient Accents（渐变强调）**: 重要元素使用渐变色突出
5. **Dark Mode First（深色优先）**: 默认深色模式，提供浅色切换

### 关键组件设计

#### 1. 单词卡片（WordCard）
- 3D 翻转动画（Framer Motion `rotateY`）
- 手势识别：左滑/右滑/上滑
- 滑动时倾斜 + 颜色渐变反馈
- 音频播放按钮（带波纹动画）

#### 2. 进度环（ProgressRing）
- SVG 圆环进度（stroke-dasharray 动画）
- 中心显示百分比 + 动态数字计数
- 渐变边框

#### 3. 统计图表（Charts）
- 折线图：最近 30 天学习曲线
- 热力图：年度学习日历（类似 GitHub）
- 饼图：词汇掌握度分布

---

## 📁 项目结构

```
lingolearn-web/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── auth/callback/
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx         # 主布局（带导航）
│   │   │   ├── page.tsx            # 首页（今日学习）
│   │   │   ├── study/page.tsx      # 单词学习页
│   │   │   ├── practice/page.tsx   # 练习测试页
│   │   │   ├── progress/page.tsx   # 学习进度页
│   │   │   └── settings/page.tsx   # 设置页
│   │   ├── layout.tsx              # 根布局
│   │   ├── globals.css             # 全局样式
│   │   └── error.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   └── GoogleAuthButton.tsx
│   │   ├── study/
│   │   │   ├── WordCard.tsx        # 3D 翻转卡片
│   │   │   ├── SwipeGesture.tsx    # 滑动手势
│   │   │   └── TTSButton.tsx       # 发音按钮
│   │   ├── practice/
│   │   │   ├── ChoiceQuestion.tsx
│   │   │   ├── FillQuestion.tsx
│   │   │   └── ListeningQuestion.tsx
│   │   ├── progress/
│   │   │   ├── ProgressRing.tsx    # 环形进度
│   │   │   ├── StudyChart.tsx      # 学习曲线
│   │   │   ├── HeatmapCalendar.tsx # 热力日历
│   │   │   └── AchievementBadge.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── Toast.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # 浏览器客户端
│   │   │   ├── server.ts           # 服务器客户端
│   │   │   └── middleware.ts
│   │   ├── algorithms/
│   │   │   └── sm2.ts              # SM-2 算法
│   │   ├── hooks/
│   │   │   ├── useStudySession.ts
│   │   │   ├── useTTS.ts
│   │   │   └── useProgress.ts
│   │   └── utils/
│   │       ├── date.ts
│   │       └── stats.ts
│   └── types/
│       └── database.types.ts       # Supabase 类型定义
├── public/
│   ├── words/
│   │   ├── cet4.json               # CET4 词库
│   │   └── cet6.json               # CET6 词库
│   ├── icons/
│   └── manifest.json               # PWA 配置
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql                    # 预置单词数据
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 开发阶段规划

### Phase 1: 项目初始化（1-2 天）
- [x] 创建项目规划文档
- [ ] 初始化 Next.js 项目
- [ ] 配置 TailwindCSS + Framer Motion
- [ ] 设置 Supabase 项目
- [ ] 创建数据库 Schema 和 RLS 策略
- [ ] 导入预置单词数据（500+ 词）

### Phase 2: 核心功能开发（5-7 天）

#### 2.1 认证系统
- [ ] Google OAuth 登录
- [ ] 用户资料管理
- [ ] 受保护路由中间件

#### 2.2 首页（Today）
- [ ] 环形进度条组件
- [ ] 打卡系统
- [ ] 待复习提醒
- [ ] 快捷入口按钮

#### 2.3 单词学习
- [ ] 3D 翻转卡片组件
- [ ] 滑动手势识别（左/右/上）
- [ ] TTS 发音功能
- [ ] SM-2 算法集成
- [ ] 学习结果统计弹窗

#### 2.4 练习测试
- [ ] 选择题模块
- [ ] 填空题模块
- [ ] 听力题模块
- [ ] 倒计时系统
- [ ] 答题反馈动画
- [ ] 错题回顾页

### Phase 3: 数据可视化（2-3 天）
- [ ] 学习曲线折线图
- [ ] GitHub 风格热力日历
- [ ] 词汇掌握度饼图
- [ ] 成就徽章系统
- [ ] 解锁动画效果

### Phase 4: 设置与优化（2-3 天）
- [ ] 每日目标设置
- [ ] 学习提醒（Push Notification API）
- [ ] 深色/浅色模式切换
- [ ] 音效和震动反馈
- [ ] 数据重置功能
- [ ] 性能优化（懒加载、缓存）
- [ ] PWA 配置（离线支持）

### Phase 5: 测试与部署（1-2 天）
- [ ] 功能测试
- [ ] 响应式适配（手机/平板/桌面）
- [ ] Vercel 部署
- [ ] Supabase 生产环境配置
- [ ] README 文档

---

## 🎯 核心功能实现细节

### SM-2 算法实现

```typescript
interface SM2Result {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: Date;
}

/**
 * SM-2 复习算法
 * @param quality 0-5，用户回答质量（0=完全不会，5=完美）
 * @param easeFactor 当前简易度（默认2.5）
 * @param interval 当前间隔天数
 * @param repetitions 重复次数
 */
export function calculateSM2(
  quality: number,
  easeFactor: number = 2.5,
  interval: number = 0,
  repetitions: number = 0
): SM2Result {
  let newEaseFactor = easeFactor;
  let newInterval = interval;
  let newRepetitions = repetitions;

  // 计算新的简易度
  newEaseFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // 如果回答质量 >= 3，增加间隔
  if (quality >= 3) {
    if (newRepetitions === 0) {
      newInterval = 1;
    } else if (newRepetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * newEaseFactor);
    }
    newRepetitions++;
  } else {
    // 重新开始
    newRepetitions = 0;
    newInterval = 1;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReviewDate,
  };
}
```

### Web Speech API 使用

```typescript
export function speakWord(text: string, lang: string = 'en-US') {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9; // 稍慢速度
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}
```

---

## 🔒 Supabase RLS 策略

```sql
-- profiles 表策略
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- user_words 表策略
ALTER TABLE user_words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own words"
  ON user_words FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own words"
  ON user_words FOR ALL
  USING (auth.uid() = user_id);

-- study_sessions 表策略
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
  ON study_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON study_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## 📦 预置单词数据

### CET4 核心词汇（部分示例）
```json
[
  {
    "english": "abandon",
    "phonetic": "/əˈbændən/",
    "chinese": "v. 放弃；抛弃",
    "example_sentence": "They had to abandon their home because of the flood.",
    "category": "CET4",
    "difficulty": 2
  },
  {
    "english": "ability",
    "phonetic": "/əˈbɪləti/",
    "chinese": "n. 能力；才能",
    "example_sentence": "She has the ability to speak three languages.",
    "category": "CET4",
    "difficulty": 1
  }
  // ... 继续 500+ 词
]
```

---

## 🎨 视觉效果示例

### 卡片翻转效果（Framer Motion）
```tsx
<motion.div
  animate={{ rotateY: isFlipped ? 180 : 0 }}
  transition={{ duration: 0.6, type: "spring" }}
  style={{ transformStyle: "preserve-3d" }}
>
  {/* 卡片内容 */}
</motion.div>
```

### 滑动手势反馈
```tsx
const x = useMotionValue(0);
const rotateZ = useTransform(x, [-200, 200], [-15, 15]);
const backgroundColor = useTransform(
  x,
  [-200, -50, 0, 50, 200],
  ["#EF4444", "#F59E0B", "#3B82F6", "#10B981", "#10B981"]
);
```

---

## 🚢 部署清单

### 环境变量（.env.local）
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Vercel 部署
1. 推送代码到 GitHub
2. Vercel 导入项目
3. 配置环境变量
4. 自动部署

### Supabase 配置
1. 启用 Google OAuth Provider
2. 配置回调 URL: `https://yourdomain.com/auth/callback`
3. 运行数据库迁移
4. 导入预置单词数据

---

## 📝 开发规范

### Git 提交信息
```
feat: 添加单词卡片3D翻转功能
fix: 修复深色模式下按钮颜色问题
style: 优化首页进度环样式
perf: 优化图表渲染性能
docs: 更新 README 部署说明
```

### 代码风格
- 使用 TypeScript 严格模式
- 组件使用函数式 + Hooks
- 遵循 Airbnb React Style Guide
- Prettier 自动格式化

---

## 🎯 成功标准

1. ✅ 所有原始 iOS 功能 100% 实现
2. ✅ 首屏加载时间 < 2 秒
3. ✅ Lighthouse 性能评分 > 90
4. ✅ 完美支持移动端触控操作
5. ✅ 深色/浅色模式无缝切换
6. ✅ PWA 可离线使用
7. ✅ 动画流畅度 60fps

---

## 📚 参考资源

- [Next.js 14 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Framer Motion 文档](https://www.framer.com/motion/)
- [SM-2 算法论文](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

**预计总开发时间**: 12-15 天  
**技术难度**: ⭐⭐⭐⭐☆  
**视觉效果目标**: 超越原生 iOS 应用的现代化设计
