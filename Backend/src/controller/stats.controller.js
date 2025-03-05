import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (rew, res, next) => {
  try {
    const [totalSongs, totalUsers, totalAlbums, UniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),

        
        User.aggregate([
          {
            $unionWith: {
              coll: "album",
              pipeline: [],
            },
          },  //above code fetch all the artist and combine them
          {
            $group: {
              _id: "$artist",  //group with unique artist
            },
          },
          {
            $count: "count", //cooint the artist
          },
        ]),
      ]);

    res.status(200).json({
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtist:UniqueArtists[0]?.count || 0
    });
  } catch (error) {
    next(error);
  }
}