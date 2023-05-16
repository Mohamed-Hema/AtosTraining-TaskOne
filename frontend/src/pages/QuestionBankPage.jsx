import React from 'react';

const QuestionBankPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '100vh' }}>
      <nav aria-label="...">
        <ul className="pagination bg-dark">
          <li className="page-item text-white">
            <span className="page-link bg-dark">Previous</span>
          </li>
          <li className="page-item">
            <a className="page-link text-black" href="#">1</a>
          </li>
          <li className="page-item active" aria-current="page">
            <span className="page-link text-black">
              2
              <span className="visually-hidden">(current)</span>
            </span>
          </li>
          <li className="page-item">
            <a className="text-black page-link" href="#">3</a>
          </li>
          <li className="page-item">
            <a className="text-black page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default QuestionBankPage;
