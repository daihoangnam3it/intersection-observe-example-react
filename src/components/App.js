import React, { useCallback, useEffect, useRef, useState } from 'react';
import APIS from '../Apis/APIS';
const App = () => {
  const end = useRef();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [zero, setZero] = useState(false);
  const getData = async () => {
    if (page == 10) {
      setLoading(false);
      return setZero(true);
    }
    const data = await APIS.getImage(page, limit);
    const newData = data.map((el) => {
      return {
        id: el.id,
        url: el.urls.small,
        like: el.likes,
      };
    });
    setImages((images) => [...images, ...newData]);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [page, limit]);

  const checkRef = useCallback(
    (node) => {
      if (loading) return;
      if (end.current) end.current.disconnect();
      end.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !zero) {
          setPage((page) => page + 1);
        }
      });
      if (node) end.current.observe(node);
    },
    [zero],
  );
  return (
    <div className='container'>
      <h1>Hello world</h1>
      <ul className='list__img'>
        {images.map((el, index) => {
          if (index === images.length - 1) {
            return (
              <li key={index} ref={checkRef}>
                <img src={el.url} alt={el.id} />
                <span>{el.like} okok</span>
              </li>
            );
          } else {
            return (
              <li key={index}>
                <img src={el.url} alt={el.id} />
                <span>{el.like}</span>
              </li>
            );
          }
        })}
      </ul>
      {loading && <h3>Loading......</h3>}
      <button className='btn'>Load more</button>
    </div>
  );
};

export default App;
