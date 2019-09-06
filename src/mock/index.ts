import mock from 'mockjs';
import Cookies from 'js-cookie';
import { crypto } from '@/utils/CommonUtil';

export default function() {
    mock.mock(/\/api\/auth\/verify*/, 'get', (option:any) => {
        console.log(option);
        return {
            code: mock.Random.natural(100000, 999999)
        }
    });
    mock.mock('/api/auth/login/verify', 'post', (option:any) => {
        const params = JSON.parse(option.body);
        if(params.tel === '15566666666') {
            Cookies.set('token', crypto.encrypt('MeanYou 12345678'));
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
    mock.mock('/api/auth/login/password', 'post', (option:any) => {
        const params = JSON.parse(option.body);
        const userInfo = crypto.decrypt(params.token).split(' ');
        if((userInfo[0] === 'MeanYou' || userInfo[0] === '15566666666') && (userInfo[1] === '12345678')) {
            Cookies.set('token', params.token);
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