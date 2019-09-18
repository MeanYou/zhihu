import CryptoJS from 'crypto-js';  //引用AES源码js

// 获取url参数
export const getQueryString = (search: string, name: string) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};
// 获取浏览器版本信息
export const getBrowserVersions = () => {
    let u = navigator.userAgent;
    // let app = navigator.appVersion;
    return {         //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
    };
};
// base64编码解码
export const Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-",
    encodeUrlSafeStr: function (e: string) {
        let t = "";
        let n, r, i, s, o, u, a;
        let f = 0;
        e = this._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = ((n & 3) << 4) | (r >> 4);
            u = ((r & 15) << 2) | (i >> 6);
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decodeUrlSafeStr: function (e: string) {
        let t = "";
        let n, r, i;
        let s, o, u, a;
        let f = 0;
        e = e.replace('/[^A-Za-z0-9_-]/g', "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = (s << 2) | (o >> 4);
            r = ((o & 15) << 4) | (u >> 2);
            i = ((u & 3) << 6) | a;
            t = t + String.fromCharCode(n);
            if (u !== 64) {
                t = t + String.fromCharCode(r)
            }
            if (a !== 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = this._utf8_decode(t);
        return t
    },
    _utf8_encode: function (e: string) {
        e = e.replace(/rn/g, "n");
        let t = "";
        for (let n = 0; n < e.length; n++) {
            let r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode((r >> 6) | 192);
                t += String.fromCharCode((r & 63) | 128)
            } else {
                t += String.fromCharCode((r >> 12) | 224);
                t += String.fromCharCode(((r >> 6) & 63) | 128);
                t += String.fromCharCode((r & 63) | 128)
            }
        }
        return t
    },
    _utf8_decode: function (e: string) {
        let t = "";
        let n = 0;
        let r = 0;
        // let c1 = 0;
        let c2 = 0;
        let c3 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((((r & 31) << 6) | c2) & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((((((r & 15) << 12) | (c2 & 63)) << 6) | c3) & 63);
                n += 3
            }
        }
        return this._trimUnkonwn(t);
    },
    _trimUnkonwn: function (str: string): string {
        if (str.endsWith('}') || str.endsWith(']')) {
            return str;
        } else {
            return this._trimUnkonwn(str.substr(0, str.length - 1));
        }
    }
};
// 根据图片地址获取base64编码
export const getImgBase64 = (url: string, outputFormat: string) => {
    let canvas: HTMLCanvasElement | null = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    return new Promise(function (resolve, reject) {
        img.src = url;
        img.onload = function () {
            (canvas as HTMLCanvasElement).height = img.height;
            (canvas as HTMLCanvasElement).width = img.width;
            ctx.drawImage(img, 0, 0);
            let dataURL = (canvas as HTMLCanvasElement).toDataURL(outputFormat || 'image/png');
            // Clean up
            canvas = null;
            resolve(dataURL);
        };
        img.onerror = function () {
            reject('Failed to convert img to base64');
        };
    });
};
// 加密解密
export const crypto = {
    key: 'hzdftxrjjsyxgsnb',
    iv: '0123456789ABCDEF',
    decrypt: function (word: string) {
        const key = CryptoJS.enc.Utf8.parse(this.key);
        const iv = CryptoJS.enc.Utf8.parse(this.iv);
        const decrypt = CryptoJS.AES.decrypt(word, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypt.toString(CryptoJS.enc.Utf8).toString();
    },
    encrypt: function (word: string) {
        const key = CryptoJS.enc.Utf8.parse(this.key);
        const iv = CryptoJS.enc.Utf8.parse(this.iv);
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
};
// 字符串转字节数组
export const stringToByte = (str: string) => {
    let bytes = [];
    let len, c;
    len = str.length;
    for (let i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return bytes;
};
export const byteToString = (arr: any[]) => {
    if (typeof arr === 'string') {
        return arr;
    }
    let str = '',
        _arr = arr;
    for (let i = 0; i < _arr.length; i++) {
        let one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if (v && one.length === 8) {
            let bytesLength = v[0].length;
            let store = _arr[i].toString(2).slice(7 - bytesLength);
            for (let st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
        } else {
            str += String.fromCharCode(_arr[i]);
        }
    }
    return str;
}
// 组合classnames
export const classNames = (...args: any) => {
    const hasOwn = {}.hasOwnProperty;
    const classes = [];

    for (var i = 0; i < args.length; i++) {
        let arg = args[i];
        if (!arg) continue;

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg) && arg.length) {
            var inner = classNames.apply(null, arg);
            if (inner) {
                classes.push(inner);
            }
        } else if (argType === 'object') {
            for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(' ');
};
// 通用格式化数字方法
export const formatNumber = (number: number) => {
    if (number < 1000) {
        return number;
    } else if (number < 10000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return (number / 1000).toFixed(0) + 'K';
    }
}
// 防抖和节流
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number, immediate: boolean = false) => {
    let timeout: NodeJS.Timeout | null;
    return function (this: any) {
        let context: any = this;
        let args = arguments;
        const later = function () {
            timeout = null;
            !immediate && func.apply(context, args);
        }
        let callNow = immediate && !timeout;
        timeout && clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        callNow && func.apply(context, args);
    };
};
export const throttling = <T extends (...args: any[]) => any>(func: T, wait: number, mustRun: number) => {
    let timeout: NodeJS.Timeout | null;
    let startTime = new Date().getTime();
    return function(this:any) {
        let context = this;
        let args = arguments;
        let curTime = new Date().getTime();

        timeout && clearTimeout(timeout);
        if (curTime - startTime >= mustRun) {
            func.apply(context, args);
            startTime = curTime;
        } else {
            timeout = setTimeout(func, wait);
        }
    };
};