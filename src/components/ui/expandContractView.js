import { Link, Typography } from '@mui/material';
import React, { useState } from 'react'

const ExpandView = ({ text, limit }) => {
    const [expanded, setExpanded] = useState(false);
    const handleToggleExpand = () => {
        setExpanded(!expanded);
    }
    return (
        <Typography variant=''>
            {expanded ? text : `${text.slice(0, limit)}`}
            <Link component={'button'} sx={{ textDecoration: 'none', fontSize: 14 }} onClick={handleToggleExpand}>{text.length > limit ? expanded ? "View Less" : "Read more" : ""}</Link>
        </Typography>
    )
}

export default ExpandView;