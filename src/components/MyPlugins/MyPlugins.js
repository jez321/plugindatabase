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
            border-radius:4px;
            &:hover {
                background: #E2F3FF;
            }
            padding: 10px;
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
    @media (min-width: 980px) {
        display: inline-block;
    }
    li {
        box-shadow: #aaa 2px 2px 4px;
        background: #333;
        color: white;
        border-radius:4px;
        p {
            margin:0;
            padding:0;
        }
        font-size:24px;
        padding: 10px 15px;
        margin-bottom: 5px;
        .small-text {
            font-size:70%;
        }
        a {
            cursor: pointer;
            color: white;
            margin-right:15px;
	    &:hover {
	    	color: #ccc;
	    }
        }
        display: flex;
        justify-content: flex-start;
    }
`;

const MyPlugins = (props) => {
    // TODO: Save to db instead of localStorage
    const lsOwned = localStorage.getItem('pluginsOwned');
    const lsWanted = localStorage.getItem('pluginsWanted');
    const [plugins, setPlugins] = useState([]);
    const [pluginsOwned, setPluginsOwned] = useState(lsOwned ? JSON.parse(lsOwned) : {});
    const [pluginsWanted, setPluginsWanted] = useState(lsWanted ? JSON.parse(lsWanted) : {});
    const [searchTerm, setSearchTerm] = useState('');
    const [pluginListType, setPluginListType] = useState('all');
    const [loading, setLoading] = useState(true);
    const isTabletOrMobile = useMedia({ maxWidth: SC.MOBILE_MAX_WIDTH });
    function searchChanged(st) {
        setSearchTerm(st);
    }
    const togglePluginOwned = (p) => {
        const temp = { ...pluginsOwned };
        if (pluginsOwned[p.id_plugin]) {
            delete temp[p.id_plugin];
        } else {
            temp[p.id_plugin] = true;
        }
        localStorage.setItem('pluginsOwned', JSON.stringify(temp))
        setPluginsOwned(temp);
    }
    const togglePluginWanted = (p) => {
        const temp = { ...pluginsWanted };
        if (pluginsWanted[p.id_plugin]) {
            delete temp[p.id_plugin];
        } else {
            temp[p.id_plugin] = true;
        }
        localStorage.setItem('pluginsWanted', JSON.stringify(temp))
        setPluginsWanted(temp);
    }
    const isPluginOwned = (p) => {
        return pluginsOwned[p.id_plugin];
    }
    const isPluginWanted = (p) => {
        return pluginsWanted[p.id_plugin];
    }
    useEffect(() => {
        // get from api
        setLoading(true);
        api.get(`plugins?search=${searchTerm}&sortby=name&sortdr=asc`).then((response) => {
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
                            <a role="button" onClick={() => setPluginListType("all")} className={pluginListType === "all" ? "plugin-list-type-active" : ""}><FontAwesomeIcon icon={faCircle} /> All ({plugins.length})</a>
                        </li>
                        <li data-test="plugin-type-list-option">
                            <a role="button" onClick={() => setPluginListType("owned")} className={pluginListType === "owned" ? "plugin-list-type-active" : ""}><FontAwesomeIcon icon={faCheckCircle} /> Owned ({Object.keys(pluginsOwned).length})</a>
                        </li>
                        <li data-test="plugin-type-list-option">
                            <a role="button" onClick={() => setPluginListType("wanted")} className={pluginListType === "wanted" ? "plugin-list-type-active" : ""}><FontAwesomeIcon icon={faStar} /> Wanted ({Object.keys(pluginsWanted).length})</a>
                        </li>
                    </PluginListTypes>
                </div>
                <div style={{ flexGrow: 1, padding: "0" }}>
                    <section className="search-wrap">
                        <SearchBox changed={searchChanged} />
                    </section>
                    {loading ?
                        <div style={{ textAlign: "left", fontSize: "24px" }}>
                            <FontAwesomeIcon
                                icon={faSpinner} spin
                            />
                        </div>
                        :
                        <Fragment>
                            {plugins.length === 0 || (pluginListType === "owned" && Object.keys(pluginsOwned).length === 0) || (pluginListType === "wanted" && Object.keys(pluginsWanted).length === 0) ?
                                <div>
                                    No plugins
                                </div>
                                :
                                <PluginList>
                                    {plugins.map((p, i) => {
                                        if (pluginListType === "owned" && !pluginsOwned[p.id_plugin]) return;
                                        if (pluginListType === "wanted" && !pluginsWanted[p.id_plugin]) return;
                                        return (
                                            <li key={p.id_plugin}>
                                                <div style={{ textAlign: "right", fontSize: '32px', lineHeight: '48px', whiteSpace: "nowrap" }}>
                                                    <a title={isPluginOwned(p) ? "I don't own this!" : "I own this!"}><FontAwesomeIcon onClick={() => { togglePluginOwned(p) }} icon={isPluginOwned(p) ? faCheckCircle : regFaCheckCircle} /></a>
                                                    <a title={isPluginOwned(p) ? "I don't want this!" : "I want this!"}><FontAwesomeIcon onClick={() => { togglePluginWanted(p) }} icon={isPluginWanted(p) ? faStar : regFaStar} /></a>
                                                </div>
                                                <div>
                                                    <p className="small-text">{p.company} | {p.category}</p>
                                                    <p>{p.name}</p>
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
