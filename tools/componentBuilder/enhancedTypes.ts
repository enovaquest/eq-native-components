/**
 * Enhanced Types for Component Builder
 * Supports form-based components with proper validation
 */

export type ComponentType = 
  | 'Button'
  | 'Input'
  | 'Card'
  | 'Grid'
  | 'Form'
  | 'Text'
  | 'View';

export type InputFieldType = 'text' | 'email' | 'password' | 'number' | 'phone' | 'multiline';
export type PropType = 'string' | 'number' | 'boolean' | 'color' | 'select' | 'inputType';

export interface ComponentProperty {
  name: string;
  label: string;
  type: PropType;
  defaultValue: string | number | boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  validation?: (value: any) => boolean | string;
}

export interface ComponentDefinition {
  id: string;
  type: ComponentType;
  displayName: string;
  description: string;
  category: 'Layout' | 'Form' | 'Display' | 'Container';
  icon?: string;
  children: boolean;
  defaultProps: Record<string, any>;
  props: ComponentProperty[];
}

export interface DraggedComponent {
  id: string;
  instanceId: string;
  type: ComponentType;
  props: Record<string, any>;
  children: DraggedComponent[];
  parentId?: string;
  order: number;
}

export interface PageLayout {
  id: string;
  name: string;
  components: DraggedComponent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LayoutExport {
  version: string;
  pages: Array<{
    name: string;
    components: DraggedComponent[];
  }>;
  metadata: {
    createdAt: string;
    createdBy?: string;
    description?: string;
  };
}

export interface FormDefinition {
  fields: Array<{
    name: string;
    label: string;
    type: InputFieldType;
    placeholder?: string;
    required?: boolean;
    validation?: any; // Yup schema
  }>;
  schema?: any; // Yup schema
}
