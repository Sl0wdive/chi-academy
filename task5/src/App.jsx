import React from "react";

const Counter = (props) => {
  const [count, setCount] = React.useState(props.initialCount || 0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2 className="counter-h2">Counter</h2>
      <p>Current count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const ComponentWithChildren = ({ children }) => {
  return (
    <div>
      <h1 className="counter-h1">My Counters</h1>
      {children}
    </div>
  );
};

const App = () => (
  <div>
    <ComponentWithChildren>
      <Counter initialCount={0} />
      <Counter initialCount={5} />
    </ComponentWithChildren>
  </div>
);

export default App;
