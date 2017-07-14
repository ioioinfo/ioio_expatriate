var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
  constructor(props) {
      super(props);
      this.onKeyPress=this.onKeyPress.bind(this);
      this.handClick=this.handClick.bind(this);
      this.getData=this.getData.bind(this);
      this.state={taskitem:[],workInfor:{"workers":[]},m_worker:{}};
    }

    // enter键
    onKeyPress(e){
      var val = $("#searchInput").val();
      var key = e.which;
      if (key == 13) {
        $.ajax({
            url: "/search_complete",
            dataType: 'json',
            type: 'GET',
            data:{q:val},
            success: function(data) {
                var list = data.rows;
                if(list.length==0){

                }
                $(".task_list").css("display","block");
                this.setState({taskitem:list});
                $("#searchInput").blur();
            }.bind(this),
                error: function(xhr, status, err) {
            }.bind(this)
        });

        $(".task_list").removeAttr("id");

      }
    }
    handClick(e){
      $("#searchInput").val("");
      $(".donghua").removeAttr("id");
    }

    handClick1(e){
      $(".task_list").attr("id","task_list_out");
      $(".task_list").css("display","none");
    }
    handClick2(e){
      $(".donghua").attr("id","task_list_out");
      $(".animate").css("display","none");
    }
    getData(id){
      $.ajax({
          url: "/get_by_id",
          dataType: 'json',
          type: 'GET',
          data:{"id":id},
          success: function(data) {
              this.setState({workInfor:data.rows[0],m_worker:data.m_worker});
              if(data.success){

                $(".donghua").attr("id","animation");
                $(".animate").css("display","block");
              }
          }.bind(this),
              error: function(xhr, status, err) {
          }.bind(this)
      });
    }
    render() {
        var style={display: "none"};
        return (
            <div className="wrap">

              <div className="task_search">
                <div className="weui-search-bar" id="searchBar">
                    <div className="weui-search-bar__form">
                        <div className="weui-search-bar__box">
                            <i className="weui-icon-search"></i>
                            <input type="search" className="weui-search-bar__input" id="searchInput" placeholder="搜索" required="" onKeyPress={this.onKeyPress} />
                            <span className="weui-icon-clear" id="searchClear" onClick={this.handClick}></span>
                        </div>
                    </div>
                </div>
              </div>


              <div className="animate">
                  <div className="weui-actionsheet1 overflow_auto donghua">
                      <div className="donghua_in">
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">地址</label></div>
                          <div className="weui-cell__bd">
                              <span className="weui-input address">{this.state.workInfor.address}</span>
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">联系姓名</label></div>
                          <div className="weui-cell__bd">
                              <span className="weui-input link_name">{this.state.workInfor.link_name}</span>
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">联系电话</label></div>
                          <div className="weui-cell__bd">
                              <span className="weui-input mobile">{this.state.workInfor.mobile}</span>
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">计划工作时长</label></div>
                          <div className="weui-cell__bd">
                              <span className="weui-input working_hours">{this.state.workInfor.working_hours}H</span>
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">完成时间</label></div>
                          <div className="weui-cell__bd">
                              <span className="weui-input form_datetime deadline">{this.state.workInfor.deadline}</span>
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">操作员</label></div>
                          <div className="weui-cell__bd">
                              <span className="weui-input">
                              {this.state.workInfor.workers.map((item,index)=> (
                                <span key={item}>{this.state.m_worker[item]}</span>
                                ))}
                              </span>
                          </div>
                      </div>

                      <div className="weui-cell">
                      <div className="weui-cell__hd"><label className="weui-label">工作描述</label></div>
                          <div className="weui-cell__bd">
                              <span className="weui-textarea task_desc">{this.state.workInfor.task_desc}</span>
                          </div>
                      </div>

                      </div>
                      <p className="animate_close" onClick={this.handClick2}>X</p>
                  </div>
              </div>


              <div className="task_list">
                  <ul className="task_list_title">
                    <li>姓名</li><li>手机</li><li>地址</li>
                  </ul>
                  <hr/>
                  {this.state.taskitem.map((item,index)=> (
                    <ul className="task_list_title" key={item.id} onClick={()=>this.getData(item.id)}>
                      <li>{item.link_name}</li><li>{item.mobile}</li><li>{item.address}</li>
                    </ul>))
                  }
                  <p className="task_list_close" onClick={this.handClick1}>X</p>
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
