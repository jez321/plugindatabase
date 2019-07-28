import React, { useState, useEffect } from 'react';
import { useMedia } from 'use-media';
import './App.css';
import api from '../api/api';
import DynamicTable from './DynamicTable/DynamicTable';
import CardList from './CardList/CardList';
import SearchBox from './SearchBox/SearchBox';
import * as SC from '../constants/Style';

const columns = [
  { title: 'Plugin', key: 'name' },
  { title: 'Company', key: 'company' },
  { title: 'Category', key: 'category' },
  { title: 'Price', key: 'price', type: 'price' },
  { title: 'Description', key: 'description' },
  { title: 'Added', key: 'added', type: 'date' },
  { title: 'End', key: 'end_date', type: 'date' },
  { title: 'Link', key: 'link', type: 'link' },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCol, setSortCol] = useState('added');
  const [sortDir, setSortDir] = useState('desc');
  const [deals, setDeals] = useState([]);
  const isTabletOrMobile = useMedia({ maxWidth: SC.MOBILE_MAX_WIDTH });
  useEffect(() => {
    api.get(`deals?search=${searchTerm}&sortdir=${sortDir}&sortby=${sortCol}`).then((response) => {
      setDeals(response.data);
    });
  }, [searchTerm, sortDir, sortCol, isTabletOrMobile]);
  // DynamicTable settings
  function searchChanged(st) {
    setSearchTerm(st);
  }
  function sortChanged(newSortCol, newSortDir) {
    setSortCol(newSortCol);
    setSortDir(newSortDir);
  }

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          fontSize: '32px', fontWeight: 'bold', marginTop: '20px', marginBottom: '20px', marginRight: '20px',
        }}
      >
        <div style={{ float: 'left', marginRight: '20px' }}>
          <span style={{ color: '#115599' }}>Plugin</span>
          Database
        </div>
        <div style={{ clear: 'both' }} />
      </header>
      <section className="search-wrap">
        <SearchBox changed={searchChanged} />
      </section>
      <section>
        {isTabletOrMobile ? (
          <CardList data-test="component-card-list" data={deals} sortChanged={sortChanged} />
        ) : (
            <DynamicTable data-test="component-dynamic-table" columns={columns} rows={deals} sortChanged={sortChanged} />
          )}
      </section>
    </div>
  );
};

export default App;
