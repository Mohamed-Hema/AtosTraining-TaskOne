import QuestionBank from '../components/QuestionBank';

const QuestionBankPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <QuestionBank />
      </div>

      <div className="mt-5">
        <nav aria-label="...">
          <ul className="pagination bg-dark">
            <li className="page-item text-white">
              <span className="page-link bg-dark">Previous</span>
            </li>
            <li className="page-item">
              <a className="page-link text-white" href="#">1</a>
            </li>
            <li className="page-item active" aria-current="page">
              <span className="page-link text-white">
                2
                <span className="visually-hidden">(current)</span>
              </span>
            </li>
            <li className="page-item">
              <a className="text-white page-link" href="#">3</a>
            </li>
            <li className="page-item">
              <a className="text-white page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>

      <footer>
        {/* Your footer content here */}
      </footer>
    </div>
  );
};

export default QuestionBankPage;
