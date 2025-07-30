// Third-party Imports
import classnames from 'classnames'

import DesignActionBoard from '@/views/apps/design/DesignActionBoard'
// Util Imports
import { commonLayoutClasses } from '@layouts/utils/layoutClasses'


const BannerGeneratePage = () => {
  return (
    <div
      className={classnames(
        commonLayoutClasses.contentHeightFixed,
        'is-full overflow-auto pis-2 -mis-2'
      )}
    >
      <DesignActionBoard />
    </div>
  )
}

export default BannerGeneratePage
