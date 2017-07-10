var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    render() {
        return (
            <div className="wrap">
              <div className="bind_person">
                <p className="title">绑定管理员</p>
                <div className="weui-cell">
                    <div className="weui-cell__hd">
                      <label className="weui-label">用户名</label>
                    </div>
                    <div className="weui-cell__bd">
                        <input className="weui-input" type="number" placeholder="请输入用户名"/>
                    </div>
                </div>

                <div className="weui-cell border_bottom">
                    <div className="weui-cell__hd">
                      <label className="weui-label">密码</label>
                    </div>
                    <div className="weui-cell__bd">
                        <input className="weui-input" type="number" placeholder="请输入密码"/>
                    </div>
                </div>

                <p className="line"></p>

                <div className="weui-btn-area">
                    <span className="weui-btn weui-btn_primary"  id="showTooltips">确定</span>
                </div>

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
