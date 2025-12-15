import { DraggedComponent, LayoutExport } from './types';

export class CodeGenerator {
  static generateReactNativeCode(
    component: DraggedComponent,
    indent: number = 0
  ): string {
    const spaces = ' '.repeat(indent);
    const propsStr = this.generatePropsString(component.props, indent + 2);
    const children = component.children ? this.generateChildren(component.children, indent + 2) : '';

    // Handle special component types
    switch (component.type) {
      case 'Button':
        return `${spaces}<Button${propsStr}${children ? ` style={{ ...componentStyles.button }}` : ''} />`;

      case 'Input':
        return `${spaces}<Input${propsStr} />`;

      case 'Card':
        return `${spaces}<Card${propsStr}>
${children}
${spaces}</Card>`;

      case 'Grid':
        return `${spaces}<Grid${propsStr}>
${children}
${spaces}</Grid>`;

      case 'Text':
        return `${spaces}<Text${propsStr}>${component.props.content || 'Text'}</Text>`;

      case 'View':
        return `${spaces}<View${propsStr}>
${children}
${spaces}</View>`;

      case 'BottomSheet':
        return `${spaces}<EQBottomSheet${propsStr}>
${children}
${spaces}</EQBottomSheet>`;

      default:
        return '';
    }
  }

  static generateChildren(children: DraggedComponent[], indent: number): string {
    return children.map((child) => this.generateReactNativeCode(child, indent)).join('\n');
  }

  static generatePropsString(props: Record<string, any>, indent: number): string {
    const propEntries = Object.entries(props).filter(([key]) => key !== 'content');
    if (propEntries.length === 0) return '';

    const lines = propEntries.map(([key, value]) => {
      const formattedValue = this.formatPropValue(value);
      return `\n${'  '.repeat(indent / 2)}${key}=${formattedValue}`;
    });

    return lines.join('');
  }

  static formatPropValue(value: any): string {
    if (typeof value === 'string') {
      if (value.startsWith('#') || value === 'true' || value === 'false') {
        return `"${value}"`;
      }
      return `"${value}"`;
    }
    if (typeof value === 'number') {
      return `{${value}}`;
    }
    if (typeof value === 'boolean') {
      return `{${value}}`;
    }
    return `"${String(value)}"`;
  }

  static generateFullComponent(layout: LayoutExport, componentName: string = 'GeneratedScreen'): string {
    const componentCode = layout.components
      .map((comp) => this.generateReactNativeCode(comp, 4))
      .join('\n\n');

    return `import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Card } from './components/Card/Card';
import { Grid } from './components/Layout/Grid';
import { EQBottomSheet } from './components/BottomSheet/BottomSheet';
import { ThemeProvider } from './themes/themeProvider';

const componentStyles = StyleSheet.create({
  button: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  card: {
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});

export const ${componentName}: React.FC = () => {
  const [formData, setFormData] = React.useState({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ThemeProvider initialThemeName="nebulaCorporateTheme">
      <View style={componentStyles.container}>
${componentCode}
      </View>
    </ThemeProvider>
  );
};

export default ${componentName};
`;
  }

  static generateJSONLayout(components: DraggedComponent[]): LayoutExport {
    return {
      version: '1.0.0',
      components,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: 'Generated Layout',
      },
    };
  }

  static generateTypeScript(layout: LayoutExport): string {
    const componentInterfaces = layout.components
      .map((comp) => this.generateComponentInterface(comp))
      .join('\n\n');

    return `// Auto-generated TypeScript types
${componentInterfaces}

export interface ScreenProps {
  // Add your screen-specific props here
}
`;
  }

  static generateComponentInterface(component: DraggedComponent): string {
    const propsType = Object.entries(component.props)
      .map(([key, value]) => {
        const type = typeof value;
        return `  ${key}: ${type};`;
      })
      .join('\n');

    return `interface ${component.type}Props {
${propsType}
}`;
  }
}

export const generateCode = (layout: LayoutExport, componentName?: string): string => {
  return CodeGenerator.generateFullComponent(layout, componentName);
};

export const generateJSON = (components: DraggedComponent[]): string => {
  const layout = CodeGenerator.generateJSONLayout(components);
  return JSON.stringify(layout, null, 2);
};
