import React, { useState, useEffect } from 'react';

function NewsAuthor({name}) {
    if (null == name) {
        return null;
    }

    return <h4>by {name}</h4>
}

function NewsTag({name}) {
    if (null == name) {
        return null;
    }

    return <span>{name}</span>
}

function NewsItem({title, category, subCategory, author, short, link}) {
    return (
        <div className='news-item'>
            <div className='title'>
                <h2>{title}</h2>
                <div className='tags'>
                    <NewsTag name={category} />
                    <NewsTag name={subCategory} />
                </div>
            </div>

            <NewsAuthor name={author} />
            <p>{short}</p>

            <a href={link} target='_blank'>Read more</a>
        </div>
    );
}

export default function News() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://localhost/api/news/01.01.2022')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <h1>News list</h1>
            {
                data ? data.news.map(newsItem =>
                <NewsItem
                    key={newsItem.id}
                    title={newsItem.title}
                    category={newsItem.category}
                    subCategory={newsItem.subCategory}
                    author={newsItem.author}
                    short={newsItem.short}
                    link={newsItem.link}
                />
            ) : 'Loading...'}
        </>
    );
}