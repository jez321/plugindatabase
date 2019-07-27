import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { useState, useEffect, Fragment } from 'react';
import { useMedia } from 'use-media';
import DynamicTable from '../DynamicTable/DynamicTable';
import CardList from '../CardList/CardList';
import SearchBox from '../SearchBox/SearchBox';
import api from '../../api/api';
import * as SC from '../../constants/Style';

const columns = [
    { title: 'Plugin', key: 'name' },
    { title: 'Company', key: 'company' },
    { title: 'Category', key: 'category' },
    { title: 'Price', key: 'price', type: 'price' },
    { title: 'Description', key: 'description' },
    { title: 'Start', key: 'start_date', type: 'date' },
    { title: 'End', key: 'end_date', type: 'date' },
    { title: 'Link', key: 'link', type: 'link' },
];

const Deals = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCol, setSortCol] = useState('added');
    const [authenticated, setAuthenticated] = useState('authenticated');
    const [sortDir, setSortDir] = useState('desc');
    const [deals, setDeals] = useState([]);
    const isTabletOrMobile = useMedia({ maxWidth: SC.MOBILE_MAX_WIDTH });
    function searchChanged(st) {
        setSearchTerm(st);
    }
    function sortChanged(newSortCol, newSortDir) {
        setSortCol(newSortCol);
        setSortDir(newSortDir);
    }
    useEffect(() => {
        api.get(`deals?search=${searchTerm}&sortdir=${sortDir}&sortby=${sortCol}`).then((response) => {
            setDeals(response.data);
        });
    }, [searchTerm, sortDir, sortCol, isTabletOrMobile]);
    return (
        <Fragment>
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
        </Fragment>
    )
};

Deals.propTypes = {
};

export default Deals;
