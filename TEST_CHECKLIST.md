# Testing Checklist

## ✅ Basic Functionality

### App Startup
- [ ] App loads without console errors
- [ ] Large buttons (4-grid) display correctly
- [ ] Footer with microphone button is visible at bottom
- [ ] Background gradient appears correctly

### Large Buttons
- [ ] "Tidigare Ämnen" button visible (blue)
- [ ] "Tidigare Konversationer" button visible (purple)
- [ ] "Beställningar och Funktioner" button visible (pink)
- [ ] "Starta ny Konversation" button visible (cyan)
- [ ] All buttons have hover effects
- [ ] All buttons have ripple effects on click

## ✅ Timeline Functionality

### Showing Timeline
1. [ ] Click "Tidigare Konversationer" button
2. [ ] Large buttons disappear smoothly
3. [ ] Timeline appears at bottom (180px height)
4. [ ] Timeline connects to footer (80px above footer)
5. [ ] Timeline takes 100% width
6. [ ] Timeline has smooth fade-in animation

### Timeline Features
- [ ] Zoom controls visible (− Zoom Out, 1.0x, + Zoom In)
- [ ] Zoom buttons are clickable
- [ ] Timeline slider displays
- [ ] Date markers visible on timeline
- [ ] Selected date highlighted in blue
- [ ] Dates with conversations have taller markers
- [ ] Can click on date markers to select
- [ ] Timeline info shows date range (e.g., "Jan 1, 2024 — Nov 19, 2024 (90 days)")

### Timeline Interaction
- [ ] Click "− Zoom Out" decreases zoom level
- [ ] Click "+ Zoom In" increases zoom level
- [ ] Zoom level display updates (e.g., 0.5x, 1.0x, 2.0x)
- [ ] Timeline markers adjust based on zoom level
- [ ] More markers visible when zoomed in
- [ ] Fewer markers visible when zoomed out

## ✅ Chat Window Functionality

### Showing Chat Window
1. [ ] Click "Starta ny Konversation" button from dashboard
2. [ ] Large buttons disappear smoothly
3. [ ] Chat window appears on right side
4. [ ] Chat window max width is 300px
5. [ ] Chat window takes full height
6. [ ] Chat window has glass morphism effect

### Chat Window Features
- [ ] Header displays "Ny Konversation"
- [ ] Close button (✕) visible in header
- [ ] Messages area shows placeholder text
- [ ] Input field is visible and focused
- [ ] "Skicka" button visible
- [ ] "Prata" button visible (voice recording)
- [ ] All elements have correct styling

### Chat Interaction
- [ ] Can type in input field
- [ ] Enter key submits message (or click "Skicka")
- [ ] User message appears (cyan/green bubble, right-aligned)
- [ ] Loading state shows "Tänker..."
- [ ] AI response appears (white bubble, left-aligned)
- [ ] Messages scroll correctly
- [ ] Click "Prata" button requests microphone access
- [ ] Button changes to "Stoppa" when recording

### Closing Chat
- [ ] Click ✕ button in chat header
- [ ] Chat window disappears smoothly
- [ ] Large buttons reappear
- [ ] Transition is smooth

## ✅ Layout & Responsive

### Window Resize
- [ ] Resize browser window
- [ ] Objects reposition correctly
- [ ] Timeline stays at bottom, full width
- [ ] Chat window stays at right, max 300px
- [ ] Footer stays at bottom
- [ ] No overlapping objects
- [ ] Smooth transitions during resize

### Different Screen Sizes
- [ ] Test at 1920×1080 (desktop)
- [ ] Test at 1366×768 (laptop)
- [ ] Test at 1024×768 (tablet landscape)
- [ ] Layout adapts appropriately
- [ ] Text remains readable
- [ ] Buttons remain clickable

## ✅ Visual Design

### Colors
- [ ] Background gradient (dark blue/purple)
- [ ] Buttons have correct accent colors
- [ ] Timeline has blue highlights
- [ ] Chat messages have correct colors
- [ ] Footer microphone button matches design

### Effects
- [ ] Glass morphism on chat window works
- [ ] Button hover effects smooth
- [ ] Ripple effects on button click
- [ ] Smooth fade in/out transitions
- [ ] All animations 300ms cubic-bezier

### Typography
- [ ] All text readable
- [ ] Font sizes appropriate
- [ ] Font weights correct
- [ ] Line heights comfortable

## ✅ Footer

### Always Visible
- [ ] Footer stays at bottom at all times
- [ ] Footer height is 80px
- [ ] Footer has correct background
- [ ] Footer border visible

### Microphone Button
- [ ] Button centered in footer
- [ ] Button size 64px × 64px
- [ ] Microphone icon visible
- [ ] Status text visible ("Click to talk")
- [ ] Click toggles listening state
- [ ] Active state shows pulsing animation
- [ ] Active state shows red color
- [ ] Status text changes to "Listening..."

## ✅ Performance

### Smooth Operation
- [ ] No lag when showing/hiding objects
- [ ] Animations play at 60fps
- [ ] No jank during transitions
- [ ] Window resize handles smoothly
- [ ] Button clicks respond immediately

### Console
- [ ] No errors in console
- [ ] No warnings about keys
- [ ] No memory leaks visible
- [ ] No unnecessary re-renders

## ✅ Edge Cases

### Multiple Interactions
- [ ] Click button, click another before animation completes
- [ ] Rapidly resize window
- [ ] Click close button multiple times
- [ ] Switch between objects quickly

### Data
- [ ] Timeline shows with no conversations
- [ ] Timeline shows with 1 conversation
- [ ] Timeline shows with 100+ conversations
- [ ] Chat window with no messages
- [ ] Chat window with many messages

## 🔄 Future Features (Not Yet Implemented)

### Coming Soon
- [ ] Search field object
- [ ] Cluster card object
- [ ] Topics object
- [ ] Multiple objects simultaneously
- [ ] Return button from timeline to dashboard
- [ ] Collapse states for objects
- [ ] Object persistence (save state)

## 📝 Notes

**Working:**
- ✅ Object-based architecture implemented
- ✅ Layout engine calculating positions
- ✅ Timeline component extracted and working
- ✅ Chat window component extracted and working
- ✅ Large buttons component working
- ✅ Footer always visible
- ✅ Smooth transitions

**Known Issues:**
- Timeline doesn't have a "back" button to return to dashboard
- Search and Cluster Card not yet wired up
- Topics and Functions buttons don't do anything yet
- Mobile responsiveness not optimized

**To Test:**
1. Open http://localhost:5174
2. Check all items in this checklist
3. Report any issues found

---

## Quick Test Script

```bash
# 1. Start dev server
cd apps/client && npm run dev

# 2. Open browser
open http://localhost:5174

# 3. Test sequence:
# - Verify 4 buttons visible
# - Click "Tidigare Konversationer"
# - Verify timeline appears at bottom
# - Test zoom controls
# - Close browser tab
# - Re-open to test clean state
# - Click "Starta ny Konversation"
# - Verify chat window appears
# - Type a message and send
# - Verify response appears
# - Click ✕ to close
# - Verify return to dashboard
```

## Testing URLs

- **Development**: http://localhost:5174
- **Production Build**: `npm run build && npm run preview`

## Browser Testing

Test in multiple browsers:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Accessibility

- [ ] Can tab through interactive elements
- [ ] Focus indicators visible
- [ ] ARIA labels present where needed
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (basic)
