import React from "react";
import "./textContent.css";

const TextContent = ({ txtC1, iconC1, linkC1 }) => {

  return (
    <div className="info">
      <p className="info_desc" dangerouslySetInnerHTML={{ __html: txtC1 }}></p>
      <div>
        <a id="j_link" href="http://localhost:3000/">
          <img src={iconC1} alt="icon"/>
          {linkC1}</a>
      </div>
    </div>
  );
}

export default TextContent;