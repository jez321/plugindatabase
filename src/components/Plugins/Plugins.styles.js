
import styled from 'styled-components';

export const PluginsWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap%;
    width: 100%; 
    @media (max-width: 979px) {
        flex-direction: column;
    }
`;

export const PluginListTypes = styled.ul`
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
export const PluginList = styled.ul`
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
