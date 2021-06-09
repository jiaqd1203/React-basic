import React,{Component} from 'react';
// 4.2我们脚手架工具里自带了这个包，所以可以直接引用，这个用来校验父元素传来的属性是不是正确的
import PropTypes from 'prop-types';
class TodoItem extends Component{
    constructor(props){
        super(props);
        // 这就相当于我们把本应该下面的<div onClick={this.handleClick.bind(this)}>
        // 放到了这里来做，这个bindthis永远指向了todoItem（3.5.17分钟，不太懂，20分也不太懂）
        this.handleClick = this.handleClick.bind(this);
    }
    render(){
        // 3.5.2此时我希望点击list内容就删除掉这一项，给子组件绑定一个handleClick方法
        // 页面上每一项是通过list数组渲染出来的，子组件如何调用父组件方法来修改父组件内容？
        // 不允许子组件直接修改父组件，实际上子组件就是想调用父组件的handleItemDelete(index)方法
        // 把对应的子组建的数据删除掉，那么只要我们把父组件这个方法传给子组件就可以了
        // 父元素已经通过deleteItem这个属性把自己的方法传给了子组件，子组件在handleClick里
		// 用this.props.deleteItem(this.props.index)调用就可以了,这句代码的意思是
        // 当子组件被点击时，调用父组件传过来的deleteItem方法，同时把父组件传递来的index以参数的形式传给这个方法
        // 父组件传递过来的内容子组件都是通过props来接收的
        // 4.2我给加一个test
        // 4.2content是字符串，deleteItem函数，index数字类型
        // 4.2这里面的test和下面出现的两次test可以先忽略
        const {content} = this.props;
        return (
        // onClick={this.handleClick}如果这么写this对应的值会是undefined，我们可以用bind(this)
        // 但其实并不推荐，因为功能可以但是性能有损耗，我们这样写：加上一个constructor
        // 点击的时候执行handleClick方法
        <div onClick={this.handleClick}>
        {/* {this.props.content}（用来接收父组件的方式） 可以等价替换给const {content} = this.props;
        {content}这两行*/}
        {content}
        </div>)
    }
    handleClick(){
        // 子组件被点击的时候调用父组件的deleteItem这个方法
        // 调用父组件传来的方法的时候要记住给父组件this指向做一次bind绑定
        // 同时把父组件传递过来的index以参数形式传给这个方法
        const {deleteItem,index} = this.props;
        deleteItem(index);
        // 同理这个this.props.deleteItem(this.props.index)也可以改成上面的形式
    }
}
// 对它的类型Types做校验Props，对content做校验，我们要求他的类型是字符串
// 第二个必须函数，第三个必须number
// 注意外面的prop是小写而里面的是大写
// 后面还可以加isRequired代表必须像子组件传递
// 我的TodoItem要求父组件传递一个test给子组件类型string而且还是必填
// 假设我没传这个组件的时候，我给他一个默认值，也就是下面的defaultProps方法
// 这个时候即使父组件没给子组件传递也没关系了

TodoItem.propTypes = {
    // test: PropTypes.string.isRequired,
    content: PropTypes.string,
    deleteItem: PropTypes.func,
    index: PropTypes.number
}
// 4.2默认属性，如果父组件没有像子组件传递这个属性我可以自己定义这个属性
TodoItem.defaultProps = {
    test: 'hello world'
}


// 创建组件之后通过export把组件导出出去，这样外部才可以使用这个组件
export default TodoItem;