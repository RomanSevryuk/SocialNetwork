import React from 'react';
import s from "./Paginator.module.css";

type PaginatorPropsType = {
    pageSize: number
    totalCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = ({pageSize, totalCount, currentPage, onPageChanged}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let currentPageStart = ((currentPage - 5) < 0) ? 0 : currentPage - 5;
    let currentPageEnd = currentPage + 5;
    let slicedPages = pages.slice(currentPageStart, currentPageEnd);

    return (
        <div>
            <p></p>
            {((currentPage + 5) > 10) &&
                <span style={{cursor: 'pointer', padding: '5px', marginLeft: '7px'}}
                      className={currentPage === Number(pages[0])
                          ? s.selectedPage : s.allPage}
                      onClick={() => onPageChanged(Number(pages[0]))}>{pages[0]}</span>}
            {(currentPage + 5) > 10 &&
                <span style={{cursor: 'default'}}> . . .</span>}
            {slicedPages.map((el, index) => {
                return <span key={index} style={{cursor: 'pointer', marginLeft: '7px', padding: '5px'}}
                             className={currentPage === el ? s.selectedPage : s.allPage}
                             onClick={() => onPageChanged(el)}>{el}
                    </span>
            })}
            <span style={{cursor: 'default'}}> . . . </span>
            <span style={{cursor: 'pointer', padding: '5px'}}
                  className={currentPage === Number(pages.slice(-1))
                      ? s.selectedPage : s.allPage}
                  onClick={() => onPageChanged(Number(pages.slice(-1)))}>{pages.slice(-1)}
                    </span>
            <p></p>
        </div>

    );
};