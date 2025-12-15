/**
 * Component Palette - Shows available components organized by category
 */

import React from 'react';
import {
  FaSquare,
  FaEdit,
  FaWpforms,
  FaRegSquare, // Replacing with FaRegSquare as an alternative
  FaThLarge,
  FaBox,
  FaFont,
} from 'react-icons/fa';
import styles from './DragDropBuilder.module.css';
import { getAllComponents } from '../componentMetadata';

interface ComponentPaletteProps {
  onAddComponent: (componentType: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Button: <FaSquare />,
  Input: <FaEdit />,
  Form: <FaWpforms />,
  Card: <FaRegSquare />, // Updated to use FaRegSquare
  Grid: <FaThLarge />,
  View: <FaBox />,
  Text: <FaFont />,
};

const ComponentPalette: React.FC<ComponentPaletteProps> = ({ onAddComponent }) => {
  const components = getAllComponents();
  const categories = Array.from(
    new Set(components.map((c) => c.category))
  ).sort();

  return (
    <div className={styles.componentPalette}>
      {categories.map((category) => (
        <div key={category} className={styles.categorySection}>
          <h4 className={styles.categoryTitle}>{category}</h4>
          {components
            .filter((c) => c.category === category)
            .map((component) => (
              <button
                key={component.id}
                className={styles.componentItem}
                onClick={() => onAddComponent(component.type)}
                title={component.description}
              >
                {iconMap[component.type] || <FaSquare />}
                <span>{component.displayName}</span>
              </button>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ComponentPalette;
