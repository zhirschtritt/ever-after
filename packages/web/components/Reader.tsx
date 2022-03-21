import React, { useState } from "react";
import { ReactReader } from "react-reader";

export default function Reader(): JSX.Element {
  const [location, setLocation] = useState<string>();
  const locationChanged = (epubcifi: string) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
  };
  return (
    <div style={{ height: "80vh" }}>
      <ReactReader
        location={location}
        locationChanged={locationChanged}
        showToc={false}
        // styles={{
        //   readerArea: {

        //   }
        // }}
        url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
      />
    </div>
  );
}
