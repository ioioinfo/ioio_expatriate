var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    render() {
      var style={display: "none"};
        return (
            <div className="wrap">
              <Task/>
              <div className="background"></div>
              <div className="weui-form-preview__ft newfile">
                  <span className="weui-form-preview__btn weui-form-preview__btn_primary" id="showNewfile">新 建</span>
              </div>
              <div>
                  <div className="weui-mask" id="iosMask" style={style}></div>
                  <div className="weui-actionsheet" id="file">
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">地址</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input" type="text"  placeholder="请输入安装地址" />
                          </div>
                      </div>
                      <div className="weui-cell">
                          <div className="weui-cell__hd"><label className="weui-label">时间</label></div>
                          <div className="weui-cell__bd">
                              <input className="weui-input" type="datetime-local"  placeholder="" />
                          </div>
                      </div>

                      <div className="weui-cell">
                          <div className="weui-cell__bd">
                              <textarea className="weui-textarea" placeholder="点击选择操作员" rows="3" id="showcaozuoyuan"></textarea>
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
            <div className="task_infor">
              <div className="weui-form-preview">
                <div className="weui-form-preview__hd">
                    <div className="weui-form-preview__item">
                        <label className="weui-form-preview__label">2017/7/9</label>
                        <em className="weui-form-preview__value">任务已分配</em>
                    </div>
                </div>
                <div className="weui-form-preview__bd">
                    <div className="weui-form-preview__item">
                        <label className="weui-form-preview__label">地址</label>
                        <span className="weui-form-preview__value">上海宝山区呼兰路911弄11号博济智汇园3号101A</span>
                    </div>
                    <div className="weui-form-preview__item">
                        <label className="weui-form-preview__label">客户电话</label>
                        <span className="weui-form-preview__value">17621140955</span>
                    </div>
                    <div className="weui-form-preview__item">
                        <label className="weui-form-preview__label">客户姓名</label>
                        <span className="weui-form-preview__value">刘大华</span>
                    </div>
                    <div className="weui-form-preview__item">
                        <label className="weui-form-preview__label">计划工作时间</label>
                        <span className="weui-form-preview__value">10 h</span>
                    </div>
                    <div className="weui-form-preview__item">
                        <label className="weui-form-preview__label">操作员</label>
                        <span className="weui-form-preview__value">张三，李四，王二，瘪三</span>
                    </div>
                </div>
              </div>
            <br/>
            <div className="weui-form-preview">
              <div className="weui-form-preview__hd">
                  <div className="weui-form-preview__item">
                      <label className="weui-form-preview__label">2017/7/9</label>
                      <em className="weui-form-preview__value">任务已分配</em>
                  </div>
              </div>
              <div className="weui-form-preview__bd">
                  <div className="weui-form-preview__item">
                      <label className="weui-form-preview__label">地址</label>
                      <span className="weui-form-preview__value">上海宝山区呼兰路911弄11号博济智汇园3号101A</span>
                  </div>
                  <div className="weui-form-preview__item">
                      <label className="weui-form-preview__label">客户电话</label>
                      <span className="weui-form-preview__value">17621140955</span>
                  </div>
                  <div className="weui-form-preview__item">
                      <label className="weui-form-preview__label">客户姓名</label>
                      <span className="weui-form-preview__value">刘大华</span>
                  </div>
                  <div className="weui-form-preview__item">
                      <label className="weui-form-preview__label">计划工作时间</label>
                      <span className="weui-form-preview__value">10 h</span>
                  </div>
                  <div className="weui-form-preview__item">
                      <label className="weui-form-preview__label">操作员</label>
                      <span className="weui-form-preview__value">张三，李四，王二，瘪三</span>
                  </div>
              </div>
            </div>
          <br/>
          </div>
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
        var caozuoyuan = $("#caozuoyuan_name_1 .caozuoyuan_span").html();
        console.log(caozuoyuan)
        $("#showcaozuoyuan").val();
      }
    }
    render() {
        var style={display: "none"};
        return (
          <div className="weui-skin_android" id="caozuoyuan" style={style}>
              <div className="weui-mask"></div>
              <div className="weui-actionsheet">
                  <div className="weui-actionsheet__menu">
                  <div className="weui-cells weui-cells_checkbox">
                      <label className="weui-cell weui-check__label"  id="caozuoyuan_name_1" onClick={this.handClick}>
                          <div className="weui-cell__hd">
                              <input type="checkbox" className="weui-check" name="checkbox1" id="s11" />
                              <i className="weui-icon-checked vertical_align"></i>
                          </div>
                          <div className="weui-cell__bd">
                              <p><span className="caozuoyuan_span1">张三</span> <span>挖土工</span> <span>5 级</span></p>
                          </div>
                      </label>

                      <label className="weui-cell weui-check__label"  id="caozuoyuan_name_2" onClick={this.handClick}>
                          <div className="weui-cell__hd">
                              <input type="checkbox" className="weui-check" name="checkbox1" id="s12" />
                              <i className="weui-icon-checked vertical_align"></i>
                          </div>
                          <div className="weui-cell__bd">
                              <p><span>李四</span> <span>平土工</span> <span>8 级</span></p>
                          </div>
                      </label>

                      <label className="weui-cell weui-check__label"  id="caozuoyuan_name_3" onClick={this.handClick}>
                          <div className="weui-cell__hd">
                              <input type="checkbox" className="weui-check" name="checkbox1" id="s13" />
                              <i className="weui-icon-checked vertical_align"></i>
                          </div>
                          <div className="weui-cell__bd">
                              <p><span>王五</span> <span>瓦工</span> <span>6 级</span></p>
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
