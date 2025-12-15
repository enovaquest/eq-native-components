# EQ Native Components - Drag & Drop Builder Tool

A powerful, drag-and-drop UI builder for creating React Native layouts with **zero coding**. Build mobile interfaces visually, then export as production-ready code or JSON.

## 🎯 Features

### ✨ Drag & Drop Interface
- Intuitive visual builder with a mobile preview
- Organize components by dragging to reorder
- Real-time component selection and editing
- Instant preview of your layout

### 🎨 Component Library
The builder includes all reusable components from your project:
- **Button** - Touchable button with customizable text and styling
- **Input** - Text input with multiple types (email, password, number, etc.)
- **Card** - Container with optional header
- **Grid** - Responsive grid layout
- **Text** - Simple text display
- **View** - Basic container
- **BottomSheet** - Draggable modal component

### ⚙️ Properties Panel
Edit component properties in real-time:
- Text content
- Colors
- Sizing
- Layout options
- Input types
- And more...

### 📦 Export Options

#### React Native Code
Generate fully functional TypeScript/JSX components ready to use in your React Native app:
```tsx
import React from 'react';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Card } from './components/Card/Card';

export const GeneratedScreen: React.FC = () => {
  return (
    <View>
      <Card headerText="My Form">
        <Input placeholder="Enter text" />
        <Button text="Submit" onPress={() => {}} />
      </Card>
    </View>
  );
};
```

#### JSON Layout
Export as JSON for programmatic processing or import into other tools:
```json
{
  "version": "1.0.0",
  "components": [
    {
      "type": "Card",
      "props": { "headerText": "My Form" },
      "children": [
        {
          "type": "Input",
          "props": { "placeholder": "Enter text" }
        }
      ]
    }
  ],
  "metadata": {
    "createdAt": "2024-11-30T...",
    "updatedAt": "2024-11-30T...",
    "name": "Generated Layout"
  }
}
```

## 🚀 Getting Started

### Installation

1. **Install Dependencies**
```bash
npm install react-dnd react-dnd-html5-backend
# or
yarn add react-dnd react-dnd-html5-backend
```

2. **Import the Builder**
```tsx
import DragDropBuilder from './tools/componentBuilder/components/DragDropBuilder';

function App() {
  return <DragDropBuilder />;
}
```

### Usage

1. **Launch the Builder**
   - Open the component builder in your web app
   - The interface shows three panels:
     - **Left**: Component palette organized by category
     - **Center**: Mobile preview with drag area
     - **Right**: Properties editor or export panel

2. **Build Your Layout**
   - Click components in the palette to add them
   - Click on components in the preview to select
   - Edit properties in the right panel
   - Drag components to reorder
   - Press Delete to remove selected component

3. **Export Your Layout**
   - Click "Export" button in header
   - Choose export format (Code or JSON)
   - Enter component name
   - Copy to clipboard or download file

## 📁 Project Structure

```
tools/componentBuilder/
├── components/
│   ├── DragDropBuilder.tsx          # Main builder component
│   ├── DragDropBuilder.module.css   # Styles
│   ├── ComponentPalette.tsx         # Component selector
│   ├── Canvas.tsx                   # Layout canvas
│   ├── PropertiesPanel.tsx          # Property editor
│   ├── ExportPanel.tsx              # Export interface
│   └── ComponentItem.tsx            # Component palette item
├── types.ts                          # TypeScript definitions
├── componentMetadata.ts              # Component metadata
├── codeGenerator.ts                  # Code generation logic
├── index.tsx                         # Entry point
├── index.css                         # Global styles
├── EXAMPLES.tsx                      # Usage examples
└── README.md                         # This file
```

## 🔧 Component Metadata

Components are defined in `componentMetadata.ts` with:
- **Type**: Component type (Button, Input, etc.)
- **Display Name**: Human-readable name
- **Category**: Layout, Input, Display, or Navigation
- **Properties**: Editable props with types
- **Default Props**: Initial values
- **Can have children**: Whether component accepts child components

### Adding Custom Components

