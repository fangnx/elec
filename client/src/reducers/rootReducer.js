/**
 * rootReducer.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-07-14 17:04:57
 * @last-modified 2019-08-28 00:21:16
 */

import { combineReducers } from 'redux';
import songInfoReducer from './songInfoReducer';
import geniusInfoReducer from './geniusInfoReducer';

export const resetAppActionType = 'RESET_APP';

export default combineReducers({
  songInfo: songInfoReducer,
  geniusInfo: geniusInfoReducer
});
