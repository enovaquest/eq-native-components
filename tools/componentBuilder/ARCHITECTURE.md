/* ============================================================================
   EQ Component Builder - Architecture & Implementation Guide
   ============================================================================
   
   This document provides a comprehensive overview of the drag-and-drop
   component builder architecture and how to extend it.
*/

## Architecture Overview

The Component Builder is built with a modular architecture that separates
concerns into distinct layers:

```
┌─────────────────────────────────────────────────────────────┐
│                     DragDropBuilder (Main)                  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Component State Management (React)           │  │
│  │  - components: DraggedComponent[]                    │  │
│  │  - selectedInstanceId: string | null                │  │
│  │  - handlers: Add, Update, Delete, Reorder           │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                  │
│         ┌─────────────────┼──────────────────┐              │
│         ▼                 ▼                  ▼              │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│   │  Palette     │ │   Canvas     │ │ Properties   │      │
│   │              │ │              │ │ Panel        │      │
│   │ • Categories │ │ • Preview    │ │ • Props Edit │      │
│   │ • Add Items  │ │ • Selection  │ │ • Metadata   │      │
│   │ • Drag*      │ │ • Reorder    │ │ • Delete*    │      │
│   └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                              │
│   (* When Export is enabled)                               │
│   └─────────────────────────────────────────────────────┐   │
│                    ┌──────────────────┐                 │   │
│                    │   Export Panel   │                 │   │
│                    │                  │                 │   │
│                    │ • JSON Export    │                 │   │
│                    │ • Code Generate  │                 │   │
│                    │ • Download/Copy  │                 │   │
│                    └──────────────────┘                 │   │
└─────────────────────────────────────────────────────────────┘
```

## Type System

### Core Types

```typescript
// Component definition metadata
interface ComponentDefinition {
  id: string;                    // Unique identifier
  type: ComponentType;           // Component type name
  displayName: string;           // User-friendly name
  description: string;           // Help text
  props: ComponentProperty[];    // Available properties
  category: string;              // For organization
  defaultProps?: Record<string, any>;
  children?: boolean;            // Can contain children
}

// Property definition
interface ComponentProperty {
  name: string;                  // Property name
  type: 'string' | 'number' | 'boolean' | 'select' | 'color';
  defaultValue?: any;
  options?: string[];            // For 'select' type
  description?: string;
}

// Instance on canvas
interface DraggedComponent {
  id: string;                    // Type reference
  type: ComponentType;           // Component type
  instanceId: string;            // Unique instance
  props: Record<string, any>;    // Current prop values
  children?: DraggedComponent[]; // Nested components
}

// Export format
interface LayoutExport {
  version: '1.0.0';
  components: DraggedComponent[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    name: string;
  };
}
```

## Data Flow

### Adding a Component

```
User clicks component in Palette
         ↓
ComponentPalette.onAddComponent()
         ↓
DragDropBuilder.handleAddComponent()
         ↓
generateInstanceId() creates unique ID
         ↓
Create DraggedComponent with defaults
         ↓
setComponents([...prev, newComponent])
         ↓
setSelectedInstanceId(newComponent.instanceId)
         ↓
Canvas + PropertiesPanel re-render
```

### Updating Properties

```
User edits in PropertiesPanel
         ↓
PropertiesPanel.handlePropChange()
         ↓
onUpdate(updates) called
         ↓
DragDropBuilder.handleUpdateComponent()
         ↓
Update component.props in state
         ↓
Canvas re-renders with new preview
```

### Reordering Components

```
User drags component in Canvas
         ↓
Canvas.handleDragStart()
Canvas.handleDrop()
         ↓
DragDropBuilder.handleReorderComponents()
         ↓
Update components array order
         ↓
Canvas re-renders new order
```

### Exporting

```
User clicks Export → toggles ExportPanel
         ↓
User selects format (JSON or Code)
         ↓
ExportPanel generates export
         ↓
generateCode() or generateJSON()
         ↓
CodeGenerator processes components
         ↓
Generate React Native code
         ↓
Display in textarea
         ↓
Copy to clipboard or Download
```

## Code Generation Algorithm

### For React Native Code:

```
generateReactNativeCode(component: DraggedComponent, indent: number)
  ↓
Switch on component.type
  ↓
Format props: { propName=propValue ... }
  ↓
Recursively generate children
  ↓
Return formatted JSX string
  ↓
Combine with imports and wrapper
```

### Generated Code Structure:

```tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from './components/Button/Button';
// ... other imports

const componentStyles = StyleSheet.create({
  // ... predefined styles
});

export const GeneratedScreen: React.FC = () => {
  // Auto-generated hooks
  const [formData, setFormData] = React.useState({});
  
  // Auto-generated handlers
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ThemeProvider>
      <View style={componentStyles.container}>
        {/* Generated layout from builder */}
      </View>
    </ThemeProvider>
  );
};
```

## Extending the Builder

### 1. Adding a New Component Type

**Step 1: Update componentMetadata.ts**

```typescript
export const componentMetadata: Record<string, ComponentDefinition> = {
  // ... existing components
  
  MyComponent: {
    id: 'mycomponent',
    type: 'MyComponent',
    displayName: 'My Component',
    description: 'A custom component description',
    category: 'Layout',
    children: true,
    props: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'My Title',
        description: 'Component title',
      },
      {
        name: 'bgColor',
        type: 'color',
        defaultValue: '#FFFFFF',
        description: 'Background color',
      },
    ],
    defaultProps: {
      title: 'My Title',
      bgColor: '#FFFFFF',
    },
  },
};
```

