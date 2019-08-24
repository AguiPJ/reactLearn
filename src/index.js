import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
require('echarts/lib/chart/bar');
const echarts = require('echarts/lib/echarts');

const data = new Array(50).fill(1).map(item=>Math.floor(Math.random() * 1000));
const option =
    {
        title: {
            text: '感谢ECharts 提供的图像框架'
        },
        textStyle:{
            color: '#ddd',
        },

        legend: {
            data:[]
        },
        xAxis: {
            data
        },
        yAxis: {},
        series: [{
            name: '数量',
            type: 'bar',
            data
        }]
    };
// 初始化图表的配置项和数据

function chang(changeList, myChart) {
    // 传入变动历史 与算法对应的图表对象
    let setIndex = 0;
    // 计数器 每100毫秒更新一次
    const timeIN = setInterval(()=>{
        const list = changeList[setIndex];
        // 读取对应历史数据
        [option.xAxis.data, option.series[0].data] = [list, list];
        myChart.setOption(option);
        setIndex++;
        if (setIndex === changeList.length) {
            clearInterval(timeIN)
            // 展示完毕后清理定时器
        }
    }, 100);
}

function hill(arr) {
    const myChart = echarts.init(document.getElementById('main'), null, {renderer: 'svg'});
    let changeList = [];
    for(let gap = Math.floor(arr.length / 2); gap > 0; gap =Math.floor(gap / 2)){
        // log('间隙(gap) :' + gap)
        for(let i = gap; i <arr.length; i++){
            // i是右侧元素的下标
            for(let j = i - gap; j >= 0; j -= gap){
                // i减去间隙(gap) 得到左侧元素下标（j）
                if(arr[j] > arr[j + gap]){
                    [arr[j], arr[j + gap]] = [arr[j + gap], arr[j]];
                    changeList.push(arr.slice())
                }
            }
        }
    }
    chang(changeList, myChart)
}

function bubble(arr) {
    const myChart2 = echarts.init(document.getElementById('main2'), null, {renderer: 'svg'});
    let changeList = [];
    for(let index = arr.length; index > 0; index--){
        for(let i = 0;i < index; i++) {
            if (arr[i] > arr[i + 1]){
                [arr[i], arr[i + 1]] = [arr[i+1], arr[i]];
                // 冒泡排序  太简单 😀 就不注释了
                changeList.push(arr.slice());
            }
        }
    }
    chang(changeList, myChart2)
}


const App = ()=>{
    const longStr = `import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
const {log} = console;
document.body.style.background = '#333';
pre.style.color = '#fff';
container.style.border = '1px solid #fff';
container.style.padding = '8px';
[...document.querySelectorAll('.main')].map(item=>item...);
`;

    const [str, setStr] = useState('');
    let cont = 1;
    useEffect(()=>{
        // 这部分代码只是了解 react新加入的 hook特性 顺便装逼
        const pre = document.querySelector('pre');
        const len = str.length;
        const container = document.querySelector('.container');
        const limit = 30;
        if (len > limit)pre.style.fontSize = '12px';
        if (len > limit * 2)document.body.style.background = '#333';
        if (len > limit * 3)pre.style.color = '#fff';
        if (len > limit * 4)container.style.border = '1px solid #fff';
        if (len > limit * 5)container.style.padding = '8px';
        if (len > limit * 6)[...document.querySelectorAll('.main')].map(item=>item.style.border = '1px solid #ddd');
        container.scrollTop = container.scrollHeight;
    });
    const start = ()=>{
        return ()=>{
            document.querySelector('.btn').style.opacity = 0;
            const time = setInterval(()=>{
                let newStr = longStr.substring(0,cont);
                newStr += '|';
                setStr(newStr);
                cont++;
                if (cont >= longStr.length){
                    clearInterval(time);
                    hill(data.slice());
                    bubble(data.slice());
                }
            },10);
        }
    };
    return (
        <>
            <div  className='main' id="main"/>
            <div className='main' id="main2"/>
            <div className='container'>
                <pre className='text'>
                    {str}
                </pre>
            </div>
            <button
                className='btn'
                onClick={start()}
            >start</button>
        </>
    )
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
