import { memo, useEffect, useState } from "react";
import _ from "lodash";
function Pagination(props) {
  const { pagination, onPageChange, shopId } = props;
  const { currentPage, limit, totalPage } = pagination;
  const [pages, setPages] = useState([]);
  useEffect(() => {
    let list = paginationRange(totalPage, currentPage, limit, 1);
    setPages((pages) => [...list]);
  }, [pagination]);
  const paginationRange = (totalPage, currentPage, limit, siblings) => {
    let totalPageNoInArray = 5 + siblings;
    if (totalPageNoInArray >= totalPage) {
      return _.range(1, totalPage + 1);
    }

    let leftSiblingsIndex = Math.max(currentPage - siblings, 1);
    let rightSiblingsIndex = Math.min(currentPage + siblings, totalPage);

    let showLeftDots = leftSiblingsIndex > 2;
    let showRightDots = rightSiblingsIndex < totalPage - 2;

    if (!showLeftDots && showRightDots) {
      let leftItemCount = 3 + 2 * siblings;
      let leftRange = _.range(1, leftItemCount + 1);
      return [...leftRange, " ...", totalPage];
    } else if (showLeftDots && !showRightDots) {
      let rightItemCount = 3 + 2 * siblings;
      let rightRange = _.range(totalPage - rightItemCount + 1, totalPage + 1);
      return [1, "... ", ...rightRange];
    } else {
      let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
      return [1, "... ", ...middleRange, " ...", totalPage];
    }
  };
  const handlePageChange = (newPage) => {
    if (onPageChange) {
      if (!shopId) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      onPageChange(newPage);
    }
  };
  return (
    <ul className="pagination home-product__pagination">
      <li className="pagination-item">
        <button
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-item__link"
        >
          <i className="pagination-item__icon fas fa-angle-left"></i>
        </button>
      </li>
      {pages.map((pageNumber) => (
        <li
          className={
            pageNumber == currentPage
              ? "pagination-item pagination-item--active"
              : "pagination-item pagination-item"
          }
          key={pageNumber}
        >
          <button
            className="pagination-item__link"
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li className="pagination-item">
        <button
          disabled={currentPage >= totalPage}
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-item__link"
        >
          <i className="pagination-item__icon fas fa-angle-right"></i>
        </button>
      </li>
    </ul>
  );
}
export default memo(Pagination);
