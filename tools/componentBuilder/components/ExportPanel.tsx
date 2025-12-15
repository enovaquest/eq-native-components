import React, { useState } from 'react';
import styles from './DragDropBuilder.module.css';
import { DraggedComponent } from '../types';
import { generateCode, generateJSON } from '../codeGenerator';

interface ExportPanelProps {
  components: DraggedComponent[];
  onExport?: (code: string) => void;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ components, onExport }) => {
  const [exportFormat, setExportFormat] = useState<'json' | 'code'>('code');
  const [componentName, setComponentName] = useState('GeneratedScreen');
  const [copied, setCopied] = useState(false);

  const generateExport = (): string => {
    if (exportFormat === 'json') {
      return generateJSON(components);
    } else {
      const layout = {
        version: '1.0.0' as const,
        components,
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          name: componentName,
        },
      };
      return generateCode(layout, componentName);
    }
  };

  const exportContent = generateExport();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([exportContent], {
      type: exportFormat === 'json' ? 'application/json' : 'text/typescript',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${componentName}.${exportFormat === 'json' ? 'json' : 'tsx'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={styles.propertiesPanel}>
      <h3>Export</h3>

      <div className={styles.exportOptions}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Component Name</label>
          <input
            type="text"
            className={styles.formInput}
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
            placeholder="GeneratedScreen"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Export Format</label>
          <select
            className={styles.formSelect}
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as 'json' | 'code')}
          >
            <option value="code">React Native Code (TSX)</option>
            <option value="json">JSON Layout</option>
          </select>
        </div>
      </div>

      <div className={styles.exportPreview}>
        <label className={styles.formLabel}>Preview</label>
        <textarea
          className={styles.previewCode}
          value={exportContent}
          readOnly
          rows={12}
        />
      </div>

      <div className={styles.exportActions}>
        <button className={styles.primaryButton} onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy to Clipboard'}
        </button>
        <button className={styles.secondaryButton} onClick={handleDownload}>
          Download File
        </button>
      </div>

      {onExport && (
        <button
          className={styles.primaryButton}
          onClick={() => onExport(exportContent)}
          style={{ width: '100%', marginTop: '0.5rem' }}
        >
          Apply to Project
        </button>
      )}
    </div>
  );
};

export default ExportPanel;
