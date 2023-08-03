import React, { useRef } from "react";
import { useMemo } from "react";
import PrintIcon from "@mui/icons-material/Print";
import Sheet from "./Sheet";
import ReactToPrint from "react-to-print";

import { useReactToPrint } from "react-to-print";

export default function PrintPage() {
  const componentPdf = useRef();

  const reactToPrintContent = () => {
    return componentPdf.current;
  };
  const reactToPrintTrigger = () => {
    return (
      <div className="btn-md-download">
        <PrintIcon className="downloadIcon" fontSize="small" />
        Print
      </div>
    );
  };

  return (
    <>
      <ReactToPrint
        content={reactToPrintContent}
        trigger={reactToPrintTrigger}
        copyStyles={true}
        // pageStyle={() => "color:black"}
      />
      <Sheet innerRef={componentPdf} />
    </>
  );
}
