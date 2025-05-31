import { createReactBlockSpec } from "@blocknote/react";

const LabelBlock = createReactBlockSpec(
  {
    type: "labelblock",
    propSchema: {
      text: { default: "Label" },
    },
    content: "none",
  },
  {
    render: ({ block }) => (
      <label
        style={{
          fontWeight: "600",
          fontSize: "14px",
          paddingBottom: "4px",
          display: "block",
          color: "#333",
        }}
      >
        {block.props.text}
      </label>
    ),
  }
);

export default LabelBlock;
