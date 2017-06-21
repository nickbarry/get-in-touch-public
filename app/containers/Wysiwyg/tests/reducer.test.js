import expect from 'expect';
import wysiwygReducer from '../reducer';
import { fromJS } from 'immutable';

describe('wysiwygReducer', () => {
  it('returns the initial state', () => {
    expect(wysiwygReducer(undefined, {})).toEqual(fromJS({}));
  });
});
