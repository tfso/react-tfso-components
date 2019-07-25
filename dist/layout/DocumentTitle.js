import React from 'react';

function setTitle(text) {
  document.title = text;
}

// export default class DocumentTitle extends React.PureComponent<Props>{
//     constructor(props){
//         super(props)
//         setTitle(props.text)
//     }
//     componentWillReceiveProps(nextProps){
//         if(nextProps.text !== this.props.text){
//             setTitle(nextProps.text)
//         }
//     }
//     render(){
//         return ''
//     }
// }
export default (function (_ref) {
  var text = _ref.text;
  React.useEffect(function () {
    setTitle(text);
  }, [text]);
  return null;
});
//# sourceMappingURL=DocumentTitle.js.map