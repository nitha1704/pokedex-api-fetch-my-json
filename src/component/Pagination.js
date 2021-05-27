import React from 'react';

const Pagination = ({ totalItem, postPerPage, changePage }) => {
    console.log(totalItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItem.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  return (
    <div>
      {pageNumbers.map((item, index) => (
        <button className="btn btn-primary mr-2" onClick={() => changePage(index + 1)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default Pagination
