import React, { useState } from "react";
import { ReactReader } from "react-reader";

export default function Reader(): JSX.Element {
  const [location, setLocation] = useState<string>();
  const locationChanged = (epubcifi: string) => {
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
