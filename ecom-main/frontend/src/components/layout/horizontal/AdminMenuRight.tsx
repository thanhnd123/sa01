import { Menu, SubMenu, MenuItem } from '@menu/horizontal-menu'
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { useTheme } from '@mui/material/styles'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import { Session } from 'next-auth'
import axiosInstance from '@/libs/axios'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

type RenderExpandIconProps = {
  level?: number
}

type RenderVerticalExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

interface Team {
  _id: string
  name: string
}

interface AdminMenuRightProps {
  teams: Team[]
  session: Session
}

const RenderExpandIcon = ({ level }: RenderExpandIconProps) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='tabler-chevron-right' />
  </StyledHorizontalNavExpandIcon>
)

const RenderVerticalExpandIcon = ({ open, transitionDuration }: RenderVerticalExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

export const AdminMenuRight = ({ teams, session }: AdminMenuRightProps) => {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const transitionDuration = verticalNavOptions.transitionDuration
  const user = session?.user
  const [selectedTeam, setSelectedTeam] = useState(user?.team_id)

  const handleTeamSwitch = async (teamId: string) => {
    const response = await axiosInstance.post('/api/authenticated/teams/switch', {
      team_id: teamId
    }).then((response: any) => {
      setSelectedTeam(teamId)
  
      signOut()
    }).catch((error: any) => {
      toast.error('Có lỗi xảy ra khi chuyển team')
      console.error('Error switching team:', error)
    })
  }

  const menuProps = {
    rootStyles: menuRootStyles(theme),
    renderExpandIcon: ({ level }: RenderExpandIconProps) => <RenderExpandIcon level={level} />,
    menuItemStyles: menuItemStyles(theme, 'tabler-circle'),
    renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
    popoutMenuOffset: {
      mainAxis: ({ level }: { level?: number }) => (level && level > 0 ? 14 : 12),
      alignmentAxis: 0
    },
    verticalMenuProps: {
      menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
      renderExpandIcon: ({ open }: { open?: boolean }) => (
        <RenderVerticalExpandIcon open={open} transitionDuration={transitionDuration} />
      ),
      renderExpandedMenuItemIcon: { icon: <i className='tabler-circle text-xs' /> },
      menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme)
    }
  }

  return user && (user.role == 'admin') ? (
    <Menu {...menuProps}>
      <SubMenu
        label={`Team: ${user.team_name}`}
        icon={<i className='tabler-users-group' />}
        className='justify-end item-end'
      >
        {teams.map(team => (
          <MenuItem 
            key={team._id} 
            onClick={() => handleTeamSwitch(team._id)}
            className={selectedTeam === team._id ? 'active' : ''}
          >
            {team.name}
          </MenuItem>
        ))}
      </SubMenu>
    </Menu>
  ) : (
    ''
  )
}
