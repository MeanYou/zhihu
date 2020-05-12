/** 
 * store
*/
export interface State {
    variable: string;
 }
 
 export const initialState: State = {
    variable: ''
 };
 
 /** 
  * action
 */
 // action constant
 const CHANGE_VARIABLE = 'CHANGE_VARIABLE';
 // action type
 export type Action = {
     type: 'CHANGE_VARIABLE',
     payload: string
 }
 // 状态action
 export const changeVariable = (variable: string) => ({
     type: CHANGE_VARIABLE,
     payload: variable
 })
 // 业务action
//  export const getVariableByApi = (param:string) => async (dispatch:any, getState:any) => {
//     // 也可以返回Promise
//     const res = await xhr.get('/api', {params: {param}});
//     dispatch(changeVariable(res.data));
//  }
 
 /** 
  * reducer
 */
 export const reducer = (state: State, action: Action) => {
     switch (action.type) {
         case CHANGE_VARIABLE:
             return {
                 ...state,
                 variable: action.payload
             };
         default:
             return state;
     }
 }