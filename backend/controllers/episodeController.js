const episodeModel = require("../models/episodeModel");

const getEpisodesByMovieId = async (req, res) => {
  try {
    const { movieId } = req.params;
    const episodes = await episodeModel.getEpisodesByMovieId(movieId);
    res.json(episodes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const addEpisode = async (req, res) => {
  try {
    const { MovieId, EpisodeNumber, Title, VideoUrl, Duration } = req.body;
    if (!MovieId || !EpisodeNumber || !Title || !VideoUrl || !Duration)
      return res.status(400).json({ error: "Thiếu thông tin tập phim!" });
    const result = await episodeModel.addEpisode({
      MovieId,
      EpisodeNumber,
      Title,
      VideoUrl,
      Duration,
    });
    res.status(201).json({
      message: "Thêm tập phim thành công!",
      EpisodeId: result.EpisodeId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateEpisode = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const { Title, VideoUrl, EpisodeNumber } = req.body;
    if (!Title || !VideoUrl || !EpisodeNumber)
      return res.status(400).json({ error: "Thiếu thông tin tập phim!" });
    const result = await episodeModel.updateEpisode(episodeId, {
      Title,
      VideoUrl,
      EpisodeNumber,
    });
    res.json({
      message: "Cập nhật tập phim thành công!",
      changes: result.changes,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEpisode = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const result = await episodeModel.deleteEpisode(episodeId);
    res.json({ message: "Xóa tập phim thành công!", changes: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getEpisodesByMovieId,
  addEpisode,
  updateEpisode,
  deleteEpisode,
};
