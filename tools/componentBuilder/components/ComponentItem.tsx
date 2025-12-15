import React from 'react';
import styles from './DragDropBuilder.module.css';
import { ComponentDefinition } from '../types';

interface ComponentItemProps {
  component: ComponentDefinition;
  onAdd: () => void;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ component, onAdd }) => {
  return (
    <button
      className={styles.componentButton}
      onClick={onAdd}
      title={component.description}
    >
      <span className={styles.componentIcon}>📦</span>
      <span className={styles.componentName}>{component.displayName}</span>
    </button>
  );
};

export default ComponentItem;
