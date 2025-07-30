'use client'

// React Imports
import { Fragment, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

type ConfirmationType = 'delete-account' | 'unsubscribe' | 'suspend-account' | 'delete-order' | 'delete-customer'

type ConfirmationDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
  action_type: ConfirmationType
  onConfirm: (value: boolean) => void
}

const ConfirmationDialog = ({ open, setOpen, action_type, onConfirm }: ConfirmationDialogProps) => {
  // States
  const [secondDialog, setSecondDialog] = useState(false)
  const [userInput, setUserInput] = useState(false)

  // Vars
  const Wrapper = action_type === 'suspend-account' ? 'div' : Fragment

  const handleSecondDialogClose = () => {
    setSecondDialog(false)
    setOpen(false)
  }

  const handleConfirmation = (value: boolean) => {

    setUserInput(value)
    onConfirm(value)
    // setSecondDialog(true)
    setOpen(false)
  }

  return (
    <>
      <Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)} closeAfterTransition={false}>
        <DialogContent className='flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          <i className='tabler-alert-circle text-[88px] mbe-6 text-warning' />
          <Wrapper
            {...(action_type === 'suspend-account' && {
              className: 'flex flex-col items-center gap-2'
            })}
          >
            <Typography variant='h4'>
              {action_type === 'delete-account' && 'Are you sure you want to deactivate your account?'}
              {action_type === 'unsubscribe' && 'Are you sure to cancel your subscription?'}
              {action_type === 'suspend-account' && 'Are you sure?'}
              {action_type === 'delete-order' && 'Are you sure?'}
              {action_type === 'delete-customer' && 'Are you sure?'}
            </Typography>
            {action_type === 'suspend-account' && (
              <Typography color='text.primary'>You won&#39;t be able to revert user!</Typography>
            )}
            {action_type === 'delete-order' && (
              <Typography color='text.primary'>You won&#39;t be able to revert order!</Typography>
            )}
            {action_type === 'delete-customer' && (
              <Typography color='text.primary'>You won&#39;t be able to revert customer!</Typography>
            )}
          </Wrapper>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={() => handleConfirmation(true)}>
            {action_type === 'suspend-account'
              ? 'Yes, Suspend User!'
              : action_type === 'delete-order'
                ? 'Yes, Delete Order!'
                : action_type === 'delete-customer'
                  ? 'Yes, Delete Customer!'
                  : 'Yes'}
          </Button>
          <Button
            variant='tonal'
            color='secondary'
            onClick={() => {
              handleConfirmation(false)
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={secondDialog} onClose={handleSecondDialogClose} closeAfterTransition={false}>
        <DialogContent className='flex items-center flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
          <i
            className={classnames('text-[88px] mbe-6', {
              'tabler-circle-check': userInput,
              'text-success': userInput,
              'tabler-circle-x': !userInput,
              'text-error': !userInput
            })}
          />
          <Typography variant='h4' className='mbe-2'>
            {userInput
              ? `${action_type === 'delete-account' ? 'Deactivated' : action_type === 'unsubscribe' ? 'Unsubscribed' : action_type === 'delete-order' || action_type === 'delete-customer' ? 'Deleted' : 'Suspended!'}`
              : 'Cancelled'}
          </Typography>
          <Typography color='text.primary'>
            {userInput ? (
              <>
                {action_type === 'delete-account' && 'Your account has been deactivated successfully.'}
                {action_type === 'unsubscribe' && 'Your subscription cancelled successfully.'}
                {action_type === 'suspend-account' && 'User has been suspended.'}
                {action_type === 'delete-order' && 'Your order deleted successfully.'}
                {action_type === 'delete-customer' && 'Your customer removed successfully.'}
              </>
            ) : (
              <>
                {action_type === 'delete-account' && 'Account Deactivation Cancelled!'}
                {action_type === 'unsubscribe' && 'Unsubscription Cancelled!!'}
                {action_type === 'suspend-account' && 'Cancelled Suspension :)'}
                {action_type === 'delete-order' && 'Order Deletion Cancelled'}
                {action_type === 'delete-customer' && 'Customer Deletion Cancelled'}
              </>
            )}
          </Typography>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmationDialog
