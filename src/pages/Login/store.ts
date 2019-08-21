// store
export interface State {
    loginType: 'vrf' | 'pwd';// 验证码登录，密码登录
}
export const initialState:State = {
    loginType: 'vrf'
}

// action
export interface Action {
    type: 'changeLoginType';
    payload: 'vrf' | 'pwd';
}

// reducer
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'changeLoginType':
            return {
                ...state,
                loginType: action.payload
            };
        default:
            return state;
    }
}

