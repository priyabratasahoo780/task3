const EmptyState = ({ icon = '🍽️', title = 'Nothing here', subtitle = '', action = null }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <h3>{title}</h3>
    {subtitle && <p>{subtitle}</p>}
    {action}
  </div>
)

export default EmptyState
