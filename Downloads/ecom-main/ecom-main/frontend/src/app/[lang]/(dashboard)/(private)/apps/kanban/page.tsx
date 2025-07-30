// Third-party Imports
import classnames from 'classnames'

// Component Imports

// Util Imports
import { commonLayoutClasses } from '@layouts/utils/layoutClasses'


const KanbanPage = () => {
  return (
    <div
      className={classnames(
        commonLayoutClasses.contentHeightFixed,
        'is-full overflow-auto pis-2 -mis-2'
      )}
    >
      
    </div>
  )
}

export default KanbanPage
