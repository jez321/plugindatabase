import React, { useState, useEffect } from 'react';
import { useMedia } from 'use-media';
import './App.css';
import style from 'styled-components';
import api from '../api/api';
import DynamicTable from './DynamicTable/DynamicTable';
import CardList from './CardList/CardList';
import SearchBox from './SearchBox/SearchBox';
import * as SC from '../constants/Style';

const columns = [
  { title: 'Plugin', key: 'name' },
  { title: 'Company', key: 'company' },
  { title: 'Price', key: 'price', type: 'price' },
  { title: 'Description', key: 'description' },
  { title: 'Added', key: 'added', type: 'date' },
  { title: 'End', key: 'end_date', type: 'date' },
  { title: 'Link', key: 'link', type: 'link' },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deals, setDeals] = useState([]);
  const isTabletOrMobile = useMedia({ maxWidth: SC.MOBILE_MAX_WIDTH });
  useEffect(() => {
    api.get(`deals?search=${searchTerm}`).then((response) => {
      setDeals(response.data);
    });
  });
  // DynamicTable settings
  function searchChanged(st) {
    setSearchTerm(st);
  }

  // Display cards or table depending on current width
  // const displayDeals = deals.filter(deal => deal.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1);
  const dataDisplay = isTabletOrMobile
    ? <CardList data-test="component-card-list" data={deals} />
    : <DynamicTable data-test="component-dynamic-table" columns={columns} rows={deals} />;

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
        {dataDisplay}
      </section>
    </div>
  );
};

export default App;
