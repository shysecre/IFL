import Button from "client/components/Button";
import { Input } from "client/components/Input";
import { useActions } from "client/hooks/useActions";
import { useTypedSelector } from "client/hooks/useTypedSelector";
import React, { useEffect, useState } from "react";
import MainPageProps from "./index.props";

const MainPage: React.FC<MainPageProps> = ({}: MainPageProps) => {
  const { playlistId, tracks, isCaching, error } = useTypedSelector(
    state => state.playlist
  );
  const { fetchTracks, editPlaylistId, logoutUser } = useActions();
  const [value, setValue] = useState("");

  const onEditPlaylistId = () => {
    if (!value.length) return;

    editPlaylistId(value);
    setValue("");
  };

  const onNewPlaylistId = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setValue(event.target.value);
  };

  useEffect(() => {
    if (!tracks.length) {
      fetchTracks();
    }
  }, []);

  return (
    <>
      <Button onClick={logoutUser} color="blue" text="Logout" />
      <Button onClick={fetchTracks} color="red" text="Fetch tracks" />
      <Input
        placeholder={playlistId}
        value={value}
        onChange={onNewPlaylistId}
      />

      <Button onClick={onEditPlaylistId} text="Change playlist id" />
      <div>
        {isCaching ? (
          <h1 style={{ color: "#RED", marginLeft: "30px" }}>
            Wait for cache...
          </h1>
        ) : (
          <>
            <h1 style={{ color: "#fff", marginLeft: "30px" }}>
              Total tracks: {tracks.length}
            </h1>
            <h1 style={{ color: "#fff", marginLeft: "30px" }}>
              Last 10 added tracks:
            </h1>
            <div style={{}}>
              {tracks.length ? (
                tracks
                  .slice(-10)
                  .reverse()
                  .map((track, idx) => {
                    return (
                      <div
                        style={{
                          verticalAlign: "top",
                          marginLeft: "30px",
                          width: "100%",
                          float: "left",
                        }}
                        key={idx}
                      >
                        <div>
                          <img
                            style={{ float: "left" }}
                            src={track.img}
                            width={52}
                            height={52}
                          />
                        </div>
                        <div>
                          <h4
                            style={{
                              color: "#fff",
                              float: "left",
                              marginLeft: "15px",
                            }}
                          >
                            [{++idx}] {track.artists} - {track.name}
                          </h4>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <h3 style={{ color: "RED", marginLeft: "30px" }}>
                  Fetch tracks first
                </h3>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
