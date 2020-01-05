
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
        button {
            cursor: pointer;
            display: block;
            color: #333;
            border-radius: 0.25rem;
            &:hover {
                background: #E2F3FF;
            }
            padding: 0.625rem;
            text-decoration: none;
            &.plugin-list-type-active {
                background: #0868AE;
                color: white;
            }

        }
        margin-bottom: 0.25rem;
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
      margin-bottom: 0.625rem;
    }
    @media (min-width: 980px) {
      margin-right: 1.25rem;
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
        border-radius: 0.25rem;
        p {
            margin:0;
            padding:0;
        }
        font-size: 1.5rem;
        padding: 0.625rem 0.9375rem;
        margin-bottom: 0.3125rem;
        .small-text {
            font-size:70%;
        }
        button {
            cursor: pointer;
            color: white;
            margin-right: 0.9375rem;
        &:hover {
          color: #ccc;
        }
      }
      display: flex;
      justify-content: flex-start;
    }
`;
