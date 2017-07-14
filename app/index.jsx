var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
  constructor(props) {
      super(props);
      this.handClick=this.handClick.bind(this);
      this.state={img:{}}
    }
    componentDidMount(){
      $.ajax({
          url: "/get_photo_by_worker",
          dataType: 'json',
          type: 'GET',
          data:{},
          success: function(data) {
            if(data.rows.length>0){
              this.setState({img:data.rows[0]});
            }

          }.bind(this),
              error: function(xhr, status, err) {
          }.bind(this)
      });
    }
    handClick(e){

    }
    render() {
        return (
            <div className="wrap">
              <div className="work">
                <div className="work_in">
                  <div className="worker_top">
                    <div className="worker_top_img work_news"><a href="performance"><p><img src="images/yeji.png" alt="" /></p></a></div>
                    <div className="worker_top_img work_photo"><p><img src="images/me.jpg" alt="" /></p></div>
                    <div className="worker_top_img work_infor"><a href="my_job"><p><img src="images/work.png" alt="" /><span className="news_num">99</span></p></a></div>

                  </div>
                  <p className="work_name">Seven Atom</p>
                  <div className="work_bottom">
                    <p><img src="images/jineng.png" alt="" /><span>工龄</span>: 4 年</p>
                    <p><img src="images/gonghao.png" alt="" /><span>工号</span>: 1234567</p>
                    <p><img src="images/caozuo.png" alt="" /><span>手机</span>: 17621140955</p>
                  </div>
                </div>
              </div>
              <div className="worker_photo">
                <img className="carm" src="images/carm1.png" alt="" onClick={this.handClick} />
                <img className="worker_photo_in" src={this.state.img.location} alt="" />
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
