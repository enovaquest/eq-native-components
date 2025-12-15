/**
 * Canvas Component - Shows mobile preview with placed components
 */

import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import {
  FaSquare,
  FaEdit,
  FaWpforms,
  FaRegSquare,
  FaThLarge,
  FaBox,
  FaFont,
} from 'react-icons/fa';
import styles from './DragDropBuilder.module.css';
import { DraggedComponent } from '../types';
import { getComponentMetadata } from '../componentMetadata';

interface CanvasProps {
  components: DraggedComponent[];
  selectedInstanceId: string | null;
  onSelectComponent: (instanceId: string) => void;
  onDeleteComponent: (instanceId: string) => void;
  onReorderComponents: (components: DraggedComponent[]) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Button: <FaSquare />,
  Input: <FaEdit />,
  Form: <FaWpforms />,
  Card: <FaRegSquare />,
  Grid: <FaThLarge />,
  View: <FaBox />,
  Text: <FaFont />,
};

const Canvas: React.FC<CanvasProps> = ({
  components,
  selectedInstanceId,
  onSelectComponent,
  onDeleteComponent,
  onReorderComponents,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newComponents = [...components];
    const draggedComponent = newComponents[draggedIndex];
    newComponents.splice(draggedIndex, 1);
    newComponents.splice(dropIndex, 0, draggedComponent);

    onReorderComponents(newComponents);
    setDraggedIndex(null);
  };

  const handleDeleteKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' && selectedInstanceId) {
      onDeleteComponent(selectedInstanceId);
    }
  };

  return (
    <div
      className={styles.canvas}
      role="presentation"
      onKeyDown={handleDeleteKeyPress}
      tabIndex={0}
    >
      <div className={styles.canvasInner}>
        {components.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>
            <p>👉 Add components from the left panel to start building</p>
          </div>
        ) : (
          <div style={{ padding: '1.5rem' }}>
            {components.map((component, index) => {
              return (
                <div
                  key={component.instanceId}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className={`${styles.canvasComponent} ${
                    selectedInstanceId === component.instanceId
                      ? styles.selected
                      : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectComponent(component.instanceId);
                  }}
                >
                  <div className={styles.componentInfo}>
                    {iconMap[component.type] || <FaSquare />}
                    <span>{component.type}</span>
                    {component.props.text && (
                      <span style={{ fontSize: '12px', color: '#999', marginLeft: 'auto' }}>
                        "{component.props.text.substring(0, 20)}..."
                      </span>
                    )}
                    {component.props.label && (
                      <span style={{ fontSize: '12px', color: '#999', marginLeft: 'auto' }}>
                        "{component.props.label.substring(0, 20)}..."
                      </span>
                    )}
                  </div>

                  {selectedInstanceId === component.instanceId && (
                    <button
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteComponent(component.instanceId);
                      }}
                      aria-label="Delete component"
                      title="Delete component"
                    >
                      <FaTrash size={12} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;
