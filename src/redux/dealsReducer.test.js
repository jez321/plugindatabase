import reducer from './dealsReducer';
import * as types from './actionTypes';

describe('deals reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        isLoading: true,
        deals: [],
      },
    );
  });
  it('should handle REQUEST_DEALS', () => {
    expect(
      reducer(undefined, {
        type: types.REQUEST_DEALS,
      }),
    ).toEqual(
      {
        isLoading: true,
        deals: [],
      },
    );
  });
  it('should handle RECEIVE_DEALS', () => {
    expect(
      reducer(undefined, {
        type: types.RECEIVE_DEALS,
        deals: [{ id_plugin: 3 }],
      }),
    ).toEqual(
      {
        isLoading: false,
        deals: [{ id_plugin: 3 }],
      },
    );
  });
});
