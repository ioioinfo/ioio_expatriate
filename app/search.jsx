var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    render() {
        return (
            <div className="wrap">
              <div className="list1">
                <p>临时任务：2</p>
              </div>
              <div className="list2">
                <p>已完成任务</p>
              </div>
            </div>
        );
    }
};

// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("content")
);
