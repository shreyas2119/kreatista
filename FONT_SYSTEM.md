# Premium Font System

## Font Hierarchy

### 1. **Space Grotesk** - Headings & Titles
- **Usage**: Main headings (H1, H2, H3), hero titles, section headers
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Variable**: `--font-heading`
- **Class**: `font-heading`
- **Character**: Modern, geometric, tech-forward
- **Perfect for**: Bold statements, brand identity

### 2. **Inter** - Body & UI Text
- **Usage**: Paragraphs, descriptions, UI elements, buttons
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium)
- **Variable**: `--font-body`
- **Class**: `font-body`
- **Character**: Clean, readable, professional
- **Perfect for**: Long-form content, interface text

### 3. **Instrument Serif** - Accent & Emphasis
- **Usage**: Special callouts, quotes, emphasized words
- **Weights**: 400 (Regular)
- **Variable**: `--font-accent`
- **Class**: `font-accent`
- **Character**: Elegant, sophisticated, editorial
- **Perfect for**: Adding premium feel to specific words

## Usage Examples

### In Tailwind Classes
```tsx
<h1 className="font-heading font-semibold">Main Title</h1>
<p className="font-body font-normal">Body text content</p>
<em className="font-accent italic">Special emphasis</em>
```

### In Inline Styles
```tsx
<h1 style={{ fontFamily: "var(--font-heading)" }}>Title</h1>
<p style={{ fontFamily: "var(--font-body)" }}>Content</p>
<span style={{ fontFamily: "var(--font-accent)" }}>Accent</span>
```

## Font Weight Guidelines

- **Headings**: 600 (SemiBold) - Strong but not overwhelming
- **Subheadings**: 500 (Medium) - Clear hierarchy
- **Body**: 400 (Regular) - Easy reading
- **Light text**: 300 (Light) - Subtle, elegant

## Current Mapping

- `font-black` → 700 (Bold)
- `font-extrabold` → 600 (SemiBold)
- `font-bold` → 500 (Medium)
- `font-semibold` → 500 (Medium)
- `font-medium` → 400 (Regular)

## Why These Fonts?

1. **Space Grotesk**: Modern geometric sans-serif that conveys innovation and professionalism
2. **Inter**: Industry-standard for UI/UX, excellent readability at all sizes
3. **Instrument Serif**: Adds sophistication and premium feel without being pretentious

## Migration Notes

- Old `--font-epilogue` → Now `--font-heading` (Space Grotesk)
- Old `--font-inter` → Now `--font-body` (Inter with lighter weights)
- New `--font-accent` → Instrument Serif for special emphasis
