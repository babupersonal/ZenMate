import {
  MotionConfigContext,
  MotionContext,
  VisualElement,
  addPointerEvent,
  addPointerInfo,
  animations,
  calcLength,
  clamp,
  createBox,
  createRendererMotionComponent,
  filterProps,
  invariant,
  isDragActive,
  isMotionValue,
  makeUseVisualState,
  pipe,
  resolveMotionValue,
  useForceUpdate,
  useIsomorphicLayoutEffect,
  useMotionValue
} from "./chunk-4MT5RR7Y.js";
import {
  createPointerEvents,
  createRoot,
  extend,
  unmountComponentAtNode,
  useFrame,
  useThree
} from "./chunk-TSZEQ7X3.js";
import {
  Color,
  Euler,
  OrthographicCamera,
  PerspectiveCamera,
  Vector3
} from "./chunk-QISKWULF.js";
import {
  require_jsx_runtime
} from "./chunk-B3IDMKNF.js";
import "./chunk-YJBZTQEM.js";
import {
  require_react
} from "./chunk-GWAROZSO.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/framer-motion-3d/dist/es/render/utils/set-value.mjs
var setVector = (name, defaultValue) => (i) => (instance, value) => {
  if (instance[name] === void 0) {
    instance[name] = new Vector3(defaultValue);
  }
  const vector = instance[name];
  vector.setComponent(i, value);
};
var setEuler = (name, defaultValue) => (axis) => (instance, value) => {
  if (instance[name] === void 0) {
    instance[name] = new Euler(defaultValue);
  }
  const euler = instance[name];
  euler[axis] = value;
};
var setColor = (name) => (instance, value) => {
  if (instance[name] === void 0) {
    instance[name] = new Color(value);
  }
  instance[name].set(value);
};
var setScale = setVector("scale", 1);
var setPosition = setVector("position", 0);
var setRotation = setEuler("rotation", 0);
var setters = {
  x: setPosition(0),
  y: setPosition(1),
  z: setPosition(2),
  scale: (instance, value) => {
    if (instance.scale === void 0) {
      instance.scale = new Vector3(1);
    }
    const scale = instance.scale;
    scale.set(value, value, value);
  },
  scaleX: setScale(0),
  scaleY: setScale(1),
  scaleZ: setScale(2),
  rotateX: setRotation("x"),
  rotateY: setRotation("y"),
  rotateZ: setRotation("z"),
  color: setColor("color"),
  specular: setColor("specular")
};
function setThreeValue(instance, key, values) {
  if (key in setters) {
    setters[key](instance, values[key]);
  } else {
    if (key === "opacity" && !instance.transparent) {
      instance.transparent = true;
    }
    instance[key] = values[key];
  }
}

// node_modules/framer-motion-3d/dist/es/render/utils/read-value.mjs
var readVector = (name, defaultValue) => (axis) => (instance) => {
  const value = instance[name];
  return value ? value[axis] : defaultValue;
};
var readPosition = readVector("position", 0);
var readScale = readVector("scale", 1);
var readRotation = readVector("rotation", 0);
var readers = {
  x: readPosition("x"),
  y: readPosition("y"),
  z: readPosition("z"),
  scale: readScale("x"),
  scaleX: readScale("x"),
  scaleY: readScale("y"),
  scaleZ: readScale("z"),
  rotateX: readRotation("x"),
  rotateY: readRotation("y"),
  rotateZ: readRotation("z")
};
function readAnimatableValue(value) {
  if (value === void 0) {
    return;
  } else if (value instanceof Color) {
    return value.getStyle();
  } else {
    return value;
  }
}
function readThreeValue(instance, name) {
  return name in readers ? readers[name](instance) : readAnimatableValue(instance[name]) || 0;
}

