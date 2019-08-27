import mock from 'mockjs';

export default function() {
    mock.mock(/\/auth\/verify*/, 'get', (option:any) => {
        console.log(option);
        return {
            code: mock.Random.natural(100000, 999999)
        }
    });
    mock.mock('/auth/login/verify', 'post', (option:any) => {
        const params = JSON.parse(option.body);
        if(params.tel === '15566666666') {
            return {
                status: 1,
                message: '登录成功',
                data: {
                    username: 'MeanYou',
                    tel: '15566666666',
                    gender: 'male'
                }
            }
        } else {
            return {
                status: 0,
                message: '账号/验证码错误'
            }
        }
    });
    mock.mock('/auth/login/password', 'post', (option:any) => {
        const params = JSON.parse(option.body);
        if((params.username === 'MeanYou' || params.username === '15566666666') && (params.password === '12345678')) {
            return {
                status: 1,
                message: '登录成功',
                data: {
                    username: 'MeanYou',
                    tel: '15566666666',
                    gender: 'male'
                }
            }
        } else {
            return {
                status: 0,
                message: '账号/密码错误'
            }
        }
    });
}