// Component metadata and builder types

export type ComponentType = 'Button' | 'Input' | 'Card' | 'Grid' | 'BottomSheet' | 'Text' | 'View';

export interface ComponentProperty {
  name: string;
  label?: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'color' | 'inputType';
  defaultValue?: any;
  placeholder?: string;
  options?: Array<{ label: string; value: string }> | string[];
  description?: string;
}

export interface ComponentDefinition {
  id: string;
  type: ComponentType;
  displayName: string;
  description: string;
  props: ComponentProperty[];
  category: 'Layout' | 'Input' | 'Display' | 'Navigation';
  defaultProps?: Record<string, any>;
  children?: boolean;
  icon?: string;
}

export interface DraggedComponent {
  id: string;
  type: ComponentType;
  instanceId: string;
  props: Record<string, any>;
  children?: DraggedComponent[];
  position?: { x: number; y: number };
}

export interface CanvasState {
  components: DraggedComponent[];
  selectedInstanceId?: string;
}

export interface ExportFormat {
  format: 'json' | 'code';
  language?: 'typescript' | 'javascript';
}

export interface LayoutExport {
  version: '1.0.0';
  components: DraggedComponent[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    name: string;
  };
}
