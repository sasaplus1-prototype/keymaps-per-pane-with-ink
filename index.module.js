import * as readline from 'node:readline';
import React, { useState, useContext, useEffect } from 'react';
import { render, Text, Box, useFocus, useInput } from 'ink';

const FocusWithinContext = React.createContext();
function FocusProvider(props) {
  const {
    children
  } = props;
  const [focusWithin, setFocusWithin] = useState('');
  return /*#__PURE__*/React.createElement(FocusWithinContext.Provider, {
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
  } = useContext(FocusWithinContext);
  return [callback => {
    return callback(focusWithin);
  }, (id, isFocused) => {
    useEffect(() => {
      if (isFocused) {
        setFocusWithin(id);
      }
    }, [isFocused, setFocusWithin, id]);
  }];
}

//------------------------------------------------------------------------------

readline.emitKeypressEvents(process.stdin);
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
  } = useFocus({
    id
  });
  const [, setFocusWithin] = useFocusWithin();
  setFocusWithin(id, isFocused);
  return /*#__PURE__*/React.createElement(Text, {
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
  useInput((input, key) => {
    if (isFocusWithin && key.return) {
      console.log(`I'm ${id}`);
    }
  });
  return /*#__PURE__*/React.createElement(Box, {
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FocusProvider, null, /*#__PURE__*/React.createElement(Text, null, "Press Tab to focus next item. Press q to exit."), /*#__PURE__*/React.createElement(Box, {
    flexDirection: "row"
  }, /*#__PURE__*/React.createElement(Pane, {
    id: "pane-1",
    ids: idSet1
  }, /*#__PURE__*/React.createElement(Item, {
    id: "item-1",
    label: "Item 1"
  }), /*#__PURE__*/React.createElement(Item, {
    id: "item-2",
    label: "Item 2"
  }), /*#__PURE__*/React.createElement(Item, {
    id: "item-3",
    label: "Item 3"
  })), /*#__PURE__*/React.createElement(Pane, {
    id: "pane-2",
    ids: idSet2
  }, /*#__PURE__*/React.createElement(Item, {
    id: "item-4",
    label: "Item 4"
  }), /*#__PURE__*/React.createElement(Item, {
    id: "item-5",
    label: "Item 5"
  }), /*#__PURE__*/React.createElement(Item, {
    id: "item-6",
    label: "Item 6"
  })))));
}
render( /*#__PURE__*/React.createElement(App, null));
//# sourceMappingURL=index.module.js.map
