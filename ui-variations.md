# Using Composition to handle UX variations

### 작은 컴포넌트 조각으로 재사용 가능한 모음집을 사용. 
#### 컴포넌트 조각 - 1. 컴포넌트에서는 데이터를 가져오지 않는다. (Redux에서 하라). 2. 데이터가 필요하면 Redux에서 가져와라. 그리고 그 Redux Api를 컴포넌트 UI와

분리하라. 

```javascript
import React, { Component } from "react";
import PropTypes from 'prop-types';
import SignIn from "./sign-in";

class MemberSignIn extends Component {
  _renderMemberJoinLinks() {
    return (
      <div className="member-signup-links">
        ...
      </div>
    );
  }

  _routeTo() {
    // Routing logic here
  }

  render() {
    const {forgotEmailRoute,forgotPwdRoute, showMemberSignupLinks} = this.props;
    return (
      <div>
        <SignIn
          onForgotPasswordRequested={this._routeTo(forgotPwdRoute)}
          onForgotEmailRequested={this._routeTo(forgotEmailRoute)}>
          {this.props.children}
          {showMemberSignupLinks && this._renderMemberJoinLinks()}
        </SignIn>
      </div>
    );
  }
}

export default MemberSignIn;
```
# Toggle UI Elements

### Synthetic events - This also means that accessing the event object’s properties asynchronously 
will be impossible since the event’s properties have been reset due to reuse.

The following piece of code will log null because event has been reused inside the SyntheticEvent pool:
```javascript
function handleClick(event) {
  setTimeout(function () {
    console.log(event.target.name);
  }, 1000);
}
```
To avoid this you need to store the event’s property you are interested in inside its own binding:
```javascript
function handleClick(event) {
  let name = event.target.name;
  setTimeout(function () {
    console.log(name);
  }, 1000);
}
```

