import React, { useCallback, useState } from 'react';
import { DraggedComponent, LayoutExport } from './types';
import { generateCode } from './codeGenerator';

/**
 * Quick Start Example
 * 
 * This example shows how to integrate the Component Builder
 * into your application and handle the exported code.
 */

interface QuickStartProps {
  onGeneratedCode?: (code: string, componentName: string) => void;
}

export const QuickStartExample: React.FC<QuickStartProps> = ({
  onGeneratedCode,
}) => {
  const [generatedLayout, setGeneratedLayout] = useState<LayoutExport | null>(
    null
  );
  const [componentName, setComponentName] = useState('GeneratedScreen');

  // Example: Handle exported code
  const handleExportedLayout = useCallback(
    (layout: LayoutExport) => {
      setGeneratedLayout(layout);
      
      // You can now:
      // 1. Save to database
      const layoutJSON = JSON.stringify(layout);
      console.log('Saving layout:', layoutJSON);
      
      // 2. Generate and execute code
      const generatedCode = generateCode(layout, componentName);
      console.log('Generated code:', generatedCode);
      
      // 3. Call callback with generated code
      if (onGeneratedCode) {
        onGeneratedCode(generatedCode, componentName);
      }
      
      // 4. Send to backend for further processing
      // await fetch('/api/layouts', {
      //   method: 'POST',
      //   body: JSON.stringify({ layout, generatedCode })
      // });
    },
    [componentName, onGeneratedCode]
  );

  return (
    <div>
      <h2>Quick Start Examples</h2>

      {/* Example 1: Basic Integration */}
      <section>
        <h3>Example 1: Basic Builder Integration</h3>
        <pre>{`
import DragDropBuilder from './tools/componentBuilder/components/DragDropBuilder';

function MyApp() {
  const handleExport = (code: string) => {
    // Save the generated code
    console.log('Generated code:', code);
    
    // You could save it to:
    // - File system (via backend API)
    // - Database
    // - localStorage (for client-side)
  };

  return (
    <DragDropBuilder onExport={handleExport} />
  );
}
        `}</pre>
      </section>

      {/* Example 2: Handling Layout Export */}
      <section>
        <h3>Example 2: Processing Exported Layout</h3>
        <pre>{`
import { LayoutExport } from './tools/componentBuilder/types';
import { generateCode } from './tools/componentBuilder/codeGenerator';

async function handleLayoutExport(layout: LayoutExport) {
  // Option 1: Generate React Native code
  const code = generateCode(layout, 'MyScreen');
  
  // Option 2: Save to database
  const response = await fetch('/api/layouts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: layout.metadata.name,
      components: layout.components,
      generatedCode: code
    })
  });
  
  // Option 3: Send to code generation service
  const compiledComponent = await compileComponent(code);
}
        `}</pre>
      </section>

      {/* Example 3: Loading Saved Layout */}
      <section>
        <h3>Example 3: Loading Saved Layouts</h3>
        <pre>{`
import { DraggedComponent } from './tools/componentBuilder/types';

async function loadLayout(layoutId: string) {
  // Fetch layout from database
  const response = await fetch(\`/api/layouts/\${layoutId}\`);
  const layout = await response.json();
  
  // Extract components
  const components: DraggedComponent[] = layout.components;
  
  // You could:
  // 1. Display in builder for editing
  // 2. Render directly as React Native
  // 3. Generate new code with modifications
  
  return components;
}
        `}</pre>
      </section>

      {/* Example 4: Building a Layout Programmatically */}
      <section>
        <h3>Example 4: Creating Layouts Programmatically</h3>
        <pre>{`
import { DraggedComponent } from './tools/componentBuilder/types';

// Create a login form programmatically
const loginFormLayout: DraggedComponent[] = [
  {
    id: 'card',
    type: 'Card',
    instanceId: 'card-1',
    props: { headerText: 'Login Form' },
    children: [
      {
        id: 'input',
        type: 'Input',
        instanceId: 'input-email',
        props: { label: 'Email', type: 'email', placeholder: 'you@example.com' }
      },
      {
        id: 'input',
        type: 'Input',
        instanceId: 'input-password',
        props: { label: 'Password', type: 'password', placeholder: '••••••••' }
      },
      {
        id: 'button',
        type: 'Button',
        instanceId: 'button-submit',
        props: { text: 'Sign In' }
      }
    ]
  }
];

// Generate code
const layout: LayoutExport = {
  version: '1.0.0',
  components: loginFormLayout,
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: 'LoginForm'
  }
};

const code = generateCode(layout, 'LoginForm');
        `}</pre>
      </section>

      {/* Example 5: Custom Code Generation */}
      <section>
        <h3>Example 5: Extending Code Generation</h3>
        <pre>{`
import { DraggedComponent } from './tools/componentBuilder/types';
import { CodeGenerator } from './tools/componentBuilder/codeGenerator';

// Extend CodeGenerator with custom logic
class CustomCodeGenerator extends CodeGenerator {
  static generateCustomTemplate(
    components: DraggedComponent[],
    config: any
  ): string {
    // Your custom generation logic
    const componentsCode = components
      .map(comp => this.generateReactNativeCode(comp, 4))
      .join('\\n\\n');
    
    return \`
// Custom template
import React from 'react';
import { View } from 'react-native';

export const GeneratedComponent = () => {
  return (
    <View>
      \${componentsCode}
    </View>
  );
};\`;
  }
}

// Use it
const customCode = CustomCodeGenerator.generateCustomTemplate(
  layout.components,
  { theme: 'dark' }
);
        `}</pre>
      </section>

      {/* Example 6: Validation before Export */}
      <section>
        <h3>Example 6: Validating Layouts</h3>
        <pre>{`
import { DraggedComponent } from './tools/componentBuilder/types';

function validateLayout(components: DraggedComponent[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (components.length === 0) {
    errors.push('Layout must have at least one component');
  }
  
  components.forEach((comp, index) => {
    // Validate required props
    if (comp.type === 'Button' && !comp.props.text) {
      errors.push(\`Button at index \${index} missing text\`);
    }
    
    if (comp.type === 'Input' && !comp.props.placeholder) {
      errors.push(\`Input at index \${index} missing placeholder\`);
    }
    
    // Validate nested components
    if (comp.children && comp.children.length > 0) {
      const childValidation = validateLayout(comp.children);
      if (!childValidation.valid) {
        errors.push(...childValidation.errors);
      }
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}
        `}</pre>
      </section>

      {/* Example 7: Using in Storybook */}
      <section>
        <h3>Example 7: Storybook Integration</h3>
        <pre>{`
// generated-layout.stories.tsx
import { Meta, StoryObj } from '@storybook/react-native';
import { LayoutExport } from './tools/componentBuilder/types';
import { generateCode } from './tools/componentBuilder/codeGenerator';

const layoutDefinition: LayoutExport = {
  version: '1.0.0',
  components: [
    {
      id: 'card',
      type: 'Card',
      instanceId: 'card-1',
      props: { headerText: 'Example Card' },
      children: [
        {
          id: 'text',
          type: 'Text',
          instanceId: 'text-1',
          props: { content: 'This is generated content' }
        }
      ]
    }
  ],
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: 'Example Layout'
  }
};

// Auto-generate story from layout
const GeneratedComponent = () => {
  const code = generateCode(layoutDefinition, 'GeneratedStory');
  return eval(code);
};

const meta = {
  title: 'Generated Layouts/Example',
  component: GeneratedComponent,
} satisfies Meta;

export default meta;

export const Default: StoryObj<typeof meta> = {};
        `}</pre>
      </section>

      {/* Display generated layout if available */}
      {generatedLayout && (
        <section>
          <h3>Generated Layout (Live)</h3>
          <pre>{JSON.stringify(generatedLayout, null, 2)}</pre>
        </section>
      )}
    </div>
  );
};

export default QuickStartExample;
