import React, { useState, useEffect, Fragment } from 'react';
import { useMedia } from 'use-media';
import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import DynamicTable from '../DynamicTable/DynamicTable';
import { CardList } from '../CardList/CardList';
import SearchBox from '../SearchBox/SearchBox';
import api from '../../api/api';
import * as SC from '../../constants/Style';

const columns = [
  { title: 'Plugin', key: 'name' },
  { title: 'Company', key: 'company' },
  { title: 'Category', key: 'category' },
  { title: 'Price', key: 'price', type: 'price' },
  { title: 'Description', key: 'description' },
  { title: 'Added', key: 'added', type: 'date' },
  { title: 'Ending', key: 'end_date', type: 'date' },
  { title: 'Link', key: 'link', type: 'link' },
];

const Deals = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCol, setSortCol] = useState('added');
  const [sortDir, setSortDir] = useState('desc');
  const [deals, setDeals] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const isTabletOrMobile = useMedia({ maxWidth: SC.MOBILE_MAX_WIDTH });
  const [searchChanged] = useDebouncedCallback(
    (st) => {
      setSearchTerm(st);
    },
    400,
  );
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    api.get(`deals?search=${searchTerm}&sortdir=${sortDir}&sortby=${sortCol}`, {
      cancelToken: source.token,
    }).then((response) => {
      setDeals(response.data);
      setLoading(false);
    });
    return () => {
      source.cancel('Cancelling axios request in Deals cleanup');
    };
  }, [searchTerm, sortDir, sortCol, isTabletOrMobile]);
  function sortChanged(newSortCol, newSortDir) {
    setSortCol(newSortCol);
    setSortDir(newSortDir);
  }
  return (
    <Fragment>
      <section className="search-wrap">
        <SearchBox changed={searchChanged} />
      </section>
      {isMounted
        ? (
          <section>
            {isTabletOrMobile ? (
              <CardList data-test="component-card-list" loading={loading} data={deals} sortChanged={sortChanged} />
            ) : (
              <DynamicTable
                data-test="component-dynamic-table"
                loading={loading}
                columns={columns}
                rows={deals}
                sortChanged={sortChanged}
              />
            )}
          </section>
        )
        : null}
    </Fragment>
  );
};

Deals.propTypes = {
};


export default Deals;
