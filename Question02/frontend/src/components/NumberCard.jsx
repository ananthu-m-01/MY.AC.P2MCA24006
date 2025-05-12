const NumberCard = ({ windowPrevState, windowCurrState, numbers, avg }) => {
  return (
    <div>
      <div>
        <h2>Previous Window State:</h2>
        <p>{windowPrevState.join(', ')}</p>
      </div>
      <div>
        <h2>Current Window State:</h2>
        <p>{windowCurrState.join(', ')}</p>
      </div>
      <div>
        <h2>Numbers from API:</h2>
        <p>{numbers.join(', ')}</p>
      </div>
      <div>
        <h2>Average:</h2>
        <p>{avg}</p>
      </div>
    </div>
  );
};

export default NumberCard;