**Step 2: Update CodeGenerator.ts**

```typescript
case 'MyComponent':
  return `${spaces}<MyComponent${propsStr}>
${children}
${spaces}</MyComponent>`;
```

**Step 3: Add to your actual React Native component library**

```tsx
// components/MyComponent/MyComponent.tsx
import React from 'react';
import { View, Text } from 'react-native';

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  bgColor,
  children,
}) => {
  return (
    <View style={{ backgroundColor: bgColor, padding: 16 }}>
      <Text>{title}</Text>
      {children}
    </View>
  );
};
```

### 2. Custom Property Types

Add new property types in types.ts:

```typescript
export interface ComponentProperty {
  // ... existing fields
  type: 'string' | 'number' | 'boolean' | 'select' | 'color' 
        | 'size' | 'position' | 'spacing'; // Add custom types
}
```

Then handle in PropertiesPanel.tsx:

```tsx
} else if (prop.type === 'size') {
  return (
    <select className={styles.formSelect}>
      <option>Small</option>
      <option>Medium</option>
      <option>Large</option>
    </select>
  );
}
```

### 3. Custom Export Formats

Add new format to ExportPanel:

```typescript
const [exportFormat, setExportFormat] = useState<
  'json' | 'code' | 'custom'
>('code');

const generateExport = (): string => {
  if (exportFormat === 'custom') {
    return generateCustomFormat(components);
  }
  // ... existing formats
};

function generateCustomFormat(components: DraggedComponent[]): string {
  // Your custom export logic
  return '...';
}
```

### 4. Enhanced Properties Panel

Add validation and constraints:

```typescript
interface ComponentProperty {
  // ... existing fields
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    required?: boolean;
  };
}
```

Implement in PropertiesPanel:

```tsx
const validateInput = (value: any, prop: ComponentProperty): boolean => {
  if (prop.validation?.required && !value) return false;
  if (prop.validation?.min && value < prop.validation.min) return false;
  if (prop.validation?.max && value > prop.validation.max) return false;
  if (prop.validation?.pattern && !prop.validation.pattern.test(value)) {
    return false;
  }
  return true;
};
```

## Styling System

### CSS Modules Used

The builder uses CSS Modules for scoped styling:

```css
.container { /* Main container */ }
.header { /* Top bar */ }
.workspace { /* Three-column layout */ }
.palette { /* Left sidebar */ }
.canvasSection { /* Center area */ }
.mobileFrame { /* Preview frame */ }
.rightPanel { /* Right sidebar */ }
.propertiesPanel { /* Properties editor */ }
```

Key responsive breakpoints:
- **1400px**: Reduce sidebar widths
- **1200px**: Stack layout vertically

### Customizing Styles

Edit `DragDropBuilder.module.css`:

```css
/* Change primary color */
.componentButton:hover {
  background: #YOUR_COLOR;
}

.formInput:focus {
  border-color: #YOUR_COLOR;
}

/* Adjust spacing */
.workspace {
  gap: 2rem; /* Increase from 1rem */
}

/* Modify component preview */
.canvasComponent {
  padding: 1.5rem; /* Increase from 1rem */
}
```

## Performance Considerations

### Optimization Strategies

1. **Memoization** (for large component lists):
```tsx
const CanvasMemo = React.memo(Canvas);
```

2. **Debouncing** (for property updates):
```tsx
const debouncedUpdate = useCallback(
  debounce((updates) => onUpdate(updates), 300),
  [onUpdate]
);
```

3. **Virtualization** (for long component lists):
```tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={components.length}
  itemSize={60}
>
  {({ index, style }) => (
    <div style={style}>
      {/* Component item */}
    </div>
  )}
</FixedSizeList>
```

## Testing

### Unit Tests (Example)

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import DragDropBuilder from './DragDropBuilder';

describe('DragDropBuilder', () => {
  it('should add component when clicking palette item', () => {
    render(<DragDropBuilder />);
    
    const buttonComponent = screen.getByText('Button');
    fireEvent.click(buttonComponent);
    
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('should delete component when delete button clicked', () => {
    // ...
  });

  it('should export valid code', () => {
    // ...
  });
});
```

## Troubleshooting Guide

### Common Issues

**Issue**: Components not appearing in Canvas
- Check browser console for errors
- Verify `componentMetadata.ts` includes the component
- Ensure `CodeGenerator` handles the component type

**Issue**: Export code has syntax errors
- Review generated code before export
- Check prop values are valid
- Verify imports in template

**Issue**: Styles not applying in preview
- CSS Modules require className prop
- Inline styles need proper formatting
- Check mobile frame styling

## Future Enhancements

Potential features to add:

1. **Undo/Redo System**
   - Use reducer pattern with history stack
   - Implement keyboard shortcuts

2. **Component Nesting UI**
   - Tree view of component hierarchy
   - Drag to reorder across levels

3. **Live Mobile Preview**
   - WebSocket connection to device
   - Real-time sync of changes

4. **Template Library**
   - Pre-built layouts
   - Import/export templates

5. **Collaboration**
   - Share layouts via URL
   - Real-time multi-user editing

6. **Advanced Styling**
   - Visual style builder
   - Theme customization
   - Animation preview

## Resources

- [React Documentation](https://react.dev)
- [React Native Components](https://reactnative.dev/docs/components-and-apis)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Expo Documentation](https://docs.expo.dev)
