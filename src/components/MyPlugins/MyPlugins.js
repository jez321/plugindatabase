import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../api/api'
import { useMedia } from 'use-media';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheckCircle, faSpinner, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as regFaStar, faCheckCircle as regFaCheckCircle } from '@fortawesome/free-regular-svg-icons';
import SearchBox from '../SearchBox/SearchBox';
import * as SC from '../../constants/Style';

const MyPluginsWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap%;
    width: 100%; 
    @media (max-width: 979px) {
        flex-direction: column;
    }
`;

const PluginListTypes = styled.ul`
    list-style-type: none;
    margin:0;
    padding:0;
    li {
        a {
            cursor: pointer;
            display: block;
            color: #333;
            border-radius:5px;
            &:hover {
                background: #E2F3FF;
            }
            padding: 10px 20px;
            text-decoration: none;
            &.plugin-list-type-active {
                background: #0868AE;
                color: white;
            }

        }
        margin-bottom:4px;
    }
    .column {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      flex: 1;
    }
    @media (max-width: 979px) {
      li {
        float:left;
      }
      margin-bottom:10px;
    }
    @media (min-width: 980px) {
      margin-right:20px;
    }
`;
const PluginList = styled.ul`
    list-style-type: none;
    margin:0;
    padding:0;
    li {
        p {
            margin:0;
            padding:0;
        }
        font-size:24px;
        line-height:24px;
        padding: 15px 0;
        border-bottom: 1px solid #eee;
        .small-text {
            font-size:70%;
        }
        a {
            cursor: pointer;
            color: #333;
        }
        display: flex;
        justify-content: space-between;
    }
`;

const MyPlugins = (props) => {
    const [plugins, setPlugins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pluginListType, setPluginListType] = useState('owned');
    const [loading, setLoading] = useState(true);
    const isTabletOrMobile = useMedia({ maxWidth: SC.MOBILE_MAX_WIDTH });
    function searchChanged(st) {
        setSearchTerm(st);
    }
    useEffect(() => {
        // get from api
        setLoading(true);
        api.get(`plugins?search=${searchTerm}`).then((response) => {
            setLoading(false);
            setPlugins(response.data);
        });
    }, [pluginListType, searchTerm]);
    return (
        <Fragment>
            <MyPluginsWrap>
                <div>
                    <PluginListTypes className="clearfix" data-test="plugin-type-list">
                        <li data-test="plugin-type-list-option">
                            <a role="button" onClick={() => setPluginListType("owned")} className={pluginListType === "owned" ? "plugin-list-type-active" : ""}><FontAwesomeIcon icon={faCheckCircle} /> Owned (25)</a>
                        </li>
                        <li data-test="plugin-type-list-option">
                            <a role="button" onClick={() => setPluginListType("wanted")} className={pluginListType === "wanted" ? "plugin-list-type-active" : ""}><FontAwesomeIcon icon={faStar} /> Wanted (11)</a>
                        </li>
                        <li data-test="plugin-type-list-option">
                            <a role="button" onClick={() => setPluginListType("all")} className={pluginListType === "all" ? "plugin-list-type-active" : ""}><FontAwesomeIcon icon={faCircle} /> All (231)</a>
                        </li>
                    </PluginListTypes>
                </div>
                <div style={{ flexGrow: 1, padding: "0" }}>
                    <section className="search-wrap">
                        <SearchBox changed={searchChanged} />
                    </section>
                    {loading ?
                        <div style={{ textAlign: "center", fontSize: "24px", marginTop: "25px" }}>
                            <FontAwesomeIcon
                                icon={faSpinner} spin
                            />
                        </div>
                        :
                        <Fragment>
                            {plugins.length === 0 ?
                                <div>
                                    No plugins
                                </div>
                                :
                                <PluginList>
                                    {plugins.map((p, i) => {
                                        return (
                                            <li key={p.id_plugin} style={i === 0 ? { paddingTop: 0 } : {}}>
                                                <div>
                                                    <p className="small-text">{p.company}</p>
                                                    <p>{p.name}</p>
                                                </div>
                                                <div style={{ textAlign: "right" }}>
                                                    <p className="small-text">{p.category}</p>
                                                    <p>
                                                        <a title="I own this!"><FontAwesomeIcon onClick={() => { }} icon={regFaCheckCircle} /></a>
                                                        &nbsp;&nbsp;
                                                        <a title="I want this!"><FontAwesomeIcon onClick={() => { }} icon={regFaStar} /></a>
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </PluginList>
                            }
                        </Fragment>
                    }
                </div>
            </MyPluginsWrap>
        </Fragment>
    )
};

MyPlugins.propTypes = {
};

export default MyPlugins;
