import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CreateNewFolderOutlined } from '@mui/icons-material'
import { addNewFolder } from '../ultils/folderUltils'
import { useNavigate, useSearchParams } from 'react-router-dom'
const NewWeek = () => {
    const [newWeekName, setNewWeekName] = useState('')
    const [newFinancial, setNewFinancial] = useState('')
    const [open, setOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const popupName = searchParams.get('popup')
    const navigate = useNavigate()
    useEffect(() => {
        setOpen(popupName === 'add-folder')
    }, [popupName])

    const handleClose = () => {
        setNewWeekName('')
        setNewFinancial('') 
        navigate(-1)
    }

    const handleOpenPopUp = () => {
        setSearchParams({ popup: 'add-folder' })
    }

    const handleCreate = async () => {
        if (!newWeekName.trim() || !newFinancial.trim()) {
            alert('Please fill in all fields.')
            return
        }

        const financialValue = Number(newFinancial)
        if (isNaN(financialValue)) {
            alert('Financial must be a valid number.')
            return
        }

        try {
            const addWeek = await addNewFolder({ name: newWeekName, financial: financialValue })
            console.log('API Response:', addWeek)
            handleClose()
        } catch (error) {
            console.error('Error creating new week:', error)
            alert('Failed to create new week. Please try again.')
        }
    }

    return (
        <div>
            <Tooltip title="Add Week">
                <IconButton size="small" onClick={handleOpenPopUp}>
                    <CreateNewFolderOutlined sx={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Week</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="week-name"
                        label="Week Name"
                        fullWidth
                        size="small"
                        variant="standard"
                        sx={{ width: '400px', mb: 2 }}
                        autoComplete="off"
                        value={newWeekName}
                        onChange={(e) => setNewWeekName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="financial"
                        label="Financial"
                        fullWidth
                        size="small"
                        variant="standard"
                        sx={{ width: '400px' }}
                        autoComplete="off"
                        type="number"
                        value={newFinancial}
                        onChange={(e) => setNewFinancial(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewWeek
