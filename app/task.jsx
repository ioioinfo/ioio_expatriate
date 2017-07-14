var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.handClick=this.handClick.bind(this);
        this.handClick1=this.handClick1.bind(this);
        this.handClick2=this.handClick2.bind(this);
        this.handClick3=this.handClick3.bind(this);
        this.handClick4=this.handClick4.bind(this);
        this.handClick5=this.handClick5.bind(this);
        this.rowData=this.rowData.bind(this);
        this.modifyGet=this.modifyGet.bind(this);
        this.state={taskitem:[],worksitem:[],m_worker:{},workInfor:{}};
    }

    handClick4(e){
      var working_hours = $(".working_hours1").val();
      var deadline = $(".deadline1").val();
      var address = $(".address1").val();
      var link_name = $(".link_name1").val();
      var mobile = $(".mobile1").val();
      var task_desc = $(".task_desc1").val();
      $.ajax({
          url: "/save_task",
          dataType: 'json',
          type: 'POST',
          data: {"id":modifyId,"working_hours":working_hours,"deadline":deadline,
                 "address":address,"link_name":link_name,"mobile":mobile,
                 "task_desc":task_desc},
          success: function(data) {
              if (data.success) {
                this.rowData();
                $("#modify_alert").fadeOut(200);
              }else {
                  alert("保存失败！");

              }
          }.bind(this),
          error: function(xhr, status, err) {
          }.bind(this)
      });
    }

    handClick2(e){
      $("#modify_alert").fadeOut(200);
    }

    // 修改
    modifyGet(){
      $.ajax({
          url: "/get_by_id",
          dataType: 'json',
          type: 'GET',
          data:{"id":modifyId},
          success: function(data) {
              this.setState({workInfor:data.rows[0]});

          }.bind(this),
              error: function(xhr, status, err) {
          }.bind(this)
      });
    }

    // 保存新建
    handClick(){
      var working_hours = $(".working_hours").val();
      var deadline = $(".deadline").val();
      var address = $(".address").val();
      var link_name = $(".link_name").val();
      var mobile = $(".mobile").val();
      var task_desc = $(".task_desc").val();

      if (!address) {
        alert("请选择工作地址");
        return;
      }else if (!link_name) {
        alert("请填写联系人姓名");
        return;
      }else if (!mobile) {
        alert("请填写联系人手机");
        return;
      }else if (!deadline) {
        alert("请设置预计工作时长");
        return;
      }else if (!working_hours) {
        alert("请选择创建时间");
        return;
      }else if (!task_desc) {
        alert("请填写工作描述");
        return;
      }
      $.ajax({
          url: "/save_task",
          dataType: 'json',
          type: 'POST',
          data: {"working_hours":working_hours,"deadline":deadline,
                 "address":address,"link_name":link_name,"mobile":mobile,
                 "task_desc":task_desc},
          success: function(data) {
              if (data.success) {
                this.rowData();
              }else {
                  alert("新建失败！");

              }
          }.bind(this),
          error: function(xhr, status, err) {
          }.bind(this)
      });
    }

    // 任务列表
    rowData(){
      $.ajax({
          url: "/list_task",
          dataType: 'json',
          type: 'GET',
          data:{stage:"inprogress"},
          success: function(data) {
              var list = data.rows;
              if(list.length==0){
                  $(".no_task").css("display","block");
              }
                this.setState({taskitem:list,m_worker:data.m_worker});


          }.bind(this),
              error: function(xhr, status, err) {
          }.bind(this)
      });
    }
    componentDidMount(){
      $.ajax({
          url: "/list_worker_with_count",
          dataType: 'json',
          type: 'GET',
          data:{},
          success: function(data) {
              this.setState({worksitem:data.rows});
          }.bind(this),
              error: function(xhr, status, err) {
          }.bind(this)
      });

      this.rowData();
    }

    // 工人id
    handClick1(e){
    }
    // 分配功能
    handClick3(e){
      var nameId = [];
      $("[name=checkbox1]:checked").each(function(){
        nameId.push($(this).val());
      });

      if (nameId.length == 0) {
        alert("请选择工人");
        return;
      }

      $.ajax({
          url: "/assign_worker",
          dataType: 'json',
          type: 'POST',
          data: {"id":task_id,"workers":JSON.stringify(nameId)},
          success: function(data) {
              if (data.success) {
                var $caozuoyuan = $('#caozuoyuan');
                $caozuoyuan.fadeOut(200);
                this.rowData();
                alert("分配成功！");
              }else {
                  alert("分配失败！");

              }
          }.bind(this),
          error: function(xhr, status, err) {
          }.bind(this)
      });
    }

    handClick5(e){
      $("#caozuoyuan").fadeOut(200);
    }

    render() {
      var style={display: "none"};

      var working_hours1 = this.state.workInfor.working_hours;
      var deadline1 = this.state.workInfor.deadline;
      var address1 = this.state.workInfor.address;
      var link_name = this.state.workInfor.link_name;
      var mobile1 = this.state.workInfor.mobile;
      var task_desc1 = this.state.workInfor.task_desc;

      $(".working_hours1").val(working_hours1);
      $(".deadline1").val(deadline1);
      $(".address1").val(address1);
      $(".link_name1").val(link_name);
      $(".mobile1").val(mobile1);
      $(".task_desc1").val(task_desc1);

        return (
            <div className="wrap">
              {this.state.taskitem.map((item,index)=> (
                  <Task item={item} key={item.id} m_worker={this.state.m_worker}  index={index} rowData={this.rowData} modifyGet={this.modifyGet} />))
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
                          <div className="weui-cell__bd">
                              <textarea className="weui-textarea task_desc" placeholder="任务描述" rows="3"></textarea>
                          </div>
                      </div>

                      <div className="weui-actionsheet__action">
                          <div className="weui-actionsheet__cell" id="closeNewfile" onClick={this.handClick}>保存</div>
                      </div>
                  </div>
              </div>


              <div className="weui-skin_android" id="caozuoyuan" style={style}>
                  <div className="weui-mask" onClick={this.handClick2}></div>
                  <div className="weui-actionsheet">
                      <div className="weui-actionsheet__menu">
                      <div className="weui-cells weui-cells_checkbox">

                          {this.state.worksitem.map((item,index)=> (
                            <label className="weui-cell weui-check__label" key={item.id}>
                                <div className="weui-cell__hd">
                                    <input type="checkbox" className="weui-check" name="checkbox1" value={item.id} />
                                    <i className="weui-icon-checked vertical_align"></i>
                                </div>
                                <div className="weui-cell__bd">
                                    <p><span>{item.worker_name}</span><span className="span_left">任务量：{item.count}</span></p>
                                </div>
                            </label>))
                          }
                          <div className="weui-form-preview__ft workfile">
                              <button type="submit"  className="weui-form-preview__btn weui-form-preview__btn_default" onClick={this.handClick5}>取消</button>
                              <button type="submit" className="weui-form-preview__btn weui-form-preview__btn_primary showcaozuoyuan" onClick={this.handClick3}>确认</button>·
                          </div>
                      </div>
                      </div>
                  </div>
              </div>

              <div className="js_dialog" id="modify_alert" style={style}>
                  <div className="weui-mask"></div>
                  <div className="weui-dialog">
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">地址</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input address1" type="text"  placeholder="请输入安装地址" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">联系姓名</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input link_name1" type="text"  placeholder="请输入客户姓名" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">联系电话</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input mobile1" type="text"  placeholder="请输入客户手机号" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">计划工作时长</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input working_hours1" type="text"  placeholder="请输入预计工作时长/h" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">预计完成时间</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input form_datetime deadline1" type="text"  placeholder="" readOnly />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__bd">
                              <textarea className="weui-textarea task_desc1" placeholder="任务描述" rows="3"></textarea>
                          </div>
                      </div>

                      <div className="weui-form-preview__ft">
                            <button type="submit"  className="weui-form-preview__btn weui-form-preview__btn_default" onClick={this.handClick2}>取消</button>
                          <button type="submit" className="weui-form-preview__btn weui-form-preview__btn_primary showcaozuoyuan" onClick={this.handClick4}>确认</button>
                      </div>
                  </div>
              </div>

              <p className="no_task">暂时没有任务</p>
            </div>
        );
    }
};

