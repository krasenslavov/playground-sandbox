import server from "../config/index";
import ArticleList from "../components/ArticleList";

const index = ({ articles }) => {
  return (
    <div>
      {/* <h1>Welcome to Next</h1> */}
      <ArticleList articles={articles} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=6`
  );
  const articles = await res.json();

  return {
    props: {
      articles,
    },
  };
};

// Using our own API to fetch articles from /api

// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api/articles`);
//   const articles = await res.json();

//   return {
//     props: {
//       articles,
//     },
//   };
// };

export default index;
