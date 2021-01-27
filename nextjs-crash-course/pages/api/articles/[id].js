import { articles } from "../../../data";

export default function handler(req, res) {
  const filteredArticle = articles.filter(
    (article) => article.id === req.query.id
  );
  if (filteredArticle.length > 0) {
    res.status(200).json(filteredArticle[0]);
  } else {
    res
      .status(404)
      .json({ message: `Aricle with the ID of ${req.query.id} not found.` });
  }
}
