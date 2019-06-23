import React, { useState } from 'react';
import { useMedia } from 'use-media';
import './App.css';
import DynamicTable from './DynamicTable/DynamicTable';
import CardList from './CardList/CardList';

const App = () => {
  const [deals, setDeals] = useState([
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
  ]);
  const isTabletOrMobile = useMedia({ maxWidth: 800 });

  // DynamicTable settings
  const columns = [
    { title: 'Plugin', key: 'name' },
    { title: 'Company', key: 'company' },
    { title: 'Details', key: 'details' },
    { title: 'Added', key: 'added' },
    { title: 'End', key: 'ends' },
    { title: 'Store', key: 'link', type: 'link' },
  ];

  // Delete a row on click -> sample
  const clickHandler = (id) => {
    const newRows = [...deals];
    newRows.splice(newRows.findIndex(r => r.id === id), 1);
    setDeals(newRows);
  };

  // Display cards or table depending on current width
  const dataDisplay = isTabletOrMobile
    ? <CardList data-test="component-card-list" data={deals} />
    : <DynamicTable data-test="component-dynamic-table" columns={columns} clicked={clickHandler} rows={deals} />;

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          fontSize: '32px', fontWeight: 'bold', marginTop: '20px', marginBottom: '20px',
        }}
      >
        <span style={{ color: '#115599' }}>Plugin</span>
        Database
      </header>
      <section>
        {dataDisplay}
      </section>
    </div>
  );
};

export default App;
