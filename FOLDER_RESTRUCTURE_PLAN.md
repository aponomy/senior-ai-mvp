# 📁 src/ Folder Restructure Plan

**Current Date**: 22 November 2025  
**Project**: senior-ai-mvp/apps/client/src

---

## 🎯 Problems with Current Structure

### 1. **Inconsistent Component Organization**
- ❌ `ChatInput.tsx`, `Footer.tsx`, `PageContainer.tsx`, `Timeline.tsx` at root of `components/`
- ❌ Mix of layout, feature, and UI components in same folder
- ❌ No clear distinction between "app components" and "feature components"

### 2. **UI Components Mixed Naming**
- ❌ PascalCase: `BulletList.tsx`, `GlassCard.tsx`, `DynamicCard.tsx`
- ❌ kebab-case: `button.tsx`, `input.tsx`, `toggle.tsx`
- ❌ Inconsistent file naming (shadcn vs custom)

### 3. **Flat Structure**
- ❌ All pages in one `pages/` folder (will grow)
- ❌ No feature-based organization
- ❌ Hard to understand relationships

### 4. **Data/Mock Files**
- ❌ `mockConversation.ts` mixed with real helpers
- ❌ No clear separation of mock vs production data

---

## ✅ Proposed New Structure

```
src/
├── app/                          # App-level concerns
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx                # NEW: Extract routing logic
│
├── components/                   # Shared/reusable components
│   ├── layout/                   # Layout components
│   │   ├── Footer.tsx
│   │   ├── PageContainer.tsx
│   │   └── Timeline.tsx
│   │
│   └── ui/                       # UI components (shadcn + custom)
│       ├── shadcn/               # Pure shadcn components
│       │   ├── button.tsx
│       │   ├── input.tsx
│       │   ├── toggle.tsx
│       │   ├── toggle-group.tsx
│       │   └── dropdown-menu.tsx
│       │
│       └── custom/               # Custom UI components
│           ├── BulletList.tsx
│           ├── DynamicCard.tsx
│           ├── DynamicCard.css
│           ├── FunctionButton.tsx
│           ├── GlassCard.tsx
│           ├── GlassColumn.tsx
│           ├── RelativeTime.tsx
│           ├── SectionDivider.tsx
│           └── TextWithIcon.tsx
│
├── features/                     # Feature-based organization
│   ├── conversation/             # Conversation feature
│   │   ├── components/
│   │   │   ├── ConversationColumn.tsx
│   │   │   ├── ConversationNavigator.tsx
│   │   │   ├── FunctionSummaryCard.tsx
│   │   │   ├── KeyPointColumn.tsx
│   │   │   ├── KeyPointItem.tsx
│   │   │   ├── MessageComponents.tsx
│   │   │   ├── MetaSummaryCard.tsx
│   │   │   ├── SummaryCard.tsx
│   │   │   └── SummaryColumn.tsx
│   │   ├── types/
│   │   │   └── conversation.ts   # Move from root types/
│   │   ├── hooks/
│   │   │   └── useConversation.ts (future)
│   │   └── index.ts              # Export all conversation components
│   │
│   ├── topics/                   # Topics feature
│   │   ├── components/
│   │   │   └── TopicsPage.tsx    # Rename from Topics.tsx
│   │   ├── data/
│   │   │   └── topics.json
│   │   └── index.ts
│   │
│   ├── functions/                # Functions feature
│   │   ├── components/
│   │   │   └── FunctionsPage.tsx # Rename from Functions.tsx
│   │   └── index.ts
│   │
│   ├── settings/                 # Settings feature
│   │   ├── components/
│   │   │   └── SettingsPage.tsx  # Rename from Settings.tsx
│   │   └── index.ts
│   │
│   └── chat/                     # Chat feature
│       ├── components/
│       │   └── ChatInput.tsx     # Move from components/
│       └── index.ts
│
├── shared/                       # Shared utilities
│   ├── context/                  # Context providers
│   │   └── DashboardContext.tsx
│   │
│   ├── types/                    # Shared types
│   │   └── objects.ts
│   │
│   ├── lib/                      # Utility functions
│   │   └── utils.ts
│   │
│   ├── hooks/                    # Shared hooks (future)
│   │   └── index.ts
│   │
│   └── constants/                # Constants (future)
│       └── index.ts
│
├── data/                         # Data layer
│   ├── helpers/
│   │   └── conversationHelpers.ts
│   └── mocks/                    # Mock data
│       ├── mockConversation.ts
│       └── topics.json (symlink or move)
│
├── styles/                       # Global styles
│   └── index.css                 # Rename from index.css at root
│
└── types/                        # Root types (deprecated, move to features)
    └── vite-env.d.ts             # Keep only env types
```