// node_modules/framer-motion-3d/dist/es/render/utils/scrape-motion-value.mjs
var axes = ["x", "y", "z"];
var valueMap = {
  "position-x": "x",
  "position-y": "y",
  "position-z": "z",
  "rotation-x": "rotateX",
  "rotation-y": "rotateY",
  "rotation-z": "rotateZ",
  "scale-x": "scaleX",
  "scale-y": "scaleY",
  "scale-z": "scaleZ"
};
var scrapeMotionValuesFromProps = (props, prevProps) => {
  const motionValues = {};
  let key;
  for (key in props) {
    const prop = props[key];
    if (isMotionValue(prop) || isMotionValue(prevProps[key])) {
      const valueKey = valueMap[key] || key;
      motionValues[valueKey] = prop;
    } else if (Array.isArray(prop)) {
      for (let i = 0; i < prop.length; i++) {
        const value = prop[i];
        const prevValue = prevProps[key];
        const prevArrayValue = Array.isArray(prevValue) ? prevValue[i] : void 0;
        if (isMotionValue(value) || prevArrayValue !== void 0 && isMotionValue(prevArrayValue)) {
          const name = valueMap[`${key}-${axes[i]}`];
          motionValues[name] = value;
        }
      }
    }
  }
  return motionValues;
};

// node_modules/framer-motion-3d/dist/es/render/create-visual-element.mjs
var createRenderState = () => ({});
var ThreeVisualElement = class extends VisualElement {
  constructor() {
    super(...arguments);
    this.type = "three";
    this.measureInstanceViewportBox = createBox;
  }
  readValueFromInstance(instance, key) {
    return readThreeValue(instance, key);
  }
  getBaseTargetFromProps() {
    return void 0;
  }
  sortInstanceNodePosition(a, b) {
    return a.id - b.id;
  }
  removeValueFromRenderState() {
  }
  scrapeMotionValuesFromProps(props, prevProps) {
    return scrapeMotionValuesFromProps(props, prevProps);
  }
  build(state, latestValues) {
    for (const key in latestValues) {
      state[key] = latestValues[key];
    }
  }
  renderInstance(instance, renderState) {
    for (const key in renderState) {
      setThreeValue(instance, key, renderState);
    }
  }
};
var createVisualElement = (_, options) => new ThreeVisualElement(options, {});

// node_modules/framer-motion-3d/dist/es/render/use-render.mjs
var import_react2 = __toESM(require_react(), 1);

