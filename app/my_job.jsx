var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }
    componentDidMount(){
      $(".list1").css("font-size","18px");
      $(".list2").css("font-size","14px");
      $(".list3").css("font-size","14px");

      $(".list1").css("color","#6C87D6");
      $(".list2").css("color","#fff");
      $(".list3").css("color","#fff");
    }
    handleClick(e){
      $(".list1").css("font-size","18px");
      $(".list2").css("font-size","14px");
      $(".list3").css("font-size","14px");

      $(".list1").css("color","#6C87D6");
      $(".list2").css("color","#fff");
      $(".list3").css("color","#fff");

      var window_left = $(window).width();
      $(".today_task").css("left",window_left);
      $(".month_task").css("left",window_left);
      $(".linshi_task").css("left",window_left);
      $(".today_task").css("z-index","9");
      $(".linshi_task").css("z-index","99");
      $(".month_task").css("z-index","9");
      $(".linshi_task").animate({left:"0"},300);

    }
    handleClick1(e){
      $(".list1").css("font-size","14px");
      $(".list2").css("font-size","18px");
      $(".list3").css("font-size","14px");

      $(".list1").css("color","#fff");
      $(".list2").css("color","#6C87D6");
      $(".list3").css("color","#fff");

      var window_left = $(window).width();
      $(".linshi_task").css("left",window_left);
      $(".today_task").css("left",window_left);
      $(".month_task").css("left",window_left);
      $(".today_task").css("z-index","99");
      $(".linshi_task").css("z-index","9");
      $(".month_task").css("z-index","9");
      $(".today_task").animate({left:"0"},300);


    }
    handleClick2(e){
      $(".list1").css("font-size","14px");
      $(".list2").css("font-size","14px");
      $(".list3").css("font-size","18px");

      $(".list1").css("color","#fff");
      $(".list2").css("color","#fff");
      $(".list3").css("color","#6C87D6");


      var window_left = $(window).width();
      $(".linshi_task").css("left",window_left);
      $(".today_task").css("left",window_left);
      $(".month_task").css("left",window_left);
      $(".today_task").css("z-index","9");
      $(".linshi_task").css("z-index","9");
      $(".month_task").css("z-index","99");
      $(".month_task").animate({left:"0"},300);


    }
    render() {
        return (
            <div className="wrap">
              <div className="nav">
                <div className="list1" onClick={this.handleClick}> 临期任务</div>
                <div className="list2" onClick={this.handleClick1}>当天完成任务查看</div>
                <div className="list3" onClick={this.handleClick2}>本月完成任务查看</div>
              </div>

              <div className="linshi_task">
                <div className="linshi_task_list">
                  <p   className="play_time">计划完成时间：<span>2017/7/10</span></p>
                  <p>任务编号：1</p>
                  <p>地点：宝山，呼兰路911弄</p>
                  <p>队友：张三，李四，王五</p>
                  <p>联系客户：17621140956</p>
                  <p>任务描述：和某某去某地联系某客户安装充电桩</p>
                  <p>计划工作量：10 H</p>

                  <hr/>
                </div>

                <div className="background"></div>
              </div>


              <div className="today_task">
                <div className="today_task_list">
                <p>计划完成时间：2017/7/10</p>
                <p>任务编号：1</p>
                <p>地点：宝山，呼兰路911弄</p>
                <p>队友：张三，李四，王五</p>
                <p>联系客户：17621140956</p>
                <p>任务描述：和某某去某地联系某客户安装充电桩</p>
                <p>计划工作量：10 H</p>

                <hr/>
                </div>

                <div className="background"></div>
              </div>

              <div className="month_task">
                <div className="month_task_list">
                <p>计划完成时间：2017/7/10</p>
                <p>任务编号：1</p>
                <p>地点：宝山，呼兰路911弄</p>
                <p>队友：张三，李四，王五</p>
                <p>联系客户：17621140956</p>
                <p>任务描述：和某某去某地联系某客户安装充电桩</p>
                <p>计划工作量：10 H</p>

                <hr/>
                </div>

                <div className="background"></div>
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
