import React from "react";
import { TrackProps } from "./index.props";

export const Track: React.FC<TrackProps> = ({
  track,
  ...props
}): JSX.Element => {
  return (
    <div {...props}>
      <img
        style={{
          flex: "1",
          marginBottom: "10px",
          marginRight: "10px",
          verticalAlign: "middle",
        }}
        src={track.img}
        width={52}
        height={52}
      />
      <span
        style={{
          color: "white",
          border: "1px inset black",
          borderRadius: "100px",
          verticalAlign: "middle",
          fontSize: "24px",
          marginRight: "10px",
        }}
      >
        {track.artists} - {track.name}
      </span>
    </div>
  );
};
