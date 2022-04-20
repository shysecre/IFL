import classNames from "classnames";
import { Input } from "client/components/Input";
import { useActions } from "client/hooks/useActions";
import { useTypedSelector } from "client/hooks/useTypedSelector";
import React, { useEffect, useState } from "react";
import MainPageProps from "./index.props";
import styles from "./index.module.css";

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
    <div
      style={{
        background: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Input
          placeholder={playlistId}
          value={value}
          onChange={onNewPlaylistId}
        />

        <svg
          onClick={onEditPlaylistId}
          className={classNames(styles.arrow)}
          viewBox="0 0 448 512"
        >
          <path
            fill="#fff"
            d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"
          />
        </svg>
      </div>
      {error ? (
        <>
          <h2
            style={{
              marginLeft: "15px",
              color: "#db748c",
              textShadow: "black 2px 2px 5px",
            }}
          >
            Error: {error}
          </h2>
        </>
      ) : null}
      <div>
        {isCaching ? (
          <h1 style={{ color: "#fff", marginLeft: "15px" }}>
            Wait for cache...
          </h1>
        ) : (
          <>
            <h2
              style={{
                color: "#fff",
                marginLeft: "15px",
                textShadow: "black 5px 5px 10px",
              }}
            >
              {tracks.length
                ? `Last 10 added tracks:`
                : "Please, specify playlist."}
            </h2>
            <div style={{}}>
              {tracks.length
                ? tracks
                    .slice(-10)
                    .reverse()
                    .map((track, idx) => {
                      return (
                        <div
                          style={{
                            verticalAlign: "top",
                            paddingLeft: "15px",
                            width: "100%",
                            float: "left",
                          }}
                          key={idx}
                        >
                          <div>
                            <img
                              style={{
                                float: "left",
                                boxShadow: "black 2px 5px 15px",
                              }}
                              src={track.img}
                              width={52}
                              height={52}
                            />
                          </div>
                          <div>
                            <h5
                              style={{
                                textShadow: "black 2px 5px 5px",
                                color: "#fff",
                                float: "left",
                                marginLeft: "15px",
                              }}
                            >
                              {++idx}. {track.artists} - {track.name}
                            </h5>
                          </div>
                        </div>
                      );
                    })
                : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
