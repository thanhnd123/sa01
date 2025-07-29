// MUI Imports
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AvatarGroup from '@mui/material/AvatarGroup'

interface DesignCardProps {
  name: string
  image: string
  design_name: string
  last_updated: string
}

const DesignCard = ({ name, image, design_name, last_updated }: DesignCardProps) => {
  return (
    <Card>
      <CardMedia image={image} className='bs-[180px]' />
      <CardContent className='relative'>
        <Avatar
          src={image}
          alt={name}
          className='is-[78px] bs-[78px] border-[5px] border-backgroundPaper absolute start-[11px] block-start-[-39px]'
        />
        <div className='flex justify-between items-center flex-wrap gap-x-4 gap-y-2 mbe-5 mbs-[30px]'>
          <div className='flex flex-col items-start'>
            <Typography variant='h5'>{name}</Typography>
            <Typography variant='body2'>{design_name}</Typography>
          </div>
          <Button variant='contained'>Detail</Button>
        </div>
        <div className='flex justify-between items-center flex-wrap gap-x-4 gap-y-2'>
          <Typography variant='subtitle2' color='text.disabled'>
            {last_updated}
          </Typography>
          <AvatarGroup max={4}>
            <Avatar src='/images/avatars/1.png' />
            <Avatar src='/images/avatars/5.png' />
            <Avatar src='/images/avatars/4.png' />
            <Avatar src='/images/avatars/6.png' />
            <Avatar src='/images/avatars/7.png' />
            <Avatar src='/images/avatars/8.png' />
          </AvatarGroup>
        </div>
      </CardContent>
    </Card>
  )
}

export default DesignCard
