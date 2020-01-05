import reducer from './pluginsReducer';
import * as types from './actionTypes';

describe('plugins reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        wantedPlugins: [],
        ownedPlugins: [],
      },
    );
  });
  it('should handle ADD_OWNED_PLUGIN', () => {
    expect(
      reducer(undefined, {
        type: types.ADD_OWNED_PLUGIN,
        pluginId: 2,
      }),
    ).toEqual(
      {
        wantedPlugins: [],
        ownedPlugins: [2],
      },
    );
  });
  it('should handle ADD_WANTED_PLUGIN', () => {
    expect(
      reducer(undefined, {
        type: types.ADD_WANTED_PLUGIN,
        pluginId: 2,
      }),
    ).toEqual(
      {
        wantedPlugins: [2],
        ownedPlugins: [],
      },
    );
  });
  it('should handle REMOVE_WANTED_PLUGIN', () => {
    expect(
      reducer({
        wantedPlugins: [2],
        ownedPlugins: [],
      }, {
        type: types.REMOVE_WANTED_PLUGIN,
        pluginId: 2,
      }),
    ).toEqual(
      {
        wantedPlugins: [],
        ownedPlugins: [],
      },
    );
  });
  it('should handle REMOVE_OWNED_PLUGIN', () => {
    expect(
      reducer({
        wantedPlugins: [],
        ownedPlugins: [2],
      }, {
        type: types.REMOVE_OWNED_PLUGIN,
        pluginId: 2,
      }),
    ).toEqual(
      {
        wantedPlugins: [],
        ownedPlugins: [],
      },
    );
  });
});
