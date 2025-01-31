import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = 'e-Doc - Welcome to the best scheduling system'
  });

  return (
    <figure className='text-cent er justify-center'>
      <blockquote className='blockquote'>
        <p>This system for doctor scheduling system</p>
      </blockquote>
      <figcaption className='blockquote-footer'>
        Welcome <cite title='Source Title'>Administrator</cite>
      </figcaption>
    </figure>
  );
};

export default Home;
