import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import { getAllPosts } from '../client/request'
import styles from '../styles/Home.module.css'
import Info from '../components/Info';


export const getStaticProps = async (ctx) => {
  const items = await getAllPosts();
  if (!items.hasError) {
    return {
      props: {
        items
      }
    }
  }
}

export default function Home({ items }) {

  const [searchTxt, setSearchTxt] = useState('');

  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      if (items.body) {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(items.body.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items?.body.length / itemsPerPage));
      }

    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items?.body.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        {/* <input type="text" placeholder="search here" value={searchTxt} onChange={(e) => setSearchTxt(e.target.value)} /> */}
        <Info currentItems={currentItems} />
        <div style={{
          position: "fixed",
          top: "90%",
          left: "50%",
        }}>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    );
  }
  return (
    <div>
      <PaginatedItems itemsPerPage={5} />
    </div>
  )
}
