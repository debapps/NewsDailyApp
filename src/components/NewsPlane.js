import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default function NewsPlane (props) {

  // State Hooks.
  const [articles, setArticles] = useState([]);
  const [availableNews, setAvailableNews] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(true);

  // This function sets all the state variables.

  const setStates = (article, availNewsCount, page, spin) => {
    setArticles(article);
    setAvailableNews(availNewsCount);
    setPageNum(page);
    setLoading(spin);
  }

  // This function capitalized the first letter of a word.

  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }


  // This function fetches the news from NewsAPI based on page number.

  const fetchAPIData = async (pageNum) => {
    let apiURL = "";

    if (!props.querySTR) {
      apiURL =
        "https://newsapi.org/v2/top-headlines" +
        "?country=" +
        props.country +
        "&category=" +
        props.category +
        "&apiKey=" +
        props.apiKey +
        "&pageSize=" +
        props.newsCount +
        "&page=" +
        pageNum;
    } else {
      apiURL =
        "https://newsapi.org/v2/everything" +
        "?apiKey=" +
        props.apiKey +
        "&searchIn=title,description,content" +
        "&q=" +
        props.querySTR +
        "&pageSize=" +
        props.newsCount +
        "&page=" +
        pageNum;
    }

    let data = await fetch(apiURL);
    let parseData = await data.json();
    return parseData;
  }

  // useEffect hooks: Runs when the component renders and news category changes

  useEffect(() => {

    // Set the site title as per category.
    if (props.category !== "general") {
      document.title = `NewsDaily - ${capitalizeWord(props.category)}`;
    } else {
      document.title = "NewsDaily - Your free daily dose of News";
    }

    // Fetches the data from News API.
    async function fetchData () {
      let parseData = await fetchAPIData(1);

      // Sets all the states.
      setStates(parseData.articles, parseData.totalResults - props.newsCount, pageNum + 1, false);
    }
    
    fetchData();    
// eslint-disable-next-line
  }, [props.category]);


  // This fuction fetches more data from the same API endpoint.

  const fetchMoreData = async () => {
    let availableNewsCount = 0;

    if (availableNews > props.newsCount) {
      availableNewsCount = availableNews - props.newsCount;
    }

    // Fetches more data from News API.
    let parseData = await fetchAPIData(pageNum + 1);

    // Sets all the states.
    setStates(articles.concat(parseData.articles), availableNewsCount, pageNum + 1, false);

  }


  return (
    <>
      <h1 className="text-center" style={{marginTop: "80px"}}>
        {props.category === "general"
          ? "Top Headlines"
          : `Top Headlines - ${capitalizeWord(props.category)}`}
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={availableNews}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row mb-3">
            {!loading &&
              articles.length &&
              articles.map((newsArticle) => {
                
                let {title, author, publishedAt, description, url, urlToImage, source} = newsArticle;

                return (
                  <div key={url} className="col-md-4">
                    <NewsItem
                      title={title ? title.slice(0, 47) : " "}
                      description={
                        description ? description.slice(0, 97) : " "
                      }
                      author={author ? author : "Unknown"}
                      date={publishedAt}
                      source={source.name}
                      imageURL={urlToImage}
                      newsURL={url}
                    />
                  </div>
                );
              })}

            {!loading && !articles.length && (
              <h2 className="text-center">
                No result found for {props.querySTR}
              </h2>
            )}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

NewsPlane.propTypes = {
  apiKey: PropTypes.string.isRequired,
  newsCount: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
  querySTR: PropTypes.string,
};

NewsPlane.defaultProps = {
  category: "general",
  country: "us",
  newsCount: 15,
  querySTR: null,
};
