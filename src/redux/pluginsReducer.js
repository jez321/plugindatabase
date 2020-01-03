import {
  ADD_WANTED_PLUGIN, REMOVE_WANTED_PLUGIN, ADD_OWNED_PLUGIN, REMOVE_OWNED_PLUGIN,
} from './actionTypes';

const initialState = {
  wantedPlugins: [],
  ownedPlugins: [],
};

const pluginsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WANTED_PLUGIN:
      return {
        ...state,
        wantedPlugins: [
          ...state.wantedPlugins,
          action.pluginId,
        ],
      };
    case REMOVE_WANTED_PLUGIN:
      return {
        ...state,
        wantedPlugins: state.wantedPlugins.filter(pluginId => action.pluginId !== pluginId),
      };
    case ADD_OWNED_PLUGIN:
      return {
        ...state,
        ownedPlugins: [
          ...state.ownedPlugins,
          action.pluginId,
        ],
      };
    case REMOVE_OWNED_PLUGIN:
      return {
        ...state,
        ownedPlugins: state.ownedPlugins.filter(pluginId => action.pluginId !== pluginId),
      };
    default:
      return state;
  }
};

export default pluginsReducer;