// node_modules/framer-motion-3d/dist/es/render/gestures/use-hover.mjs
function useHover(isStatic, { whileHover, onHoverStart, onHoverEnd, onPointerOver, onPointerOut }, visualElement) {
  const isHoverEnabled = whileHover || onHoverStart || onHoverEnd;
  if (isStatic || !visualElement || !isHoverEnabled)
    return {};
  return {
    onPointerOver: (event) => {
      var _a;
      (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive("whileHover", true);
      onPointerOver && onPointerOver(event);
    },
    onPointerOut: (event) => {
      var _a;
      (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive("whileHover", false);
      onPointerOut && onPointerOut(event);
    }
  };
}

// node_modules/framer-motion-3d/dist/es/render/gestures/use-tap.mjs
var import_react = __toESM(require_react(), 1);
function useTap(isStatic, { whileTap, onTapStart, onTap, onTapCancel, onPointerDown }, visualElement) {
  const isTapEnabled = onTap || onTapStart || onTapCancel || whileTap;
  const isPressing = (0, import_react.useRef)(false);
  const cancelPointerEndListeners = (0, import_react.useRef)(null);
  if (isStatic || !visualElement || !isTapEnabled)
    return {};
  function removePointerEndListener() {
    var _a;
    (_a = cancelPointerEndListeners.current) === null || _a === void 0 ? void 0 : _a.call(cancelPointerEndListeners);
    cancelPointerEndListeners.current = null;
  }
  function checkPointerEnd() {
    var _a;
    removePointerEndListener();
    isPressing.current = false;
    (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive("whileTap", false);
    return !isDragActive();
  }
  function onPointerUp(event, info) {
    if (!checkPointerEnd())
      return;
    onTap === null || onTap === void 0 ? void 0 : onTap(event, info);
  }
  function onPointerCancel(event, info) {
    if (!checkPointerEnd())
      return;
    onTapCancel === null || onTapCancel === void 0 ? void 0 : onTapCancel(event, info);
  }
  return {
    onPointerDown: addPointerInfo((event, info) => {
      var _a;
      removePointerEndListener();
      if (isPressing.current)
        return;
      isPressing.current = true;
      const options = {
        passive: !(onTapStart || onTap || onTapCancel || onPointerDown)
      };
      cancelPointerEndListeners.current = pipe(addPointerEvent(window, "pointerup", onPointerUp, options), addPointerEvent(window, "pointercancel", onPointerCancel, options));
      (_a = visualElement.animationState) === null || _a === void 0 ? void 0 : _a.setActive("whileTap", true);
      onPointerDown === null || onPointerDown === void 0 ? void 0 : onPointerDown(event);
      onTapStart === null || onTapStart === void 0 ? void 0 : onTapStart(event, info);
    })
  };
}

// node_modules/framer-motion-3d/dist/es/render/use-render.mjs
var useRender = (Component2, props, ref, _state, isStatic, visualElement) => {
  const visualProps = useVisualProps(props);
  return (0, import_react2.createElement)(Component2, {
    ref,
    ...filterProps(props, false, false),
    ...visualProps,
    onUpdate: props.onInstanceUpdate,
    ...useHover(isStatic, props, visualElement),
    ...useTap(isStatic, props, visualElement)
  });
};
function useVisualProps(props) {
  return (0, import_react2.useMemo)(() => {
    const visualProps = {};
    for (const key in props) {
      const prop = props[key];
      if (isMotionValue(prop)) {
        visualProps[key] = prop.get();
      } else if (Array.isArray(prop) && prop.includes(isMotionValue)) {
        visualProps[key] = prop.map(resolveMotionValue);
      }
    }
    return visualProps;
  }, []);
}

// node_modules/framer-motion-3d/dist/es/render/motion.mjs
var useVisualState = makeUseVisualState({
  scrapeMotionValuesFromProps,
  createRenderState
});
var preloadedFeatures = {
  ...animations
};
function custom(Component2) {
  return createRendererMotionComponent({
    Component: Component2,
    preloadedFeatures,
    useRender,
    useVisualState,
    createVisualElement
  });
}
var componentCache = /* @__PURE__ */ new Map();
var motion = new Proxy(custom, {
  get: (_, key) => {
    !componentCache.has(key) && componentCache.set(key, custom(key));
    return componentCache.get(key);
  }
});

// node_modules/framer-motion-3d/dist/es/components/MotionCanvas.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var React = __toESM(require_react(), 1);
var import_react4 = __toESM(require_react(), 1);

// node_modules/react-merge-refs/dist/index.mjs
function o(f) {
  return (r) => {
    f.forEach((n) => {
      typeof n == "function" ? n(r) : n != null && (n.current = r);
    });
  };
}

// node_modules/framer-motion-3d/dist/es/components/MotionCanvasContext.mjs
var import_react3 = __toESM(require_react(), 1);
var MotionCanvasContext = (0, import_react3.createContext)(void 0);

// node_modules/framer-motion-3d/dist/es/components/MotionCanvas.mjs
var devicePixelRatio = typeof window !== "undefined" ? window.devicePixelRatio : 1;
var calculateDpr = (dpr) => Array.isArray(dpr) ? clamp(dpr[0], dpr[1], devicePixelRatio) : dpr || devicePixelRatio;
function Block({ set }) {
  useIsomorphicLayoutEffect(() => {
    set(new Promise(() => null));
    return () => set(false);
  }, []);
  return null;
}
var ErrorBoundary = class extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { error: false };
  }
  componentDidCatch(error) {
    this.props.set(error);
  }
  render() {
    return this.state.error ? null : this.props.children;
  }
};
ErrorBoundary.getDerivedStateFromError = () => ({ error: true });
function CanvasComponent({ children, fallback, tabIndex, id, style, className, events: events$1, ...props }, forwardedRef) {
  const motionContext = (0, import_react4.useContext)(MotionContext);
  const configContext = (0, import_react4.useContext)(MotionConfigContext);
  const [forceRender] = useForceUpdate();
  const layoutCamera = (0, import_react4.useRef)(null);
  const dimensions = (0, import_react4.useRef)({
    size: { width: 0, height: 0 }
  });
  const { size, dpr } = dimensions.current;
  const containerRef = (0, import_react4.useRef)(null);
  const handleResize = () => {
    const container = containerRef.current;
    dimensions.current = {
      size: {
        width: container.offsetWidth,
        height: container.offsetHeight
      }
    };
    forceRender();
  };
  (0, import_react4.useLayoutEffect)(handleResize, []);
  const canvasRef = React.useRef(null);
  const [block, setBlock] = React.useState(false);
  const [error, setError] = React.useState(false);
  if (block)
    throw block;
  if (error)
    throw error;
  const root = (0, import_react4.useRef)(null);
  if (size.width > 0 && size.height > 0) {
    if (!root.current) {
      root.current = createRoot(canvasRef.current);
    }
    root.current.configure({
      ...props,
      dpr: dpr || props.dpr,
      size: { ...size, top: 0, left: 0 },
      events: events$1 || createPointerEvents
    }).render((0, import_jsx_runtime.jsx)(ErrorBoundary, { set: setError, children: (0, import_jsx_runtime.jsx)(React.Suspense, { fallback: (0, import_jsx_runtime.jsx)(Block, { set: setBlock }), children: (0, import_jsx_runtime.jsx)(MotionCanvasContext.Provider, { value: {
      dimensions,
      layoutCamera,
      requestedDpr: calculateDpr(props.dpr)
    }, children: (0, import_jsx_runtime.jsx)(MotionConfigContext.Provider, { value: configContext, children: (0, import_jsx_runtime.jsx)(MotionContext.Provider, { value: motionContext, children }) }) }) }) }));
  }
  useIsomorphicLayoutEffect(() => {
    const container = canvasRef.current;
    return () => unmountComponentAtNode(container);
  }, []);
  return (0, import_jsx_runtime.jsx)("div", { ref: containerRef, id, className, tabIndex, style: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    ...style
  }, children: (0, import_jsx_runtime.jsx)("canvas", { ref: o([canvasRef, forwardedRef]), style: { display: "block" }, children: fallback }) });
}
var MotionCanvas = (0, import_react4.forwardRef)(CanvasComponent);

