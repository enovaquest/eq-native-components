/**
 * Component Builder - Main Exports
 * 
 * This file serves as the main entry point for the component builder.
 * It exports all necessary components, types, and utilities.
 */

// Components
export { default as DragDropBuilder } from './components/DragDropBuilder';
export { default as ComponentPalette } from './components/ComponentPalette';
export { default as Canvas } from './components/Canvas';
export { default as PropertiesPanel } from './components/PropertiesPanel';
export { default as ExportPanel } from './components/ExportPanel';
export { default as ComponentItem } from './components/ComponentItem';

// Types
export type {
  ComponentType,
  ComponentProperty,
  ComponentDefinition,
  DraggedComponent,
  CanvasState,
  ExportFormat,
  LayoutExport,
} from './types';

// Utilities
export {
  componentMetadata,
  getComponentMetadata,
  getComponentsByCategory,
  getAllComponents,
} from './componentMetadata';

export {
  CodeGenerator,
  generateCode,
  generateJSON,
} from './codeGenerator';

// CSS Modules
export { default as builderStyles } from './components/DragDropBuilder.module.css';
