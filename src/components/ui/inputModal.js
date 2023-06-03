import { Box, Grow, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4
};

export default function InputModal({ fromOpen, handleFormModal, children }) {

    return (
        <div>
            <Modal
                open={fromOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <IconButton onClick={handleFormModal}>
                            <ClearOutlinedIcon />
                        </IconButton>
                    </Box>
                    <Grow
                        orientation="horizontal"
                        in={fromOpen}
                        {...(fromOpen ? { timeout: 500 } : {})}>
                        <Box sx={{ p: 4 }}>
                            {children}
                        </Box>
                    </Grow >
                </Box>
            </Modal>
        </div>
    );
}