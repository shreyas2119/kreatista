# Paper Design Shaders Integration

## Overview
Successfully integrated Paper Design Shaders into the ToolsStack section, replacing the previous WebGL shader background.

## Installed Dependencies

```bash
npm install three @react-three/fiber @paper-design/shaders-react @types/three
```

## Files Created

1. **`components/ui/background-paper-shaders.tsx`** - Custom shader components (ShaderPlane, EnergyRing)
2. **`components/ui/paper-shader-background.tsx`** - MeshGradient wrapper with lighting effects

## Files Modified

- **`components/sections/ToolsStack.tsx`** - Updated to use PaperShaderBackground

## Features

### MeshGradient Background
- Animated mesh gradient with violet accent colors
- Smooth transitions and wave effects
- Configurable speed parameter

### Lighting Overlays
- Three animated pulse effects with violet glow
- Staggered animation delays for visual interest
- Blur effects for soft lighting

### Integration
The shader background is:
- Positioned absolutely to fill the section
- Set to 40% opacity for subtle effect
- Layered behind the logo carousel (z-index: 0)

## Usage

The component is already integrated in ToolsStack. To customize:

```tsx
<PaperShaderBackground speed={1.5} /> // Faster animation
<PaperShaderBackground speed={0.5} /> // Slower animation
```

## Color Scheme

The shader uses a violet-based gradient matching your site's theme:
- `#000000` - Black base
- `#1a1a1a` - Dark gray
- `#333333` - Medium gray
- `#8b5cf6` - Violet accent (matches your violet-500)

## Performance

- Uses hardware-accelerated WebGL rendering
- Optimized with React Three Fiber
- Minimal performance impact due to opacity setting

## Notes

- The shader automatically adapts to container size
- Animations are smooth and continuous
- Works seamlessly with the logo carousel overlay
