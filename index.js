const data = require('./data');

// nodejs中文件操作主要依靠fs模块
const fs = require('fs');

// 1. 定义两个工具函数
// 获取指定目录路径下的所有文件名
const getFileNames = (path) => {
    // 使用readdir获取指定目录下的所有文件名
    return fs.readdirSync(path);
};

// 根据指定字符截取文件名，返回截取后的字段
const getFileSuffix = (fileName, splitChar) => {
    // 取字符第一次出现的位置
    const first = fileName.indexOf(splitChar);
    // 取字符最后一次出现的位置（根据需要选择）
    // const first = fileName.lastIndexOf(splitChar);

    const namelength = fileName.length; //取到文件名长度
    return fileName.substring(first + 1, namelength); //截取获得后缀名
};

// 2. 定义目录
const dirName = `./pro`;
const tarName = `./res`;

// 3. 读取与改写
let files = getFileNames(dirName);

const getName = (str) => {
    // XS-3XL-11.png
    // 后缀
    const suff = str.split('.')[1];
    const originName = str.split('.')[0];
    // 前面的11
    const index = str.split('.')[0].split('-')[2];

    return { suff, index, originName };
};

let renameLen = 0;

files.forEach((item, i) => {
    const { suff, index, originName } = getName(item);

    const newStr = data[Number(index).toString()];
    const newName = (newStr ? newStr : originName) + '.' + suff;

    if (newStr) {
        renameLen += 1;
        // 使用rename方法进行重命名
        fs.rename(`${dirName}\\${item}`, `${dirName}\\${newName}`, (err) => {
            if (err) throw err;
            console.log(item + '重命名为===>' + newName);
        });
    }
});

const dataLen = Object.keys(data).length;
console.log(
    `pro共有文件${files.length}个,json数据${dataLen}个,还有${
        files.length - renameLen
    }文件未命名`
);
