/**
 * Modern Drag & Drop Component Builder
 * 
 * A professional UI for visually building React Native layouts with:
 * - Page management
 * - Drag-and-drop component placement
 * - Property editing
 * - Code generation
 * - JSON export
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  FaPlus,
  FaTrash,
  FaCode,
  FaTimes,
  FaHome,
  FaFileAlt,
  FaEdit,
  FaEye,
} from 'react-icons/fa';
import styles from './DragDropBuilder.module.css';
import { DraggedComponent } from '../types';
import { getAllComponents } from '../componentMetadata';
import ComponentPalette from './ComponentPalette';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';
import ExportPanel from './ExportPanel';

interface PageLayout {
  id: string;
  name: string;
  components: DraggedComponent[];
  createdAt: Date;
  updatedAt: Date;
}

interface DragDropBuilderProps {
  onExport?: (code: string) => void;
}

export const DragDropBuilder: React.FC<DragDropBuilderProps> = ({ onExport }) => {
  // Page management
  const [pages, setPages] = useState<PageLayout[]>([
    {
      id: '1',
      name: 'Home',
      components: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  const [currentPageId, setCurrentPageId] = useState('1');
  const [showNewPageInput, setShowNewPageInput] = useState(false);
  const [newPageName, setNewPageName] = useState('');

  // Component state
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Get current page
  const currentPage = useMemo(
    () => pages.find((p) => p.id === currentPageId),
    [pages, currentPageId]
  );

  // Helper to generate unique IDs
  const generateInstanceId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Page management handlers
  const handleAddPage = useCallback(() => {
    if (!newPageName.trim()) return;
    const newPage: PageLayout = {
      id: String(Date.now()),
      name: newPageName,
      components: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPages([...pages, newPage]);
    setCurrentPageId(newPage.id);
    setNewPageName('');
    setShowNewPageInput(false);
  }, [pages, newPageName]);

  const handleDeletePage = useCallback(
    (pageId: string) => {
      if (pages.length === 1) {
        alert('Cannot delete the last page');
        return;
      }
      const filtered = pages.filter((p) => p.id !== pageId);
      setPages(filtered);
      if (currentPageId === pageId) {
        setCurrentPageId(filtered[0].id);
      }
    },
    [pages, currentPageId]
  );

  // Component handlers
  const handleAddComponent = useCallback(
    (componentType: string) => {
      if (!currentPage) return;

      const metadata = getAllComponents().find((c) => c.type === componentType);
      if (!metadata) return;

      const newComponent: DraggedComponent = {
        id: metadata.id,
        type: componentType as any,
        instanceId: generateInstanceId(),
        props: { ...metadata.defaultProps },
        children: metadata.children ? [] : undefined,
      };

      const updatedPage = {
        ...currentPage,
        components: [...currentPage.components, newComponent],
        updatedAt: new Date(),
      };

      setPages(pages.map((p) => (p.id === currentPageId ? updatedPage : p)));
      setSelectedInstanceId(newComponent.instanceId);
    },
    [currentPage, currentPageId, pages, generateInstanceId]
  );

  const handleUpdateComponent = useCallback(
    (instanceId: string, updates: Partial<DraggedComponent>) => {
      if (!currentPage) return;

      const updateRecursive = (components: DraggedComponent[]): DraggedComponent[] => {
        return components.map((comp) => {
          if (comp.instanceId === instanceId) {
            return { ...comp, ...updates };
          }
          if (comp.children && comp.children.length > 0) {
            return {
              ...comp,
              children: updateRecursive(comp.children),
            };
          }
          return comp;
        });
      };

      const updatedComponents = updateRecursive(currentPage.components);
      const updatedPage = {
        ...currentPage,
        components: updatedComponents,
        updatedAt: new Date(),
      };

      setPages(pages.map((p) => (p.id === currentPageId ? updatedPage : p)));
    },
    [currentPage, currentPageId, pages]
  );

  const handleDeleteComponent = useCallback(
    (instanceId: string) => {
      if (!currentPage) return;

      const deleteRecursive = (components: DraggedComponent[]): DraggedComponent[] => {
        return components
          .filter((comp) => comp.instanceId !== instanceId)
          .map((comp) => ({
            ...comp,
            children: comp.children ? deleteRecursive(comp.children) : undefined,
          }));
      };

      const updatedComponents = deleteRecursive(currentPage.components);
      const updatedPage = {
        ...currentPage,
        components: updatedComponents,
        updatedAt: new Date(),
      };

      setPages(pages.map((p) => (p.id === currentPageId ? updatedPage : p)));
      setSelectedInstanceId(null);
    },
    [currentPage, currentPageId, pages]
  );

  const handleReorderComponents = useCallback(
    (reorderedComponents: DraggedComponent[]) => {
      if (!currentPage) return;

      const updatedPage = {
        ...currentPage,
        components: reorderedComponents,
        updatedAt: new Date(),
      };

      setPages(pages.map((p) => (p.id === currentPageId ? updatedPage : p)));
    },
    [currentPage, currentPageId, pages]
  );

  const selectedComponent =
    currentPage?.components.find((c) => c.instanceId === selectedInstanceId) || null;

  return (
    <div className={styles.container}>
      {/* Left Sidebar - Pages & Components */}
      <div className={styles.leftSidebar}>
        {/* Pages Section */}
        <div className={styles.sidebarSection}>
          <div className={styles.sectionHeader}>
            <FaFileAlt className={styles.sectionIcon} />
            <h3>Pages</h3>
            <button
              className={styles.addButton}
              onClick={() => setShowNewPageInput(!showNewPageInput)}
              title="Add new page"
            >
              <FaPlus size={14} />
            </button>
          </div>

          {showNewPageInput && (
            <div className={styles.newPageInput}>
              <input
                type="text"
                placeholder="Page name..."
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddPage()}
                autoFocus
              />
              <button onClick={handleAddPage} className={styles.confirmButton}>
                <FaPlus size={12} />
              </button>
              <button
                onClick={() => setShowNewPageInput(false)}
                className={styles.cancelButton}
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}

          <div className={styles.pagesList}>
            {pages.map((page) => (
              <div
                key={page.id}
                className={`${styles.pageItem} ${
                  currentPageId === page.id ? styles.activePageItem : ''
                }`}
              >
                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPageId(page.id)}
                >
                  <FaHome size={14} />
                  <span>{page.name}</span>
                </button>
                {pages.length > 1 && (
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeletePage(page.id)}
                    title="Delete page"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Components Section */}
        <div className={styles.sidebarSection}>
          <div className={styles.sectionHeader}>
            <FaEdit className={styles.sectionIcon} />
            <h3>Components</h3>
          </div>
          <ComponentPalette onAddComponent={handleAddComponent} />
        </div>
      </div>

      {/* Center - Canvas */}
      <div className={styles.centerColumn}>
        <div className={styles.canvasHeader}>
          <h2>{currentPage?.name || 'Untitled'}</h2>
          <div className={styles.canvasActions}>
            <button
              className={`${styles.actionButton} ${previewMode ? styles.active : ''}`}
              onClick={() => setPreviewMode(!previewMode)}
              title="Toggle preview mode"
            >
              <FaEye size={16} />
            </button>
            <button
              className={styles.actionButton}
              onClick={() => setShowExportPanel(!showExportPanel)}
              title="Export code"
            >
              <FaCode size={16} />
            </button>
          </div>
        </div>

        {currentPage && (
          <Canvas
            components={currentPage.components}
            selectedInstanceId={selectedInstanceId}
            onSelectComponent={setSelectedInstanceId}
            onDeleteComponent={handleDeleteComponent}
            onReorderComponents={handleReorderComponents}
          />
        )}
      </div>

      {/* Right Sidebar - Properties & Export */}
      <div className={styles.rightSidebar}>
        {showExportPanel ? (
          <ExportPanel
            components={currentPage?.components || []}
            onExport={onExport}
          />
        ) : selectedComponent ? (
          <PropertiesPanel
            component={selectedComponent}
            onUpdate={(updates) => handleUpdateComponent(selectedComponent.instanceId, updates)}
            onDelete={() => handleDeleteComponent(selectedComponent.instanceId)}
          />
        ) : (
          <div className={styles.emptyPanel}>
            <p>Select a component to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropBuilder;