To add a new component:

```typescript
// In componentMetadata.ts
export const componentMetadata: Record<string, ComponentDefinition> = {
  YourComponent: {
    id: 'yourcomponent',
    type: 'YourComponent',
    displayName: 'Your Component',
    description: 'A custom component',
    category: 'Layout',
    children: true,
    props: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Title',
        description: 'Component title',
      },
      // ... more props
    ],
    defaultProps: {
      title: 'Title',
    },
  },
};
```

Then update the `CodeGenerator` to handle rendering:

```typescript
// In codeGenerator.ts
case 'YourComponent':
  return `${spaces}<YourComponent${propsStr}>
${children}
${spaces}</YourComponent>`;
```

## 💾 Persisting Layouts

The builder generates JSON that can be:

1. **Stored in Database**
```typescript
const layout = {
  version: '1.0.0',
  components: [...],
  metadata: {...}
};
await saveLayoutToDB(layout);
```

2. **Loaded from JSON**
```typescript
// Import JSON layout and display it
const loadedComponents = layout.components;
// Render generated code
```

3. **Version Control**
```bash
# Commit generated code to git
git add generated-screens/
git commit -m "Add auto-generated screens"
```

## 🎓 Code Generation Details

### Generated Component Structure

```tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from './components/Button/Button';
// ... other imports

export const [ComponentName]: React.FC = () => {
  // Auto-generated state management hooks
  const [formData, setFormData] = React.useState({});

  // Handler for input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ThemeProvider initialThemeName="nebulaCorporateTheme">
      <View style={styles.container}>
        {/* Your composed layout */}
      </View>
    </ThemeProvider>
  );
};
```

### Customizing Generated Code

Edit `codeGenerator.ts` to customize:
- Imports
- Styling approach
- State management
- Theme application
- Event handlers

## 🎨 Theming

Generated components automatically include theme support:

```tsx
<ThemeProvider initialThemeName="nebulaCorporateTheme">
  {/* Your generated components */}
</ThemeProvider>
```

Components respect the `nebulaCorporateTheme` defined in `themes/nebulaCorporateTheme.ts`.

## 🔗 Integration with Storybook

Export generated components directly to Storybook:

```tsx
// generated-component.stories.tsx
import { Meta, StoryObj } from '@storybook/react-native';
import GeneratedScreen from './GeneratedScreen';

const meta = {
  title: 'Generated/GeneratedScreen',
  component: GeneratedScreen,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GeneratedScreen>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
```

## 📊 JSON Schema

The exported JSON follows this schema:

```typescript
interface LayoutExport {
  version: '1.0.0';
  components: DraggedComponent[];
  metadata: {
    createdAt: string;      // ISO date
    updatedAt: string;      // ISO date
    name: string;           // Component name
  };
}

interface DraggedComponent {
  id: string;              // Component ID from metadata
  type: ComponentType;     // Button | Input | Card | Grid | etc
  instanceId: string;      // Unique instance ID
  props: Record<string, any>;
  children?: DraggedComponent[];
}
```

## ⌨️ Keyboard Shortcuts

- **Delete**: Remove selected component
- **Click**: Select component
- **Drag**: Reorder components in canvas
- **Drag from palette**: Add new component

## 🐛 Troubleshooting

### Components not showing in preview
- Ensure component is selected (should be highlighted)
- Check browser console for errors
- Verify component metadata includes all required props

### Export code has formatting issues
- Review generated code in preview before exporting
- Edit component properties to ensure valid values
- Check TypeScript compilation errors

### Styles not applied correctly
- Some styles may need adjustment after export
- Use the component's `containerStyle` prop for customization
- Refer to individual component documentation

## 📝 License

MIT

## 🤝 Contributing

To add features or fix bugs:

1. Edit the component files in `tools/componentBuilder/`
2. Update `componentMetadata.ts` for new components
3. Update `codeGenerator.ts` to handle code generation
4. Test export functionality

## 📚 Further Reading

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [Storybook Documentation](https://storybook.js.org)
