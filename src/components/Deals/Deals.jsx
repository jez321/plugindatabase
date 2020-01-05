import React, { useState, useEffect, Fragment } from 'react';
import { useMedia } from 'use-media';
import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import { withAuth } from '@okta/okta-react';
import { PropTypes } from 'prop-types';
import DynamicTable from '../DynamicTable/DynamicTable';
import CardList from '../CardList/CardList';
import SearchBox from '../SearchBox/SearchBox';
import api from '../../api/api';
import * as SC from '../../constants/Style';
import { ShowWantedButton, DealsSearchWrapper } from './Deals.styles';

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

export const Deals = ({ auth }) => {
  const [loading, setLoading] = useState(true);
  const [showWantedOnly, setShowWantedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCol, setSortCol] = useState('added');
  const [sortDir, setSortDir] = useState('desc');
  const [deals, setDeals] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
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
    async function checkAuthentication() {
      const at = await auth.isAuthenticated();
      if (at !== authenticated) {
        setAuthenticated(at);
      }
    }
    checkAuthentication();
  }, [auth, authenticated]);
  useEffect(() => {
    if (!isMounted) {
      return () => {};
    }
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
  }, [searchTerm, sortDir, sortCol, isTabletOrMobile, isMounted]);
  function sortChanged(newSortCol, newSortDir) {
    setSortCol(newSortCol);
    setSortDir(newSortDir);
  }
  return (
    <Fragment>
      <DealsSearchWrapper className="search-wrap">
        <SearchBox changed={searchChanged} />
        { authenticated && (
        <ShowWantedButton
          onClick={() => setShowWantedOnly(prev => !prev)}
          className={showWantedOnly ? 'active' : ''}
          type="button"
        >
          Wanted only
        </ShowWantedButton>
        ) }
      </DealsSearchWrapper>
      {isMounted
        ? (
          <section>
            {isTabletOrMobile ? (
              <CardList
                data-test="component-card-list"
                loading={loading}
                data={deals}
                sortChanged={sortChanged}
                showWantedOnly={showWantedOnly}
              />
            ) : (
              <DynamicTable
                data-test="component-dynamic-table"
                loading={loading}
                columns={columns}
                rows={deals}
                sortChanged={sortChanged}
                showWantedOnly={showWantedOnly}
              />
            )}
          </section>
        )
        : null}
    </Fragment>
  );
};

Deals.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.func.isRequired,
  }).isRequired,
};


export default withAuth(Deals);
