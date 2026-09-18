import { STATUS } from '../lib/model.js'

const MAP = {
  [STATUS.PENDING]: 'bg-warning-subtle text-warning-emphasis',
  [STATUS.ACCEPTED]: 'bg-success-subtle text-success-emphasis',
  [STATUS.REJECTED]: 'bg-danger-subtle text-danger-emphasis',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`badge rounded-pill ${MAP[status] || 'bg-secondary-subtle text-secondary-emphasis'}`}>
      {status}
    </span>
  )
}
