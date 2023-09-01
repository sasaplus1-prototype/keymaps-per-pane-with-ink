(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('node:readline'), require('react'), require('ink')) :
  typeof define === 'function' && define.amd ? define(['node:readline', 'react', 'ink'], factory) :
  (global = global || self, factory(global.readline, global.react, global.ink));
})(this, (function (readline, React, ink) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return n;
  }

  var readline__namespace = /*#__PURE__*/_interopNamespace(readline);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  const FocusWithinContext = React__default["default"].createContext();
  function FocusProvider(props) {
    const {
      children
    } = props;
    const [focusWithin, setFocusWithin] = React.useState('');
    return /*#__PURE__*/React__default["default"].createElement(FocusWithinContext.Provider, {
      value: {
        focusWithin,
        setFocusWithin
      }
    }, children);
  }
  function useFocusWithin() {
    const {
      focusWithin,
      setFocusWithin
    } = React.useContext(FocusWithinContext);
    return [callback => {
      return callback(focusWithin);
    }, (id, isFocused) => {
      React.useEffect(() => {
        if (isFocused) {
          setFocusWithin(id);
        }
      }, [isFocused, setFocusWithin, id]);
    }];
  }

  //------------------------------------------------------------------------------

  readline__namespace.emitKeypressEvents(process.stdin);
  process.stdin.on('keypress', function (str, key) {
    if (key && key.name === 'q') {
      process.stdin.pause();
    }
  });
  process.stdin.setRawMode(true);

  //------------------------------------------------------------------------------

  function Item(props) {
    const {
      id,
      label
    } = props;
    const {
      isFocused
    } = ink.useFocus({
      id
    });
    const [, setFocusWithin] = useFocusWithin();
    setFocusWithin(id, isFocused);
    return /*#__PURE__*/React__default["default"].createElement(ink.Text, {
      id: id,
      inverse: isFocused
    }, label);
  }
  function Pane(props) {
    const {
      children,
      id,
      ids
    } = props;
    const [checkFocusWithin] = useFocusWithin();
    const isFocusWithin = checkFocusWithin(id => {
      return ids.has(id);
    });
    ink.useInput((input, key) => {
      if (isFocusWithin && key.return) {
        console.log(`I'm ${id}`);
      }
    });
    return /*#__PURE__*/React__default["default"].createElement(ink.Box, {
      borderColor: isFocusWithin ? 'green' : 'red',
      borderDimColor: !isFocusWithin,
      borderStyle: "single",
      flexDirection: "column",
      height: "100%",
      width: "50%"
    }, children);
  }
  function App() {
    const idSet1 = new Set(['item-1', 'item-2', 'item-3']);
    const idSet2 = new Set(['item-4', 'item-5', 'item-6']);
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(FocusProvider, null, /*#__PURE__*/React__default["default"].createElement(ink.Text, null, "Press Tab to focus next item. Press q to exit."), /*#__PURE__*/React__default["default"].createElement(ink.Box, {
      flexDirection: "row"
    }, /*#__PURE__*/React__default["default"].createElement(Pane, {
      id: "pane-1",
      ids: idSet1
    }, /*#__PURE__*/React__default["default"].createElement(Item, {
      id: "item-1",
      label: "Item 1"
    }), /*#__PURE__*/React__default["default"].createElement(Item, {
      id: "item-2",
      label: "Item 2"
    }), /*#__PURE__*/React__default["default"].createElement(Item, {
      id: "item-3",
      label: "Item 3"
    })), /*#__PURE__*/React__default["default"].createElement(Pane, {
      id: "pane-2",
      ids: idSet2
    }, /*#__PURE__*/React__default["default"].createElement(Item, {
      id: "item-4",
      label: "Item 4"
    }), /*#__PURE__*/React__default["default"].createElement(Item, {
      id: "item-5",
      label: "Item 5"
    }), /*#__PURE__*/React__default["default"].createElement(Item, {
      id: "item-6",
      label: "Item 6"
    })))));
  }
  ink.render( /*#__PURE__*/React__default["default"].createElement(App, null));

}));
//# sourceMappingURL=index.umd.js.map
