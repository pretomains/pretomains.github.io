import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { LazyLoadWrapper } from './LazyLoadWrapper';
import { Filter, SlidersHorizontal, SearchX, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

export const CatalogGrid = ({ products, searchTerm, onSelectProduct }) => {
  const [filterType, setFilterType] = useState('ALL'); // ALL, FEATURED, FREE, PAID
  const [sortBy, setSortBy] = useState('DEFAULT'); // DEFAULT, PRICE_LOW, PRICE_HIGH, TITLE
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Filter & Sort logic
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

  // Reset to Page 1 whenever search, filter, or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, sortBy, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  // Paginated Subset
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Smooth scroll back to catalog top
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const startItemNum = filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItemNum = Math.min(currentPage * itemsPerPage, filteredProducts.length);

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
            Showing <strong>{startItemNum} - {endItemNum}</strong> of <strong>{filteredProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* Grid Display with Lazy Loading */}
      {currentProducts.length > 0 ? (
        <>
          <div
            className="product-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {currentProducts.map((product) => (
              <LazyLoadWrapper key={product.Product_id} minHeight="360px">
                <ProductCard
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              </LazyLoadWrapper>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                marginTop: '2.5rem',
                padding: '1rem 1.25rem',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              {/* Items Per Page Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748B' }}>
                <Layers size={15} style={{ color: '#DC2626' }} />
                <span>Per Page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="input-field"
                  style={{ width: 'auto', padding: '0.25rem 0.6rem', height: '32px', fontSize: '0.82rem' }}
                >
                  <option value={8}>8 items</option>
                  <option value={12}>12 items</option>
                  <option value={16}>16 items</option>
                  <option value={24}>24 items</option>
                </select>
              </div>

              {/* Page Number Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {/* Previous Page */}
                <button
                  className="btn btn-outline btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronLeft size={16} />
                  <span>Prev</span>
                </button>

                {/* Numbered Buttons */}
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    style={{
                      minWidth: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: pageNum === currentPage ? '#DC2626' : '#E2E8F0',
                      backgroundColor: pageNum === currentPage ? '#DC2626' : '#FFFFFF',
                      color: pageNum === currentPage ? '#FFFFFF' : '#09090B',
                      fontWeight: pageNum === currentPage ? 800 : 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Page */}
                <button
                  className="btn btn-outline btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{ opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Page Indicator */}
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
              </div>
            </div>
          )}
        </>
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
