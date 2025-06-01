import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { MdCancel, MdCheckCircle, MdError, MdInfo } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";

// Alert types definition (same as before)
export const alertTypes = [
  {
    title: "Warning",
    value: "warning",
    icon: MdError,
    color: "#e69819",
    backgroundColor: {
      light: "#fff6e6",
      dark: "#805d20",
    },
  },
  {
    title: "Error",
    value: "error",
    icon: MdCancel,
    color: "#d80d0d",
    backgroundColor: {
      light: "#ffe6e6",
      dark: "#802020",
    },
  },
  {
    title: "Info",
    value: "info",
    icon: MdInfo,
    color: "#507aff",
    backgroundColor: {
      light: "#e6ebff",
      dark: "#203380",
    },
  },
  {
    title: "Success",
    value: "success",
    icon: MdCheckCircle,
    color: "#0bc10b",
    backgroundColor: {
      light: "#e6ffe6",
      dark: "#208020",
    },
  },
] as const;

// Custom simple dropdown component
const AlertTypeDropdown = ({
  currentType,
  onSelect,
}: {
  currentType: string;
  onSelect: (type: (typeof alertTypes)[number]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => setOpen((o) => !o)}
        contentEditable={false}
      >
        {alertTypes
          .find((a) => a.value === currentType)
          ?.icon({
            size: 32,
            className: "alert-icon",
            "data-alert-icon-type": currentType,
          })}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
            zIndex: 100,
            minWidth: 150,
          }}
        >
          <div
            style={{
              padding: "8px 12px",
              borderBottom: "1px solid #eee",
              fontWeight: "bold",
            }}
          >
            Alert Type
          </div>
          {alertTypes.map((type) => (
            <div
              key={type.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor:
                  currentType === type.value ? "#f0f0f0" : "white",
              }}
              onClick={() => {
                onSelect(type);
                setOpen(false);
              }}
            >
              {type.icon({
                size: 20,
                className: "alert-icon",
                "data-alert-icon-type": type.value,
              })}
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// The Alert block
export const Alert = createReactBlockSpec(
  {
    type: "alert",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "warning",
        values: ["warning", "error", "info", "success"],
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const alertType = alertTypes.find(
        (a) => a.value === props.block.props.type
      )!;
      return (
        <div className={"alert"} data-alert-type={props.block.props.type}>
          {/* Custom dropdown replacing Mantine Menu */}
          {"this is the thing"}
          {/* <AlertTypeDropdown
            currentType={props.block.props.type}
            onSelect={(type) =>
              props.editor.updateBlock(props.block, {
                type: "alert",
                props: { type: type.value },
              })
            }
          /> */}
          {/* Rich text field for user to type in */}
          {/* <div className={"inline-content"} ref={props.contentRef} /> */}
        </div>
      );
    },
  }
);
