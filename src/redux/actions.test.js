
import * as types from './actionTypes';
import * as actions from './actions';

describe('actions', () => {
  it('should create an action to add a wanted plugin', () => {
    const pluginId = 1;
    const expectedAction = {
      type: types.ADD_WANTED_PLUGIN,
      pluginId,
    };
    expect(actions.addWantedPlugin(pluginId)).toEqual(expectedAction);
  });
  it('should create an action to add an owned plugin', () => {
    const pluginId = 1;
    const expectedAction = {
      type: types.ADD_OWNED_PLUGIN,
      pluginId,
    };
    expect(actions.addOwnedPlugin(pluginId)).toEqual(expectedAction);
  });
  it('should create an action to remove a wanted plugin', () => {
    const pluginId = 1;
    const expectedAction = {
      type: types.REMOVE_WANTED_PLUGIN,
      pluginId,
    };
    expect(actions.removeWantedPlugin(pluginId)).toEqual(expectedAction);
  });
  it('should create an action to remove an owned plugin', () => {
    const pluginId = 1;
    const expectedAction = {
      type: types.REMOVE_OWNED_PLUGIN,
      pluginId,
    };
    expect(actions.removeOwnedPlugin(pluginId)).toEqual(expectedAction);
  });
});
