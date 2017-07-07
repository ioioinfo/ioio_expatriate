var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    render() {
        return (
            <div className="wrap">
              <div className="list1">
                <p>时间：2017-7-7</p>
                <p>地点：宝山，呼兰路911弄</p>
                <p>人物：大王</p>
                <p>客户电话：17621140956</p>
              </div>
              <div className="list2"></div>
              <div className="list3"></div>
              <div className="list1"></div>
            </div>
        );
    }
};

// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("content")
);