// node_modules/framer-motion-3d/dist/es/components/LayoutCamera.mjs
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var import_react6 = __toESM(require_react(), 1);

// node_modules/framer-motion-3d/dist/es/components/use-layout-camera.mjs
var import_react5 = __toESM(require_react(), 1);
var calcBoxSize = ({ x, y }) => ({
  width: calcLength(x),
  height: calcLength(y),
  top: 0,
  left: 0
});
function useLayoutCamera({ makeDefault = true }, updateCamera) {
  const context = (0, import_react5.useContext)(MotionCanvasContext);
  invariant(Boolean(context), "No MotionCanvas detected. Replace Canvas from @react-three/fiber with MotionCanvas from framer-motion.");
  const { dimensions, layoutCamera, requestedDpr } = context;
  const advance = useThree((three) => three.advance);
  const set = useThree((three) => three.set);
  const camera = useThree((three) => three.camera);
  const size = useThree((three) => three.size);
  const gl = useThree((three) => three.gl);
  const { visualElement: parentVisualElement } = (0, import_react5.useContext)(MotionContext);
  const measuredLayoutSize = (0, import_react5.useRef)(void 0);
  (0, import_react5.useLayoutEffect)(() => {
    measuredLayoutSize.current = size;
    updateCamera(size);
    advance(performance.now());
    const projection = parentVisualElement === null || parentVisualElement === void 0 ? void 0 : parentVisualElement.projection;
    if (!projection)
      return;
    const removeProjectionUpdateListener = projection.addEventListener("projectionUpdate", (newProjection) => updateCamera(calcBoxSize(newProjection)));
    const removeLayoutMeasureListener = projection.addEventListener("measure", (newLayout) => {
      const newSize = calcBoxSize(newLayout);
      let dpr = requestedDpr;
      const { width, height } = dimensions.current.size;
      const xScale = width / newSize.width;
      const yScale = height / newSize.height;
      const maxScale = Math.max(xScale, yScale);
      dpr = clamp(0.75, 4, maxScale);
      dimensions.current = {
        size: { width: newSize.width, height: newSize.height },
        dpr
      };
      gl.setSize(newSize.width, newSize.height);
      gl.setPixelRatio(dpr);
    });
    const removeAnimationCompleteListener = projection.addEventListener("animationComplete", () => {
      const { layoutBox } = projection.layout || {};
      if (layoutBox) {
        setTimeout(() => {
          const newSize = calcBoxSize(layoutBox);
          updateCamera(newSize);
          dimensions.current = { size: newSize };
          gl.setSize(newSize.width, newSize.height);
          gl.setPixelRatio(requestedDpr);
        }, 50);
      }
    });
    return () => {
      removeProjectionUpdateListener();
      removeLayoutMeasureListener();
      removeAnimationCompleteListener();
    };
  }, []);
  (0, import_react5.useLayoutEffect)(() => {
    const { current: cam } = layoutCamera;
    if (makeDefault && cam) {
      const oldCam = camera;
      set(() => ({ camera: cam }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, layoutCamera, makeDefault, set]);
  return { size, camera, cameraRef: layoutCamera };
}

// node_modules/framer-motion-3d/dist/es/components/LayoutCamera.mjs
extend({ PerspectiveCamera });
var LayoutCamera = (0, import_react6.forwardRef)((props, ref) => {
  const { cameraRef } = useLayoutCamera(props, (size) => {
    const { current: cam } = cameraRef;
    if (cam && !props.manual) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  });
  return (0, import_jsx_runtime2.jsx)(motion.perspectiveCamera, { ref: o([cameraRef, ref]), ...props });
});

// node_modules/framer-motion-3d/dist/es/components/LayoutOrthographicCamera.mjs
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var import_react7 = __toESM(require_react(), 1);
extend({ OrthographicCamera });
var LayoutOrthographicCamera = (0, import_react7.forwardRef)((props, ref) => {
  const { size, cameraRef } = useLayoutCamera(props, (newSize) => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.left = newSize.width / -2;
      cam.right = newSize.width / 2;
      cam.top = newSize.height / 2;
      cam.bottom = newSize.height / -2;
      cam.updateProjectionMatrix();
    }
  });
  return (0, import_jsx_runtime3.jsx)(motion.orthographicCamera, { left: size.width / -2, right: size.width / 2, top: size.height / 2, bottom: size.height / -2, ref: o([cameraRef, ref]), ...props });
});

// node_modules/framer-motion-3d/dist/es/utils/use-time.mjs
var import_react8 = __toESM(require_react(), 1);
function useTime() {
  const time = useMotionValue(0);
  const { isStatic } = (0, import_react8.useContext)(MotionConfigContext);
  !isStatic && useFrame((state) => time.set(state.clock.getElapsedTime()));
  return time;
}
export {
  LayoutCamera,
  LayoutOrthographicCamera,
  MotionCanvas,
  motion,
  useTime
};
//# sourceMappingURL=framer-motion-3d.js.map
