import React from 'react';
import Track from './Track';
import AlbumPoster from './AlbumPoster';
const PlaylistsPage = ({ playlists, chooseTrack }) => {
  return (
    <section className="bg-black ml-24 py-4 space-y-8 flex-grow md:mr-2.5">
      {playlists.length > 0 && (
        <>
          <h1
            style={{ width: '95%', margin: '1rem' }}
            className="text-white font-bold mb-3 text-lg"
          >
            Featured Playlists
          </h1>
          <div
            style={{ width: '95%', margin: '1rem' }}
            className="bg-[#0D0D0D] border-2 border-[#262626] p-4 rounded-xl space-y-4 recent-div"
          >
            <div className="grid overflow-y-scroll scrollbar-hide  py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
              {playlists.map((item) => (
                <AlbumPoster
                  key={item.title}
                  track={item}
                  chooseTrack={chooseTrack}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default PlaylistsPage;
