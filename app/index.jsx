var React = require('react');
var ReactDOM = require('react-dom');


// 框架
class Wrap extends React.Component {
    render() {
        return (
            <div className="wrap">
              <div className="work">
                <div className="work_in">
                  <div className="worker_top">
                    <div className="worker_top_img work_news"><p><img src="images/news.png" alt="" /><span className="news_num">99</span></p></div>
                    <div className="worker_top_img work_photo"><p><img src="images/me.jpg" alt="" /></p></div>
                    <div className="worker_top_img work_infor"><p><img src="images/work.png" alt="" /></p></div>

                  </div>
                  <p className="work_name">Seven Atom</p>
                  <div className="work_bottom">
                    <p><img src="images/jineng.png" alt="" /><span>技能</span>: 挖坑</p>
                    <p><img src="images/shulian.png" alt="" /><span>熟练度</span>: 9 级</p>
                    <p><img src="images/gonghao.png" alt="" /><span>工号</span>: 1234567</p>
                    <p><img src="images/caozuo.png" alt="" /><span>操作说明</span>: 点我查看</p>
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
