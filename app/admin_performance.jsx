var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.state={taskitem:[]}
    }
    componentDidMount(){
      $.ajax({
          url: "/complete_by_date",
          dataType: 'json',
          type: 'GET',
          data:{},
          success: function(data) {
              var list = data.rows;
              if(list.length==0){
                  $(".no_task").css("display","block");
              }
                this.setState({taskitem:list});
          }.bind(this),
              error: function(xhr, status, err) {
          }.bind(this)
      });

    }
    handleClick(e){;

    }
    render() {
        return (
            <div className="wrap">
              {this.state.taskitem.map((item,index)=> (
                  <Task item={item} key={item.id}/>))
              }
              <p className="no_task">还没有完成的任务</p>
            </div>
        );
    }
};

class Task extends React.Component {
    handleClick(e){;
      var id = $(e.target).data("role");
      var task_list = "task_list"+id;
      $("#"+task_list).slideToggle(100);
    }
    componentDidMount(){
      $(".task_hide").hide();
    }
    handleClick1(e){
      var id = e.target.id;
      $.ajax({
          url: "/list_picture_by_task",
          dataType: 'json',
          type: 'GET',
          data:{"id":id},
          success: function(data) {
              if(data.success){
                if (data.rows.length > 0) {
                  var urls = [];
                  for (var i = 0; i < data.rows.length; i++) {
                    urls.push(data.rows[i].location);
                  }
                  wx.previewImage({
                      current: urls[0],
                      urls: urls
                  });
                }else {
                  alert("没有图片");
                }
              }
          }.bind(this),
              error: function(xhr, status, err) {
          }.bind(this)
      });
    }
    render() {
        var workers = (<span></span>);
        if(this.props.item.workers){
          workers = (<span>{this.props.item.workers.map(item=> (
              <span key={item}>{item[item]} /</span>))
          }</span>)
        }
        return (
          <div className="task_infor task_ul animation">
            <div className="weui-form-preview">
              <div className="weui-form-preview__hd" data-role={this.props.item.id} onClick={this.handleClick}>
                <div className="weui-form-preview__item" data-role={this.props.item.id} >
                  <label className="weui-form-preview__label" data-role={this.props.item.id} >{this.props.item.deadline}</label>
                  <em className="weui-form-preview__value animation" data-role={this.props.item.id} >{this.props.item.link_name}</em>
                </div>
              </div>
            <div className="weui-form-preview__bd task_hide" id={"task_list"+this.props.item.id}>
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">地址</label>
                <span className="weui-form-preview__value">{this.props.item.address}</span>
              </div>
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">联系电话</label>
                <span className="weui-form-preview__value">{this.props.item.mobile}</span>
              </div>
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">联系姓名</label>
                <span className="weui-form-preview__value">{this.props.item.link_name}</span>
              </div>
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">计划工作时间</label>
                <span className="weui-form-preview__value">{this.props.item.working_hours}小时</span>
              </div>
              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">操作员</label>
                <span className="weui-form-preview__value" >
                {workers}
                </span>
              </div>

              <div className="weui-form-preview__item">
                <label className="weui-form-preview__label">任务描述</label>
                <span className="weui-form-preview__value">{this.props.item.task_desc}</span>
              </div>
              <span className="weui-btn weui-btn_plain-default" id={this.props.item.id} onClick={this.handleClick1}>查看图片</span>
            </div>
          </div>
          <br/>
        </div>
        );
    }
};

// 返回到页面
ReactDOM.render(
    <Wrap/>,
    document.getElementById("content")
);
