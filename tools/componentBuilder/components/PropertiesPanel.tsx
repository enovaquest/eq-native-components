/**
 * Properties Panel - Edit component properties
 */

import React from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './DragDropBuilder.module.css';
import { DraggedComponent } from '../types';
import { getComponentMetadata } from '../componentMetadata';

interface PropertiesPanelProps {
  component: DraggedComponent | null;
  onUpdate: (updates: Partial<DraggedComponent>) => void;
  onDelete: () => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  onUpdate,
  onDelete,
}) => {
  if (!component) {
    return (
      <div className={styles.propertiesPanel}>
        <h3>Properties</h3>
        <p className={styles.emptyMessage}>
          Select a component to edit its properties
        </p>
      </div>
    );
  }

  const metadata = getComponentMetadata(component.type);
  if (!metadata) return null;

  const handlePropChange = (propName: string, value: any) => {
    const newProps = { ...component.props, [propName]: value };
    onUpdate({ props: newProps });
  };

  return (
    <div className={styles.propertiesPanel}>
      <div className={styles.propertiesHeader}>
        <h4>{component.type}</h4>
        <button
          className={styles.deleteComponentButton}
          onClick={onDelete}
        >
          <FaTrash size={12} /> Delete
        </button>
      </div>

      <div className={styles.propsForm}>
        {metadata.props.map((prop) => (
          <div key={prop.name} className={styles.propertyGroup}>
            <label>{prop.label || prop.description || prop.name}</label>

            {prop.type === 'string' ? (
              <input
                type="text"
                value={component.props[prop.name] || ''}
                onChange={(e) => handlePropChange(prop.name, e.target.value)}
                placeholder={prop.placeholder || prop.description || ''}
              />
            ) : prop.type === 'number' ? (
              <input
                type="number"
                value={component.props[prop.name] || 0}
                onChange={(e) =>
                  handlePropChange(prop.name, parseFloat(e.target.value))
                }
              />
            ) : prop.type === 'boolean' ? (
              <input
                type="checkbox"
                checked={component.props[prop.name] || false}
                onChange={(e) => handlePropChange(prop.name, e.target.checked)}
                style={{ width: 'auto', cursor: 'pointer' }}
              />
            ) : prop.type === 'select' || prop.type === 'inputType' ? (
              <select
                value={component.props[prop.name] || prop.defaultValue}
                onChange={(e) => handlePropChange(prop.name, e.target.value)}
              >
                {prop.options?.map((option) => {
                  // Handle both string[] and {label, value}[] formats
                  if (typeof option === 'string') {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  }
                  return (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            ) : prop.type === 'color' ? (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="color"
                  value={component.props[prop.name] || '#000000'}
                  onChange={(e) => handlePropChange(prop.name, e.target.value)}
                  style={{ width: '50px', height: '40px', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={component.props[prop.name] || '#000000'}
                  onChange={(e) => handlePropChange(prop.name, e.target.value)}
                  placeholder="#000000"
                  style={{ flex: 1 }}
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPanel;
