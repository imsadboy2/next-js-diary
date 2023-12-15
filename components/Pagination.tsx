'use client'

import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.css";
import Link from "next/link";

const Pagination = ({ data, itemsPerPage, onPageChange }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const renderPaginationBtn = () => {
    const btns = [];


    const pageGroupSize = 5;
    const startPage = Math.max(1, currentPage - Math.floor(pageGroupSize / 2));
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <button
          className={styles.numbtn}
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return btns;
  };


  return (
    <div>
      {
      data?.length !== 0 ?
      data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((e: any, i: any) => (
        <div className={styles.inner} key={i}>
          <Link href={`/detail/${e._id}`}>
            <p className={styles.title}>{e.title}</p>
          </Link>
        </div>
      )): <p className={styles.nodata}>찾으시는 제목, 내용의 게시물이 없습니다.</p>
      }
      <div className={styles.btninner}>
        <button
          className={styles.numbtn}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || data?.length == 0}
        >
          👈
        </button>
        {renderPaginationBtn()}
        <button
          className={styles.numbtnlast}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || data?.length == 0}
        >
          👉
        </button>
      </div>
    </div>
  );
};

export default Pagination;
