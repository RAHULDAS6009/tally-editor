"use client";
import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

export const InputBox = createReactBlockSpec(
  {
    type: "inputbox",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      placeholder: { default: "enter something " },
      value: { default: "" },
    },
    content: "inline",
  },
  {
    render: (props) => {
      console.log("important", props);
      return (
        <>
          <input
            className="textinput"
            type="text"
            placeholder={props.block.props.placeholder}
          />
        </>
      );
    },
  }
);
