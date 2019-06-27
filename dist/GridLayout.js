import React from 'react';
import ResponsiveGridLayout from './GridLayout/ResponsiveGridLayout';
import { useWidth } from './GridLayout/useWidth';
import { materialuiTheme } from './theme';
var cols = {
  xl: 12,
  lg: 12,
  md: 6,
  sm: 6,
  xs: 4
};
export default function Board(props) {
  var ref = React.useRef(null);
  var width = useWidth(ref.current);
  var items = props.items,
      layout = props.layout,
      _props$margin = props.margin,
      margin = _props$margin === void 0 ? 16 : _props$margin,
      draggable = props.draggable,
      onLayoutChange = props.onLayoutChange; // const handleLayoutChange = React.useCallback((layout: Layout, breakpoint: Breakpoint, layouts: ResponsiveLayout) => {
  //     console.log(layouts)
  //     onLayoutChange && onLayoutChange(layout, breakpoint, layouts)
  // }, [props])

  return React.createElement(ResponsiveGridLayout, {
    ref: ref,
    width: width,
    className: "layout",
    cols: cols,
    rowHeight: 90,
    layouts: layout,
    breakpoints: materialuiTheme.breakpoints.values,
    margin: [margin, margin],
    containerPadding: [0, 0],
    onLayoutChange: onLayoutChange // handleLayoutChange
    ,
    draggable: draggable
  }, // TODO: Perhaps cloning items and adding key is better, or, requiring key ? hmm
  items.map(function (_ref) {
    var id = _ref.id,
        children = _ref.children;
    return React.createElement("div", {
      key: id
    }, children);
  }));
} // export default class GridLayout extends React.PureComponent<GridLayoutProps>{
//     static defaultProps: Partial<GridLayoutProps> = {
//         margin: 16,
//     }
//     static propTypes = {
//         margin: PropTypes.number,
//         draggable: PropTypes.bool,
//         onLayoutChange: PropTypes.func,
//         items: PropTypes.arrayOf(PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             backgroundColor: PropTypes.string,
//             children: PropTypes.node.isRequired
//         })).isRequired,
//         layout: PropTypes.arrayOf(PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             col: PropTypes.number.isRequired,
//             row: PropTypes.number.isRequired,
//             width: PropTypes.oneOf(gridItemWidths).isRequired,
//             height: PropTypes.number.isRequired,
//         })).isRequired
//     }
//     componentDidMount(){
//         this.validateItemLayout()
//     }
//     onLayoutChange = (layouts: Layout) => {
//         const {onLayoutChange} = this.props
//         onLayoutChange && onLayoutChange(Object.values(layouts).map(layoutToGridItemPosition))
//     }
//     validateItemLayout = () => {
//         if(process.env.NODE_ENV === 'production') return
//         const items = new Set(this.props.items.map(item => item.id))
//         const layouts = new Set(this.props.layout.map(layout => layout.id))
//         items.forEach(item => {
//             if(!layouts.has(item)){
//                 console.error(`Error: Item with id: ${item} is missing layout`)
//             }
//         })
//         layouts.forEach(layout => {
//             if(!items.has(layout)){
//                 console.warn(`Warning: Layout with id: ${layout} does not correspond to any item`)
//             }
//         })
//     }
//     render(){
//         const {items, layout, margin = 16, draggable} = this.props
//         const rglLayout = layout
//             .map(gridItemPositionToLayout)
//             .reduce((l, item) => {
//                 l[item.id] = item
//                 return l
//             }, {})
//         const cols: ResponsiveGridLayoutProps['cols'] = {
//             xl: 12,
//             lg: 12,
//             md: 6,
//             sm: 6,
//             xs: 4
//         }
//         return (
//             <ResponsiveGridLayout
//                 className='layout'
//                 cols={cols}
//                 rowHeight={90}
//                 layouts={{lg: rglLayout}}
//                 breakpoints={materialuiTheme.breakpoints.values}
//                 margin={[margin, margin]}
//                 containerPadding={[0, 0]}
//                 onLayoutChange={this.onLayoutChange}
//                 draggable={draggable}
//             >
//                 {// TODO: Perhaps cloning items and adding key is better, or, requiring key ? hmm
//                     items.map(({id, children}) => (
//                         <div key={id}>
//                             {children}
//                         </div>))
//                 }
//             </ResponsiveGridLayout>
//         )
//     }
// }
//# sourceMappingURL=GridLayout.js.map