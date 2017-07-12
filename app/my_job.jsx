var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.state={taskitem:[],m_worker:{}}
    }
    componentDidMount(){
      $.ajax({
          url: "/list_task",
          dataType: 'json',
          type: 'GET',
          data:{},
          success: function(data) {
              var list = data.rows;
              if(!list){

                  $(".no_task").css("display","block");
              }
                this.setState({taskitem:list,m_worker:data.m_worker});


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
                  <Task item={item} key={item.id} m_worker={this.state.m_worker} />))
              }
              <p className="no_task">抓紧新建任务吧！</p>
            </div>
        );
    }
};

class Task extends React.Component {
    render() {
        var workers = (<span></span>);
        if(this.props.item.workers){
          workers = (<span>{this.props.item.workers.map(item=> (
              <span key={item}>{this.props.m_worker[item]} /</span>))
          }</span>)
        }
        return (
          <div className="task_infor task_ul animation">
            <div className="weui-form-preview">
              <div className="weui-form-preview__hd">
                <div className="weui-form-preview__item">
                  <label className="weui-form-preview__label">{this.props.item.deadline}</label>
                  <em className="weui-form-preview__value animation">未完成</em>
                </div>
              </div>
            <div className="weui-form-preview__bd">
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
