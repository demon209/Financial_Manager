import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CreateNewFolderOutlined } from '@mui/icons-material'
import { addNewFolder } from '../ultils/folderUltils'
import { useNavigate, useSearchParams } from 'react-router-dom'
const NewMonth = () => {
    const [NewMonthName, setNewMonthName] = useState('')
    const [newFinancial, setNewFinancial] = useState('')
    const [open, setOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const popupName = searchParams.get('popup')
    const navigate = useNavigate()
    useEffect(() => {
        setOpen(popupName === 'add-folder')
    }, [popupName])

    const handleClose = () => {
        setNewMonthName('')
        setNewFinancial('') 
        navigate(-1)
    }

    const handleOpenPopUp = () => {
        setSearchParams({ popup: 'add-folder' })
    }

    const handleCreate = async () => {
        if (!NewMonthName.trim() || !newFinancial.trim()) {
            alert('Please fill in all fields.')
            return
        }

        const financialValue = Number(newFinancial)
        if (isNaN(financialValue)) {
            alert('Financial must be a valid number.')
            return
        }

        try {
            const addMonth = await addNewFolder({ name: NewMonthName, financial: financialValue })
            console.log('API Response:', addMonth)
            handleClose()
        } catch (error) {
            console.error('Error creating new Month:', error)
            alert('Failed to create new Month. Please try again.')
        }
    }

    return (
        <div>
            <Tooltip title="Add Month - Thêm Tháng Mới!">
                <IconButton size="small" onClick={handleOpenPopUp}>
                    <CreateNewFolderOutlined sx={{ color: 'white' }} />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Month</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="Month-name"
                        label="Month Name - Tên Tháng Mới: "
                        fullWidth
                        size="small"
                        variant="standard"
                        sx={{ width: '400px', mb: 2 }}
                        autoComplete="off"
                        value={NewMonthName}
                        onChange={(e) => setNewMonthName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="financial"
                        label="Financial - Số Tiền Của Tháng Này: "
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

export default NewMonth
