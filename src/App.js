import { useState } from "react";
import "./App.css";
import FeedbackOptions from "./components/FeedbackOptions";
import Statistic from "./components/Statistics";
import Notification from "./components/Notification";
import PropTypes from "prop-types";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = good + neutral + bad;

  const countPositiveFeedbackPercentage = (good * 100) / countTotalFeedback;

  const handleIncrement = (button) => {
    switch (button.target.id) {
      case "good":
        setGood((prevState) => prevState + 1);
        break;
      case "neutral":
        setNeutral((prevState) => prevState + 1);
        break;
      case "bad":
        setBad((prevState) => prevState + 1);
        break;
      default:
        return;
    }
  };

  return (
    <div className="container">
      <h1>Please leave feedback</h1>
      <FeedbackOptions
        onLeaveFeedback={handleIncrement}
        good={good}
        neutral={neutral}
        bad={bad}
      />
      <h2>Statistics</h2>
      {countTotalFeedback > 0 ? (
        <Statistic
          good={good}
          neutral={neutral}
          bad={bad}
          countTotalFeedback={countTotalFeedback}
          countPositiveFeedbackPercentage={countPositiveFeedbackPercentage}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

App.propTypes = {
  good: PropTypes.number,
  neutral: PropTypes.number,
  bad: PropTypes.number,
  countTotalFeedback: PropTypes.number,
  countPositiveFeedbackPercentage: PropTypes.number,
  onIncrement: PropTypes.func,
};
