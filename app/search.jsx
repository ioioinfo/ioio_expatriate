var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
  constructor(props) {
      super(props);
      this.handClick=this.handClick.bind(this);
    }
    handClick(e){
      $(".animate").css("display","block");
      $(".animate").attr("id","animation ");
    };
    render() {
        var style={display: "none"};
        return (
            <div className="wrap">

              <div className="task_search">
                <div className="weui-search-bar" id="searchBar">
                    <form className="weui-search-bar__form">
                        <div className="weui-search-bar__box">
                            <i className="weui-icon-search" onClick={this.handClick}></i>
                            <input type="search" className="weui-search-bar__input" id="searchInput" placeholder="搜索" required="" />
                            <span className="weui-icon-clear" id="searchClear"></span>
                        </div>
                    </form>
                </div>
              </div>


              <div className="animate">
                  <div className="weui-actionsheet1 overflow_auto" id="file">
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">地址</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input address" type="text"  placeholder="请输入安装地址" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">联系姓名</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input link_name" type="text"  placeholder="请输入客户姓名" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">联系电话</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input mobile" type="text"  placeholder="请输入客户手机号" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">计划工作时长</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input working_hours" type="text"  placeholder="请输入预计工作时长/h" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">预计完成时间</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input form_datetime deadline" type="text"  placeholder="" readOnly />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">选择操作员</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input" placeholder="点击选择操作员"  readOnly />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__bd">
                              <textarea className="weui-textarea task_desc" placeholder="任务描述" rows="3"></textarea>
                          </div>
                      </div>

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
