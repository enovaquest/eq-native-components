/**
 * Enhanced Component Metadata
 * Provides complete definitions for all builder components
 */

import { ComponentDefinition } from './enhancedTypes';

export const componentDefinitions: Record<string, ComponentDefinition> = {
  Button: {
    id: 'button',
    type: 'Button',
    displayName: 'Button',
    description: 'A touchable button component',
    category: 'Form',
    icon: 'FaSquare',
    children: false,
    defaultProps: {
      text: 'Press me',
      backgroundColor: '#281E4D',
      textColor: '#FFFFFF',
    },
    props: [
      {
        name: 'text',
        label: 'Button Text',
        type: 'string',
        defaultValue: 'Press me',
        placeholder: 'Enter button text',
      },
      {
        name: 'backgroundColor',
        label: 'Background Color',
        type: 'color',
        defaultValue: '#281E4D',
      },
      {
        name: 'textColor',
        label: 'Text Color',
        type: 'color',
        defaultValue: '#FFFFFF',
      },
    ],
  },

  Input: {
    id: 'input',
    type: 'Input',
    displayName: 'Text Input',
    description: 'A text input field for forms',
    category: 'Form',
    icon: 'FaEdit',
    children: false,
    defaultProps: {
      placeholder: 'Enter text...',
      label: 'Field Label',
      type: 'text',
    },
    props: [
      {
        name: 'label',
        label: 'Field Label',
        type: 'string',
        defaultValue: 'Field Label',
        placeholder: 'Enter label',
      },
      {
        name: 'placeholder',
        label: 'Placeholder Text',
        type: 'string',
        defaultValue: 'Enter text...',
        placeholder: 'Enter placeholder',
      },
      {
        name: 'type',
        label: 'Input Type',
        type: 'inputType',
        defaultValue: 'text',
        options: [
          { label: 'Text', value: 'text' },
          { label: 'Email', value: 'email' },
          { label: 'Password', value: 'password' },
          { label: 'Number', value: 'number' },
          { label: 'Phone', value: 'phone' },
          { label: 'Multiline', value: 'multiline' },
        ],
      },
    ],
  },

  Form: {
    id: 'form',
    type: 'Form',
    displayName: 'Form Container',
    description: 'A form wrapper with validation',
    category: 'Container',
    icon: 'FaWpforms',
    children: true,
    defaultProps: {
      onSubmit: 'undefined',
      schema: 'undefined',
    },
    props: [
      {
        name: 'submitButtonText',
        label: 'Submit Button Text',
        type: 'string',
        defaultValue: 'Submit',
        placeholder: 'Enter button text',
      },
    ],
  },

  Card: {
    id: 'card',
    type: 'Card',
    displayName: 'Card',
    description: 'A card container with optional header',
    category: 'Container',
    icon: 'FaRectanglePortrait',
    children: true,
    defaultProps: {
      headerText: 'Card Header',
      backgroundColor: '#FFFFFF',
    },
    props: [
      {
        name: 'headerText',
        label: 'Header Text',
        type: 'string',
        defaultValue: 'Card Header',
        placeholder: 'Enter header text',
      },
      {
        name: 'backgroundColor',
        label: 'Background Color',
        type: 'color',
        defaultValue: '#FFFFFF',
      },
    ],
  },

  Grid: {
    id: 'grid',
    type: 'Grid',
    displayName: 'Grid Layout',
    description: 'A responsive grid layout',
    category: 'Layout',
    icon: 'FaGrip',
    children: true,
    defaultProps: {
      columns: 2,
      gap: 16,
    },
    props: [
      {
        name: 'columns',
        label: 'Number of Columns',
        type: 'number',
        defaultValue: 2,
      },
      {
        name: 'gap',
        label: 'Gap Between Items',
        type: 'number',
        defaultValue: 16,
      },
    ],
  },

  View: {
    id: 'view',
    type: 'View',
    displayName: 'Container',
    description: 'A basic container view',
    category: 'Layout',
    icon: 'FaBox',
    children: true,
    defaultProps: {
      backgroundColor: '#FFFFFF',
    },
    props: [
      {
        name: 'backgroundColor',
        label: 'Background Color',
        type: 'color',
        defaultValue: '#FFFFFF',
      },
    ],
  },

  Text: {
    id: 'text',
    type: 'Text',
    displayName: 'Text',
    description: 'A text display element',
    category: 'Display',
    icon: 'FaFont',
    children: false,
    defaultProps: {
      text: 'Sample Text',
      fontSize: 16,
      color: '#000000',
    },
    props: [
      {
        name: 'text',
        label: 'Text Content',
        type: 'string',
        defaultValue: 'Sample Text',
        placeholder: 'Enter text',
      },
      {
        name: 'fontSize',
        label: 'Font Size',
        type: 'number',
        defaultValue: 16,
      },
      {
        name: 'color',
        label: 'Text Color',
        type: 'color',
        defaultValue: '#000000',
      },
      {
        name: 'fontWeight',
        label: 'Font Weight',
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: 'Normal', value: '400' },
          { label: 'Bold', value: '700' },
          { label: 'Semi-Bold', value: '600' },
        ],
      },
    ],
  },
};

export const getComponentByType = (type: string): ComponentDefinition | undefined => {
  return componentDefinitions[type];
};

export const getComponentsByCategory = (
  category: 'Layout' | 'Form' | 'Display' | 'Container'
): ComponentDefinition[] => {
  return Object.values(componentDefinitions).filter((comp) => comp.category === category);
};

export const getAllComponents = (): ComponentDefinition[] => {
  return Object.values(componentDefinitions);
};

export const getCategories = (): Array<'Layout' | 'Form' | 'Display' | 'Container'> => {
  return ['Form', 'Layout', 'Container', 'Display'];
};
