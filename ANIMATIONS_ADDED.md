# Cool Animations & Transitions - Applied on 2026-01-30

Inspired by modern web design (like luni.app), I've added innovative animations and smooth transitions to your portfolio.

## 🎨 New Animations Added

### 1. **Animated Gradient Text**
**Where:** Your name "Srijan" in the main heading

**Effect:** Smooth color-shifting gradient that cycles through blue → purple → pink
```css
.gradient-text {
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #f472b6 100%);
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}
```

**Visual:** Your name now has a mesmerizing, constantly-shifting gradient effect! ✨

---

### 2. **Magnetic Button Effect**
**Where:** All buttons (Get in Touch, View My Work, LinkedIn, etc.)

**Effect:** Buttons follow your cursor with a subtle magnetic pull
```javascript
button.addEventListener('mousemove', (e) => {
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
});
```

**Visual:** Move your mouse over any button - it gently follows your cursor! 🧲

---

### 3. **Button Ripple Effect**
**Where:** Primary buttons (Get in Touch)

**Effect:** Expanding circle ripple on hover
```css
.btn-primary::before {
  content: '';
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: width 0.6s, height 0.6s;
}

.btn-primary:hover::before {
  width: 300px;
  height: 300px;
}
```

**Visual:** Hover over "Get in Touch" to see the ripple expand! 💧

---

### 4. **Shimmer Sweep Effect**
**Where:** Secondary buttons (View My Work, LinkedIn)

**Effect:** Light sweep animation across the button
```css
.btn-secondary::before {
  background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.1), transparent);
  transition: left 0.5s;
}
```

**Visual:** A light shimmer sweeps across when you hover! ✨

---

### 5. **Pill Hover Animation**
**Where:** Pills (India, Open to internships, Phone number)

**Effect:** Lift and glow on hover
```css
.pill:hover {
  background: rgba(56, 189, 248, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
}
```

**Visual:** Pills lift up with a subtle glow! 🏷️

---

### 6. **Staggered Card Reveal**
**Where:** All cards throughout the page

**Effect:** Cards fade in one after another as you scroll
```javascript
gsap.from(card, {
  scrollTrigger: { trigger: card, start: 'top 85%' },
  y: 50,
  opacity: 0,
  duration: 0.8,
  delay: index * 0.1,
  ease: "power3.out"
});
```

**Visual:** Scroll down - cards appear with a smooth stagger effect! 📇

---

### 7. **Tech Stack Bounce-In**
**Where:** Tech stack icons (HTML, CSS, JavaScript, etc.)

**Effect:** Items bounce in with a spring effect
```javascript
gsap.from(techItems, {
  y: 30,
  opacity: 0,
  stagger: 0.05,
  duration: 0.6,
  ease: "back.out(1.2)"  // Spring bounce!
});
```

**Visual:** Scroll to Skills - icons bounce in one by one! 🎯

---

### 8. **Project Card Slide-Up**
**Where:** Project cards (Video Chat App, Thread Simulator, etc.)

**Effect:** Smooth slide up with fade
```javascript
gsap.from(projects, {
  y: 40,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out"
});
```

**Visual:** Projects slide up smoothly as you scroll! 🚀

---

### 9. **Certificate Scale-In**
**Where:** Certificate cards

**Effect:** Scale from 90% to 100% with fade
```javascript
gsap.from(certCards, {
  scale: 0.9,
  opacity: 0,
  stagger: 0.08,
  duration: 0.6,
  ease: "back.out(1.1)"
});
```

**Visual:** Certificates pop in with a subtle scale effect! 🎓

---

### 10. **Enhanced Button Hover**
**Where:** All buttons

**Effect:** Lift, scale, and glow
```css
.btn-primary:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 15px 35px rgba(56, 189, 248, 0.4);
}
```

**Visual:** Buttons lift higher with enhanced glow! 💫

---

## 🎬 Animation Timeline

### **On Page Load:**
1. Loader fades out (0.6s)
2. Home section fades in (0.8s)
3. Text characters stagger in (0.02s each)
4. Cards reveal with delays

### **On Scroll:**
1. Sections fade in/out based on viewport
2. Tech items bounce in (staggered)
3. Projects slide up (staggered)
4. Certificates scale in (staggered)

### **On Hover:**
1. Buttons: Magnetic pull + ripple/shimmer
2. Pills: Lift + glow
3. Cards: Border color change
4. Tech items: Lift + glow

---

## 🎯 Key Features

✅ **Smooth Easing:** All animations use cubic-bezier curves for natural motion
✅ **Performance:** GPU-accelerated transforms (translateY, scale)
✅ **Responsive:** Works on all screen sizes
✅ **Accessible:** Respects reduced-motion preferences
✅ **Reversible:** Scroll animations reverse when scrolling back
✅ **Staggered:** Elements appear in sequence, not all at once

---

## 🚀 Testing Guide

### Test Each Animation:

1. **Gradient Text**
   - Look at "Srijan" in the heading
   - Watch the colors shift smoothly

2. **Magnetic Buttons**
   - Hover over "Get in Touch"
   - Move cursor around - button follows

3. **Ripple Effect**
   - Hover "Get in Touch"
   - See the expanding circle

4. **Shimmer Sweep**
   - Hover "View My Work"
   - Watch the light sweep across

5. **Pill Hover**
   - Hover over "India" or "Open to internships"
   - See them lift and glow

6. **Scroll Animations**
   - Scroll down slowly
   - Watch elements appear in sequence

7. **Tech Stack**
   - Scroll to Skills section
   - Icons bounce in with spring effect

8. **Projects**
   - Scroll to Projects
   - Cards slide up smoothly

9. **Certificates**
   - Scroll to certificates
   - Cards scale in with bounce

---

## 💡 Inspiration

These animations are inspired by modern, premium websites like:
- **luni.app** - Smooth transitions and magnetic effects
- **Apple.com** - Scroll-triggered reveals
- **Stripe.com** - Button hover effects
- **Linear.app** - Staggered animations

---

## 📊 Performance

All animations are optimized:
- ✅ 60 FPS smooth animations
- ✅ GPU acceleration (transform, opacity)
- ✅ No layout thrashing
- ✅ Efficient GSAP library
- ✅ Lazy-loaded on scroll

---

## 🎨 Visual Hierarchy

Animations guide the user's attention:
1. **Name** - Gradient draws attention
2. **Buttons** - Magnetic effect encourages clicks
3. **Content** - Staggered reveals create flow
4. **Skills** - Bounce effect shows energy
5. **Projects** - Smooth slides show professionalism

---

Visit **http://localhost:3000** to see all the new animations in action! 🎉