---

## 📋 Migration Steps

### Phase 1: Create New Folder Structure (No Breaking Changes)
```bash
# Create new directories
mkdir -p src/app
mkdir -p src/components/layout
mkdir -p src/components/ui/shadcn
mkdir -p src/components/ui/custom
mkdir -p src/features/conversation/components
mkdir -p src/features/conversation/types
mkdir -p src/features/topics/components
mkdir -p src/features/topics/data
mkdir -p src/features/functions/components
mkdir -p src/features/settings/components
mkdir -p src/features/chat/components
mkdir -p src/shared/context
mkdir -p src/shared/types
mkdir -p src/shared/lib
mkdir -p src/data/helpers
mkdir -p src/data/mocks
```

### Phase 2: Move Files (Safe Moves)

#### App Files
```bash
mv src/App.tsx src/app/App.tsx
mv src/main.tsx src/app/main.tsx
```

#### Layout Components
```bash
mv src/components/Footer.tsx src/components/layout/Footer.tsx
mv src/components/PageContainer.tsx src/components/layout/PageContainer.tsx
mv src/components/Timeline.tsx src/components/layout/Timeline.tsx
```

#### Shadcn UI Components
```bash
mv src/components/ui/button.tsx src/components/ui/shadcn/button.tsx
mv src/components/ui/input.tsx src/components/ui/shadcn/input.tsx
mv src/components/ui/toggle.tsx src/components/ui/shadcn/toggle.tsx
mv src/components/ui/toggle-group.tsx src/components/ui/shadcn/toggle-group.tsx
mv src/components/ui/dropdown-menu.tsx src/components/ui/shadcn/dropdown-menu.tsx
```

#### Custom UI Components
```bash
mv src/components/ui/BulletList.tsx src/components/ui/custom/BulletList.tsx
mv src/components/ui/DynamicCard.tsx src/components/ui/custom/DynamicCard.tsx
mv src/components/ui/DynamicCard.css src/components/ui/custom/DynamicCard.css
mv src/components/ui/FunctionButton.tsx src/components/ui/custom/FunctionButton.tsx
mv src/components/ui/GlassCard.tsx src/components/ui/custom/GlassCard.tsx
mv src/components/ui/GlassColumn.tsx src/components/ui/custom/GlassColumn.tsx
mv src/components/ui/RelativeTime.tsx src/components/ui/custom/RelativeTime.tsx
mv src/components/ui/SectionDivider.tsx src/components/ui/custom/SectionDivider.tsx
mv src/components/ui/TextWithIcon.tsx src/components/ui/custom/TextWithIcon.tsx
```

#### Conversation Feature
```bash
mv src/components/conversation/* src/features/conversation/components/
mv src/types/conversation.ts src/features/conversation/types/
```

#### Topics Feature
```bash
mv src/pages/Topics.tsx src/features/topics/components/TopicsPage.tsx
mv src/data/topics.json src/features/topics/data/
```

#### Functions Feature
```bash
mv src/pages/Functions.tsx src/features/functions/components/FunctionsPage.tsx
```

#### Settings Feature
```bash
mv src/pages/Settings.tsx src/features/settings/components/SettingsPage.tsx
```

#### Chat Feature
```bash
mv src/components/ChatInput.tsx src/features/chat/components/ChatInput.tsx
```

#### Conversation Page
```bash
mv src/pages/Conversation.tsx src/features/conversation/components/ConversationPage.tsx
```

#### Shared
```bash
mv src/context/DashboardContext.tsx src/shared/context/DashboardContext.tsx
mv src/types/objects.ts src/shared/types/objects.ts
mv src/lib/utils.ts src/shared/lib/utils.ts
```

#### Data
```bash
mv src/data/conversationHelpers.ts src/data/helpers/conversationHelpers.ts
mv src/data/mockConversation.ts src/data/mocks/mockConversation.ts
```

#### Styles
```bash
mv src/index.css src/styles/index.css
```

### Phase 3: Create Index Files (Barrel Exports)

Each feature folder should have an `index.ts` for clean imports:

**src/features/conversation/index.ts**
```typescript
export { default as ConversationNavigator } from './components/ConversationNavigator';
export { default as ConversationPage } from './components/ConversationPage';
export * from './types/conversation';
```

