# Section Visibility Fix - Applied on 2026-01-30

## Issue Identified

**Problem:** After scrolling past a section and then scrolling back up to it, the section would remain faded/invisible.

**Root Cause:** The "outro" animation was fading sections to 0.3 opacity and scaling them to 0.95 when scrolling past them, but there was no mechanism to reverse this animation when scrolling back up.

## Solution Applied

### Changes Made to `/js/script.js`

#### 1. **Updated toggleActions for Section Entrance**
```javascript
// BEFORE:
toggleActions: 'play none play reverse'

// AFTER:
toggleActions: 'play reverse play reverse'
```

**What this means:**
- `onEnter`: play (fade in when entering viewport from below)
- `onLeave`: reverse (fade out when leaving viewport from top)
- `onEnterBack`: play (fade in when re-entering from top)
- `onLeaveBack`: reverse (fade out when leaving from bottom)

#### 2. **Added scale: 1 to Section Animations**
Ensures sections return to full size when visible:
```javascript
opacity: 1,
scale: 1,  // Added this
```

#### 3. **Removed Problematic Outro Animation**
Completely removed the separate outro animation that was causing sections to stay faded:
```javascript
// REMOVED:
gsap.to(section, {
  scrollTrigger: {
    trigger: section,
    start: 'bottom 80%',
    end: 'bottom top',
    scrub: true,
  },
  opacity: 0.3,
  scale: 0.95,
});
```

#### 4. **Updated Character Animations**
Applied the same fix to character-level animations:
```javascript
toggleActions: 'play reverse play reverse'
```

## How It Works Now

### Scrolling Down (Normal Flow)
1. Section enters viewport → fades in to opacity: 1, scale: 1
2. Section leaves viewport from top → fades out (reverses)

### Scrolling Up (Revisiting)
3. Section re-enters viewport from top → fades in again (plays)
4. Section leaves viewport from bottom → fades out (reverses)

## Testing Instructions

1. Visit http://127.0.0.1:8080
2. Scroll down through all sections (Home → Skills → Projects)
3. Scroll back up to Skills section
4. Scroll back up to Home section

**Expected Result:** All sections should be fully visible and readable when you scroll back to them.

## Benefits

✅ **Sections always visible** when in viewport
✅ **Smooth transitions** in both directions
✅ **No stuck animations** or faded content
✅ **Better user experience** when navigating
✅ **Works with browser back/forward** buttons

## Technical Details

The fix uses GSAP's ScrollTrigger `toggleActions` parameter which defines what happens at four key moments:
1. `onEnter` - scrolling down, section enters from bottom
2. `onLeave` - scrolling down, section exits from top
3. `onEnterBack` - scrolling up, section re-enters from top
4. `onLeaveBack` - scrolling up, section exits from bottom

By setting all four to either "play" or "reverse", we ensure the animation always runs correctly regardless of scroll direction.
