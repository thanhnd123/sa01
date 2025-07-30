'use client'
import { useEffect, useState, useCallback, memo } from 'react'
import { useParams } from 'next/navigation'
import { useTheme } from '@mui/material/styles'
import Cookies from 'js-cookie'
import type { getDictionary } from '@/utils/getDictionary'
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'
import HorizontalNav, { Menu, SubMenu, MenuItem } from '@menu/horizontal-menu'
import VerticalNavContent from './VerticalNavContent'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import StyledHorizontalNavExpandIcon from '@menu/styles/horizontal/StyledHorizontalNavExpandIcon'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import menuItemStyles from '@core/styles/horizontal/menuItemStyles'
import menuRootStyles from '@core/styles/horizontal/menuRootStyles'
import verticalNavigationCustomStyles from '@core/styles/vertical/navigationCustomStyles'
import verticalMenuItemStyles from '@core/styles/vertical/menuItemStyles'
import verticalMenuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { AdminMenuRight } from './AdminMenuRight'
import axiosInstance from '@/libs/axios'
import { useUser, useAccess } from '@/contexts/UserContext'

type RenderExpandIconProps = {
  level?: number
}

interface Team {
  _id: string
  name: string
}

type RenderVerticalExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = memo(({ level }: RenderExpandIconProps) => (
  <StyledHorizontalNavExpandIcon level={level}>
    <i className='tabler-chevron-right' />
  </StyledHorizontalNavExpandIcon>
))

const RenderVerticalExpandIcon = memo(({ open, transitionDuration }: RenderVerticalExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
))

const MainMenu = memo(
  ({ locale, dictionary }: { locale: string; dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
    const theme = useTheme()
    const verticalNavOptions = useVerticalNav()
    const { transitionDuration } = verticalNavOptions
    const { isAdmin, isManager, hasRole, hasAnyRole, isDesigner, isContent, isListing, isMember, user } = useUser()

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

    return (
      <Menu {...menuProps}>
        {/* <MenuItem href={`/${locale}/dashboards/crm`} icon={<i className='tabler-smart-home' />}>
        {dictionary['navigation'].dashboards}
      </MenuItem> */}
        <MenuItem href={`/${locale}/apps/ideals`} icon={<i className='tabler-dialpad' />}>
          Ideals
        </MenuItem>
        <SubMenu label={'Design'} icon={<i className='tabler-palette' />}>
          {/* <MenuItem href={`/${locale}/apps/kanban`}>Workspace</MenuItem> */}
          <MenuItem href={`/${locale}/apps/design`}>{dictionary['navigation'].list}</MenuItem>
          <MenuItem href={`/${locale}/apps/design/pending-approval`}>Pending approval</MenuItem>
          <MenuItem href={`/${locale}/apps/design/banner-generate`}>Banner Generate</MenuItem>
          <MenuItem href={`/${locale}/apps/ecommerce/templates`}>Templates</MenuItem>
          <MenuItem href={`/${locale}/apps/ecommerce/mockups`}>Mockups</MenuItem>
        </SubMenu>
        {hasAnyRole(['admin', 'manager', 'listing']) && (
          <>
            <SubMenu label={'Listings'} icon={<i className='tabler-packages' />}>
              <MenuItem href={`/${locale}/apps/listings`}>List</MenuItem>
              <MenuItem href={`/${locale}/apps/listings/templates`}>Templates</MenuItem>
            </SubMenu>
            <MenuItem href={`/${locale}/apps/shops/list`} icon={<i className='tabler-building-store' />}>
              Shops
            </MenuItem>
          </>
        )}
        <MenuItem href={`/${locale}/apps/tutorials`} icon={<i className='tabler-book' />}>
          Tutorials
        </MenuItem>
        {hasAnyRole(['admin', 'manager']) && (
          <MenuItem href={`/${locale}/apps/user`} icon={<i className='tabler-user' />}>
            Users
          </MenuItem>
        )}
        {isAdmin && (
          <SubMenu label={'Configs'} icon={<i className='tabler-settings' />}>
            <MenuItem href={`/${locale}/apps/configs/teams`}>Teams</MenuItem>
            <MenuItem href={`/${locale}/apps/configs/roles`}>Roles</MenuItem>
          </SubMenu>
        )}
      </Menu>
    )
  }
)

const HorizontalMenu = ({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>> }) => {
  const verticalNavOptions = useVerticalNav()
  const theme = useTheme()
  const params = useParams()
  const [teams, setTeams] = useState<Team[]>([])
  const [teamName, setTeamName] = useState<string>('Pending ...')
  const [error, setError] = useState<string | null>(null)
  const locale = params?.lang as string
  const { user } = useUser()

  const fetchTeams = useCallback(async () => {
    if (!user?.accessToken) {

      return
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (!apiUrl) {
        throw new Error('API URL is not defined')
      }

      const response = await axiosInstance.get(`${apiUrl}/api/authenticated/teams/list`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user.accessToken
        }
      })

      if (response.data && response.data.result) {
        setTeams(response.data.result)

        const teamCookie = Cookies.get('user_team_id')
        if (teamCookie) {
          const teamId = JSON.parse(teamCookie)
          const selectedTeam = response.data.result.find((item: Team) => item._id === teamId)
          if (selectedTeam) {
            setTeamName(selectedTeam.name)
          }
        }
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Error fetching teams:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch teams')
      setTeams([])
    }
  }, [user?.accessToken])

  useEffect(() => {
    if (user?.accessToken && user.role == 'admin') {
      fetchTeams()
    }
  }, [user?.accessToken, fetchTeams])

  // Tạo session object cho AdminMenuRight nếu cần
  const sessionForAdminMenu = user ? {
    user: {
      ...user,
      accessToken: user.accessToken
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 giờ từ bây giờ
  } : null

  return (
    <HorizontalNav
      switchToVertical
      verticalNavContent={VerticalNavContent}
      verticalNavProps={{
        customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
        backgroundColor: 'var(--mui-palette-background-paper)'
      }}
      className='flex justify-between'
    >
      <MainMenu locale={locale} dictionary={dictionary} />
      {user && sessionForAdminMenu && <AdminMenuRight teams={teams} session={sessionForAdminMenu} />}
    </HorizontalNav>
  )
}

export default memo(HorizontalMenu)
