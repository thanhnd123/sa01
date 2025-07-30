'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { DialogAddTemplate } from './dialogs'

export default function ExpProductListTable() {
    const [openDialogAddTemplate, setOpenDialogAddTemplate] = useState<boolean>(false)
    return (
        <Card>
            <CardContent>
                <div className={'flex justify-end'}>
                    <Button variant='contained' onClick={() => setOpenDialogAddTemplate(true)}>Add template</Button>
                </div>
                <DialogAddTemplate
                    _open={openDialogAddTemplate}
                    _onClose={() => setOpenDialogAddTemplate(false)}
                />
            </CardContent>
        </Card>
    )
}
