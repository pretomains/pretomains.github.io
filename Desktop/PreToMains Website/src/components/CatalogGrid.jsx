import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, SearchX, Grid, List } from 'lucide-react';

export const CatalogGrid = ({ products, searchTerm, onSelectProduct }) => {
  const [filterType, setFilterType] = useState('ALL'); // ALL, FEATURED, FREE, PAID
  const [sortBy, setSortBy] = useState('DEFAULT'); // DEFAULT, PRICE_LOW, PRICE_HIGH, TITLE

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Keyword search
      const query = searchTerm.toLowerCase().trim();
      const matchesQuery = 
        !query ||
        p.Product_Title.toLowerCase().includes(query) ||
        p.Product_Description.toLowerCase().includes(query) ||
        p.Product_id.toLowerCase().includes(query);

      if (!matchesQuery) return false;

      // Filter tabs
      if (filterType === 'FEATURED') return String(p.featured).toUpperCase() === 'TRUE';
      if (filterType === 'FREE') return Number(p.Price_in_rupees) === 0;
      if (filterType === 'PAID') return Number(p.Price_in_rupees) > 0;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW') return Number(a.Price_in_rupees) - Number(b.Price_in_rupees);
      if (sortBy === 'PRICE_HIGH') return Number(b.Price_in_rupees) - Number(a.Price_in_rupees);
      if (sortBy === 'TITLE') return a.Product_Title.localeCompare(b.Product_Title);
      return 0;
    });
  }, [products, searchTerm, filterType, sortBy]);

  return (
    <section id="catalog" style={{ marginTop: '2rem' }}>
      {/* Catalog Header Controls */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'row',
          flexWrap: 'wrap', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '1rem',
          marginBottom: '1.5rem',
          padding: '1rem 1.25rem',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}
      >
        {/* Filter Pills */}
        <div className="filter-pills-container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#09090B', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.5rem' }}>
            <Filter size={15} style={{ color: '#DC2626' }} />
            Filter:
          </span>

          <button
            className={`btn btn-sm ${filterType === 'ALL' ? 'btn-secondary' : 'btn-outline'}`}
            onClick={() => setFilterType('ALL')}
          >
            All Materials ({products.length})
          </button>

          <button
            className={`btn btn-sm ${filterType === 'FEATURED' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilterType('FEATURED')}
          >
            🔥 Featured
          </button>

          <button
            className={`btn btn-sm ${filterType === 'FREE' ? 'btn-secondary' : 'btn-outline'}`}
            onClick={() => setFilterType('FREE')}
            style={filterType === 'FREE' ? { backgroundColor: '#10B981', color: '#FFF' } : {}}
          >
            Free Resources
          </button>

          <button
            className={`btn btn-sm ${filterType === 'PAID' ? 'btn-secondary' : 'btn-outline'}`}
            onClick={() => setFilterType('PAID')}
          >
            Paid Guides
          </button>
        </div>

        {/* Sort Selector & Count */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', width: 'auto', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={15} style={{ color: '#64748B' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
              style={{ width: 'auto', padding: '0.4rem 0.8rem', height: '36px', fontSize: '0.85rem' }}
            >
              <option value="DEFAULT">Sort by Default</option>
              <option value="PRICE_LOW">Price: Low to High</option>
              <option value="PRICE_HIGH">Price: High to Low</option>
              <option value="TITLE">Title: A to Z</option>
            </select>
          </div>

          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B', whiteSpace: 'nowrap' }}>
            Showing <strong>{filteredProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* Grid Display */}
      {filteredProducts.length > 0 ? (
        <div
          className="product-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.Product_id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        /* Empty Search Results */
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed #CBD5E1',
            margin: '1rem 0'
          }}
        >
          <div 
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#FEF2F2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#DC2626',
              margin: '0 auto 1rem auto'
            }}
          >
            <SearchX size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#09090B', marginBottom: '0.5rem' }}>
            No Matching Notes Found
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
            We couldn't find any materials matching "{searchTerm}". Try tweaking your search keywords or resetting active filters.
          </p>
          <button 
            className="btn btn-outline" 
            onClick={() => { setFilterType('ALL'); setSortBy('DEFAULT'); }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
