import classNames from "classnames";
import React from "react";
import { Text } from "../Text";
import { TrackProps } from "./index.props";
import styles from "./index.module.css";

export const Track: React.FC<TrackProps> = ({ track, idx }): JSX.Element => {
  const onImageClick = (url: string) => {
    window.api.utils.openInBrowser(url);
  };

  return (
    <div className={classNames(styles.trackBox)}>
      <div>
        <img
          src={track.img}
          onClick={() => onImageClick(track.img)}
          title="Click on me to get image ;)"
          className={classNames(styles.img)}
        />
      </div>
      <div>
        <Text type="h5" className={classNames(styles.text)}>
          {++idx}. {track.artists} - {track.name}
        </Text>
      </div>
    </div>
  );
};
