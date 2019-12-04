#@ state의 초기화를 props 에서 하게 될때, Component의 constructor나 getInitailState에서 하게되면, 해당 function은 객체 생성이나 state의 초기화에 처음 사용되기 때문에 props의 변경으로 인한 반영이 되지 않게 된다. 

ex)
```javascript
class SampleComponent extends Component {
  // constructor function (or getInitialState)
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
  }

  render() {
    return <div>{this.props.inputValue && <AnotherComponent/>}</div>
  }
}
```

#@ findDOMNode(string) 을 통한 접근은 legacy한 방식. querySelector의 dom traversing과 같은 방식의 비효율. 
객체 property binding을 통해 비효율을 없애자. 
ex)
```javascript
class Field extends Component {
  render() {
    return (
      <input type='text' ref={this.props.inputRef}/>
    )
  }
}

class MyComponent extends Component {
  componentDidMount() {
    this.inputNode.focus();
  }

  render() {
    return (
      <div>
        Hello,
        <Field inputRef={node => this.inputNode = node}/>
      </div>
    )
  }
}
```
#@ mixin보다 HOC(Higher Order Component)의 사용 - 이점. - 로직과 화면의 분리. 
// With HOC
```javascript
var bindToCarData = function (Component) {
  return React.createClass({
    componentDidMount: {
      // fetch car data and
      // call this.setState({carData: fetchedData}),
      // once data has been (asynchronously) fetched
    },

    render: function () {
      return <Component carData={ this.state.carData }/>
    }
  });
};

// Then wrap your component when you define it.
var FirstView = bindToCarData(React.createClass({
  render: function () {
    return (
      <div>
        <AvgSellingPricesByYear country="US" dataset={this.props.carData}/>
        <AvgSellingPricesByYear country="UK" dataset={this.props.carData}/>
        <AvgSellingPricesByYear country="FI" dataset={this.props.carData}/>
      </div>
    )
  }
}));
```
#@ Avoid componentWillMount() - componentWillMount-> render - > componentDidMount
- mounting되기 전에 호출되기 바로 전에 호출되기 때문에 asynch 통해 state initailize할때, re-render를 하지 않는 경우 있음. 
- didMount를 사용하여 mount 된 이후에 state를 변경시켜 rendering 될 수 있도록 함. 

#@ Mutating State without setState()
this.state = {}; 이런식의 직접 객체를 수정하면, state의 변경을 감지 하지 못하여 render가 제대로 되지 않는 경우 발생. setState를 사용해 변경.

# Using keys repeat elements indexes => id 유니크한 키가 있다면 index보다는 그 키를 사용하는게 좋다. 

#@ # Spreading props on DOM elements
By creating props specifically for DOM attribute, we can safely spread.
```javascript
const Sample = () => (<Spread flag={true} domProps={{className: "content"}}/>);
const Spread = (props) => (<div {...props.domProps}>Test</div>);
```

Or alternatively we can use prop destructuring with `...rest`:
```javascript
const Sample = () => (<Spread flag={true} className="content"/>);
const Spread = ({ flag, ...domProps }) => (<div {...domProps}>Test</div>);
```




