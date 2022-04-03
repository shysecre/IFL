import Button from "client/components/Button";
import { Input } from "client/components/Input";
import { Track } from "client/components/Track";
import { useActions } from "client/hooks/useActions";
import { useTypedSelector } from "client/hooks/useTypedSelector";
import React, { useEffect, useState } from "react";
import MainPageProps from "./index.props";

const MainPage: React.FC<MainPageProps> = ({}: MainPageProps) => {
  const { playlistId, tracks } = useTypedSelector(state => state.playlist);
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
      <h1>Tracks: {tracks.length}</h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {tracks.map((item, idx) => (
          <Track key={idx} track={item} />
        ))}
      </div>
    </>
  );
};

export default MainPage;
