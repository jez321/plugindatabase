import React, { useState, useEffect } from 'react';
import { useMedia } from 'use-media';
import './App.css';
import style from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import DynamicTable from './DynamicTable/DynamicTable';
import CardList from './CardList/CardList';
import SearchBox from './SearchBox/SearchBox';
import * as SC from '../constants/Style';

const mockDeals = [
  {
    id: 1,
    name: 'Neutron 3',
    company: 'Izotope',
    details: '30% off',
    added: '2019/6/4',
    ends: '2019/6/30',
    link: {
      text: 'AudioDeluxe',
      url: 'https://www.audiodeluxe.com/products/audio-plug-ins/izotope-neutron-3-advanced',
    },
  },
  {
    id: 2,
    name: 'Tverb',
    company: 'Eventide',
    details: '70% off',
    added: '2019/6/3',
    ends: '2019/6/25',
    link: { text: 'JRR Shop', url: 'https://www.jrrshop.com/eventide-tverb' },
  },
  {
    id: 3,
    name: 'Addictive Drums',
    company: 'XLN Audio',
    details: '50% off',
    added: '2019/6/2',
    ends: '2019/6/25',
    link: { text: 'AudioDeluxe', url: 'https://www.audiodeluxe.com/products/xln-audio-addictive-drums-2-custom' },
  },
];

const columns = [
  { title: 'Plugin', key: 'name' },
  { title: 'Company', key: 'company' },
  { title: 'Description', key: 'description' },
  { title: 'Added', key: 'added', type: 'date' },
  { title: 'End', key: 'end_date', type: 'date' },
  { title: 'Link', key: 'link', type: 'link' },
];

const NavigationButton = style.div`
color: #aaa;
padding:0 20px;
float:left;
&.selected {
  color:#1f77ff;
}
`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deals, setDeals] = useState([]);
  const isTabletOrMobile = useMedia({ maxWidth: SC.MOBILE_MAX_WIDTH });
  useEffect(() => {
    Axios.get(`http://localhost:3001/deals?search=${searchTerm}`).then((response) => {
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
