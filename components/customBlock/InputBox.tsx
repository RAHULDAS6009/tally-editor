"use client";
import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { useEffect, useState } from "react";

export const InputBox = createReactBlockSpec(
  {
    type: "inputbox",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      placeholder: { default: "" },
      value: { default: "" },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const [placeholderText, setPlaceholderText] = useState<string>(
        props.block.props.placeholder
      );

      function updateText(value: string) {
        setPlaceholderText(value);
        props.editor.updateBlock(props.block.id, {
          props: {
            ...props.block.props,
            placeholder: value,
          },
        });
      }

      useEffect(() => {
        if (!props.editor.isEditable) {
          setPlaceholderText(props.block.props.placeholder);
        }
      }, [props.editor.isEditable]);

      return (
        <>
          {props.editor.isEditable ? (
            <input
              className="textinput"
              type="text"
              placeholder={"Type placeholder text"}
              onChange={(e) => updateText(e.target.value)}
            />
          ) : (
            <input
              className="textinput"
              type="text"
              placeholder={placeholderText}
              onChange={(e) => {
                props.editor.updateBlock(props.block.id, {
                  props: {
                    ...props.block.props,
                    value: e.target.value,
                  },
                });
              }}
            />
          )}
        </>
      );
    },
  }
);
