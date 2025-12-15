/**
 * Setup Guide for EQ Component Builder
 * 
 * This file contains setup instructions and configuration examples
 * for integrating the component builder into your project.
 */

## ⚡ 5-Minute Setup

### Step 1: Install Optional Dependencies

The builder works without external drag-and-drop library, but you can add
react-dnd for enhanced drag-and-drop if needed:

```bash
npm install react-dnd react-dnd-html5-backend
# or
yarn add react-dnd react-dnd-html5-backend
```

### Step 2: Create a Route/Page

```tsx
// pages/Builder.tsx
import React from 'react';
import DragDropBuilder from '../tools/componentBuilder/components/DragDropBuilder';

export const BuilderPage: React.FC = () => {
  const handleExport = (code: string) => {
    // Handle exported code
    console.log('Generated code:', code);
    
    // You could:
    // - Save to file system via API
    // - Store in database
    // - Display for user to copy
    // - Send to backend for processing
  };

  return <DragDropBuilder onExport={handleExport} />;
};

export default BuilderPage;
```

### Step 3: Add Route to Your App

```tsx
// App.tsx
import { BuilderPage } from './pages/Builder';

function App() {
  return (
    <Routes>
      <Route path="/builder" element={<BuilderPage />} />
      {/* ... other routes */}
    </Routes>
  );
}
```

### Step 4: Done! 🎉

Visit `http://localhost:3000/builder` to start using the visual builder.

---

## 🎨 Web App Setup (For Standalone Builder)

If you want to run the builder as a separate web app:

### vite.config.ts

```typescript
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
});
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EQ Component Builder</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/tools/componentBuilder/web-main.tsx"></script>
  </body>
</html>
```

### package.json Scripts

```json
{
  "scripts": {
    "builder": "vite",
    "builder:build": "vite build",
    "builder:preview": "vite preview"
  }
}
```

### Run It

```bash
npm run builder
```

---

## 🔌 Integration with Existing App

### Option 1: As a Modal

```tsx
import { useState } from 'react';
import DragDropBuilder from '../tools/componentBuilder/components/DragDropBuilder';

export function App() {
  const [showBuilder, setShowBuilder] = useState(false);

  return (
    <>
      <button onClick={() => setShowBuilder(true)}>
        Open Builder
      </button>

      {showBuilder && (
        <dialog open style={{ width: '100%', height: '100vh' }}>
          <DragDropBuilder
            onExport={(code) => {
              console.log(code);
              setShowBuilder(false);
            }}
          />
          <button onClick={() => setShowBuilder(false)}>Close</button>
        </dialog>
      )}
    </>
  );
}
```

### Option 2: In a Drawer

```tsx
import { Drawer } from '@mui/material';
import DragDropBuilder from '../tools/componentBuilder/components/DragDropBuilder';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <DragDropBuilder />
      </Drawer>
    </>
  );
}
```

### Option 3: As a Sidebar

```tsx
import styles from './App.module.css';
import DragDropBuilder from '../tools/componentBuilder/components/DragDropBuilder';

function App() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <DragDropBuilder />
      </aside>
      <main className={styles.content}>
        {/* Your app content */}
      </main>
    </div>
  );
}
```

---

## 💾 Saving Generated Code

### Backend API Integration

```tsx
const handleExport = async (code: string) => {
  try {
    const response = await fetch('/api/components', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        name: 'GeneratedScreen',
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      alert('Component saved successfully!');
    }
  } catch (error) {
    console.error('Error saving component:', error);
  }
};
```

### LocalStorage (Client-side)

```tsx
const handleExport = (code: string) => {
  const layout = {
    code,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem('generatedComponent', JSON.stringify(layout));
  alert('Component saved to browser storage!');
};
```

### File Download

```tsx
const handleExport = (code: string) => {
  const element = document.createElement('a');
  const file = new Blob([code], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = 'GeneratedScreen.tsx';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
```

---

## 🎨 Custom Styling

Override builder styles by creating a CSS module:

```css
/* custom-builder.module.css */

:global(.palette) {
  background: #1a1a1a;
  color: #ffffff;
}

:global(.componentButton) {
  background: #2a2a2a;
  color: #ffffff;
  border-color: #404040;
}

:global(.componentButton:hover) {
  background: #3a3a3a;
}

:global(.canvasComponent) {
  background: #f0f0f0;
  border-color: #cccccc;
}
```

---

## 🧪 Testing the Builder

### Unit Test Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import DragDropBuilder from '../tools/componentBuilder/components/DragDropBuilder';

describe('DragDropBuilder', () => {
  test('renders component palette', () => {
    render(<DragDropBuilder />);
    expect(screen.getByText('Components')).toBeInTheDocument();
  });

  test('adds component when clicked', () => {
    render(<DragDropBuilder />);
    const buttonComponent = screen.getByText('Button');
    fireEvent.click(buttonComponent);
    expect(screen.getByText(/Button/)).toBeInTheDocument();
  });

  test('exports code when export clicked', () => {
    const mockExport = jest.fn();
    render(<DragDropBuilder onExport={mockExport} />);
    
    // Add a component
    fireEvent.click(screen.getByText('Button'));
    
    // Export
    fireEvent.click(screen.getByText('Export'));
    // ... continue test
  });
});
```

---

## 🔧 Environment Variables

If you need to configure the builder:

```bash
# .env
VITE_BUILDER_EXPORT_API=/api/components
VITE_BUILDER_DEFAULT_THEME=nebulaCorporateTheme
VITE_BUILDER_MAX_COMPONENTS=50
VITE_BUILDER_ALLOW_CUSTOM_CSS=true
```

---

## 📦 TypeScript Configuration

Ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "module": "esnext",
    "target": "es2020",
    "moduleResolution": "bundler"
  },
  "include": [
    "tools/**/*",
    "src/**/*"
  ]
}
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment-Specific Builds

```typescript
// tools/componentBuilder/config.ts
export const config = {
  apiUrl: process.env.VITE_API_URL || 'http://localhost:3000',
  enableAutoSave: process.env.VITE_AUTO_SAVE === 'true',
  maxComponents: parseInt(process.env.VITE_MAX_COMPONENTS || '100'),
};
```

---

## 🐛 Troubleshooting Setup

### Issue: Components not appearing
- Check `componentMetadata.ts` for definitions
- Verify imports in `CodeGenerator.ts`
- Check browser console for errors

### Issue: Styles not loading
- Ensure CSS Modules are enabled in bundler
- Check `DragDropBuilder.module.css` path
- Verify import statement

### Issue: Export not working
- Check `onExport` callback is passed
- Verify browser supports Blob API
- Check for content security policy errors

---

## 📚 Further Resources

- Component definitions: `componentMetadata.ts`
- Code generation: `codeGenerator.ts`
- TypeScript types: `types.ts`
- Examples: `EXAMPLES.tsx`
- Architecture: `ARCHITECTURE.md`

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Builder renders without errors
- [ ] Can click to add components
- [ ] Properties panel updates on selection
- [ ] Can reorder components
- [ ] Export button shows/hides export panel
- [ ] Can copy generated code
- [ ] Can download file
- [ ] Generated code is syntactically correct
- [ ] Theme is applied correctly

---

Done! Your Component Builder is ready to use! 🎉
