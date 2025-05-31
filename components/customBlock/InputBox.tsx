"use client";
import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

// Input block with editable placeholder
export const InputBox = createReactBlockSpec(
  {
    type: "inputbox",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      placeholder: { default: "Enter something..." },
      value: { default: "" },
    },
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      return (
        <div className="input-container">
          <input
            className="textinput"
            type="text"
            placeholder={block.props.placeholder}
            value={block.props.value ?? ""}
            onChange={(e) =>
              editor.updateBlock(block, {
                props: { ...block.props, value: e.target.value },
              })
            }
          />
        </div>
      );
    },
  }
);
