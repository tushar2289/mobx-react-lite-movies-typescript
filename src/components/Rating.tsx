import React from "react";
import { observer } from "mobx-react-lite";

const Rating = ({ score }: { score: number }) => {
  return <div>{["⭐", "⭐", "⭐", "⭐", "⭐"].splice(0, score)}</div>;
};

export default observer(Rating);
