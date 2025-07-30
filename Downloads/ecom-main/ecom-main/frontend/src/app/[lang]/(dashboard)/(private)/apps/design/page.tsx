// Third-party Imports
import classnames from 'classnames'

// Component Imports
import DesignBoard from '@/views/apps/design/DesignBoard'

// Util Imports
import { commonLayoutClasses } from '@layouts/utils/layoutClasses'


const DesignPage = () => {
  return (
    <div
      className={classnames(
        commonLayoutClasses.contentHeightFixed,
        'is-full overflow-auto pis-2 -mis-2'
      )}
    >
    <DesignBoard />
    </div>
  )
}

export default DesignPage
