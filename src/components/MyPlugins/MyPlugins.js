import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'

const PluginListTypes = styled.ul`
    list-style-type: none;
    margin:0;
    padding:0;
    li {
        a {
            display: block;
            background: #999;
            color: white;
            &:hover {
                background: #888;
            }
            padding: 10px 20px;
            text-decoration: none;
            &.plugin-list-type-active {
                background: #333;
            }

        }
        margin-bottom:2px;
    }
    .column {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      flex: 1;
    }
`;

const PluginList = styled.ul`
    list-style-type: none;
    margin:0;
    padding:0;
    li {
        a {
            display: block;
            background: #999;
            color: white;
            &:hover {
                background: #888;
            }
            padding: 10px 20px;
            text-decoration: none;
            &.plugin-list-type-active {
                background: #333;
            }

        }
        margin-bottom:2px;
    }
`;

const MyPlugins = (props) => {
    const [list, setList] = useState([]);
    const [pluginListType, setPluginListType] = useState("owned");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // get from api
        /*
        setLoading(true);
        api.get(`deals?search=${searchTerm}&sortdir=${sortDir}&sortby=${sortCol}`).then((response) => {
            setLoading(false);
            setDeals(response.data);
        });*/
        setList([pluginListType, pluginListType, pluginListType, pluginListType, pluginListType]);
    }, [pluginListType]);
    return (
        <Fragment>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap%", width: "100%" }}>
                <div>
                    <PluginListTypes>
                        <li>
                            <a href="#" onClick={() => setPluginListType("owned")} className={pluginListType === "owned" ? "plugin-list-type-active" : ""}>Owned (2)</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setPluginListType("wanted")} className={pluginListType === "wanted" ? "plugin-list-type-active" : ""}>Wanted (22)</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => setPluginListType("all")} className={pluginListType === "all" ? "plugin-list-type-active" : ""}>All (442)</a>
                        </li>
                    </PluginListTypes>
                </div>
                <div style={{ flexGrow: 1, padding: "0 20px" }}>
                    <PluginList>
                        {list.map(l => {
                            return <li>{l}</li>
                        })}
                    </PluginList>
                </div>
            </div>
        </Fragment>
    )
};

MyPlugins.propTypes = {
};

export default MyPlugins;
