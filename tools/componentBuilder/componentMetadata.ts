import { ComponentDefinition } from './types';

export const componentMetadata: Record<string, ComponentDefinition> = {
  Button: {
    id: 'button',
    type: 'Button',
    displayName: 'Button',
    description: 'A reusable, touchable button component',
    category: 'Input',
    children: false,
    props: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Press me',
        description: 'Button text',
      },
      {
        name: 'onPress',
        type: 'string',
        defaultValue: 'undefined',
        description: 'Handler (placeholder in builder)',
      },
      {
        name: 'backgroundColor',
        type: 'color',
        defaultValue: '#281E4D',
        description: 'Background color',
      },
      {
        name: 'textColor',
        type: 'color',
        defaultValue: '#FFFFFF',
        description: 'Text color',
      },
      {
        name: 'width',
        type: 'string',
        defaultValue: 'auto',
        description: 'Button width',
      },
    ],
    defaultProps: {
      text: 'Press me',
      backgroundColor: '#281E4D',
      textColor: '#FFFFFF',
    },
  },

  Input: {
    id: 'input',
    type: 'Input',
    displayName: 'Input',
    description: 'A text input field component',
    category: 'Input',
    children: false,
    props: [
      {
        name: 'placeholder',
        type: 'string',
        defaultValue: 'Enter text...',
        description: 'Placeholder text',
      },
      {
        name: 'label',
        type: 'string',
        defaultValue: 'Label',
        description: 'Input label',
      },
      {
        name: 'type',
        type: 'select',
        defaultValue: 'text',
        options: ['text', 'email', 'password', 'number', 'phone', 'multiline'],
        description: 'Input type',
      },
      {
        name: 'width',
        type: 'string',
        defaultValue: '100%',
        description: 'Input width',
      },
    ],
    defaultProps: {
      placeholder: 'Enter text...',
      label: 'Label',
      type: 'text',
    },
  },

  Card: {
    id: 'card',
    type: 'Card',
    displayName: 'Card',
    description: 'A card container with optional header',
    category: 'Layout',
    children: true,
    props: [
      {
        name: 'headerText',
        type: 'string',
        defaultValue: 'Card Header',
        description: 'Card header text',
      },
      {
        name: 'backgroundColor',
        type: 'color',
        defaultValue: '#FFFFFF',
        description: 'Card background color',
      },
      {
        name: 'elevation',
        type: 'number',
        defaultValue: 3,
        description: 'Card elevation/shadow',
      },
    ],
    defaultProps: {
      headerText: 'Card Header',
      backgroundColor: '#FFFFFF',
      elevation: 3,
    },
  },

  Grid: {
    id: 'grid',
    type: 'Grid',
    displayName: 'Grid',
    description: 'A responsive grid layout',
    category: 'Layout',
    children: true,
    props: [
      {
        name: 'columns',
        type: 'number',
        defaultValue: 2,
        description: 'Number of columns',
      },
      {
        name: 'gap',
        type: 'number',
        defaultValue: 16,
        description: 'Gap between items',
      },
    ],
    defaultProps: {
      columns: 2,
      gap: 16,
    },
  },

  BottomSheet: {
    id: 'bottomsheet',
    type: 'BottomSheet',
    displayName: 'Bottom Sheet',
    description: 'A draggable bottom sheet modal',
    category: 'Navigation',
    children: true,
    props: [
      {
        name: 'snapPoints',
        type: 'string',
        defaultValue: '25%, 50%, 90%',
        description: 'Snap points (comma-separated)',
      },
      {
        name: 'enableBackdrop',
        type: 'boolean',
        defaultValue: true,
        description: 'Show backdrop',
      },
    ],
    defaultProps: {
      snapPoints: '25%, 50%, 90%',
      enableBackdrop: true,
    },
  },

  Text: {
    id: 'text',
    type: 'Text',
    displayName: 'Text',
    description: 'A simple text element',
    category: 'Display',
    children: false,
    props: [
      {
        name: 'content',
        type: 'string',
        defaultValue: 'Text content',
        description: 'Text content',
      },
      {
        name: 'fontSize',
        type: 'number',
        defaultValue: 16,
        description: 'Font size',
      },
      {
        name: 'color',
        type: 'color',
        defaultValue: '#000000',
        description: 'Text color',
      },
      {
        name: 'fontWeight',
        type: 'select',
        defaultValue: 'normal',
        options: ['normal', 'bold', '600', '700'],
        description: 'Font weight',
      },
    ],
    defaultProps: {
      content: 'Text content',
      fontSize: 16,
      color: '#000000',
      fontWeight: 'normal',
    },
  },

  View: {
    id: 'view',
    type: 'View',
    displayName: 'View',
    description: 'A basic container view',
    category: 'Layout',
    children: true,
    props: [
      {
        name: 'backgroundColor',
        type: 'color',
        defaultValue: '#FFFFFF',
        description: 'Background color',
      },
      {
        name: 'padding',
        type: 'number',
        defaultValue: 0,
        description: 'Padding',
      },
      {
        name: 'flexDirection',
        type: 'select',
        defaultValue: 'column',
        options: ['column', 'row'],
        description: 'Flex direction',
      },
    ],
    defaultProps: {
      backgroundColor: '#FFFFFF',
      padding: 0,
      flexDirection: 'column',
    },
  },
};

export const getComponentMetadata = (type: string): ComponentDefinition | null => {
  return componentMetadata[type] || null;
};

export const getComponentsByCategory = (category: string): ComponentDefinition[] => {
  return Object.values(componentMetadata).filter(
    (component) => component.category === category
  );
};

export const getAllComponents = (): ComponentDefinition[] => {
  return Object.values(componentMetadata);
};
