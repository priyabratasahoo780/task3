const LoadingSpinner = ({ text = 'Loading…' }) => (
  <div className="loading">
    <div className="spinner" />
    {text}
  </div>
)

export default LoadingSpinner
