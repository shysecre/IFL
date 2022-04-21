import classNames from "classnames";
import { Input } from "client/components/Input";
import { useActions } from "client/hooks/useActions";
import { useTypedSelector } from "client/hooks/useTypedSelector";
import React, { useEffect, useState } from "react";
import MainPageProps from "./index.props";
import styles from "./index.module.css";
import Button from "client/components/Button";
import { Track } from "client/components/Track";
import { Text } from "client/components/Text";

const MainPage: React.FC<MainPageProps> = ({}: MainPageProps) => {
  const { playlistId, tracks, isCaching, error } = useTypedSelector(
    state => state.playlist
  );
  const { fetchTracks, editPlaylistId } = useActions();
  const [value, setValue] = useState("");

  const onEditPlaylistId = () => {
    if (!value.length) return;

    editPlaylistId(value.split("/")[4].split("?")[0]);
    setValue("");
  };

  const onNewPlaylistId = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setValue(event.target.value);
  };

  useEffect(() => {
    if (!tracks.length && playlistId) {
      fetchTracks();
    }
  }, []);

  return (
    <div className={classNames(styles.main)}>
      <div
        className={classNames(styles.container, {
          [styles.containerHide]: isCaching,
          [styles.containerCenter]: !tracks.length === true && !isCaching,
          [styles.containerRight]: !tracks.length === false && !isCaching,
        })}
      >
        <Input
          placeholder={"Paste playlist link"}
          onChange={onNewPlaylistId}
          value={value}
          className={classNames(styles.input)}
        />
        <Button
          text="Get playlist"
          onClick={onEditPlaylistId}
          color="blue"
          className={classNames(styles.fetchButton)}
        />
      </div>
      {error ? (
        <Text type="h2" className={classNames(styles.errorText)}>
          Error: {error}
        </Text>
      ) : null}
      {isCaching ? (
        <Text type="h1" className={classNames(styles.text)}>
          Wait for cache...
        </Text>
      ) : (
        <div>
          <Text type="h2" className={classNames(styles.text)}>
            {tracks.length ? "Last 10 added tracks" : null}
          </Text>
          <div>
            {tracks.length
              ? tracks
                  .slice(-10)
                  .reverse()
                  .map((track, idx) => (
                    <Track key={idx} track={track} idx={idx} />
                  ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
