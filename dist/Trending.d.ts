import React from 'react';
import { DefaultTheme, WithTheme } from 'styled-components';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
export declare type TrendingProps = {
    variant: 'up' | 'down' | 'flat';
} & SvgIconProps;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<Pick<{
    variant: "flat" | "up" | "down";
} & SvgIconProps & WithTheme, "string" | "style" | "clipPath" | "filter" | "mask" | "width" | "children" | "innerRef" | "theme" | "classes" | "className" | "id" | "lang" | "tabIndex" | "role" | "color" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "component" | "elevation" | "key" | "height" | "max" | "media" | "method" | "min" | "name" | "target" | "type" | "accentHeight" | "accumulate" | "additive" | "alignmentBaseline" | "allowReorder" | "alphabetic" | "amplitude" | "arabicForm" | "ascent" | "attributeName" | "attributeType" | "autoReverse" | "azimuth" | "baseFrequency" | "baselineShift" | "baseProfile" | "bbox" | "begin" | "bias" | "by" | "calcMode" | "capHeight" | "clip" | "clipPathUnits" | "clipRule" | "colorInterpolation" | "colorInterpolationFilters" | "colorProfile" | "colorRendering" | "contentScriptType" | "contentStyleType" | "cursor" | "cx" | "cy" | "d" | "decelerate" | "descent" | "diffuseConstant" | "direction" | "display" | "divisor" | "dominantBaseline" | "dur" | "dx" | "dy" | "edgeMode" | "enableBackground" | "end" | "exponent" | "externalResourcesRequired" | "fill" | "fillOpacity" | "fillRule" | "filterRes" | "filterUnits" | "floodColor" | "floodOpacity" | "focusable" | "fontFamily" | "fontSize" | "fontSizeAdjust" | "fontStretch" | "fontStyle" | "fontVariant" | "fontWeight" | "format" | "from" | "fx" | "fy" | "g1" | "g2" | "glyphName" | "glyphOrientationHorizontal" | "glyphOrientationVertical" | "glyphRef" | "gradientTransform" | "gradientUnits" | "hanging" | "horizAdvX" | "horizOriginX" | "href" | "ideographic" | "imageRendering" | "in2" | "in" | "intercept" | "k1" | "k2" | "k3" | "k4" | "k" | "kernelMatrix" | "kernelUnitLength" | "kerning" | "keyPoints" | "keySplines" | "keyTimes" | "lengthAdjust" | "letterSpacing" | "lightingColor" | "limitingConeAngle" | "local" | "markerEnd" | "markerHeight" | "markerMid" | "markerStart" | "markerUnits" | "markerWidth" | "maskContentUnits" | "maskUnits" | "mathematical" | "mode" | "numOctaves" | "offset" | "opacity" | "operator" | "order" | "orient" | "orientation" | "origin" | "overflow" | "overlinePosition" | "overlineThickness" | "paintOrder" | "panose1" | "pathLength" | "patternContentUnits" | "patternTransform" | "patternUnits" | "pointerEvents" | "points" | "pointsAtX" | "pointsAtY" | "pointsAtZ" | "preserveAlpha" | "preserveAspectRatio" | "primitiveUnits" | "r" | "radius" | "refX" | "refY" | "renderingIntent" | "repeatCount" | "repeatDur" | "requiredExtensions" | "requiredFeatures" | "restart" | "result" | "rotate" | "rx" | "ry" | "scale" | "seed" | "shapeRendering" | "slope" | "spacing" | "specularConstant" | "specularExponent" | "speed" | "spreadMethod" | "startOffset" | "stdDeviation" | "stemh" | "stemv" | "stitchTiles" | "stopColor" | "stopOpacity" | "strikethroughPosition" | "strikethroughThickness" | "stroke" | "strokeDasharray" | "strokeDashoffset" | "strokeLinecap" | "strokeLinejoin" | "strokeMiterlimit" | "strokeOpacity" | "strokeWidth" | "surfaceScale" | "systemLanguage" | "tableValues" | "targetX" | "targetY" | "textAnchor" | "textDecoration" | "textLength" | "textRendering" | "to" | "transform" | "u1" | "u2" | "underlinePosition" | "underlineThickness" | "unicode" | "unicodeBidi" | "unicodeRange" | "unitsPerEm" | "vAlphabetic" | "values" | "vectorEffect" | "version" | "vertAdvY" | "vertOriginX" | "vertOriginY" | "vHanging" | "vIdeographic" | "viewBox" | "viewTarget" | "visibility" | "vMathematical" | "widths" | "wordSpacing" | "writingMode" | "x1" | "x2" | "x" | "xChannelSelector" | "xHeight" | "xlinkActuate" | "xlinkArcrole" | "xlinkHref" | "xlinkRole" | "xlinkShow" | "xlinkTitle" | "xlinkType" | "xmlBase" | "xmlLang" | "xmlns" | "xmlnsXlink" | "xmlSpace" | "y1" | "y2" | "y" | "yChannelSelector" | "z" | "zoomAndPan" | "htmlColor" | "titleAccess" | "variant"> & {
    ref?: ((instance: SVGSVGElement | null) => void) | React.RefObject<SVGSVGElement> | null | undefined;
}, "string" | "style" | "clipPath" | "filter" | "mask" | "ref" | "width" | "children" | "innerRef" | "classes" | "className" | "id" | "lang" | "tabIndex" | "role" | "color" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "component" | "elevation" | "key" | "height" | "max" | "media" | "method" | "min" | "name" | "target" | "type" | "accentHeight" | "accumulate" | "additive" | "alignmentBaseline" | "allowReorder" | "alphabetic" | "amplitude" | "arabicForm" | "ascent" | "attributeName" | "attributeType" | "autoReverse" | "azimuth" | "baseFrequency" | "baselineShift" | "baseProfile" | "bbox" | "begin" | "bias" | "by" | "calcMode" | "capHeight" | "clip" | "clipPathUnits" | "clipRule" | "colorInterpolation" | "colorInterpolationFilters" | "colorProfile" | "colorRendering" | "contentScriptType" | "contentStyleType" | "cursor" | "cx" | "cy" | "d" | "decelerate" | "descent" | "diffuseConstant" | "direction" | "display" | "divisor" | "dominantBaseline" | "dur" | "dx" | "dy" | "edgeMode" | "enableBackground" | "end" | "exponent" | "externalResourcesRequired" | "fill" | "fillOpacity" | "fillRule" | "filterRes" | "filterUnits" | "floodColor" | "floodOpacity" | "focusable" | "fontFamily" | "fontSize" | "fontSizeAdjust" | "fontStretch" | "fontStyle" | "fontVariant" | "fontWeight" | "format" | "from" | "fx" | "fy" | "g1" | "g2" | "glyphName" | "glyphOrientationHorizontal" | "glyphOrientationVertical" | "glyphRef" | "gradientTransform" | "gradientUnits" | "hanging" | "horizAdvX" | "horizOriginX" | "href" | "ideographic" | "imageRendering" | "in2" | "in" | "intercept" | "k1" | "k2" | "k3" | "k4" | "k" | "kernelMatrix" | "kernelUnitLength" | "kerning" | "keyPoints" | "keySplines" | "keyTimes" | "lengthAdjust" | "letterSpacing" | "lightingColor" | "limitingConeAngle" | "local" | "markerEnd" | "markerHeight" | "markerMid" | "markerStart" | "markerUnits" | "markerWidth" | "maskContentUnits" | "maskUnits" | "mathematical" | "mode" | "numOctaves" | "offset" | "opacity" | "operator" | "order" | "orient" | "orientation" | "origin" | "overflow" | "overlinePosition" | "overlineThickness" | "paintOrder" | "panose1" | "pathLength" | "patternContentUnits" | "patternTransform" | "patternUnits" | "pointerEvents" | "points" | "pointsAtX" | "pointsAtY" | "pointsAtZ" | "preserveAlpha" | "preserveAspectRatio" | "primitiveUnits" | "r" | "radius" | "refX" | "refY" | "renderingIntent" | "repeatCount" | "repeatDur" | "requiredExtensions" | "requiredFeatures" | "restart" | "result" | "rotate" | "rx" | "ry" | "scale" | "seed" | "shapeRendering" | "slope" | "spacing" | "specularConstant" | "specularExponent" | "speed" | "spreadMethod" | "startOffset" | "stdDeviation" | "stemh" | "stemv" | "stitchTiles" | "stopColor" | "stopOpacity" | "strikethroughPosition" | "strikethroughThickness" | "stroke" | "strokeDasharray" | "strokeDashoffset" | "strokeLinecap" | "strokeLinejoin" | "strokeMiterlimit" | "strokeOpacity" | "strokeWidth" | "surfaceScale" | "systemLanguage" | "tableValues" | "targetX" | "targetY" | "textAnchor" | "textDecoration" | "textLength" | "textRendering" | "to" | "transform" | "u1" | "u2" | "underlinePosition" | "underlineThickness" | "unicode" | "unicodeBidi" | "unicodeRange" | "unitsPerEm" | "vAlphabetic" | "values" | "vectorEffect" | "version" | "vertAdvY" | "vertOriginX" | "vertOriginY" | "vHanging" | "vIdeographic" | "viewBox" | "viewTarget" | "visibility" | "vMathematical" | "widths" | "wordSpacing" | "writingMode" | "x1" | "x2" | "x" | "xChannelSelector" | "xHeight" | "xlinkActuate" | "xlinkArcrole" | "xlinkHref" | "xlinkRole" | "xlinkShow" | "xlinkTitle" | "xlinkType" | "xmlBase" | "xmlLang" | "xmlns" | "xmlnsXlink" | "xmlSpace" | "y1" | "y2" | "y" | "yChannelSelector" | "z" | "zoomAndPan" | "htmlColor" | "titleAccess" | "variant"> & {
    theme?: DefaultTheme | undefined;
}>>;
export default _default;
//# sourceMappingURL=Trending.d.ts.map