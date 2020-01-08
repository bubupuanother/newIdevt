import React from 'react'
import Masonry from 'masonry-layout'
import InfiniteScroll from 'react-infinite-scroller'
import axios from 'axios'
import cs from 'classnames'
import './styles.less'
import { listDate } from "@/api/actions"
import { Spin } from 'antd' 

// columnWidth: 200,
// itemSelector: '.grid-item' // 要布局的网格元素
// gutter: 10 // 网格间水平方向边距，垂直方向边距使用css的margin-bottom设置
// percentPosition: true // 使用columnWidth对应元素的百分比尺寸
// stamp:'.grid-stamp' // 网格中的固定元素，不会因重新布局改变位置，移动元素填充到固定元素下方
// fitWidth: true // 设置网格容器宽度等于网格宽度，这样配合css的auto margin实现居中显示
// originLeft: true // 默认true网格左对齐，设为false变为右对齐
// originTop: true // 默认true网格对齐顶部，设为false对齐底部
// containerStyle: { position: 'relative' } // 设置容器样式
// transitionDuration: '0.8s' // 改变位置或变为显示后，重布局变换的持续时间，时间格式为css的时间格式
// stagger: '0.03s' // 重布局时网格并不是一起变换的，排在后面的网格比前一个延迟开始，该项设置延迟时间  
// resize:  false // 改变窗口大小将不会影响布局
// initLayout: true // 初始化布局，设未true可手动初试化布局

export default class extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      hasMore: true, // 是否开启下拉加载
      data: [], // 接受我每次的数据
      count: 0,
      limit:8,
    }
    // 拿第一次的数据
    this.loadMoreData()
  }

  advanceWidth = () => {
    // new Masonry(节点, 配置)
    new Masonry(document.querySelector('.pages-hoc'), {
      itemSelector: '.d', // 要布局的网格元素
      columnWidth: 200,  // 获取节点 可以自动计算每列的宽度
      fitWidth: true, // 设置网格容器宽度等于网格宽度
      gutter: 20,
    })
  }

  // 加载更多数据
  loadMoreData = (page = 1) => {
    // page 当前滚动到了第几页
    const { data, count } = this.state
    // 超过200条数据 不继续监听下拉事件
    
    let a = {
      token: localStorage.getItem("quan"),
      limit: this.state.limit,
      pages: 1
    }
    // page 是当前请求第几页数据
    // limit 每页我需要返回的数据条数
    listDate(a).then(res => {
        this.setState({
          data: res.result.list,
          count:  res.result.count,
          limit: this.state.limit+8
        }, () => {
          this.advanceWidth()
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { hasMore } = this.state

    return (
      <div className="box">
        <InfiniteScroll
          loader={<div className="loader" key={0}><Spin  />
          <span>Loading...</span></div>}
          initialLoad={false} // 不让它进入直接加载
          pageStart={1} // 设置初始化请求的页数
          loadMore={this.loadMoreData}  // 监听的ajax请求
          hasMore={true} // 是否继续监听滚动事件 true 监听 | false 不再监听
        >
          <div className="pages-hoc">
            {
              this.state.data.map((dt, key) => (
                <div
                  key={key}
                  className={cs('d', { d1: key % 2 === 0, d2: key % 2 !== 0 })}
                >
                  <p>{JSON.parse(dt.info).homeone}</p>
                  <img src={JSON.parse(dt.info).updatetime} alt=""/>
                </div>
              ))
            }
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}
