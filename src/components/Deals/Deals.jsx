import React, { useState, useEffect, Fragment } from 'react';
import { useMedia } from 'use-media';
import { connect } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { withAuth } from '@okta/okta-react';
import { PropTypes } from 'prop-types';
import DynamicTable from '../DynamicTable/DynamicTable';
import CardList from '../CardList/CardList';
import SearchBox from '../SearchBox/SearchBox';
import * as SC from '../../constants/Style';
import { ShowWantedButton, DealsSearchWrapper } from './Deals.styles';
import { fetchDeals } from '../../redux/actions';

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

export const Deals = ({
  auth, isLoading, dispatch, deals,
}) => {
  const [showWantedOnly, setShowWantedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCol, setSortCol] = useState('added');
  const [sortDir, setSortDir] = useState('desc');
  const [displayDeals, setDisplayDeals] = useState([]);
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
    setDisplayDeals(deals);
    // filter for wanted
  }, [deals]);
  useEffect(() => {
    if (!isMounted) {
      return () => {};
    }
    dispatch(fetchDeals(searchTerm, sortCol, sortDir));
    /*
    const source = axios.CancelToken.source();
    api.get(`deals?search=${searchTerm}&sortdir=${sortDir}&sortby=${sortCol}`, {
      cancelToken: source.token,
    }).then((response) => {
      setDeals(response.data);
    });
    return () => {
      source.cancel('Cancelling axios request in Deals cleanup');
    }; */
    return () => {};
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
                loading={isLoading}
                data={displayDeals}
                sortChanged={sortChanged}
                showWantedOnly={showWantedOnly}
              />
            ) : (
              <DynamicTable
                data-test="component-dynamic-table"
                loading={isLoading}
                columns={columns}
                rows={displayDeals}
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
  isLoading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  deals: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  deals: state.deals.deals,
  isLoading: state.deals.isLoading,
});

export default connect(mapStateToProps)(withAuth(Deals));
