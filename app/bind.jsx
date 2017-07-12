var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.state = {status:"0"};
  }
  handleClick(e){
      if(this.state.status=="0"){
        var username = $(".username").val();
        var password = $(".password").val()
        if(!username||!password){
            var $loadingToast1 = $('#loadingToast1');
            if ($loadingToast1.css('display') != 'none') return;

            $loadingToast1.fadeIn(100);
            setTimeout(function () {
                $loadingToast1.fadeOut(100);
            }, 2000);
            return;
        }
        $.ajax({
            url: "/employer_check",
            dataType: 'json',
            type: 'POST',
            data: {"username":$(".username").val(),
                  "password":$(".password").val()},
            success: function(data) {
                if (data.success) {
                    var $toast = $('#toast');
                    if ($toast.css('display') != 'none') return;

                    $toast.fadeIn(100);
                    setTimeout(function () {
                        $toast.fadeOut(100);
                    }, 2000);
                    this.setState({"status":"1"});
                }else {
                    var $loadingToast = $('#loadingToast');
                    if ($loadingToast.css('display') != 'none') return;

                    $loadingToast.fadeIn(100);
                    setTimeout(function () {
                        $loadingToast.fadeOut(100);
                    }, 2000);
                }

            }.bind(this),
            error: function(xhr, status, err) {
            }.bind(this)
        });
      }else {
        var $warnToast = $('#warnToast');
        if ($warnToast.css('display') != 'none') return;

        $warnToast.fadeIn(100);
        setTimeout(function () {
            $warnToast.fadeOut(100);
        }, 2000);

      }

    }
    render() {
        var style = {display:"none"};
        return (
            <div className="wrap">
              <div className="bind_person">
                <p className="title">绑定帐号</p>
                <div className="weui-cell">
                    <div className="weui-cell__hd">
                      <label className="weui-label">工号</label>
                    </div>
                    <div className="weui-cell__bd">
                        <input className="weui-input username" type="text" placeholder="请输入工号"/>
                    </div>
                </div>

                <div className="weui-cell border_bottom">
                    <div className="weui-cell__hd">
                      <label className="weui-label">手机号</label>
                    </div>
                    <div className="weui-cell__bd">
                        <input className="weui-input password" type="text" placeholder="请输入手机号"/>
                    </div>
                </div>

                <p className="line"></p>

                <div className="weui-btn-area">
                    <span className="weui-btn weui-btn_primary"  id="showTooltips" onClick={this.handleClick}>确定</span>
                </div>

              </div>
              <div className="background"></div>

              <div className="page toast js_show">
                 <div id="toast" style={style} >
                    <div className="weui-mask_transparent"></div>
                    <div className="weui-toast">
                         <i className="weui-icon-success weui-icon_msg"></i>
                         <p className="weui-toast__content">绑定成功</p>
                    </div>
                  </div>
                  <div id="loadingToast" style={style}>
                    <div className="weui-mask_transparent"></div>
                    <div className="weui-toast">
                        <i className="weui-icon-warn weui-icon_msg"></i>
                        <p className="weui-toast__content">绑定失败</p>
                    </div>
                  </div>

                  <div id="warnToast" style={style}>
                    <div className="weui-mask_transparent"></div>
                    <div className="weui-toast">
                        <i className="weui-icon-info weui-icon_msg"></i>
                        <p className="weui-toast__content">已绑定</p>
                    </div>
                  </div>
              </div>

              <div id="loadingToast1" style={style}>
                <div className="weui-mask_transparent"></div>
                <div className="weui-toast">
                    <i className="weui-icon-warn weui-icon_msg"></i>
                    <p className="weui-toast__content">用户名、密码必填</p>
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
