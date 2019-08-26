import mock from 'mockjs';

export default function() {
    mock.mock(/^auth\/verify*$/, 'get', (option:object) => {
        console.log(option);
        return {'code|100000-999999': 1};
    });
    mock.mock('/auth/login/verify', 'post', {
        status: 1,
        message: '登录成功'
    });
    mock.mock('/auth/login/password', 'post', {
        status: 1,
        message: '登录成功'
    });
}