var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    render() {
        return (
            <div className="wrap">
              <div className="list1"> 临期任务</div>
              <div className="list2">当天完成任务查看</div>
              <div className="list3">本月完成任务查看</div>
            </div>
        );
    }
};

// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("content")
);
