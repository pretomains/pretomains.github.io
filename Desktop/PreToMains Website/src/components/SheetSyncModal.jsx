import React, { useState } from 'react';
import { X, Table, Check, AlertCircle, HelpCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { fetchGoogleSheetData } from '../utils/sheetParser';

export const SheetSyncModal = ({ onClose, onSyncSuccess, currentUrl }) => {
  const [urlInput, setUrlInput] = useState(currentUrl || '');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSync = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!urlInput.trim()) {
      setErrorMsg('Please enter your published Google Sheet CSV URL.');
      return;
    }

    setLoading(true);

    try {
      const data = await fetchGoogleSheetData(urlInput);
      setSuccessMsg(`Successfully loaded ${data.length} products from your Google Sheet!`);
      setTimeout(() => {
        onSyncSuccess(data, urlInput);
        onClose();
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to sync Google Sheet. Ensure sheet is published to Web as CSV.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#FAFAFA'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ padding: '0.4rem', backgroundColor: '#FEF2F2', borderRadius: 'var(--radius-sm)', color: '#DC2626' }}>
              <Table size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#09090B' }}>
                Connect Live Google Sheet
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Sync your custom sheet table directly to PreToMains Website
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: '0.25rem',
              borderRadius: '50%'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSync} style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#09090B',
                marginBottom: '0.5rem'
              }}
            >
              Google Sheet Published CSV URL
            </label>
            <input
              type="url"
              className="input-field"
              placeholder="https://docs.google.com/spreadsheets/d/1ZVOmIGl5Z8VuBml6P1CTDmqm81ip7T2srx2j4D2pLJ0/edit?gid=1054593956"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={loading}
              style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
            />
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div 
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: 'var(--radius-md)',
                color: '#991B1B',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem'
              }}
            >
              <AlertCircle size={16} style={{ shrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div 
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#ECFDF5',
                border: '1px solid #6EE7B7',
                borderRadius: 'var(--radius-md)',
                color: '#065F46',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem'
              }}
            >
              <Check size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  <span>Syncing Google Sheet...</span>
                </>
              ) : (
                <>
                  <Table size={16} />
                  <span>Fetch & Load Data</span>
                </>
              )}
            </button>
          </div>

          {/* Instructions Guide */}
          <div 
            style={{
              padding: '1.25rem',
              backgroundColor: '#F8FAFC',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #E2E8F0'
            }}
          >
            <h4 
              style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#09090B',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '0.75rem'
              }}
            >
              <HelpCircle size={16} style={{ color: '#DC2626' }} />
              How to get your Google Sheet CSV Link:
            </h4>
            <ol 
              style={{
                fontSize: '0.85rem',
                color: '#475569',
                paddingLeft: '1.2rem',
                lineHeight: 1.7
              }}
            >
              <li>Open your Google Sheet containing the table headers: <br />
                <code style={{ backgroundColor: '#FEF2F2', color: '#DC2626', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                  Product_id | Product_Title | Product_Description | Price_in_rupees | Image_Link | download_link | featured
                </code>
              </li>
              <li>Go to <strong>File</strong> menu &rarr; <strong>Share</strong> &rarr; <strong>Publish to Web</strong>.</li>
              <li>Select <strong>Entire Document (or Sheet)</strong> and set format to <strong>Comma-separated values (.csv)</strong>.</li>
              <li>Click <strong>Publish</strong>, copy the link, and paste it into the field above!</li>
            </ol>
          </div>
        </form>
      </div>
    </div>
  );
};