**src/components/ui/shadcn/index.ts**
```typescript
export { Button } from './button';
export { Input } from './input';
export { Toggle } from './toggle';
export { ToggleGroup, ToggleGroupItem } from './toggle-group';
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './dropdown-menu';
```

**src/components/ui/custom/index.ts**
```typescript
export { default as BulletList } from './BulletList';
export { default as DynamicCard } from './DynamicCard';
export { default as FunctionButton } from './FunctionButton';
export { default as GlassCard } from './GlassCard';
export { default as GlassColumn } from './GlassColumn';
export { default as RelativeTime } from './RelativeTime';
export { default as SectionDivider } from './SectionDivider';
export { default as TextWithIcon } from './TextWithIcon';
```

### Phase 4: Update Imports (Use Find & Replace)

**Before:**
```typescript
import { Button } from '../components/ui/button';
import Footer from '../components/Footer';
import type { Conversation } from '../types/conversation';
```

**After:**
```typescript
import { Button } from '@/components/ui/shadcn';
import { Footer } from '@/components/layout';
import type { Conversation } from '@/features/conversation';
```

### Phase 5: Update Path Aliases in tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/components/*": ["./src/components/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/data/*": ["./src/data/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  }
}
```

---

## 🎯 Benefits of New Structure

### 1. **Feature-Based Organization**
✅ Easy to find all conversation-related code  
✅ Clear boundaries between features  
✅ Better for code splitting  

### 2. **Component Clarity**
✅ `layout/` = App layout components  
✅ `ui/shadcn/` = External library components  
✅ `ui/custom/` = Our custom UI components  

### 3. **Scalability**
✅ Easy to add new features  
✅ Each feature is self-contained  
✅ Can extract features to separate packages later  

### 4. **Import Clarity**
```typescript
// OLD (confusing)
import { Button } from '../../../components/ui/button';

// NEW (clear)
import { Button } from '@/components/ui/shadcn';
```

### 5. **Type Safety**
✅ Feature-specific types live with the feature  
✅ Shared types in `shared/types/`  
✅ No more confusion about type location  

---

## ⚠️ Migration Risks

1. **Breaking Changes**: All imports will need updating
2. **Git History**: File history may be harder to track (use `git mv`)
3. **Time Investment**: 2-4 hours for full migration
4. **Testing Required**: Need to verify all routes still work

---

## 🚀 Recommended Approach

### Option A: Big Bang (Fast but Risky)
- Do all changes in one go
- 2-4 hours total
- High risk of breaking something

### Option B: Incremental (Safer) ⭐ RECOMMENDED
1. **Week 1**: Move layout components only
2. **Week 2**: Move UI components (shadcn vs custom split)
3. **Week 3**: Move one feature at a time
4. **Week 4**: Clean up old structure

### Option C: Gradual (Safest but Slowest)
- Create new structure alongside old
- Gradually migrate as you work on features
- Clean up when all features migrated

---

## 📝 Quick Win: Immediate Improvements

### Without Full Restructure, Do This Now:

```bash
# 1. Separate shadcn from custom UI
mkdir src/components/ui/shadcn
mv src/components/ui/{button,input,toggle,toggle-group,dropdown-menu}.tsx src/components/ui/shadcn/

# 2. Move layout components
mkdir src/components/layout
mv src/components/{Footer,PageContainer,Timeline}.tsx src/components/layout/

# 3. Rename custom UI to PascalCase (already done!)
# Already consistent: BulletList, GlassCard, etc.
```

This gives you:
- ✅ Clear UI component separation (10 minutes)
- ✅ Better component organization (5 minutes)
- ✅ No import changes needed (backwards compatible)

---

## 🎯 Recommendation

**Start with Quick Wins**, then evaluate if full feature-based structure is needed.

For a project this size (~20 components, 4 pages), the current structure is actually **acceptable** with these improvements:
1. ✅ Separate shadcn from custom UI
2. ✅ Create layout/ folder
3. ✅ Consider feature folders only when adding 5+ more pages

**Full restructure benefit appears when you have 10+ pages/routes.**

---

## 📊 Decision Matrix

| Factor | Current | With Quick Wins | Full Restructure |
|--------|---------|-----------------|------------------|
| Time to implement | 0 | 15 min | 4 hours |
| Breaking changes | None | None | Many |
| Clarity | 6/10 | 8/10 | 10/10 |
| Scalability | 6/10 | 7/10 | 10/10 |
| Maintenance | 7/10 | 8/10 | 10/10 |
| Risk | None | Low | Medium |

**Verdict**: **Quick Wins** = Best ROI for current project size
