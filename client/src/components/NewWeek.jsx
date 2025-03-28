import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import {CreateNewFolderOutlined} from '@mui/icons-material'
const NewWeek = () => {
    const [newWeekName, setNewWeekName] = useState(true)
    const handleOpenPopUp = () =>{

    }
    const handleNewWeekNameChange = () =>{

    }
  return (
    <div>
        <Tooltip title="Add Week" onClick={handleOpenPopUp}>
            <IconButton size='small'>
            <CreateNewFolderOutlined sx={{color: 'white'}} />
            </IconButton>
        </Tooltip>
        <Dialog>
            <DialogTitle>
                New Week
            </DialogTitle>
            <DialogContent>
                <TextField autoFocus margin='dense' id='name' label='Week Name' fullWidth size='small'
                variant='standard' sx={{width: '400px'}}
                autoComplete='off'
                value={newWeekName}
                onChange={handleNewWeekNameChange}>

                </TextField>
            </DialogContent>
            <DialogActions>
                <Button>Cancel</Button>
                <Button>Create</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default NewWeek