class Task extends React.Component {
    constructor(props) {
      super(props);
      this.handClick=this.handClick.bind(this);
      this.handClick1=this.handClick1.bind(this);
      this.handClick2=this.handClick2.bind(this);
      this.state={}
    }
    handClick1(e){
      task_id = $(e.target).data("rose");
      var $caozuoyuan = $('#caozuoyuan');
      $caozuoyuan.fadeIn(200);
    }

    handClick2(e){
      modifyId = $(e.target).data("modify");
      this.props.modifyGet();
      $("#modify_alert").fadeIn(200);
    }
    // 删除任务
    handClick(e){
      var id = $(e.target).data("role");
      $.ajax({
          url: "/delete_by_id",
          dataType: 'json',
          type: 'POST',
          data: {"id":id},
          success: function(data) {
              if (data.success) {
                  this.props.rowData();
                  alert("删除成功！");

              }else {
                  alert("删除失败！");
              }
          }.bind(this),
          error: function(xhr, status, err) {
          }.bind(this)
      });

    }
    componentDidMount(){
    }
    render() {
        var workers = (<span></span>);
        if(this.props.item.workers){
          workers = (<span>{this.props.item.workers.map(item=> (
              <span key={item}>{this.props.m_worker[item]} /</span>))
          }</span>)
        }

        return (
            <div className="task_infor task_ul">
              <div className="weui-form-preview">
                <div className="weui-form-preview__hd">
                    <div className="weui-form-preview__item">
                        <label className="weui-form-preview__label">{this.props.item.deadline}</label>
                        <em className="weui-form-preview__value animation">{this.props.item.state}<span className="glyphicon glyphicon-pencil modify_left" aria-hidden="true" data-modify={this.props.item.id} onClick={this.handClick2}></span></em>
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

                  <div className="weui-form-preview__ft">
                      <button type="submit"  className="weui-form-preview__btn weui-form-preview__btn_default" data-role={this.props.item.id} onClick={this.handClick}>删除</button>
                      <button type="submit" className="weui-form-preview__btn weui-form-preview__btn_primary showcaozuoyuan" id={"showcaozuoyuan"+this.props.index} data-rose={this.props.item.id} onClick={this.handClick1}>分配</button>
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
