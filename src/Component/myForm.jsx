import React, {useState, useEffect} from 'react';
import loadGif from '../assets/timg.gif';
import mdui from 'mdui'
const {log} = console;

function btn() {
    return <button disabled></button>
}

function LoadingMask(props) {
    let className = 'loadingMask';
    if (props.isLoading){
        className = 'loadingMask Loading'
    }
    return (
        <figure className={className}>
            <img className='loadImg' src={loadGif} alt=""/>
        </figure>
    )
}

function SubBtn(props){
    if (!props.disabled){
        return <button className='mdui-btn mdui-btn-block mdui-ripple' disabled>请填写正确的信息</button>
    }
    return(
        <button className='mdui-btn mdui-btn-block mdui-ripple'>提交</button>
    )
}

const Inputs = (props)=>{
    return (
        props.list.map((item)=>{
            return (
                <li key={item.name} className="mdui-textfield mdui-textfield-floating-label mdui-ripple">
                    <label className={'mdui-textfield-label'}>{item.name}：</label>
                    <input className="mdui-textfield-input" type="text" datatype={item.type} pattern={item.regexp} required maxLength={item.maxNum} />
                    <div className="mdui-textfield-error">{item.info}</div>
                </li>
            )
        })
    )
};

const Form = props=>{
    const [allPass,setallPass] = useState(true);
    const list = [
        {type:'TeamName',info:'战队名4~10位，不包含空格',maxNum:10,name:'战队名称',regexp:'^[^ ].{3,10}$'},
        {type:'HMDJ',info:'请输入5~16位，数字字母组成的账号',maxNum:16,name:'皇马电竞账号',regexp:'^[\\d\\w]{5,16}$'},
        {type:'phone',info:'请输入11位完整手机号',maxNum:11,name:'手机号',regexp:'^1[3-9]\\d{9}$'},
        {type:'qqNum',info:'请输入5~10位的QQ号',maxNum:10,name:'QQ号',regexp:'^[1-9]\\d{4,9}$'},
    ];

    return (
        <section>
            <LoadingMask data={allPass}/>
            <form >
                <h1>皇马杯第二届报名</h1>
                <ul>
                    {<Inputs list={list} />}
                </ul>
                <SubBtn disabled={setallPass}/>
            </form>
        </section>
    )
};

export default Form;
