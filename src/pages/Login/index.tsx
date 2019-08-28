import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Input, Button, Icon, message } from 'antd';
import {
    initialState, State, reducer, changeLoginType,
    changeTelNumber, changeVerifyCode, changeUsername, changePassword, changeVerifyType,
    loginByPwdAndGetTel, getVerifyCode,
    validateTelNumber, validateVerifyCode, validateLoginByVrf, changeTelNumberValid, changeVerifyCodeValid, loginVrf,
    verifyInterval,
    changeUsernameValid,
    validateUsername,
    changePasswordValid,
    validatePassword,
    validateLoginByPwd,
    loginPwd
} from './store';
import useThunkReducer from '@/hooks/useThunkReducer';
import './style.less';


const { useEffect, useCallback } = React;
const Login = (props: RouteComponentProps) => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const [state, dispatch] = useThunkReducer<State, any>(reducer, initialState);// thunk reducer
    const { loginType, telNumber, verifyCode, username, password, verifyType, canGetVerifyCode,
        verifySecondsLeft, telNumberValid, verifyCodeValid, usernameValid, passwordValid } = state;

    // 计算渲染时间
    // const startTime = new Date().getTime();
    // useEffect(() => {
    //     const endTime = new Date().getTime();
    //     console.log(endTime - startTime);
    // });

    // 离开组件注销interval
    useEffect(() => {
        return () => {
            if (verifyInterval) {
                clearInterval(verifyInterval);
            }
        };
    }, []);

    // // 验证码登录
    // const loginByVrf = () => {
    //     dispatch(changeLoginType('vrf'));
    // };
    // // 密码登录
    // const loginByPwd = () => {
    //     dispatch(changeLoginType('pwd'));
    // };
    // // 输入cb
    // const handleTelNumberChange = (e:React.FormEvent<HTMLInputElement>) => {
    //     dispatch(changeTelNumber(e.currentTarget.value));
    // }
    // const handleVerifyCodeChange = (e:React.FormEvent<HTMLInputElement>) => {
    //     dispatch(changeVerifyCode(e.currentTarget.value));
    // }
    // const handleUsernameChange = (e:React.FormEvent<HTMLInputElement>) => {
    //     dispatch(changeUsername(e.currentTarget.value));
    // }
    // const handlePasswordChange = (e:React.FormEvent<HTMLInputElement>) => {
    //     dispatch(changePassword(e.currentTarget.value));
    // }
    // 验证码登录
    const loginByVrf = useCallback(() => {
        dispatch(changeLoginType('vrf'));
    }, [dispatch]);
    // 密码登录
    const loginByPwd = useCallback(() => {
        // dispatch(changeLoginType('pwd'));
        dispatch(loginByPwdAndGetTel());
    }, [dispatch]);
    // 输入cb
    const handleTelNumberChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        dispatch(changeTelNumber(e.currentTarget.value));
    }, [dispatch]);
    const handleVerifyCodeChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        dispatch(changeVerifyCode(e.currentTarget.value));
    }, [dispatch]);
    const handleUsernameChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        dispatch(changeUsername(e.currentTarget.value));
    }, [dispatch]);
    const handlePasswordChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        dispatch(changePassword(e.currentTarget.value));
    }, [dispatch]);
    // 切换验证码类型，不适合使用useCallback，函数的目的就是更新verifyType，无法缓存
    const handleToggleVerifyType = () => {
        if (verifyType === 'message') {
            dispatch(changeVerifyType('voice'));
        } else {
            dispatch(changeVerifyType('message'));
        }
    };
    // 获取验证码
    const handleGetVerify = useCallback(() => {
        dispatch(getVerifyCode(telNumber));
    }, [dispatch, telNumber]);
    // 验证表单
    const handleValidateTelNumber = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (e.type === 'focus') {
            dispatch(changeTelNumberValid(true));
        } else if (e.type === 'blur') {
            dispatch(validateTelNumber(e.currentTarget.value));
        }
    }, [dispatch]);
    const handleValidateVerifyCode = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (e.type === 'focus') {
            dispatch(changeVerifyCodeValid(true));
        } else if (e.type === 'blur') {
            dispatch(validateVerifyCode(e.currentTarget.value));
        }
    }, [dispatch]);
    const handleValidateUsername = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (e.type === 'focus') {
            dispatch(changeUsernameValid(true));
        } else if (e.type === 'blur') {
            dispatch(validateUsername(e.currentTarget.value));
        }
    }, [dispatch]);
    const handleValidatePassword = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if (e.type === 'focus') {
            dispatch(changePasswordValid(true));
        } else if (e.type === 'blur') {
            dispatch(validatePassword(e.currentTarget.value));
        }
    }, [dispatch]);
    // 登录
    const handleLoginVrf = useCallback(() => {
        dispatch(validateLoginByVrf(telNumber, verifyCode)).then((valid: boolean) => {
            if (valid) {
                dispatch(loginVrf(telNumber, verifyCode)).then((data: any) => {
                    message.success(data.message);
                    props.history.push('/');
                }).catch((err: any) => {
                    message.error(err.message);
                });
            }
        });
    }, [props.history, dispatch, telNumber, verifyCode]);
    const handleLoginPwd = useCallback(() => {
        dispatch(validateLoginByPwd(username, password)).then((valid: boolean) => {
            if (valid) {
                dispatch(loginPwd(username, password)).then((data: any) => {
                    message.success(data.message);
                    props.history.push('/');
                }).catch((err:any) => {
                    message.error(err.message);
                });
            }
        });
    }, [dispatch, username, password, props.history]);

    return (
        <div className="login">
            <div className="login-content">
                <div className="login__logo">
                    <svg width="128" height="60" viewBox="0 0 200 91">
                        <title></title>
                        <g>
                            <path d="M53.29 80.035l7.32.002 2.41 8.24 13.128-8.24h15.477v-67.98H53.29v67.978zm7.79-60.598h22.756v53.22h-8.73l-8.718 5.473-1.587-5.46-3.72-.012v-53.22zM46.818 43.162h-16.35c.545-8.467.687-16.12.687-22.955h15.987s.615-7.05-2.68-6.97H16.807c1.09-4.1 2.46-8.332 4.1-12.708 0 0-7.523 0-10.085 6.74-1.06 2.78-4.128 13.48-9.592 24.41 1.84-.2 7.927-.37 11.512-6.94.66-1.84.785-2.08 1.605-4.54h9.02c0 3.28-.374 20.9-.526 22.95H6.51c-3.67 0-4.863 7.38-4.863 7.38H22.14C20.765 66.11 13.385 79.24 0 89.62c6.403 1.828 12.784-.29 15.937-3.094 0 0 7.182-6.53 11.12-21.64L43.92 85.18s2.473-8.402-.388-12.496c-2.37-2.788-8.768-10.33-11.496-13.064l-4.57 3.627c1.363-4.368 2.183-8.61 2.46-12.71H49.19s-.027-7.38-2.372-7.38zm128.752-.502c6.51-8.013 14.054-18.302 14.054-18.302s-5.827-4.625-8.556-1.27c-1.874 2.548-11.51 15.063-11.51 15.063l6.012 4.51zm-46.903-18.462c-2.814-2.577-8.096.667-8.096.667s12.35 17.2 12.85 17.953l6.08-4.29s-8.02-11.752-10.83-14.33zM199.99 46.5c-6.18 0-40.908.292-40.953.292v-31.56c1.503 0 3.882-.124 7.14-.376 12.773-.753 21.914-1.25 27.427-1.504 0 0 3.817-8.496-.185-10.45-.96-.37-7.24 1.43-7.24 1.43s-51.63 5.153-72.61 5.64c.5 2.756 2.38 5.336 4.93 6.11 4.16 1.087 7.09.53 15.36.277 7.76-.5 13.65-.76 17.66-.76v31.19h-41.71s.88 6.97 7.97 7.14h33.73v22.16c0 4.364-3.498 6.87-7.65 6.6-4.4.034-8.15-.36-13.027-.566.623 1.24 1.977 4.496 6.035 6.824 3.087 1.502 5.054 2.053 8.13 2.053 9.237 0 14.27-5.4 14.027-14.16V53.93h38.235c3.026 0 2.72-7.432 2.72-7.432z" fillRule="evenodd"></path>
                        </g>
                    </svg>
                    <div className="login__logo__subtitle">有问题，上知乎</div>
                </div>
                <div className="login__form">
                    <div>
                        <span
                            className={`login__form__type${loginType === 'vrf' ? ' login__form__type--active' : ''}`}
                            onClick={loginByVrf}>免密登录</span>
                        <span
                            className={`login__form__type${loginType === 'pwd' ? ' login__form__type--active' : ''}`}
                            onClick={loginByPwd}>密码登录</span>
                    </div>
                    {
                        loginType === 'vrf' ?
                            (
                                <div>
                                    <div className="login__form__input">
                                        <span className="login__form__input__country">中国 +86 &nbsp;&gt;</span>
                                        <Input
                                            value={telNumber}
                                            onChange={handleTelNumberChange}
                                            onBlur={handleValidateTelNumber}
                                            onFocus={handleValidateTelNumber}
                                            style={{ width: '70%' }}
                                            size="large"
                                            placeholder="请输入手机号" />
                                        {
                                            telNumberValid ? null :
                                                <span className="login__form__input__validation">手机号错误</span>
                                        }
                                    </div>
                                    <div className="login__form__input">
                                        <Input
                                            value={verifyCode}
                                            onChange={handleVerifyCodeChange}
                                            onBlur={handleValidateVerifyCode}
                                            onFocus={handleValidateVerifyCode}
                                            style={{ width: '60%' }}
                                            size="large"
                                            placeholder="请输入验证码" />
                                        {
                                            verifyCodeValid ? null :
                                                <span className="login__form__input__validation" style={{ right: 130 }}>验证码错误</span>
                                        }
                                        {
                                            canGetVerifyCode ?
                                                (<span className='login__form__input__verify' onClick={handleGetVerify}>
                                                    {verifyType === 'message' ? '获取短信验证码' : '获取语音验证码'}
                                                </span>) :
                                                (<span className='login__form__input__verify login__form__input__verify--disabled'>
                                                    {verifySecondsLeft}秒后重新发送
                                                </span>)
                                        }
                                    </div>
                                    <div className="login__form__vertype">
                                        <span onClick={handleToggleVerifyType}>{verifyType === 'message' ? '接收语音验证码' : '接收短信验证码'}</span>
                                    </div>
                                    <Button
                                        type="primary"
                                        block
                                        size="large"
                                        className="login__form__submit"
                                        onClick={handleLoginVrf}>登录/注册</Button>
                                </div>
                            ) : (
                                <div>
                                    <div className="login__form__input">
                                        <Input
                                            value={username}
                                            onChange={handleUsernameChange}
                                            onBlur={handleValidateUsername}
                                            onFocus={handleValidateUsername}
                                            size="large"
                                            placeholder="请输入用户名/手机号" />
                                        {
                                            usernameValid ? null :
                                                <span className="login__form__input__validation">用户名错误</span>
                                        }
                                    </div>
                                    <div className="login__form__input">
                                        <Input.Password
                                            value={password}
                                            onChange={handlePasswordChange}
                                            onBlur={handleValidatePassword}
                                            onFocus={handleValidatePassword}
                                            size="large"
                                            placeholder="请输入密码" />
                                        {
                                            passwordValid ? null :
                                                <span className="login__form__input__validation">密码错误</span>
                                        }
                                    </div>
                                    <div className="login__form__vertype">
                                        <span>忘记密码？</span>
                                    </div>
                                    <Button
                                        type="primary"
                                        block
                                        size="large"
                                        className="login__form__submit"
                                        onClick={handleLoginPwd}>登录/注册</Button>
                                </div>
                            )
                    }
                </div>
                <div className="login__warn">
                    <div>未注册手机验证后自动登录</div>
                    <div>
                        注册即代表同意
                        <a target="_blank" rel="noopener noreferrer" href="https://www.baidu.com">《知乎协议》</a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.baidu.com">《隐私保护指引》</a>
                    </div>
                </div>
                <div className="login__way">
                    <span className="login__way__left">社交账号登录</span>
                    <span className="login__way__item">
                        <Icon type="wechat" style={{ color: '#60c84d' }} />&nbsp;&nbsp;
                        <span>微信</span>
                    </span>
                    <span className="login__way__item">
                        <Icon type="qq" style={{ color: '#50c8fd' }} />&nbsp;&nbsp;
                        <span>QQ</span>
                    </span>
                    <span className="login__way__item">
                        <Icon type="weibo" style={{ color: '#fb6622' }} />&nbsp;&nbsp;
                        <span>微博</span>
                    </span>
                </div>
                <div className="login__download">
                    <Icon type="zhihu-square" theme="filled" style={{ fontSize: 18 }} />&nbsp;
                    <span>下载知乎APP</span>
                </div>
            </div>
            <div className="login-footer">
                <div className="copyright"></div>
            </div>
        </div>
    );
}

export default Login;