import React from "react";

const NoResults = ({
  customText = "There is no",
  dataName = "items",
  tag: Tag = "p",
}) => (
  <Tag className="no-results">
    {`${customText} ${dataName}`}
  </Tag>
);

export default NoResults;
