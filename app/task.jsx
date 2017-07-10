var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.state={taskitem:[]};
    }
    componentDidMount(){
      $.ajax({
          url: "/get_by_id?id=1",
          dataType: 'json',
          type: 'GET',
          data:{},
          success: function(data) {
              this.setState({taskitem:data.rows});

          }.bind(this),
              error: function(xhr, status, err) {
          }.bind(this)
      });
    }
    render() {
      var style={display: "none"};
        return (
            <div className="wrap">
              {this.state.taskitem.map(item=> (
                  <Task item={item} key={item.id} />))
              }

              <div className="background"></div>
              <div className="weui-form-preview__ft newfile">
                  <span className="weui-form-preview__btn weui-form-preview__btn_primary" id="showNewfile">新 建</span>
              </div>
              <div className="">
                  <div className="weui-mask" id="iosMask" style={style}></div>
                  <div className="weui-actionsheet overflow_auto" id="file">
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">地址</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input" type="text"  placeholder="请输入安装地址" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">客户姓名</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input" type="text"  placeholder="请输入客户姓名" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">联系客户</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input" type="text"  placeholder="请输入客户手机号" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">计划工作时长</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input" type="text"  placeholder="请输入预计工作时长/h" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">预计完成时间</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input" type="datetime-local"  placeholder="" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__bd">
                              <textarea className="weui-textarea" placeholder="点击选择操作员" rows="3" id="showcaozuoyuan" readOnly></textarea>
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__bd">
                              <textarea className="weui-textarea" placeholder="任务描述" rows="3"></textarea>
                          </div>
                      </div>

                      <div className="weui-actionsheet__action">
                          <div className="weui-actionsheet__cell" id="closeNewfile">保存</div>
                      </div>
                  </div>
              </div>

              <Caozuoyuan/>
            </div>
        );
    }
};

class Task extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    render() {
        return (
            <ul className="task_infor task_ul">
              <li>
                <div className="weui-form-preview">
                  <div className="weui-form-preview__hd">
                      <div className="weui-form-preview__item">
                          <label className="weui-form-preview__label">{this.props.item.plan_date}</label>
                          <em className="weui-form-preview__value animation">{this.props.item.state}<span className="glyphicon glyphicon-pencil modify_left" aria-hidden="true"></span></em>
                      </div>
                  </div>
                  <div className="weui-form-preview__bd">
                      <div className="weui-form-preview__item">
                          <label className="weui-form-preview__label">地址</label>
                          <span className="weui-form-preview__value">{this.props.item.address}</span>
                      </div>
                      <div className="weui-form-preview__item">
                          <label className="weui-form-preview__label">客户电话</label>
                          <span className="weui-form-preview__value">{this.props.item.mobile}</span>
                      </div>
                      <div className="weui-form-preview__item">
                          <label className="weui-form-preview__label">客户姓名</label>
                          <span className="weui-form-preview__value">{this.props.item.link_name}</span>
                      </div>
                      <div className="weui-form-preview__item">
                          <label className="weui-form-preview__label">计划工作时间</label>
                          <span className="weui-form-preview__value">{this.props.item.deadline}</span>
                      </div>
                      <div className="weui-form-preview__item">
                          <label className="weui-form-preview__label">操作员</label>
                          <span className="weui-form-preview__value">{this.props.item.address}</span>
                      </div>

                      <div className="weui-form-preview__item">
                          <label className="weui-form-preview__label">任务描述</label>
                          <span className="weui-form-preview__value">{this.props.item.task_desc}</span>
                      </div>
                    </div>
                    <div className="weui-form-preview__ft">
                        <a className="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:">分配</a>
                    </div>
                  </div>
                <br/>
              </li>

          </ul>
        );
    }
};

// 选择操作员
class Caozuoyuan extends React.Component {
    constructor(props) {
        super(props);
        this.handClick=this.handClick.bind(this);
        this.state={status:"0"};
    }
    componentDidMount(){
    }
    handClick(e){
      var id = e.target.id;

      if(id=="caozuoyuan_name_1"){
        var caozuoyuan1 = $(".caozuoyuan_span1").html();
        var name1 = $.inArray(caozuoyuan1, nameArray);
        if(name1<0){
          nameArray.push(caozuoyuan1);
          console.log(nameArray);
          $("#showcaozuoyuan").html(nameArray);
        }else {
          nameArray.splice(name1,1);
          console.log(nameArray);
          $("#showcaozuoyuan").html(nameArray);
        }
      }else if (id=="caozuoyuan_name_2") {
        var caozuoyuan2 = $(".caozuoyuan_span2").html();
        var name2 = $.inArray(caozuoyuan2, nameArray);
        if(name2<0){
          nameArray.push(caozuoyuan2);
          console.log(nameArray);
          $("#showcaozuoyuan").html(nameArray);
        }else {
          nameArray.splice(name2,1);
          console.log(nameArray);
          $("#showcaozuoyuan").html(nameArray);
        }
      }else if (id=="caozuoyuan_name_3") {
        var caozuoyuan3 = $(".caozuoyuan_span3").html();
        var name3 = $.inArray(caozuoyuan3, nameArray);
        if(name3<0){
          nameArray.push(caozuoyuan3);
          console.log(nameArray);
        }else {
          nameArray.splice(name3,1);
          console.log(nameArray);
        }

      }
      $("#showcaozuoyuan").val(nameArray.join(" / "));
    }
    render() {
        var style={display: "none"};
        return (
          <div className="weui-skin_android" id="caozuoyuan" style={style}>
              <div className="weui-mask"></div>
              <div className="weui-actionsheet">
                  <div className="weui-actionsheet__menu">
                  <div className="weui-cells weui-cells_checkbox">
                      <label className="weui-cell weui-check__label">
                          <div className="weui-cell__hd">
                              <input type="checkbox" className="weui-check" name="checkbox1" />
                              <i className="weui-icon-checked vertical_align"   id="caozuoyuan_name_1" onClick={this.handClick}></i>
                          </div>
                          <div className="weui-cell__bd">
                              <p><span className="caozuoyuan_span1">张三</span> <span>挖土工</span> <span>5 级</span></p>
                              <p>待安装：3</p>
                          </div>
                      </label>

                      <label className="weui-cell weui-check__label">
                          <div className="weui-cell__hd">
                              <input type="checkbox" className="weui-check" name="checkbox1"/>
                              <i className="weui-icon-checked vertical_align"  id="caozuoyuan_name_2" onClick={this.handClick}></i>
                          </div>
                          <div className="weui-cell__bd">
                              <p><span  className="caozuoyuan_span2">李四</span> <span>平土工</span> <span>8 级</span></p>
                          </div>
                      </label>

                      <label className="weui-cell weui-check__label">
                          <div className="weui-cell__hd">
                              <input type="checkbox" className="weui-check" name="checkbox1"/>
                              <i className="weui-icon-checked vertical_align"  id="caozuoyuan_name_3" onClick={this.handClick}></i>
                          </div>
                          <div className="weui-cell__bd">
                              <p><span  className="caozuoyuan_span3">王五</span> <span>瓦工</span> <span>6 级</span></p>
                          </div>
                      </label>
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
